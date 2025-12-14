import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Email, LocationOn, AccessTime, Facebook, Instagram, Twitter, Send, CheckCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';
import NavBarCom from './NavBarCom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBarCom />
      <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <div className="container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We're here to answer all your questions and inquiries
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-5 mb-4">
              <div className="contact-info-card">
                <h3 className="info-title">Contact Information</h3>
                
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <LocationOn className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>Address</h5>
                    <p>Cairo, Egypt - Tahrir Street, Diamond Tower, 15th Floor</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Phone className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>Phone</h5>
                    <p>+20 123 456 7890</p>
                    <p>+20 111 222 3333</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Email className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>Email</h5>
                    <p>info@deliciousfood.com</p>
                    <p>support@deliciousfood.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <AccessTime className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>Working Hours</h5>
                    <p>Saturday - Thursday: 9:00 AM - 11:00 PM</p>
                    <p>Friday: 1:00 PM - 12:00 AM</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-media">
                  <h5 className="social-title">Follow Us</h5>
                  <div className="social-links">
                    <a href="#" className="social-link facebook">
                      <Facebook />
                    </a>
                    <a href="#" className="social-link instagram">
                      <Instagram />
                    </a>
                    <a href="#" className="social-link twitter">
                      <Twitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7 mb-4">
              <div className="contact-form-card">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-subtitle">
                  Have a question or comment? We'd love to hear from you!
                </p>

                {isSubmitted ? (
                  <div className="success-message">
                    <CheckCircle className="success-icon" />
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          className="form-control" 
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          className="form-control" 
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        className="form-control" 
                        placeholder="Subject of your message"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea 
                        className="form-control" 
                        name="message"
                        rows="5" 
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="submitting">
                          <div className="spinner"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="submit-text">
                          <Send className="send-icon" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="map-card">
                <h3 className="map-title">Our Location</h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA2JzAwLjAiTiAzMcKwMTQnMDguNiJF!5e0!3m2!1sen!2seg!4v1234567890"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع Delicious Food"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="contact-faq">
        <div className="container">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-item">
                <h5>How long does delivery take?</h5>
                <p>Delivery typically takes 30-45 minutes depending on your location.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5>Is there free delivery?</h5>
                <p>Yes, we provide free delivery for orders over 200 EGP.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5>What payment methods do you accept?</h5>
                <p>We accept cash on delivery, credit cards, and mobile payments.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5>Can I track my order?</h5>
                <p>Yes, you can track your order in real-time through our website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Contact;