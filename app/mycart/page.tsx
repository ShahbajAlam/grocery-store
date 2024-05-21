import { CartProps } from "@/types";
import { redirect } from "next/navigation";
import CartItems from "@/components/CartItems";
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

            <CartItems
                data={JSON.stringify(cart)}
                email={user?.email as string}
            />
        </div>
    );
}
