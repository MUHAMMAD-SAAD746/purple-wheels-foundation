

import "./Home.css";
import Header from "../../../components/MPLifeStyle/Header/Header";
import FeedHeader from "../../../components/MPLifeStyle/FeedHeader/FeedHeader";

const Home = () => {
    return (
        <div className="mp-home">
            <Header />

            <main className="mp-home-content">
                <FeedHeader 
                    title="HOME FEED"
                    subtitle="Discover inspiring lifestyle content"
                    showButton={true}
                />

                <div className="mp-home-banner">
                    <h1>Welcome to MP Lifestyle</h1>
                    <p>Discover inspiring stories, creative ideas, and lifestyle tips from our community</p>
                </div>
            </main>
        </div>
    );
};

export default Home;