import { FaChevronRight, FaFacebookF, FaWhatsapp, FaTiktok } from "react-icons/fa";
import PurpleWheel from "../../../assets/icons/purple-wheel-logo.svg"


import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-subscribe">
                <p>Subscribe</p>

                <div className="footer-input-wrapper">
                    <input
                        type="email"
                        placeholder="E-mail"
                    />

                    <button type="button" className="footer-submit">
                        <FaChevronRight />
                    </button>
                </div>
            </div>


            <div className="footer-logo">
                <img src={PurpleWheel} alt="" />
            </div>


            <div className="footer-socials">
                <FaFacebookF />
                <FaWhatsapp />
                <FaTiktok />
            </div>

        </footer>
    );
};

export default Footer;