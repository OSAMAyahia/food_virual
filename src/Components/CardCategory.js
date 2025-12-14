import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './CardCategory.css';

const CardCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const trackRef = useRef(null);

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
      let newItemsToShow;
      if (window.innerWidth <= 480) {
        newItemsToShow = 2; // Small mobile: 2 cards
      } else if (window.innerWidth <= 768) {
        newItemsToShow = 2; // Mobile: 2 cards
      } else if (window.innerWidth <= 1024) {
        newItemsToShow = 3; // Tablet: 3 cards
      } else {
        newItemsToShow = 3; // Desktop: 3 cards
      }
      setItemsToShow(newItemsToShow);
      // Reset current index if it's out of bounds with new items to show
      setCurrentIndex(prev => Math.min(prev, Math.max(0, cards.length - newItemsToShow)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards.length]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextSlide();
    else if (isRightSwipe) prevSlide();
  };

  // التعديل المهم هنا - nextSlide
  const nextSlide = () => {
    if (isTransitioning) return;

    if (currentIndex >= cards.length - itemsToShow) {
      // وصلنا آخر كارت - نرجع للأول
      if (trackRef.current) {
        trackRef.current.classList.add('no-transition');
      }
      setCurrentIndex(0);
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.classList.remove('no-transition');
        }
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  };

  // التعديل المهم هنا - prevSlide
  const prevSlide = () => {
    if (isTransitioning) return;

    if (currentIndex <= 0) {
      // وصلنا أول كارت - نروح للآخر
      if (trackRef.current) {
        trackRef.current.classList.add('no-transition');
      }
      setCurrentIndex(cards.length - itemsToShow);
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.classList.remove('no-transition');
        }
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  };

  const maxIndex = Math.max(0, cards.length - itemsToShow);

  return (
    <div className="card-category-container">
      <h4 className="card-category-title">Categories</h4>
      <div className="card-category-wrapper">
        {/* Left navigation button - شلنا الـ disabled */}
        <button
          className="card-category-nav-btn"
          onClick={prevSlide}
          aria-label="Previous categories"
        >
          <ChevronLeft />
        </button>

        {/* Cards display */}
        <div
          className="card-category-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className={`card-category-track ${isTransitioning ? 'transitioning' : ''}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {cards.map((card, index) => (
              <div
                className="card-category-item"
                style={{
                  width: `${100 / itemsToShow}%`,
                  flexShrink: 0
                }}
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

        {/* Right navigation button - شلنا الـ disabled */}
        <button
          className="card-category-nav-btn"
          onClick={nextSlide}
          aria-label="Next categories"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="card-category-dots">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 400);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCategory;