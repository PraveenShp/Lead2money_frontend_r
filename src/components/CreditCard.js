import React, { useEffect, useState } from "react";
import { useLoader } from "@/context/LoaderContext";
import { redirect, useParams } from 'next/navigation';
import { fetchData ,apiConfig} from '../util/fetchData';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

export default function CreditCard() {



    useEffect(() => {
    }, []);

  return (
    <>
    
    <MainLayout seo={{ title: 'Credit Card' }}>
      {/* top section */}
      <section className="hero-section-1  agency-bg " id="home">
        <div className="blur-bg-blocks">
          <aside className="blur-bg-set">
            <div className="blur-bg blur-bg-a"></div>
            <div className="blur-bg blur-bg-b"></div>
            <div className="blur-bg blur-bg-c"></div>
          </aside>
        </div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4 v-center">
              <div
                className="img-box1 m-mt60" 
                data-aos-delay="500"
              >
                <img
                  src="/image/card.jpg"
                  alt="feature-image"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-8 v-center">
              <div className="header-heading-1">
                <h1 className="">
                  <span className="fw3"> IDFC First Bank Credit Card</span>
                </h1>
                <p data-aos-delay="400">
                  IDFC FIRST Bank offers a range of credit cards for different
                  categories, including lifestyle and rewards. These IDFC Bank
                  credit cards are tailored to cater to the specific needs and
                  requirements of the bank’s customers. IDFC Credit Cards offer
                  some attractive benefits, like never-expiring reward points on
                  all online and offline purchases, zero joining and annual
                  fees, low-interest rates, and so on.
                </p>
                <Link
                  href="#modal"
                  data-toggle="modal"
                  data-target="#modal_aside_right"
                  className="btnpora btn-rd2 mt30" 
                  data-aos-delay="600"
                >
                  Apply Now
                </Link>
                <p data-aos-delay="400" className="mt-3">
                  On IDFC First Bank website
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* second section */}
      <section className="hero-section-1 agency-bg mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h3  data-aos-delay="300" className="d-block">
                  Best IDFC Bank Credit Cards in July 2024
                </h3>
              </div>
              <div className="row">
                <div className="col-lg-10 col-md-12 mt-5 mx-auto">
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <div className="form-check py-2 card-lables">
                      <input type="checkbox" id="topCards" />
                      <label className="form-check-label" htmlFor="topCards">
                        Top Cards
                      </label>
                    </div>
                    <div className="form-check py-2 card-lables">
                      <input type="checkbox" id="travel" />
                      <label className="form-check-label" htmlFor="travel">
                        Travel
                      </label>
                    </div>
                    <div className="form-check py-2 card-lables">
                      <input type="checkbox" id="movie" />
                      <label className="form-check-label" htmlFor="movie">
                        Movie
                      </label>
                    </div>
                    <div className="form-check py-2 card-lables">
                      <input type="checkbox" id="dining" />
                      <label className="form-check-label" htmlFor="dining">
                        Dining
                      </label>
                    </div>
                    <div className="form-check py-2 card-lables">
                      <input type="checkbox" id="loungeAccess" />
                      <label
                        className="form-check-label"
                        htmlFor="loungeAccess"
                      >
                        Lounge Access
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" shadow-lg mt-4 mb-5 rounded">
                <div className="">
                  <div className="row align-items-center card-2">
                    <div className="col-md-3 col-12 text-center order-1 order-md-1">
                      <div className=" row d-flex justify-content-between">
                        <div className="col-sm-12 col-5 ">
                          <img
                            src="/images/credit-cards/au-credit.png"
                            className="card-img-top img-fluid mt-3 p-3 "
                            alt="Card Image"
                          />
                        </div>
                        <div className="col-7 d-flex flex-column flex-md-row align-items-start justify-content-start w-100 d-block d-md-none">
                          <h5
                            className="card-title mt-4 select-text mb-md-0 text-break text-wrap"
                            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                          >
                            IDFC SELECT CREDIT CARD
                          </h5>

                          <div className="form-check py-1 d-flex  justify-content-start ">
                            <input
                              type="checkbox"
                              id="loungeAccess"
                              className="me-2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="loungeAccess"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Lounge
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-9 col-12 order-2 order-md-2">
                      <div className="card-body">
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                          <div className="d-flex flex-column flex-md-row align-items-start justify-content-between w-100">
                            <h5 className="card-title mt-2 mb-2 mb-md-0 d-none d-md-block">
                              IDFC SELECT CREDIT CARD
                            </h5>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="d-flex mb-3">
                            <p className="card-text mb-0">
                              <span className="d-block">Joining Fee:</span>
                              <span className="lifetime">Lifetime free</span>
                            </p>
                          </div>

                          <div className="d-flex d-block d-md-none mb-3 mr-4">
                            <p className="card-text ml-3">
                              <span className="d-block">Annual Fee:</span>
                              <span className="lifetime">Lifetime free</span>
                            </p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="">
                            <p>Best suited for:</p>
                            <ul className="dots">
                              <li>Students</li>
                            </ul>
                          </div>
                          <div className="d-flex mb-3">
                            <div className="rating d-flex flex-column text-center">
                              <div className="d-flex">
                                <p className="lifetime mb-0">4.8</p>
                                <span className="text-warning px-2">★★★★☆</span>
                              </div>
                              <p className="lifetime">Customer Rating</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  <div className="px-4 py-3 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="d-flex align-items-center mb-3 mb-md-0">
                      <p className="border-none text-color m-0">
                        View Details +
                      </p>
                      <div className="form-check py-2 mx-3   d-none d-md-block">
                        <input type="checkbox" id="loungeAccess" />
                        <label className="form-check-label">
                          Lounge Access
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="d-flex align-items-center mb-3 mb-md-0">
                        <img
                          src="/image/credit2.jpg"
                          alt="Percentage"
                          className="me-3 img-fluid"
                        />
                            
                        <div>
                          <p className="text-percentage">Why this card</p>
                          <span className="lifetime">
                            The Card Offers Lifetime Free Access
                          </span>
                        </div>
                      </div>
                      <Link
                        href="#"
                        data-toggle="modal"
                        data-target="#modal_aside_right"
                        className="btnpora btn-rd2 mt-3 mx-3"
                        data-aos-delay="600"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" shadow-lg mt-4 mb-5 rounded">
                <div className="">
                  <div className="row align-items-center card-2">
                    <div className="col-md-3 col-12 text-center order-1 order-md-1">
                      <div className=" row d-flex justify-content-between">
                        <div className="col-sm-12 col-5 ">
                          <img
                            src="/images/credit-cards/axis-bank-credit.png"
                            className="card-img-top img-fluid mt-3 p-3 "
                            alt="Card Image"
                          />
                        </div>
                        <div className="col-7 d-flex flex-column flex-md-row align-items-start justify-content-start w-100 d-block d-md-none">
                          <h5
                            className="card-title mt-4 select-text mb-md-0 text-break text-wrap"
                            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                          >
                            IDFC SELECT CREDIT CARD
                          </h5>

                          <div className="form-check py-1 d-flex  justify-content-start ">
                            <input
                              type="checkbox"
                              id="loungeAccess"
                              className="me-2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="loungeAccess"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Lounge
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-9 col-12 order-2 order-md-2">
                      <div className="card-body">
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                          <div className="d-flex flex-column flex-md-row align-items-start justify-content-between w-100">
                            <h5 className="card-title mt-2 mb-2 mb-md-0 d-none d-md-block">
                              IDFC SELECT CREDIT CARD
                            </h5>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="d-flex mb-3">
                            <p className="card-text mb-0">
                              <span className="d-block">Joining Fee:</span>
                              <span className="lifetime">Lifetime free</span>
                            </p>
                          </div>

                          <div className="d-flex d-block d-md-none mb-3 mr-4">
                            <p className="card-text ml-3">
                              <span className="d-block">Annual Fee:</span>
                              <span className="lifetime">Lifetime free</span>
                            </p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="">
                            <p>Best suited for:</p>
                            <ul className="dots">
                              <li>Students</li>
                            </ul>
                          </div>
                          <div className="d-flex mb-3">
                            <div className="rating d-flex flex-column text-center">
                              <div className="d-flex">
                                <p className="lifetime mb-0">4.8</p>
                                <span className="text-warning px-2">★★★★☆</span>
                              </div>
                              <p className="lifetime">Customer Rating</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  <div className="px-4 py-3 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="d-flex align-items-center mb-3 mb-md-0">
                      <p className="border-none text-color m-0">
                        View Details +
                      </p>
                      <div className="form-check py-2 mx-3   d-none d-md-block">
                        <input type="checkbox" id="loungeAccess" />
                        <label className="form-check-label">
                          Lounge Access
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="d-flex align-items-center mb-3 mb-md-0">
                        <img
                          src="/image/credit2.jpg"
                          alt="Percentage"
                          className="me-3 img-fluid"
                        />
                            
                        <div>
                          <p className="text-percentage">Why this card</p>
                          <span className="lifetime">
                            The Card Offers Lifetime Free Access
                          </span>
                        </div>
                      </div>
                      <Link
                        href="#"
                        data-toggle="modal"
                        data-target="#modal_aside_right"
                        className="btnpora btn-rd2 mt-3 mx-3"
                        data-aos-delay="600"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      </MainLayout>

    </>
  );
}
