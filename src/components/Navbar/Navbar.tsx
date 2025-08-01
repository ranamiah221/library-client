import AddBook from "@/pages/AddBook";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className="list-none"><NavLink to='/'>
                        {({ isActive }) => (
                            <span className={isActive ? "text-black font-bold" : ""}>Home</span>
                        )}
                    </NavLink></li>
                        <li className="list-none"><NavLink to='/books'>
                            {({ isActive }) => (
                                <span className={isActive ? "text-black font-bold" : ""}>All Book</span>
                            )}
                        </NavLink></li>
                        <li className="list-none"><NavLink to='/borrow-summary'>
                            {({ isActive }) => (
                                <span className={isActive ? "text-black font-bold" : ""}>Borrow summary</span>
                            )}
                        </NavLink></li>

                    </ul>
                </div>
                <h2 className="text-2xl font-medium text-green-600">LIBRARY</h2>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                     <li className="list-none"><NavLink to='/'>
                        {({ isActive }) => (
                            <span className={isActive ? "text-black font-bold" : ""}>Home</span>
                        )}
                    </NavLink></li>
                    <li className="list-none"><NavLink to='/books'>
                        {({ isActive }) => (
                            <span className={isActive ? "text-black font-bold" : ""}>All Book</span>
                        )}
                    </NavLink></li>
                    <li className="list-none"><NavLink to='/borrow-summary'>
                        {({ isActive }) => (
                            <span className={isActive ? "text-black font-bold" : ""}>Borrow summary</span>
                        )}
                    </NavLink></li>

                </ul>
            </div>
            <div className="navbar-end">
                <AddBook></AddBook>
            </div>
        </div>
    );
};

export default Navbar;