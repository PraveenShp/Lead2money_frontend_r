import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";


const Footer = () => {
  const router = useRouter();
  // const isHomePage = router.pathname === "/"; 
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-logo mt-3 mb-3">
                <Link href="/">
                  <img width="100%" src="/image/lead2money.svg" alt="logo" />
                </Link>
              </div>
              <p>
                Empowering you to earn extra income through lead generation and
                product sales.
              </p>
              <div className="footer-social-media-icons mt-3">
                <Link href="https://www.facebook.com/people/Lead2money/61555141305158/" target="_blank" className="facebook me-2">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="https://x.com/lead2money_?t=x4hSHZKLZ4kbyJ_aXjXTzw&amp;s=09" target="_blank" className="twitter me-2">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="https://www.instagram.com/lead2money?utm_source=qr&amp;igsh=NGxhYTYxNWRobXVq" target="_blank" className="instagram me-2">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link href="https://www.linkedin.com/company/lead2money-innovative-solutions-pvt-ltd/" target="blank" className="linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link href="https://www.youtube.com/channel/UCXsk45uqDvTZhG3DI8au6KA" target="_blank" class="youtube me-2">
                  <i class="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
            <div className="ml-5 col-lg-4 col-md-5">
              <div className="row">
                <div className="col-lg-6 col-5">
                  <h4 className="mt-3 mb-3 text-w">Useful Links</h4>
                  <ul className="text-muted list-unstyled">
                    <li className="mb-2">
                      <Link className="text-w" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="mt-3">
                    <Link href="/leadweb/about" className="text-w">
                        About Us
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link href= "/leadweb/term-condition"    className="text-w">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link href= "/leadweb/privacy-policy" className="text-w">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link href= "/leadweb/delivery-return" className="text-w">
                        Delivery & Returns
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link href="/leadweb/shipping" className="text-w">
                        Shipping Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-5 col-7">
                  <h4 className="mt-3 mb-3 text-w">Our Services</h4>
                  <ul className="text-muted list-unstyled">
                    <li className="mb-2">
                      <Link href="/leadweb/insurance" className="text-w">
                        Insurance
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="/leadweb/mutual-fund" className="text-w">
                        Mutual Fund
                      </Link>
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
                  <Link href="tel:+91123-456-7890">+91 9251005445</Link>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <Link href="mailto:info@businessname.com">info@lead2money.com</Link>
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
