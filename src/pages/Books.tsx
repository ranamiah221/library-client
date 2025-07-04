import { useGetAllBooksQuery} from "@/redux/api/baseApi";
import { FaEdit } from "react-icons/fa";


import BookTable from "./BookTable";



const Books = () => {
    const { data} = useGetAllBooksQuery(undefined, {
        refetchOnReconnect: true,
    })
    return (
        <div className="overflow-x-auto m-5">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Copies</th>
                        <th>Availability</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Borrow</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.data?.map((book, idx) => <BookTable key={book._id} idx={idx} book={book}></BookTable>)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Serial No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Copies</th>
                        <th>Availability</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Borrow</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Books;

<FaEdit className="text-base text-green-600" />