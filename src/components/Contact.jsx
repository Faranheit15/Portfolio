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
                {/* <i className="fab fa-linkedin"><FontAwesomeIcon icon={faLinkedin} /></i> LinkedIn */}
                <i className="fab fa-linkedin"><img alt="linkedin" className="social-image" src="https://image.flaticon.com/icons/png/512/174/174857.png" /></i>
            </a>
            <a id="profile-link" href="https://github.com/faranheit15" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                {/* <i className="fab fa-github"><FontAwesomeIcon icon={faGithub} /></i> GitHub */}
                <i className="fab fa-github"><img alt="linkedin" className="social-image" src="https://image.flaticon.com/icons/png/512/25/25231.png" /></i>
            </a>
            <a href="https://instagram.com/faran.codes" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                {/* <i className="fab fa-instagram"><FontAwesomeIcon icon={faInstagram} /></i> Instagram */}
                <i className="fab fa-instagram"><img alt="linkedin" className="social-image" src="https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-svg-vector-for-print.svg" /></i>
            </a>
            <a href="mailto:ffaranm15@gmail.com" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                {/* <i className="fas fa-at"><FontAwesomeIcon icon={faEnvelopeSquare} /></i> Send a mail */}
                <i className="fas fa-at"><img alt="linkedin" className="social-image" src="https://www.freepnglogos.com/uploads/gmail-email-logo-png-16.png" /></i>
            </a>
            <a href="https://t.me/Faran_heit" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                {/* <i className="fas fa-mobile-alt"><FontAwesomeIcon icon={faTelegram} /></i> Telegram */}
                <i className="fas fa-mobile-alt"><img alt="linkedin" className="social-image" src="https://www.freepnglogos.com/uploads/telegram-logo-png-0.png" /></i>
            </a>
        </div>
    </section>
    );
}