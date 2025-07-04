import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import EditBook from "./EditBook";
import { useState } from "react";
import { CgUnavailable } from "react-icons/cg";
import AddBorrow from "./AddBorrow";

const BookTable = ({ idx, book }: IProps) => {
    const [selectBookId, setSelectBookId] = useState<string | null>(null)
    const { _id, title, author, genre, isbn, copies } = book;
    const [deleteBook] = useDeleteBookMutation();
    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBook(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your book has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const handleBorrowError = () => {
        Swal.fire({
            title: "Sorry service is not available",
            icon: "error",
            draggable: true
        });
    }

    return (
        <tr>
            <th>{idx + 1}</th>
            <td>{title}</td>
            <td>{author}</td>
            <td>{genre}</td>
            <td>{isbn}</td>
            <td>{copies}</td>
            <td>{copies === 0 ? <CgUnavailable className="text-base text-red-400" /> : "Available"
            }</td>
            <td onClick={() => setSelectBookId(_id)}><EditBook bookId={selectBookId} onClose={() => setSelectBookId(null)}></EditBook></td>
            <td><MdDelete onClick={() => handleDelete(book._id)} className="text-base text-red-500" /></td>
            <td onClick={() => setSelectBookId(_id)}>{
                copies === 0 ? <button onClick={handleBorrowError} className="border rounded-md p-2"><CgUnavailable className="text-2xl text-red-400" /></button> : 
                <AddBorrow bookId={selectBookId} onClose={() => setSelectBookId(null)}></AddBorrow>
            }
            </td>
        </tr>
    );
};

export default BookTable;