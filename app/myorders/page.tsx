import { OrderProps } from "@/types";
import { redirect } from "next/navigation";
import fetchOrders from "@/DB/fetchOrders";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
                <h1 className="text-lg text-balance text-center font-bold my-4 mt-8 uppercase">
                    You have no order yet, start shopping
                </h1>
            )}

            {orders.length > 0 && (
                <>
                    <h1 className="text-lg text-balance text-center font-bold my-4 mt-8 uppercase">
                        Your orders
                    </h1>

                    <div className="grid grid-cols-1 gap-4">
                        {orders?.map((item) => (
                            <div
                                key={item._id}
                                className="card w-full bg-[#352433] shadow-xl"
                            >
                                <div className="card-body">
                                    <h2 className="card-title uppercase">
                                        Items
                                    </h2>
                                    {item.order.map((i) => (
                                        <p key={i.description}>
                                            {i.description} (x{i.quantity}) =
                                            &#x20B9;
                                            {i.unit_amount * i.quantity}
                                        </p>
                                    ))}

                                    <div className="divider divider-primary my-0" />
                                    <p className="text-lg">
                                        Total = &#x20B9;{item.total}
                                    </p>
                                    <div className="divider divider-primary my-0" />

                                    <h2 className="card-title uppercase">
                                        Shipping address
                                    </h2>
                                    <p>{item.line1}</p>
                                    {item.line2 && <p>{item.line2}</p>}
                                    <p>
                                        {item.city}, {item.state},{" "}
                                        {item.country}, {item.pin}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
