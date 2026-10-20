import "./AnalyticsCard.css";

const AnalyticsCard = ({
    icon,
    title,
    value,
    percentage,
    positive = true,
    className = ""
}) => {
    return (
        <div className={`analytics-card ${className}`}>
            <div className="analytics-card-icon">
                {icon}
            </div>

            <h3 className="analytics-card-title">
                {title}
            </h3>

            <div className="analytics-card-stat">
                <span className="analytics-card-value">
                    {value}
                </span>

                <span
                    className={`analytics-card-percentage ${
                        positive ? "positive" : "negative"
                    }`}
                >
                    {percentage}
                </span>
            </div>
        </div>
    );
};

export default AnalyticsCard;