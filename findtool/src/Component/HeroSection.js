import React from 'react';
import './css/HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <img src="/tools-864983_1280.jpg" alt="Main Banner" className="hero-image"/>
            <h1 className="hero-title">공구를 무료로 대여하세요</h1>
            <p className="hero-description">원하는 공구를 쉽고 빠르게 대여하세요.</p>
            <button className="hero-btn">지금 대여하기</button>
        </section>
    );
}

export default HeroSection;
