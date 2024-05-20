import { CartProps } from "@/types";
import { redirect } from "next/navigation";
import CartItem from "@/components/CartItem";
import fetchCartDetails from "@/DB/fetchCartDetails";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function ProfilePage() {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("api/auth/login");
    }

    const user = await getUser();
    const cart = (await fetchCartDetails(user?.email as string)) as CartProps[];

    return (
        <div className="px-4 py-2">
            <h1 className="text-lg text-balance text-center font-bold my-4 uppercase">
                My cart
            </h1>

            <ul className="flex flex-col gap-3 rounded-lg">
                {cart.map((item) => (
                    <CartItem
                        key={item.productID}
                        item={item}
                        email={user?.email as string}
                    />
                ))}
            </ul>
        </div>
    );
}
