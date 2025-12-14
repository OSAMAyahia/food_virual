import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Email, LocationOn, AccessTime, Facebook, Instagram, Twitter } from '@mui/icons-material';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <div className="container">
          <h1 className="contact-title">تواصل معنا</h1>
          <p className="contact-subtitle">
            نحن هنا للإجابة على جميع أسئلتك واستفساراتك
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
                <h3 className="info-title">معلومات التواصل</h3>
                
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <LocationOn className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>العنوان</h5>
                    <p>القاهرة، مصر - شارع التحرير، برج الماسة، الطابق 15</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Phone className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>الهاتف</h5>
                    <p>+20 123 456 7890</p>
                    <p>+20 111 222 3333</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Email className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>البريد الإلكتروني</h5>
                    <p>info@deliciousfood.com</p>
                    <p>support@deliciousfood.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <AccessTime className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <h5>ساعات العمل</h5>
                    <p>السبت - الخميس: 9:00 صباحاً - 11:00 مساءً</p>
                    <p>الجمعة: 1:00 مساءً - 12:00 منتصف الليل</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-media">
                  <h5 className="social-title">تابعنا على</h5>
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
                <h3 className="form-title">أرسل رسالة</h3>
                <p className="form-subtitle">
                  هل لديك سؤال أو تعليق؟ نحن نحب أن نسمع منك!
                </p>

                <form className="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">الاسم الكامل</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="أدخل اسمك الكامل"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="أدخل بريدك الإلكتروني"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">الموضوع</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="موضوع رسالتك"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">الرسالة</label>
                    <textarea 
                      className="form-control" 
                      rows="5" 
                      placeholder="اكتب رسالتك هنا..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="map-card">
                <h3 className="map-title">موقعنا</h3>
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
          <h3 className="faq-title">الأسئلة الشائعة</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-item">
                <h5>كم يستغرق وقت التوصيل؟</h5>
                <p>عادة ما يستغرق التوصيل من 30 إلى 45 دقيقة حسب الموقع.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5>هل يوجد خدمة توصيل مجاني؟</h5>
                <p>نعم، نوفر توصيل مجاني للطلبات التي تزيد عن 200 جنيه.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;