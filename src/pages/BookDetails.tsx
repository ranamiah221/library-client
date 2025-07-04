import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router-dom";


const BookDetails = () => {
    const {id}=useParams()
    const {data, isLoading} = useGetBookByIdQuery(id)
    
    if(isLoading) return <p>Loading..</p>
    const {title, author, description, genre, copies}=data.data;
    return (
        <div className="card card-border text-justify bg-base-100 w-full">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Author: {author}</p>
                <p>Genre: {genre}</p>
                <p>Copies: {copies}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default BookDetails;