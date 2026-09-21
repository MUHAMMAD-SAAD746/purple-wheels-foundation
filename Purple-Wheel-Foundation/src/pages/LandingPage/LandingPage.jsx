import MainNavigation from "../../components/LandingPage/MainNavigation/MainNavigation";
import Home from "../../components/LandingPage/Home/Home";

import "./LandingPage.css";
import About from "../../components/LandingPage/About/About";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <MainNavigation />

            <Home />
            <About />
        </div>
    );
};

export default LandingPage;