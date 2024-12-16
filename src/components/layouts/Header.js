import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/"; 
  const handleScroll = (id) => {
    if (id === "home") {
      // Scroll to the top of the page if "home"
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
  
  return (
    <header className="top-header th2">
      <nav className="navbar navbar-expand-lg justify-content-between navbar-mobile fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <img src="/image/lead2money.svg" alt="Logo" className="white-logo" />
            <img src="/image/lead2money.svg" alt="Logo" className="dark-logo" />
          </Link>
          <div className="hide-desk">
            <Link className="mobile-btn btn-call" href="tel:123-456-7890">
              <i className="fas fa-phone-alt"></i>
              <span className="clltxt"></span>
            </Link>
            <Link
              className="mobile-btn btn-call getmob"
              href={isHomePage ? "#" : "/contact"}
              data-toggle="modal"
              data-target="#modal_aside_right"
            >
              Get Quote
            </Link>
          </div>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbar4"
            aria-controls="navbar4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar4">
            <ul className="mr-auto"></ul>
            <ul className="navbar-nav v-center">
              <li className="nav-item">
                <Link className="nav-link" 
                  href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"
                  href= "/leadweb/about">
                  About Us
                </Link>
              </li>
              {/* <!-- Main Service Dropdown --> */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  href="javascript:void(0)" 
                  onClick={() => handleScroll("services")}
                  id="mainServiceDropdown" 
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Service
                </Link>
                <ul className="dropdown-menu" aria-labelledby="mainServiceDropdown">
                  <li>
                    <Link className="nav-link"
                      href="/leadweb/insurance">
                      Insurance
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link"
                      href="/leadweb/mutual-fund">
                      Mutual Fund
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" 
                  href= "/leadweb/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/leadweb/how-it-works">
                  How It Works
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/leadweb/contact-us"
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link btn-call hide-mob" href="tel:123-456-7890">
                  <i className="fas fa-phone-alt"></i>
                  <span>
                    <span className="clltxt">Happy to Help you</span> +91 9251005445
                  </span>
                </Link> */}
                <Link className="nav-link" href="/leadweb/login">
                  <span>
                    Login
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
