import React from "react";
import "./Style.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLinkedin, faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
    return (
    <section id="contact" className="contact-section">
        <div className="contact-section-header">
            <h2>Hire me or collab!</h2>
            <p>How do you take your coffee?</p>
        </div>
        <div className="contact-links">
            <a href="https://www.linkedin.com/in/faran-mohammad-7b938917a/" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-linkedin"><img alt="linkedin" className="social-image" src="https://image.flaticon.com/icons/png/512/174/174857.png" /></i>
            </a>

            <a id="profile-link" href="https://github.com/faranheit15" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-github"><img alt="github" className="social-image" src="https://image.flaticon.com/icons/png/512/25/25231.png" /></i>
            </a>

            <a href="https://instagram.com/faran.codes" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-instagram"><img alt="instagram" className="social-image" src="https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-svg-vector-for-print.svg" /></i>
            </a>

            <a href="mailto:ffaranm15@gmail.com" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fas fa-at"><img alt="mail" className="social-image" src="https://www.freepnglogos.com/uploads/gmail-email-logo-png-16.png" /></i>
            </a>

            <a href="https://t.me/Faran_heit" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fas fa-mobile-alt"><img alt="telegram" className="social-image" src="https://www.freepnglogos.com/uploads/telegram-logo-png-0.png" /></i>
            </a>

            <a href="https://www.youtube.com/channel/UCaLKJ5bnZIXlyX5aIyQmnVA/about" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-youtube"><img alt="youtube" className="social-image" src="https://i.pinimg.com/originals/19/7b/36/197b365922d1ea3aa1a932ff9bbda4a6.png" /></i>
            </a>
        </div>
    </section>
    );
}