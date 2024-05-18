import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
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
                    <DropdownMenuContent className="p-5 rounded-2xl">
                        <DropdownMenuLabel className="text-lg">
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-lg">
                            <Link href="/myprofile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-lg">
                            Orders
                        </DropdownMenuItem>
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
