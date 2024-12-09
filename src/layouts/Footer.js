import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/"; 
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-logo mt-3 mb-3">
                <a href="javascript:void(0)">
                  <img width="100%" src="/image/lead2money.svg" alt="logo" />
                </a>
              </div>
              <p>
                Empowering you to earn extra income through lead generation and
                product sales.
              </p>
              <div className="footer-social-media-icons mt-3">
                <a href="https://www.facebook.com/people/Lead2money/61555141305158/" target="_blank" className="facebook me-2">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com/lead2money_?t=x4hSHZKLZ4kbyJ_aXjXTzw&amp;s=09" target="_blank" className="twitter me-2">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/lead2money?utm_source=qr&amp;igsh=NGxhYTYxNWRobXVq" target="_blank" className="instagram me-2">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/lead2money-innovative-solutions-pvt-ltd/" target="blank" className="linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCXsk45uqDvTZhG3DI8au6KA" target="_blank" class="youtube me-2">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="ml-5 col-lg-4 col-md-5">
              <div className="row">
                <div className="col-lg-6 col-5">
                  <h4 className="mt-3 mb-3 text-w">Useful Links</h4>
                  <ul className="text-muted list-unstyled">
                    <li className="mb-2">
                      <a className="text-w" href="/">
                        Home
                      </a>
                    </li>
                    <li className="mt-3">
                    <a href="/leadweb/about" className="text-w">
                        About Us
                      </a>
                    </li>
                    <li className="mt-3">
                      <a href= "/leadweb/term-condition"    className="text-w">
                        Terms & Conditions
                      </a>
                    </li>
                    <li className="mt-3">
                      <a href= "/leadweb/privacy-policy" className="text-w">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="mt-3">
                      <a href= "/leadweb/delivery-return" className="text-w">
                        Delivery & Returns
                      </a>
                    </li>
                    <li className="mt-3">
                      <a href= "/leadweb/shipping" className="text-w">
                        Shipping Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-5 col-7">
                  <h4 className="mt-3 mb-3 text-w">Our Services</h4>
                  <ul className="text-muted list-unstyled">
                    <li className="mb-2">
                      <a href={isHomePage ? "#insurance" : "/"} className="text-w">
                        Insurance
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href={isHomePage ? "#mutual-fund" : "/"} className="text-w">
                        Mutual Fund
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="mt-3 mb-3 text-w">Contact Us</h4>
              <ul className="footer-address-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i> Office Number 108, First
                  Floor, Shree Amar Heights, Nirman Nagar-E, Ajmer Road, Jaipur
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <a href="tel:+91123-456-7890">+91 9251005445</a>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:info@businessname.com">info@lead2money.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-ft text-center mt-4">
                  <h6 className="text-white">
                    Disclaimer: We are following all Guidelines of concern
                    regulatory and not offering any commission or payout in any
                    service.
                  </h6>
                  <p>© Copyright 2024, Lead2Money All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
