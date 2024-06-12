import Link from "next/link";
import Image from "next/image";
import {
    LoginLink,
    LogoutLink,
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    const isAuth = await isAuthenticated();

    return (
        <nav className="flex justify-between items-center py-2 px-4 md:w-[80%] lg:w-[70%] lg:max-w-[900px] md:mx-auto">
            <Link href="/">
                <Image
                    src="/logo.png"
                    width={60}
                    height={60}
                    alt="Logo"
                    priority
                />
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/wishlist">
                    <span className="text-3xl text-red-600">&#10084;</span>
                </Link>

                {!isAuth && (
                    <LoginLink className="bg-[#c59f60] text-black hover:bg-[#c59f60]/90 text-lg px-4 py-2 rounded-md font-semibold">
                        Log In
                    </LoginLink>
                )}

                {isAuth && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <img
                                src={user?.picture as string}
                                width={50}
                                height={50}
                                alt="Profile Picture"
                                className="rounded-full"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="p-5 rounded-xl mr-4"
                            sideOffset={20}
                        >
                            <DropdownMenuLabel className="text-lg">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/myorders">
                                <DropdownMenuItem className="text-lg cursor-pointer">
                                    Orders
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/mycart">
                                <DropdownMenuItem className="text-lg cursor-pointer">
                                    Cart
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="text-lg text-red-600">
                                <LogoutLink>Log Out</LogoutLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
