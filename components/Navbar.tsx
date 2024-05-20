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
        <nav className="flex justify-between items-center py-2 px-4">
            <Link href="/">
                <Image
                    src="/logo.png"
                    width={60}
                    height={60}
                    alt="Logo"
                    priority
                />
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
                        <Link href="/myprofile">
                            <DropdownMenuItem className="text-lg">
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/mycart">
                            <DropdownMenuItem className="text-lg">
                                Cart
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-lg">
                            <LogoutLink>Log Out</LogoutLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </nav>
    );
}

export default Navbar;
