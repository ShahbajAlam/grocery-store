import { CartProps } from "@/types";
import { redirect } from "next/navigation";
import CartItems from "@/components/CartItems";
import fetchCartDetails from "@/DB/fetchCartDetails";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CheckOutButton from "@/components/CheckOutButton";

export default async function ProfilePage() {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("api/auth/login");
    }

    const user = await getUser();
    const cart = (await fetchCartDetails(user?.email as string)) as CartProps[];

    if (cart.length === 0)
        return (
            <h1 className="px-4 py-2 text-lg text-balance text-center font-bold mt-20 uppercase">
                Your cart is empty, start adding some items
            </h1>
        );

    const subtotal = cart.reduce(
        (acc, curr) => acc + curr.productCount * curr.productPrice,
        0
    );

    return (
        <div className="px-4 py-2">
            <h1 className="text-lg text-balance text-center font-bold my-4 uppercase">
                My cart
            </h1>

            <ul className="flex flex-col gap-3 rounded-lg">
                {cart.map((item) => (
                    <CartItems
                        key={item.productID}
                        data={JSON.stringify(item)}
                        email={user?.email as string}
                    />
                ))}
            </ul>

            <h1 className="text-2xl text-balance text-center font-bold my-4 uppercase">
                Subtotal = &#x20B9;{subtotal}
            </h1>

            <CheckOutButton
                cart={JSON.stringify(cart)}
                email={user?.email as string}
            />
        </div>
    );
}
