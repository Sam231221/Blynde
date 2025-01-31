import payment from "/images/payment.png";
import appstore from "/images/thirdparty/app-store.png";
import googleplay from "/images/thirdparty/google-play.png";
export default function Footer() {
  return (
    <footer className="relative z-[996]">
      <div className="flex flex-col sm:flex-row sm:justify-between bg-black gap-10 py-10 px-20 ">
        {/* leftbar */}
        <div className="lg:w-2/3 my-10  sm:w-full">
          <div className="lg:w-2/3 sm:w-full">
            <div className="my-3">
              <h1 className="text-3xl mb-2 text-white font-bold">
                Get our emails for info on new items, sales and more.
              </h1>
              <p className="mb-2 text-sm text-gray-400 font-medium">
                We&apos;ll email you a voucher worth £10 off your first order
                over £50.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex mb-2 w-full">
                <input
                  className="px-3 py-3 w-full focus:outline-none text-gray-400 text-sm bg-white"
                  type="text"
                  placeholder="Enter your email address"
                  name="email"
                  id=""
                />
                <button
                  className="border hover:bg-gray-700 font-medium border-gray-700 px-4 py-1 text-white"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 ">
                By subscribing you agree to our Terms & Conditions and Privacy &
                Cookies Policy.
              </p>
            </div>
          </div>
        </div>
        {/* rightbar */}
        <div className="lg:w-1/3 my-10 sm:w-full">
          <h1 className="text-3xl text-white font-bold">Need help?</h1>
          <h1 className="text-3xl mb-2 text-white font-bold">
            (+800) 1234 5678 90
          </h1>
          <p className="text-sm mb-2 text-gray-400 font-medium">
            We are available 8:00am – 7:00pm
          </p>
          <div className="mt-4">
            <div className="flex md:items-center flex-col md:flex-row mb-2 gap-3">
              <div className="h-10 w-20">
                <img
                  className="w-full h-full object-contain"
                  src={appstore}
                  alt=""
                />
              </div>
              <div className="h-10 w-20">
                <img
                  className="w-full h-full object-contain"
                  src={googleplay}
                  alt=""
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Shopping App: Try our View in Your Room feature, manage registries
              and save payment info.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-nav px-3">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Popular Categories</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Fashion
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Electronic
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Cosmetic
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Health
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Watches
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Products</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Prices drop
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                New products
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Best sales
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Contact us
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Sitemap
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Our Company</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Delivery
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Legal Notice
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Terms and conditions
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                About us
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Secure payment
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Services</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Prices drop
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                New products
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Best sales
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Contact us
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Sitemap
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Contact</h2>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <address className="content">
                419 State 414 Rte Beaver Dams, New York(NY), 14812, USA
              </address>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="call-outline"></ion-icon>
              </div>

              <a href="tel:+607936-8058" className="footer-nav-link">
                (607) 936-8058
              </a>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>

              <a href="mailto:example@gmail.com" className="footer-nav-link">
                example@gmail.com
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Follow Us</h2>
            </li>

            <li>
              <ul className="social-link">
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>

                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <img src={payment} alt="payment method" className="payment-img" />

          <p className="copyright">
            Copyright &copy; <a href="#">Blynde</a> all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
