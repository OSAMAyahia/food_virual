import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './CardCategory.css';

const CardCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // المؤشر الحالي

  // Define cards array first
  const cards = [
    { title: "Pizza", src: "https://tse4.mm.bing.net/th/id/OIP.rCyAFJETYxaiBArKXeaCtgAAAA?cb=ucfimg2&ucfimg=1&w=474&h=711&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { title: "Burger", src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=230&fit=crop&q=80" },
    { title: "Pasta", src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=230&fit=crop&q=80" },
    { title: "Shawarma", src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=230&fit=crop&q=80" },
    { title: "Salads", src: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=230&fit=crop&q=80" },
    { title: "Seafood", src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=230&fit=crop&q=80" },
    { title: "Arabic Food", src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=230&fit=crop&q=80" },
    { title: "Desserts", src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=230&fit=crop&q=80" },
    { title: "Sushi", src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=230&fit=crop&q=80" },
    { title: "Grilled", src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=230&fit=crop&q=80" },
    { title: "Chicken", src: "https://th.bing.com/th/id/OIP.gmHJANNC9AtY--9Qy3W6cQHaDh?w=336&h=166&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" },
    { title: "Soups", src: "https://tse1.mm.bing.net/th/id/OIP.smb_yqud4sfoYuVGrYYEwAHaEJ?cb=ucfimg2&ucfimg=1&w=720&h=404&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { title: "Drinks", src: "https://tse1.mm.bing.net/th/id/OIP.smb_yqud4sfoYuVGrYYEwAHaEJ?cb=ucfimg2&ucfimg=1&w=720&h=404&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { title: "Kebab", src: "https://tse4.mm.bing.net/th/id/OIP.5wzLNFGpuFSdD5DxKFasogHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
      // Reset current index if it's out of bounds with new cards per page
      setCurrentIndex(prev => Math.min(prev, Math.max(0, cards.length - getCardsPerPage())));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards.length]);

  // Responsive cards per page based on screen size
  const getCardsPerPage = () => {
    if (window.innerWidth < 768) return 1; // Mobile phones
    return 2; // Show 2 cards on everything else (Tablet/Desktop)
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());
  const step = Math.max(1, cardsPerPage - 1); // عدد الكروت التي يتم التحرك بها عند الضغط على الزر

  // التنقل لليمين
  const handleNext = () => {
    if (currentIndex + step < cards.length - cardsPerPage + 1) {
      setCurrentIndex(currentIndex + step);
    } else {
      setCurrentIndex(0); // Loop to start
    }
  };

  // التنقل لليسار
  const handlePrev = () => {
    if (currentIndex - step >= 0) {
      setCurrentIndex(currentIndex - step);
    } else {
      setCurrentIndex(Math.max(0, cards.length - (cardsPerPage || 1))); // Loop to end
    }
  };

  return (
    <div className="card-category-container">
      <h4 className="card-category-title">Categories</h4>
      <div className="card-category-wrapper">
        {/* Left navigation button */}
        <button
          className="card-category-nav-btn"
          onClick={handlePrev}
        >
          &lt;
        </button>

        {/* Cards display */}
        <div className="card-category-slider">
          <div
            className="card-category-track"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cards.length}%)`,
              transition: "transform 0.5s ease-in-out",
              width: `${(cards.length * 100) / cardsPerPage}%`,
            }}
          >
            {cards.map((card, index) => (
              <div
                className="card-category-item"
                style={{ width: `${100 / cards.length}%` }}
                key={index}
              >
                <Link
                  to={`/dishes?category=${encodeURIComponent(card.title)}`}
                  className="card-category-link"
                >
                  <div className="card-category-card">
                    <img
                      src={card.src}
                      onError={(e) => { e.currentTarget.src = `https://loremflickr.com/400/230/${encodeURIComponent(card.title || 'food')}`; }}
                      alt={card.title}
                      className="card-category-image"
                    />
                    <div className="card-category-body">
                      <p className="card-category-title-text">{card.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right navigation button */}
        <button
          className="card-category-nav-btn"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CardCategory;
