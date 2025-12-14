import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './CategoryCarousel.css';

const CategoryCarousel = ({ categories, selectedCategory, onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Show 3 items on desktop, 2 on mobile
  const [itemsToShow, setItemsToShow] = useState(3);

  // Handle responsive items count
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth <= 768 ? 2 : 3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max index to prevent going beyond available items
  const maxIndex = Math.max(0, categories.length - itemsToShow);

  const nextSlide = () => {
    if (currentIndex < maxIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 200);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 200);
    }
  };

  // Touch/swipe handlers
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

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, maxIndex, isTransitioning]);

  // Auto-reset to beginning if we reach the end (optional)
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [categories.length, maxIndex, currentIndex]);

  return (
    <div className="category-carousel-container">
      <button 
        className={`carousel-arrow carousel-arrow-left ${currentIndex === 0 ? 'disabled' : ''}`}
        onClick={prevSlide}
        disabled={currentIndex === 0 || isTransitioning}
        aria-label="Previous categories"
      >
        <ChevronLeft />
      </button>

      <div 
        className="category-carousel-wrapper" 
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`category-carousel-track ${isTransitioning ? 'transitioning' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            transition: isTransitioning ? 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {categories.map((category, index) => (
            <div 
              key={category}
              className={`category-carousel-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategorySelect(category)}
              style={{ flex: `0 0 ${100 / itemsToShow}%` }}
            >
              <div className="category-card">
                <div className="category-icon">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="category-name">{category}</h3>
                <p className="category-description">{getCategoryDescription(category)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className={`carousel-arrow carousel-arrow-right ${currentIndex >= maxIndex ? 'disabled' : ''}`}
        onClick={nextSlide}
        disabled={currentIndex >= maxIndex || isTransitioning}
        aria-label="Next categories"
      >
        <ChevronRight />
      </button>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 200);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  const icons = {
    'All': '🍽️',
    'Pizza': '🍕',
    'Burger': '🍔',
    'Sushi': '🍱',
    'Pasta': '🍝',
    'Salad': '🥗',
    'Dessert': '🍰',
    'Drink': '🥤',
    'Sandwich': '🥪',
    'Chicken': '🍗',
    'Seafood': '🦐',
    'Vegetarian': '🥬',
    'Breakfast': '🥞',
    'Asian': '🥢',
    'Italian': '🇮🇹',
    'Mexican': '🌮',
    'Indian': '🍛',
    'Chinese': '🥡',
    'Thai': '🌶️',
    'American': '🍖',
    'Mediterranean': '🫒',
    'Middle Eastern': '🧆',
  };
  
  return icons[category] || '🍴';
};

// Helper function to get category descriptions
const getCategoryDescription = (category) => {
  const descriptions = {
    'All': 'All delicious dishes',
    'Pizza': 'Authentic Italian pizzas',
    'Burger': 'Juicy gourmet burgers',
    'Sushi': 'Fresh Japanese sushi',
    'Pasta': 'Traditional pasta dishes',
    'Salad': 'Healthy fresh salads',
    'Dessert': 'Sweet treats & desserts',
    'Drink': 'Refreshing beverages',
    'Sandwich': 'Tasty sandwiches',
    'Chicken': 'Crispy chicken dishes',
    'Seafood': 'Fresh ocean delights',
    'Vegetarian': 'Plant-based goodness',
    'Breakfast': 'Start your day right',
    'Asian': 'Authentic Asian cuisine',
    'Italian': 'Classic Italian flavors',
    'Mexican': 'Spicy Mexican dishes',
    'Indian': 'Aromatic Indian spices',
    'Chinese': 'Traditional Chinese food',
    'Thai': 'Spicy Thai specialties',
    'American': 'Classic American fare',
    'Mediterranean': 'Healthy Mediterranean',
    'Middle Eastern': 'Exotic Middle Eastern',
  };
  
  return descriptions[category] || 'Delicious food category';
};

export default CategoryCarousel;