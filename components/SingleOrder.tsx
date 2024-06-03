import { OrderProps } from "@/types";

function SingleOrder({ item }: { item: OrderProps }) {
    return (
        <div className="card w-full bg-[#352433] shadow-xl">
            <div className="card-body">
                <h2 className="card-title uppercase">Items</h2>
                {item.order.map((i) => (
                    <p key={i.description}>
                        {i.description} (x{i.quantity}) = &#x20B9;
                        {i.unit_amount * i.quantity}
                    </p>
                ))}

                <div className="divider divider-primary my-0" />
                <p className="text-lg">Total = &#x20B9;{item.total}</p>
                <div className="divider divider-primary my-0" />

                <h2 className="card-title uppercase">Shipping address</h2>
                <p>{item.line1}</p>
                {item.line2 && <p>{item.line2}</p>}
                <p>
                    {item.city}, {item.state}, {item.country}, {item.pin}
                </p>
            </div>
        </div>
    );
}

export default SingleOrder;
