import Hotandpepper from "../../../assets/pepper.png"
import { IoChevronDown, IoSettingsOutline } from "react-icons/io5";
import AuthImagePanel from "../../../components/Auth/AuthImagePanel/AuthImagePanel";

import "../auth.css";
import "./ChooseAcc.css";

function ChooseAcc() {
    return (
        <div className="auth-form-page auth-page">
            <AuthImagePanel />

            <div className="auth-form-container choose-account-container">

                <div className="choose-account-topbar">

                    <button className="choose-account-settings">
                        <IoSettingsOutline />
                    </button>

                    <div className="choose-account-selector">
                        <img
                            src=""
                            alt="Profile"
                        />

                        <IoChevronDown />
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


                <div className="choose-account-card">
                    <div className="choose-account-card-logo">
                        <img src={Hotandpepper} alt="Hot and Pepper logo" />
                    </div>

                    <div className="choose-account-card-info">
                        <p>Hotlike Pepper</p>
                        <p>Entertainment</p>
                    </div>

                    <div className="choose-account-card-action">
                        <button>
                            Enter Entertainment
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChooseAcc;