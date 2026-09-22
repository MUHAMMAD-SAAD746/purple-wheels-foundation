import MainNavigation from "../../components/LandingPage/MainNavigation/MainNavigation";
import Home from "../../components/LandingPage/Home/Home";

import "./LandingPage.css";
import About from "../../components/LandingPage/About/About";
import OurBussiness from "../../components/LandingPage/OurBussiness/OurBussiness";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <MainNavigation />

            <Home />
            <About />
            <OurBussiness />
        </div>
    );
};

export default LandingPage;