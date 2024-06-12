import ShowWishlist from "@/components/ShowWishlist";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function WishlistPage() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    const isAuth = await isAuthenticated();

    return <ShowWishlist email={user?.email as string} isAuth={isAuth} />;
}
