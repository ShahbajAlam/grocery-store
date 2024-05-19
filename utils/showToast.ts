import toast from "react-hot-toast";

export default function showToast() {
    toast.error("Please log in to your account to continue", {
        duration: 2500,
        id: Date.now().toString(),
        position: "top-center",
        style: {
            borderRadius: 16,
            fontWeight: "bold",
            textAlign: "center",
            textWrap: "balance",
            paddingInline: 10,
            paddingBlock: 6,
            fontSize: 20,
        },
    });
}
