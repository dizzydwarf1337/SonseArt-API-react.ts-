import { useEffect } from "react";
import { useStore } from "../../../app/stores/defaultStore";
import CommentItem from "./commentItem";

export default function CommentDashboard() {

    const { productStore } = useStore();
    useEffect(() => {

    }, [productStore.product])

    return (
        <div>
            <h1>Comment Dashboard</h1>
            <CommentItem />
        </div>
    )
}