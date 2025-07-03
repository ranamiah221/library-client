import { Link } from "react-router-dom";
import logo from '../../assets/library-book.jpg'

const Navbar = () => {
    return (
        <div>
            <img className="w-20 " src={logo} alt="" />
            <Link to='/books'>All Book</Link>
        </div>
    );
};

export default Navbar;