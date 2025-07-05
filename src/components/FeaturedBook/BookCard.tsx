import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";



const BookCard = ({ book }: IProps) => {
    const { _id, title, author, description, genre, copies } = book;
    // const {} = useGetBookByIdQuery(_id)
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <p>Author: {author}</p>
                <p>Copies: {copies}</p>
                <p  className={cn("text-base font-bold", {
                    "text-green-500": genre == 'NON_FICTION',
                    "text-purple-700":  genre== 'FICTION',
                    "text-red-500": genre =='SCIENCE',
                    "text-cyan-500": genre =='FANTASY',
                    "text-yellow-500":genre =='BIOGRAPHY'
                }
                )}>{genre}</p>
                <Link to={`/${_id}`}><button className="btn bg-green-500 text-white rounded-lg">Book Details</button></Link>

              


            </div>
        </div>
    );
};

export default BookCard;