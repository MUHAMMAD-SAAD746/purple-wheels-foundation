import "./AdminSearch.css";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

const AdminSearch = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="admin-search">
            <IoSearchOutline className="admin-search-icon" />
            <input
                type="text"
                className="admin-search-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={placeholder}
            />
            {value && (
                <button
                    className="admin-search-clear"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                >
                    <IoCloseOutline />
                </button>
            )}
        </div>
    );
};

export default AdminSearch;
