import { useGetBorrowQuery } from "@/redux/api/baseApi";
import BorrowCard from "./BorrowCard";


const BorrowSummary = () => {
    const {data}=useGetBorrowQuery(undefined)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 gap-5">
            {
                data?.data?.map(borrow=> <BorrowCard key={borrow._id} borrow={borrow}></BorrowCard>)
            }
        </div>
    );
};

export default BorrowSummary;