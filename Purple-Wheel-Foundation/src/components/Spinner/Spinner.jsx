import { FaSpinner, FaCircleNotch } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import "./Spinner.css";

const Spinner = ({ size = 16 }) => {
    return (
        <FaSpinner
            className="spinner"
            size={size}
            aria-label="Loading"
        />
    );
};

const CircleSpinner = ({ size = 16 }) => {
    return (
        <LuLoaderCircle 
            className="spinner" 
            size={size} 
            aria-label="Loading" 
        />
    );
};

export { Spinner, CircleSpinner };