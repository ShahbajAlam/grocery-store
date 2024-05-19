import connectDB from "@/DB/connection";
import { NextResponse } from "next/server";
import { Users } from "@/DB/models/UsersModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const REDIRECT_URL = `${process.env.KINDE_SITE_URL}/myprofile`;

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("Something went wrong with authentication");

    try {
        connectDB();
        const userExists = await Users.findOne({ email: user.email }).select(
            "_id"
        );
        if (!userExists) {
            await Users.create({
                email: user.email,
                name: `${user.given_name} ${user.family_name}`,
            });
        }
        return NextResponse.redirect(REDIRECT_URL);
    } catch (error) {
        console.log(error);
    }
}
