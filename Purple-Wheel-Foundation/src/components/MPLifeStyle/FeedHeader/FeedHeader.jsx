import "./FeedHeader.css"

const FeedHeader = ({ title, subtitle, showButton = false }) => {
    return (
        <div className="home-feed-header">
            <div className="home-feed-heading">
                <h1 className="home-feed-title"> {title} </h1>
                <p className="home-feed-subtitle"> {subtitle} </p>
            </div>

            {showButton && (
                <button className="home-feed-new-post">
                    <span>+</span>
                    New Post
                </button>
            )}
        </div>
    )
}

export default FeedHeader