import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import HotAndPepperDashboard from "../../../assets/hot-pepper-dashboard.png"
import ContentCreators from "../../../assets/content-creators.jpg"
import Charity from "../../../assets/charity.png"
import Hotandpepper from "../../../assets/pepper.png"
import MP from "../../../assets/MP.png"
import PurpleWheel from "../../../assets/purplewheel.png"

import { IoChevronDown, IoSettingsOutline, IoAdd, IoCheckmark } from "react-icons/io5";
import AuthImagePanel from "../../../components/Auth/AuthImagePanel/AuthImagePanel";
import generateAvatarUrl from "../../../utils/generateAvatarUrl";

import "../auth.css";
import "./ChooseAcc.css";
import AccountCard from "../../../components/AccountCard/AccountCard";

function ChooseAcc() {
    const { user, loading } = useAuth();
    const avatarUrl = generateAvatarUrl(user?.username);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    if (loading) {
        return null;
    }

    return (
        <div className="auth-form-page auth-page">
            <AuthImagePanel />

            <div className="auth-form-container choose-account-container">

                <div className="choose-account-topbar">

                    <button className="choose-account-settings">
                        <IoSettingsOutline />
                    </button>


                    <div className="choose-account-selector-wrapper">

                        <button
                            className="choose-account-selector"
                            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                        >
                            <img
                                src={avatarUrl}
                                alt="Profile"
                            />

                            <IoChevronDown />
                        </button>

                        {showAccountDropdown && (
                            <div className="account-dropdown-wrapper">
                                <div className="account-dropdown">
                                    <div className="account-dropdown-current">
                                        <img
                                            src={avatarUrl}
                                            alt="Profile"
                                        />

                                        <span className="account-dropdown-username">
                                            {user?.username}
                                        </span>

                                        <span className="account-dropdown-check">
                                            <IoCheckmark />
                                        </span>
                                    </div>


                                    <button className="account-dropdown-add">
                                        <span className="account-dropdown-icon">
                                            <IoAdd />
                                        </span>

                                        <span>Add Account</span>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

                <div className="choose-account-content">
                    <h1>
                        Choose Your Journey <br />
                        Entertainment or Purpose
                    </h1>

                    <p>
                        Select the option that best describes you.
                        This will personalize your experience.
                    </p>
                </div>


                <AccountCard
                    logo={Hotandpepper}
                    title="Hotlike Pepper"
                    category="Entertainment"
                    buttonText="Enter Entertainment"
                    backgroundImage={HotAndPepperDashboard}
                    gradient={true}
                />
                <AccountCard
                    logo={PurpleWheel}
                    title="MP Lifestyle"
                    category="Blogs & Content Creators"
                    buttonText="Enter Charity"
                    backgroundImage={ContentCreators}
                    gradient={true}
                    logoWidth="150px"
                />
                <AccountCard
                    logo={MP}
                    title="Hotlike Pepper"
                    category="Entertainment"
                    buttonText="Enter Entertainment"
                    backgroundImage={Charity}
                />

            </div>
        </div>
    );
}

export default ChooseAcc;