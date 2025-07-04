

const BorrowCard = ({ borrow }: IProps) => {
    console.log(borrow);
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{borrow?.book?.title}</h2>
                <p>ISBN: {borrow?.book?.isbn}</p>
                <p>Total Quantity: {borrow?.totalQuantity}</p>
            </div>
        </div>
    );
};

export default BorrowCard;