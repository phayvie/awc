import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const modalRef = useRef(null);

  const handleImageLoad = (imageId) => {
    setImageLoaded(prev => ({ ...prev, [imageId]: true }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <style jsx>{`
        /* Base Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          line-height: 1.6;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #1a1a1a;
          overflow-x: hidden;
        }

        .container {
          padding: 0;
          max-width: 100%;
          margin: 0;
          position: relative;
        }

        /* Animated background particles */
        .container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
          animation: floatParticles 20s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes floatParticles {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        /* Content sections with glass morphism */
        .content-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          margin: 30px 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .content-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .content-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .content-section:hover::before {
          left: 100%;
        }

        /* Header */
        .header {
          text-align: center;
          padding: 80px 20px 60px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(10px);
          margin-bottom: 40px;
          position: relative;
        }

        .header h1 {
          font-size: 3.5rem;
          font-weight: 700;
          color: #1a1a1a;
          text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
          animation: slideInFromTop 1s ease-out;
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .premium {
          font-size: 1.4rem;
          color: #ffffff;
          margin-top: 15px;
          font-weight: 500;
          animation: slideInFromBottom 1s ease-out 0.3s both;
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Section headers */
        .section-header {
          color: #6b46c1;
          margin-bottom: 25px;
          font-size: 2.2rem;
          font-weight: 600;
          position: relative;
          padding-left: 20px;
        }

        .section-header::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 3px;
        }

        /* Benefits list */
        .benefits-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 0;
          list-style: none;
        }

        .benefit-item {
          background: linear-gradient(135deg, #f0f4ff, #e0f2fe);
          padding: 20px;
          border-radius: 15px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .benefit-item:hover {
          transform: translateX(10px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Image container with preloader */
        .image-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 400px;
          margin: 30px auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #e2e8f0, #f1f5f9);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
        }

        .image-placeholder.loaded {
          opacity: 0;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-container:hover .product-image {
          transform: scale(1.05);
        }

        /* Testimonials */
        .testimonial {
          background: linear-gradient(135deg, #fef7ff, #f3e8ff);
          padding: 25px;
          border-radius: 15px;
          margin: 20px 0;
          border-left: 4px solid #a855f7;
          position: relative;
          animation: slideInRight 0.8s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .testimonial::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 20px;
          font-size: 4rem;
          color: #a855f7;
          opacity: 0.3;
        }

        /* Pricing section */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin: 30px 0;
        }

        .pricing-card {
          background: linear-gradient(135deg, #fff, #f8fafc);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .pricing-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .pricing-card.featured {
          border: 2px solid #667eea;
          transform: scale(1.05);
        }

        .pricing-card.featured::before {
          content: 'BEST VALUE';
          position: absolute;
          top: 15px;
          right: -30px;
          background: #667eea;
          color: white;
          padding: 5px 40px;
          transform: rotate(45deg);
          font-size: 0.8rem;
          font-weight: bold;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          margin: 50px 20px;
          border-radius: 25px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .inline-cta {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 2px solid #0ea5e9;
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          margin: 30px 0;
          position: relative;
          overflow: hidden;
        }

        .inline-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .inline-cta:hover::before {
          left: 100%;
        }
        .cta-button {
          display: inline-block;
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
          margin: 10px;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px);
        }

        .cta-primary {
          background: linear-gradient(135deg, #25D366, #1ebe5d);
          color: white;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.3);
        }

        .cta-primary:hover {
          box-shadow: 0 15px 40px rgba(37, 211, 102, 0.4);
        }

        .cta-secondary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .cta-secondary:hover {
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .cta-accent {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }

        .cta-accent:hover {
          box-shadow: 0 15px 40px rgba(245, 158, 11, 0.4);
        }

        .cta-outline {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }

        .cta-outline:hover {
          background: #667eea;
          color: white;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .cta-buttons-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin: 30px 0;
        }

        /* Product Gallery */
        .product-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin: 40px 0;
        }

        .gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-10px);
        }

        .gallery-large {
          grid-column: span 2;
          height: 400px;
        }

        .gallery-medium {
          height: 300px;
        }

        .gallery-small {
          height: 250px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: white;
          padding: 30px;
          max-width: 900px;
          width: 95%;
          border-radius: 25px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: modalSlideIn 0.5s ease;
        }

        @keyframes modalSlideIn {
          from {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 28px;
          background: none;
          border: none;
          cursor: pointer;
          color: #667eea;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: #f3f4f6;
          transform: rotate(90deg);
        }

        /* Scroll animations */
        .fade-in {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Urgency section */
        .urgency-section {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 2px solid #f87171;
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        /* FAQ section */
        .faq-item {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin: 15px 0;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #1f2937, #374151);
          color: white;
          margin-top: 60px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.5rem;
          }
          
          .content-section {
            padding: 25px;
            margin: 20px 10px;
          }
          
          .section-header {
            font-size: 1.8rem;
          }
          
          .benefits-list {
            grid-template-columns: 1fr;
          }
          
          .pricing-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons-container {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button {
            width: 80%;
            text-align: center;
            margin: 8px 0;
          }
          
          .gallery-large {
            grid-column: span 1;
            height: 300px;
          }
          
          .product-gallery {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="header fade-in">
        <h1>Pro Xylane Active Anti-Wrinkle Eye Cream</h1>
        <p className="premium">A Premium Anti-Aging Solution for Brighter Eyes</p>
      </header>

      <section className="content-section fade-in">
        <h2 className="section-header">What is this product?</h2>
        <p>
          A powerful eye cream formulated to reduce wrinkles, fine lines, puffiness, and dark circles.
          Contains Pro Xylane, a scientifically proven anti-aging ingredient that transforms your skin.
        </p>
        <div className="inline-cta">
          <p style={{marginBottom: '20px', fontSize: '1.1rem', fontWeight: '500'}}>
            Ready to transform your eyes? Get started today!
          </p>
          <div className="cta-buttons-container">
            <a
              className="cta-button cta-primary"
              href="https://wa.me/2348068537014?text=Hello%20there!%20I%20want%20to%20order%20the%20Pro%20Xylane%20Anti-aging%20Eye%20Cream."
              
              target="_blank"
            >
              📱 WhatsApp Me
            </a>
            <a
              className="cta-button cta-outline"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              📋 Fill Order Form
            </a>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">Benefits</h2>
        <ul className="benefits-list">
          <li className="benefit-item"><strong>✅ Smoothens Wrinkles & Fine Lines</strong></li>
          <li className="benefit-item"><strong>✅ Remove Dark Circles</strong></li>
          <li className="benefit-item"><strong>✅ Firms Sagging Skin Around the Eyes</strong></li>
          <li className="benefit-item"><strong>✅ Hydrates & Nourishes the Eye Area</strong></li>
          <li className="benefit-item"><strong>✅ Gives a Younger, Brighter Look</strong></li>
          <li className="benefit-item"><strong>✅ Fast-absorbing & Non-greasy Formula</strong></li>
          <li className="benefit-item"><strong>✅ Visible Results in 7–14 Days!</strong></li>
        </ul>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">Product Gallery</h2>
        <p style={{marginBottom: '30px'}}>See our premium eye cream from every angle</p>
        <div className="product-gallery">
          <div className="gallery-item gallery-large">
            <div className={`image-placeholder ${imageLoaded['gallery1'] ? 'loaded' : ''}`}>
              <div className="loading-spinner"></div>
            </div>
            <img 
              src="/img1.webp" 
              alt="Pro Xylane Eye Cream - Main Product" 
              className="product-image"
              onLoad={() => handleImageLoad('gallery1')}
            />
          </div>
          <div className="gallery-item gallery-medium">
            <div className={`image-placeholder ${imageLoaded['gallery2'] ? 'loaded' : ''}`}>
              <div className="loading-spinner"></div>
            </div>
            <img 
              src="/img2.webp" 
              alt="Cream Texture and Application" 
              className="product-image"
              onLoad={() => handleImageLoad('gallery2')}
            />
          </div>
          <div className="gallery-item gallery-medium">
            <div className={`image-placeholder ${imageLoaded['gallery3'] ? 'loaded' : ''}`}>
              <div className="loading-spinner"></div>
            </div>
            <img 
              src="/img3.webp" 
              alt="Key Ingredients Showcase" 
              className="product-image"
              onLoad={() => handleImageLoad('gallery3')}
            />
          </div>
          <div className="gallery-item gallery-small">
            <div className={`image-placeholder ${imageLoaded['gallery4'] ? 'loaded' : ''}`}>
              <div className="loading-spinner"></div>
            </div>
            <img 
              src="/img4.webp" 
              alt="Premium Packaging" 
              className="product-image"
              onLoad={() => handleImageLoad('gallery4')}
            />
          </div>
          <div className="gallery-item gallery-small">
            <div className={`image-placeholder ${imageLoaded['gallery5'] ? 'loaded' : ''}`}>
              <div className="loading-spinner"></div>
            </div>
            <img 
              src="/img5.webp" 
              alt="Dermatologist Tested Certificate" 
              className="product-image"
              onLoad={() => handleImageLoad('gallery5')}
            />
          </div>
        </div>
        <div className="inline-cta">
          <p style={{marginBottom: '20px', fontSize: '1.1rem', fontWeight: '500'}}>
            Love what you see? Order your Pro Xylane Eye Cream now!
          </p>
          <div className="cta-buttons-container">
            <a
              className="cta-button cta-secondary"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              🛒 Add to Cart
            </a>
            <a
              className="cta-button cta-accent"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              ⚡ Buy Now - Fast Checkout
            </a>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">Who is it for?</h2>
        <p>Men & women with signs of aging, dark circles, puffiness. Safe for all skin types.</p>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">Before & After</h2>
        <p>"Real results within 14 days!"</p>
        <div className="image-container">
          <div className={`image-placeholder ${imageLoaded['before-after'] ? 'loaded' : ''}`}>
            <div className="loading-spinner"></div>
          </div>
          <img 
            src="/img6.webp" 
            alt="Before and After" 
            className="product-image"
            onLoad={() => handleImageLoad('before-after')}
          />
        </div>
        <p>Visible improvements in skin smoothness, brightness, and reduced wrinkles.</p>
        <div className="inline-cta">
          <p style={{marginBottom: '20px', fontSize: '1.1rem', fontWeight: '500'}}>
            See these results for yourself!
          </p>
          <div className="cta-buttons-container">
            <a
              className="cta-button cta-accent"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              🎯 Get My Results Now
            </a>
            <a
              className="cta-button cta-outline"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              📞 Call to Order
            </a>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">What our customers say</h2>
        <div className="testimonial">💬 "I've tried many eye creams but this is the only one that worked!" – Esther O.</div>
        <div className="testimonial">💬 "My wrinkles are almost gone in just 10 days!" – Chinwe A.</div>
        <div className="testimonial">💬 "Very gentle on my sensitive skin. I love it!" – Ngozi L.</div>
        <div className="inline-cta">
          <p style={{marginBottom: '20px', fontSize: '1.1rem', fontWeight: '500'}}>
            Join thousands of satisfied customers!
          </p>
          <div className="cta-buttons-container">
            <a
              className="cta-button cta-primary"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              💝 Order My Eye Cream
            </a>
            <a
              className="cta-button cta-secondary"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              🌟 Start My Transformation
            </a>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">How to Use</h2>
        <ol>
          <li>Cleanse your face and pat dry</li>
          <li>Apply a small amount around your eyes</li>
          <li>Massage gently until fully absorbed (morning & night)</li>
        </ol>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">Pricing & Discounts</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>📦 Single Jar</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#667eea', margin: '20px 0'}}>₦17,000</div>
          </div>
          <div className="pricing-card featured">
            <h3>📦 Double Pack</h3>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#667eea', margin: '20px 0'}}>₦24,500</div>
            <p><strong>+ FREE DELIVERY</strong></p>
          </div>
        </div>
        <div className="urgency-section">
          <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#dc2626'}}>🔥 LIMITED OFFER: 40% Discount Today Only!</p>
        </div>
        <div className="inline-cta">
          <p style={{marginBottom: '20px', fontSize: '1.1rem', fontWeight: '500'}}>
            Don't miss out on this exclusive pricing!
          </p>
          <div className="cta-buttons-container">
            <a
              className="cta-button cta-accent"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              🔥 Claim 40% Discount
            </a>
            <a
              className="cta-button cta-primary"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              💸 Save Money - Order Now
            </a>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <div className="urgency-section">
          <p>⏰ Hurry! Limited stock available – Offer Ends Tonight!</p>
          <p>🎯 Only 15 jars left in stock!</p>
        </div>
      </section>

      <section className="cta-section fade-in">
        <h2 style={{color: 'white', marginBottom: '20px', fontSize: '2.5rem'}}>Ready to Transform Your Eyes?</h2>
        <p style={{color: 'white', marginBottom: '40px', fontSize: '1.2rem', opacity: '0.9'}}>
          Join thousands who have already discovered younger-looking eyes
        </p>
        <div className="cta-buttons-container">
          <a
            className="cta-button cta-primary"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            📱 Order via NOW
          </a>
          <a
            className="cta-button cta-accent"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            🚀 Express Checkout
          </a>
          <a
            className="cta-button cta-outline"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            📋 Custom Order Form
          </a>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSei85UA0Q9JoswkLNbos-YBtI_HesNzD_F6SnUTM3x049Mz7w/viewform?embedded=true"
              width="100%"
              height="600"
              frameBorder="0"
              title="Order Form"
              loading="eager"
            >Loading…</iframe>
          </div>
        </div>
      )}

      <section className="content-section fade-in">
        <h2 className="section-header">Delivery & Payment</h2>
        <p>🚚 Nationwide Delivery in Nigeria</p>
        <p>💰 Pay on Delivery Available</p>
        <p>🛡️ 100% Safe and Reliable</p>
        <div className="inline-cta">
          <p style={{marginBottom: '20px', fontSize: '1.1rem', fontWeight: '500'}}>
            Safe, secure, and convenient ordering
          </p>
          <div className="cta-buttons-container">
            <a
              className="cta-button cta-secondary"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              🛡️ Secure Order Now
            </a>
            <a
              className="cta-button cta-outline"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              💳 Pay on Delivery
            </a>
          </div>
        </div>
      </section>

      <section className="content-section fade-in">
        <h2 className="section-header">FAQs</h2>
        <div className="faq-item">
          <p><strong>Q:</strong> Is it safe for all skin types?<br /><strong>A:</strong> Yes, it's dermatologically tested and safe for all skin types.</p>
        </div>
        <div className="faq-item">
          <p><strong>Q:</strong> When will I start seeing results?<br /><strong>A:</strong> Most users see visible changes within 7–14 days.</p>
        </div>
        <div className="faq-item">
          <p><strong>Q:</strong> Can men use it too?<br /><strong>A:</strong> Absolutely! It's effective for both men and women.</p>
        </div>
      </section>

      <footer className="footer fade-in">
        <p>&copy; 2025 Pro Xylane. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;