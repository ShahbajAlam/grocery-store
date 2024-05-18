import connectDB from "./connection";
import { Users } from "./models/UsersModel";

export default async function addUser(email: string) {
    try {
        connectDB();
        const userExists = await Users.findOne({ email }).select("_id");
        if (!userExists) {
            await Users.create({ email });
        }
    } catch (error) {
        console.log(error);
    }
}
