import { OrderProps } from "@/types";
import { redirect } from "next/navigation";
import fetchOrders from "@/DB/fetchOrders";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ShowOrders from "@/components/ShowOrders";

export default async function OrdersPage() {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("api/auth/login");
    }

    const user = await getUser();
    const orders = (await fetchOrders(user?.email as string)) as OrderProps[];

    return (
        <div className="px-4 py-2">
            {orders.length === 0 && (
                <h1 className="text-lg text-balance text-center font-bold my-4 mt-8 uppercase lg:text-xl">
                    You have no order yet, start shopping
                </h1>
            )}
            {orders.length > 0 && (
                <>
                    <h1 className="text-lg text-balance text-center font-bold my-4 mt-8 uppercase lg:text-xl">
                        {orders.length} orders found
                    </h1>
                    <ShowOrders orders={JSON.stringify(orders)} />
                </>
            )}
        </div>
    );
}
