import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import BookCard from "./BookCard";

const FeaturedBook = () => {
    const {data, isLoading}=useGetAllBooksQuery(undefined)
    if(isLoading) return <p>Loading</p>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 m-5 ">
            {
                data?.data?.slice(0,6).map( book=><BookCard key={book._id} book={book}></BookCard>)
            }
        </div>
    );
};

export default FeaturedBook;