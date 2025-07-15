import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Truck, Shield, Star, Eye, Sparkles, Heart } from 'lucide-react';

const EyeCreamLanding = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const [isVisible, setIsVisible] = useState({});

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    'Smoothens Wrinkles & Fine Lines',
    'Reduces Dark Circles',
    'Firms Sagging Skin Around the Eyes',
    'Hydrates & Nourishes the Eye Area',
    'Gives a Younger, Brighter Look',
    'Fast-absorbing & Non-greasy Formula',
    'Visible Results in 7–14 Days!'
  ];

  const ingredients = [
    { name: 'Pro Xylane', benefits: ['Boosts collagen production', 'Improves skin elasticity', 'Deep hydration', 'Safe for sensitive skin'] },
    { name: 'Hyaluronic Acid', benefits: ['Deep hydration', 'Plumps skin'] },
    { name: 'Peptides', benefits: ['Firming', 'Anti-aging'] },
    { name: 'Vitamin C', benefits: ['Brightens', 'Antioxidant protection'] },
    { name: 'Natural Extracts', benefits: ['Gentle & soothing', 'Nourishing'] }
  ];

  const testimonials = [
    { text: "I've tried many eye creams but this is the only one that worked!", author: "Esther O." },
    { text: "My wrinkles are almost gone in just 10 days!", author: "Chinwe A." },
    { text: "Very gentle on my sensitive skin. I love it!", author: "Ngozi L." }
  ];

  const faqItems = [
    { q: "Is it safe for all skin types?", a: "Yes, it's dermatologically tested and safe for all skin types." },
    { q: "When will I start seeing results?", a: "Most users see visible changes within 7–14 days." },
    { q: "Can men use it too?", a: "Absolutely! It's effective for both men and women." }
  ];

  const handleOrderClick = () => {
    window.open('https://wa.me/2348000000000?text=Hi, I want to order the Pro Xylane Active Anti-Wrinkle Eye Cream', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <style jsx>{`
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .image-placeholder {
          background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                      linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                      linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
          min-height: 300px;
        }

        .whatsapp-button {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        }

        .whatsapp-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }

        .pricing-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          border-color: #667eea;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .countdown-digit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1.5rem;
          min-width: 60px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .countdown-digit {
            font-size: 1.2rem;
            min-width: 50px;
            padding: 0.4rem 0.8rem;
          }
        }

        .section-padding {
          padding: 4rem 1rem;
        }

        @media (max-width: 768px) {
          .section-padding {
            padding: 2rem 1rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Eye className="text-purple-600 w-8 h-8" />
              <h1 className="text-2xl font-bold gradient-text">Pro Xylane</h1>
            </div>
            <button
              onClick={handleOrderClick}
              className="whatsapp-button text-white px-6 py-3 rounded-full font-semibold"
            >
              Order Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              id="hero-text" 
              data-animate
              className={`space-y-6 ${isVisible['hero-text'] ? 'animate-slideInLeft' : 'opacity-0'}`}
            >
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Transform Your Eyes in 
                <span className="block text-yellow-300">Just 7 Days!</span>
              </h2>
              <p className="text-xl md:text-2xl opacity-90">
                Pro Xylane Active Anti-Wrinkle Eye Cream - The Premium Solution for Youthful, Radiant Eyes
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleOrderClick}
                  className="whatsapp-button text-white px-8 py-4 rounded-full font-bold text-lg animate-pulse-custom"
                >
                  🛒 Order Now - ₦17,000
                </button>
                <div className="flex items-center space-x-2 text-yellow-300">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">4.9/5 Customer Rating</span>
                </div>
              </div>
            </div>
            <div 
              id="hero-image" 
              data-animate
              className={`${isVisible['hero-image'] ? 'animate-slideInRight' : 'opacity-0'}`}
            >
              <div className="image-placeholder rounded-2xl">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>Pro Xylane Eye Cream Product Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Timer */}
      <section className="bg-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-bold">LIMITED OFFER ENDS IN:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="countdown-digit">{String(timeLeft.hours).padStart(2, '0')}</div>
              <span className="text-2xl">:</span>
              <div className="countdown-digit">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <span className="text-2xl">:</span>
              <div className="countdown-digit">{String(timeLeft.seconds).padStart(2, '0')}</div>
            </div>
            <span className="text-lg font-bold">⚡ Only 15 Jars Left!</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            id="benefits-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['benefits-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose Pro Xylane?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of scientifically proven ingredients that deliver visible results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                id={`benefit-${index}`}
                data-animate
                className={`bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-transparent hover:border-purple-300 transition-all duration-300 ${isVisible[`benefit-${index}`] ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{benefit}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div 
            id="ingredients-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['ingredients-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Powerful Ingredients
            </h2>
            <p className="text-xl text-gray-600">
              Scientifically formulated with premium active ingredients
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ingredients.map((ingredient, index) => (
              <div 
                key={index}
                id={`ingredient-${index}`}
                data-animate
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isVisible[`ingredient-${index}`] ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-purple-600 mb-4">{ingredient.name}</h3>
                <ul className="space-y-2">
                  {ingredient.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            id="before-after-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['before-after-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Real Results Within 14 Days!
            </h2>
            <p className="text-xl text-gray-600">
              Our customers noticed visible improvements in skin smoothness, brightness, and reduced wrinkles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div 
              id="before-image" 
              data-animate
              className={`${isVisible['before-image'] ? 'animate-slideInLeft' : 'opacity-0'}`}
            >
              <div className="image-placeholder rounded-2xl">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-600">BEFORE</span>
                  <p className="mt-2">Before & After Images</p>
                </div>
              </div>
            </div>
            <div 
              id="after-image" 
              data-animate
              className={`${isVisible['after-image'] ? 'animate-slideInRight' : 'opacity-0'}`}
            >
              <div className="image-placeholder rounded-2xl">
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600">AFTER</span>
                  <p className="mt-2">Amazing transformation!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div 
            id="testimonials-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['testimonials-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of satisfied customers who transformed their skin
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                id={`testimonial-${index}`}
                data-animate
                className={`glass-effect p-6 rounded-xl ${isVisible[`testimonial-${index}`] ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">"{testimonial.text}"</blockquote>
                <footer className="font-semibold">- {testimonial.author}</footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div 
            id="how-to-use-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['how-to-use-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              How to Use
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process for maximum results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Cleanse", description: "Cleanse your face and pat dry" },
              { step: 2, title: "Apply", description: "Apply a small amount of cream around your eyes" },
              { step: 3, title: "Massage", description: "Gently massage until fully absorbed (morning & night)" }
            ].map((item, index) => (
              <div 
                key={index}
                id={`step-${index}`}
                data-animate
                className={`text-center ${isVisible[`step-${index}`] ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            id="pricing-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['pricing-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Special Launch Pricing
            </h2>
            <p className="text-xl text-gray-600">
              40% Discount - Today Only!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div 
              id="pricing-1" 
              data-animate
              className={`pricing-card bg-white p-8 rounded-xl shadow-lg text-center ${isVisible['pricing-1'] ? 'animate-slideInLeft' : 'opacity-0'}`}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Single Jar</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">₦17,000</div>
              <p className="text-gray-600 mb-6">Perfect for trying our premium formula</p>
              <button
                onClick={handleOrderClick}
                className="whatsapp-button text-white px-8 py-3 rounded-full font-semibold w-full"
              >
                Order Now
              </button>
            </div>
            
            <div 
              id="pricing-2" 
              data-animate
              className={`pricing-card bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-xl shadow-lg text-center relative ${isVisible['pricing-2'] ? 'animate-slideInRight' : 'opacity-0'}`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                  BEST VALUE
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Double Pack</h3>
              <div className="text-4xl font-bold mb-4">₦24,500</div>
              <p className="mb-6">+ FREE DELIVERY</p>
              <button
                onClick={handleOrderClick}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold w-full hover:bg-gray-100 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Google Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div 
            id="form-header" 
            data-animate
            className={`text-center mb-12 ${isVisible['form-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Quick Order Form
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to place your order
            </p>
          </div>
          
          <div 
            id="order-form" 
            data-animate
            className={`bg-white p-8 rounded-xl shadow-lg ${isVisible['order-form'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform?embedded=true"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Order Form"
              className="rounded-lg"
            >
              Loading...
            </iframe>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Or contact us directly via WhatsApp for instant ordering
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div 
            id="faq-header" 
            data-animate
            className={`text-center mb-16 ${isVisible['faq-header'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our eye cream
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                id={`faq-${index}`}
                data-animate
                className={`bg-gray-50 p-6 rounded-xl ${isVisible[`faq-${index}`] ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            id="final-cta" 
            data-animate
            className={`${isVisible['final-cta'] ? 'animate-fadeInUp' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Eyes Today!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who chose Pro Xylane for younger, brighter eyes
            </p>
            <button
              onClick={handleOrderClick}
              className="whatsapp-button text-white px-12 py-4 rounded-full font-bold text-xl animate-pulse-custom"
            >
              🛒 Order Now via WhatsApp
            </button>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Truck className="w-6 h-6" />
                <span>Nationwide Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span>Pay on Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6" />
                <span>100% Safe & Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="text-purple-400 w-8 h-8" />
                <h3 className="text-2xl font-bold">Pro Xylane</h3>
              </div>
              <p className="text-gray-400">
                Premium anti-aging eye cream for youthful, radiant eyes.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Eye Cream</li>
                <li>Ingredients</li>
                <li>How to Use</li>
                <li>Results</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Shipping Info</li>
                <li>Return Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>WhatsApp: +234 800 000 0000</li>
                <li>Email: info@proxylane.com</li>
                <li>Instagram: @proxylane</li>
                <li>Facebook: Pro Xylane</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pro Xylane. All rights reserved. | Designed with ❤️ for beautiful eyes</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EyeCreamLanding;