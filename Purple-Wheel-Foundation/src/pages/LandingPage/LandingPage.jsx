import MainNavigation from "../../components/LandingPage/MainNavigation/MainNavigation";
import Home from "../../components/LandingPage/Home/Home";

import "./LandingPage.css";
import About from "../../components/LandingPage/About/About";
import OurBussiness from "../../components/LandingPage/OurBussiness/OurBussiness";
import OurJourney from "../../components/LandingPage/OurJourney/OurJourney";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <MainNavigation />

            <Home />
            <About />
            <OurBussiness />
            <OurJourney />
        </div>
    );
};

export default LandingPage;