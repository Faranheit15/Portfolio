import React from "react";
import "./Style.css";
import { contacts } from "../data";

export default function Contact() {
    return (
    <section id="contact" className="contact-section">
        <div className="contact-section-header">
            <h2>Hire me or collab!</h2>
            <p>How do you take your coffee?</p>
        </div>
        <div className="contact-links">
            {contacts.map((contact) => (
                <a href={contact.link} target="_blank" rel="noopener noreferrer" className="btn contact-details">
                    <i className="fab fa-linkedin"><img alt={contact.name} className="social-image" src={contact.image} /></i>
                </a>
            ))}
        </div>
    </section>
    );
}