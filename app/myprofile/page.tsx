import { CartProps } from "@/types";
import { redirect } from "next/navigation";
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
        <>
            <h1>MY PROFILE</h1>
            <h1>{user?.email}</h1>
        </>
    );
}
