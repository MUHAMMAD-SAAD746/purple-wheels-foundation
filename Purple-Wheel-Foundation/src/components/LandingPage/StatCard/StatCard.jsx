import "./StatCard.css"

const StatCard = ({ icon, heading, description, color }) => {
    return (
        <div className="about-stat-card">

            <div
                className="stat-icon"
                style={{ backgroundColor: color }}
            >
                <img src={icon} alt="" />
            </div>

            <h3 style={{ color: color }}>
                {heading}
            </h3>

            <p style={{ color: color }} >{description}</p>

        </div>
    );
};

export default StatCard;