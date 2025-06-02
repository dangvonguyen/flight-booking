import React from 'react';
import { Button } from '../components/Button/Button';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Flight Booking</h1>
        <p>Find and book your perfect flight today</p>
        
        <div className="search-box">
          <input type="text" placeholder="From" />
          <input type="text" placeholder="To" />
          <input type="date" placeholder="Departure" />
          <Button variant="primary" size="large">
            Search Flights
          </Button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Best Prices</h3>
            <p>Find the most competitive prices for your flights</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our customer service team is always here to help</p>
          </div>
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Book your flight in just a few simple steps</p>
          </div>
        </div>
      </section>
    </div>
  );
}; 