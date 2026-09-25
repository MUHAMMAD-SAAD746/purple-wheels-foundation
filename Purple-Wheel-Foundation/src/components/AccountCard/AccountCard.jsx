import HotAndPepperDashboard from "../../assets/hot-pepper-dashboard.png"
import "./AccountCard.css"

function AccountCard({
    logo,
    title,
    category,
    buttonText,
    backgroundImage,
    gradient = false,
    logoWidth = "110px",
    onClick
}) {
    return (
        <div
            className={`choose-account-card ${gradient ? "has-gradient" : ""}`}
            style={{"--card-bg-image": `url(${backgroundImage})`}}
        >
            <div className="choose-account-card-logo">
                <img 
                    src={logo} 
                    alt={`${title} logo`} 
                    style={{ width: logoWidth }}
                />
            </div>

            <div className="choose-account-card-info">
                <p>{title}</p>
                <p>{category}</p>
            </div>

            <div 
                className="choose-account-card-action"
                onClick={onClick}
            >
                <button>{buttonText}</button>
            </div>
        </div>
    );
}

export default AccountCard;