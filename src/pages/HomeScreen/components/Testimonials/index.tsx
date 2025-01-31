import ctabanner from "/images/cta-banner.jpg";
import avatar from "/images/testimonial-1.jpg";

export default function Testimonials() {
  return (
    <div className="container mx-auto">
      <div className="testimonials-box">
        <div className="testimonial">
          <h2 className="title text-2xl md:text-3xl">Testimonial</h2>

          <div className="testimonial-card">
            <img
              src={avatar}
              alt="alan doe"
              className="testimonial-banner"
              width="80"
              height="80"
            />

            <p className="testimonial-name">Alan Doe</p>

            <p className="testimonial-title">CEO &amp; Founder Invision</p>

            <p className="testimonial-desc">
              Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit
              amet.
            </p>
          </div>
        </div>
        <div className="cta-container">
          <img src={ctabanner} alt="summer collection" className="cta-banner" />

          <a href="#" className="cta-content">
            <p className="discount">25% Discount</p>

            <h2 className="cta-title">Summer collection</h2>

            <p className="cta-text">Starting @ $10</p>

            <button className="cta-btn">Shop now</button>
          </a>
        </div>

        <div className="service">
          <h2 className="title text-2xl md:text-3xl">Our Services</h2>

          <div className="service-container">
            <a href="#" className="service-item">
              <div className="service-icon">
                <ion-icon name="boat-outline"></ion-icon>
              </div>

              <div className="service-content">
                <h3 className="service-title">Worldwide Delivery</h3>
                <p className="service-desc">For Order Over $100</p>
              </div>
            </a>

            <a href="#" className="service-item">
              <div className="service-icon">
                <ion-icon name="rocket-outline"></ion-icon>
              </div>

              <div className="service-content">
                <h3 className="service-title">Next Day delivery</h3>
                <p className="service-desc">UK Orders Only</p>
              </div>
            </a>

            <a href="#" className="service-item">
              <div className="service-icon">
                <ion-icon name="call-outline"></ion-icon>
              </div>

              <div className="service-content">
                <h3 className="service-title">Best Online Support</h3>
                <p className="service-desc">Hours: 8AM - 11PM</p>
              </div>
            </a>

            <a href="#" className="service-item">
              <div className="service-icon">
                <ion-icon name="arrow-undo-outline"></ion-icon>
              </div>

              <div className="service-content">
                <h3 className="service-title">Return Policy</h3>
                <p className="service-desc">Easy & Free Return</p>
              </div>
            </a>

            <a href="#" className="service-item">
              <div className="service-icon">
                <ion-icon name="ticket-outline"></ion-icon>
              </div>

              <div className="service-content">
                <h3 className="service-title">30% money back</h3>
                <p className="service-desc">For Order Over $100</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
