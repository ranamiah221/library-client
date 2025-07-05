import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router-dom";


const BookDetails = () => {
    const navigate = useNavigate()
    const {id}=useParams()
    const {data, isLoading} = useGetBookByIdQuery(id)
    
    if(isLoading) return <p>Loading..</p>
    const {title, author, description, genre, copies, available}=data.data;
    const handleGoHome=()=>{
        navigate('/')
    }
    return (
        <div className="card card-border text-justify bg-base-100 w-full border my-5 rounded-lg">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-base font-normal text-black">Author: <span className="text-gray-700 font-normal">{author}</span> </p>
                <p className="text-base font-normal text-black">Genre: <span className="text-gray-700 font-normal">{genre}</span></p>
                <p className="text-base font-normal text-black">Copies: <span className="text-gray-700 font-normal">{copies}</span> </p>
                <p className="text-base font-normal">Description: <span className="text-sm">{description}</span> </p>
                <button onClick={handleGoHome} className="btn bg-green-500 text-white w-32 rounded-lg">Go Home</button>
            </div>
            
        </div>
    );
};

export default BookDetails;