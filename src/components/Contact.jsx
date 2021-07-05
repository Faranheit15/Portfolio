import React from "react";
import "./Style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
    return (
    <section id="contact" className="contact-section">
        <div className="contact-section-header">
            <h2>Hire me or collab!</h2>
            <p>How do you take your coffee?</p>
        </div>
        <div className="contact-links">
            <a href="https://www.linkedin.com/in/faran-mohammad-7b938917a/" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-linkedin"><FontAwesomeIcon icon={faLinkedin} /></i> LinkedIn
            </a>
            <a id="profile-link" href="https://github.com/faranheit15" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-github"><FontAwesomeIcon icon={faGithub} /></i> GitHub
            </a>
            <a href="https://instagram.com/faran.codes" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fab fa-instagram"><FontAwesomeIcon icon={faInstagram} /></i> Instagram
            </a>
            <a href="mailto:ffaranm15@gmail.com" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fas fa-at"><FontAwesomeIcon icon={faEnvelopeSquare} /></i> Send a mail
            </a>
            <a href="https://t.me/Faran_heit" target="_blank" rel="noopener noreferrer" className="btn contact-details">
                <i className="fas fa-mobile-alt"><FontAwesomeIcon icon={faTelegram} /></i> Telegram
            </a>
        </div>
    </section>
    );
}