import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Email, LocationOn } from '@mui/icons-material';
import './Footer.css';
import { useSelector } from 'react-redux';

const Footer = () => {
  const foodItems = useSelector(state => state.food.foodItem || []);
  
  // Get top categories by count
  const getTopCategories = () => {
    const categoryCount = {};
    foodItems.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });
    return Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4)
      .map(([category]) => category);
  };

  const topCategories = getTopCategories();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">Delicious Food</h5>
            <p className="footer-text">
              نقدم لكم أفضل الأطعمة الطازجة والصحية مع خدمة توصيل سريعة. 
              استمتعوا بتجربة طعام فريدة من مطابخ مختلفة حول العالم.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><Facebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link"><Twitter /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">روابط سريعة</h5>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">الرئيسية</Link></li>
              <li><Link to="/category" className="footer-link">الأطباق</Link></li>
              <li><Link to="/contact" className="footer-link">اتصل بنا</Link></li>
              <li><Link to="/profile" className="footer-link">حسابي</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">الأقسام الأشهر</h5>
            <ul className="footer-links">
              {topCategories.map(category => (
                <li key={category}>
                  <Link 
                    to={`/dishes?category=${encodeURIComponent(category)}`} 
                    className="footer-link"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">معلومات التواصل</h5>
            <div className="contact-info">
              <div className="contact-item">
                <LocationOn className="contact-icon" />
                <span className="contact-text">القاهرة، مصر - شارع التحرير</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span className="contact-text">+20 123 456 7890</span>
              </div>
              <div className="contact-item">
                <Email className="contact-icon" />
                <span className="contact-text">info@deliciousfood.com</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom">
              <p className="footer-copyright">
                © 2025 Delicious Food. جميع الحقوق محفوظة.
              </p>
              <div className="footer-terms">
                <Link to="/terms" className="footer-link">الشروط والأحكام</Link>
                <span className="mx-2">|</span>
                <Link to="/privacy" className="footer-link">سياسة الخصوصية</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;