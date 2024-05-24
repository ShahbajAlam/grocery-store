import toast from "react-hot-toast";

type ToastProps = {
    type: "error" | "success";
    message: string;
};

export default function showToast({ type, message }: ToastProps) {
    toast[type](message, {
        duration: 2500,
        id: Date.now().toString(),
        position: "top-center",
        style: {
            borderRadius: 16,
            fontWeight: "bold",
            textAlign: "center",
            textWrap: "balance",
            paddingInline: 10,
            paddingBlock: 8,
            fontSize: 16,
        },
    });
}
