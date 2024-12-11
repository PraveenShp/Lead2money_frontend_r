import React, { useEffect, useState } from "react";
import Footer from '../layouts/Footer';
import Header from "../layouts/Header";


export default function PersonalLoan() {



    useEffect(() => {
    }, []);

  return (
    <>

    <Header/>
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
              <div className="" data-aos-delay="500" >
                <img
                  src="/image/card.jpg"
                  alt="feature-image"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-8 v-center">
              <div className="header-heading-1">
                <h1 className="" data-aos="zoom-out-up">
                  <span className="fw3"> Personal Loan</span>
                </h1>
                <p data-aos="zoom-out-up" data-aos-delay="400">
                Get a personal loan of up to Rs 40 lakh with interest rates starting at 10.5% p.a. Explore pre-approved offers from our partner lenders, featuring end-to-end digital processing and instant disbursals.
                </p>
                <a
                  href="#modal"
                  data-toggle="modal"
                  data-target="#modal_aside_right"
                  className="btnpora btn-rd2 mt30"
                  data-aos="zoom-out-up"
                  data-aos-delay="600"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <section className="container mb-5 personal-loan-container">
        <div className="row">
          <div className="col-8">
            <div className="d-flex flex-column flex-md-row align-items-center">
              <h2 className="mb-3 d-flex flex-column flex-md-row align-items-center">
                <span className="loan-2 text-center text-md-start">
                  Find Best Personal
                </span>
                <p className="mb-0 ms-2 loan text-center text-md-start">
                  Loan Offers
                </p>
              </h2>
            </div>

            {/* personal Loan Cards */}
            <div className="row border rounded personal-loan-cards-man-div">
              <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                  <div className="border rounded">
                    <img src="/image/user.jpg" width={35} className="p-1" />
                  </div>
                  <p className="px-3 mb-0">HDFC Bank</p>
                </div>
                <div className="d-flex ms-auto gap-3 flex-wrap  flex-md-row card-lables">
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    10 Second Disbursal*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    100% Digital Process*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    Quick Disbursal
                  </p>
                </div>
              </div>

              <div class="container ">
                <div class="row  mt-3">
                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Max. Loan Amt.</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Rate of Interest</div>
                      <span class="mt-1 loan-2">10.85% - 24%</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Tenure upto</div>
                      <span class="mt-1 loan-2">Upto 6 Years</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-3 mb-3">
                    <div>
                      <div class="d-block">Processing Fee</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>
                  <div class="col-6 col-md-3 mb-3">
                        <div class=" d-flex justify-content-center">
                            <a
                            href="#modal"
                            data-toggle="modal"
                            data-target="#modal_aside_right"
                            className="btnpora btn-rd2 "
                            data-aos="zoom-out-up"
                            data-aos-delay="600"
                            >
                            Apply Now
                            </a>
                        </div>
                    </div>
                  
                </div>
              </div>
            </div>
           
              {/* personal Loan Cards */}
            <div className="row border rounded personal-loan-cards-man-div">
            <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
                <div className="border rounded">
                <img src="/image/user.jpg" width={35} className="p-1" />
                </div>
                <p className="px-3 mb-0">HDFC Bank</p>
            </div>
            <div className="d-flex ms-auto gap-3 flex-wrap  flex-md-row card-lables">
                <p className="form-check-label form-check py-1 mb-0 mt-2">
                10 Second Disbursal*
                </p>
                <p className="form-check-label form-check py-1 mb-0 mt-2">
                100% Digital Process*
                </p>
                <p className="form-check-label form-check py-1 mb-0 mt-2">
                Quick Disbursal
                </p>
            </div>
            </div>

            <div class="container ">
            <div class="row  mt-3">
                <div class="col-6 col-md-2 mb-3">
                <div>
                    <div class="d-block">Max. Loan Amt.</div>
                    <span class="mt-1 loan-2">Up to ₹40L</span>
                </div>
                </div>

                <div class="col-6 col-md-2 mb-3">
                <div>
                    <div class="d-block">Rate of Interest</div>
                    <span class="mt-1 loan-2">10.85% - 24%</span>
                </div>
                </div>

                <div class="col-6 col-md-2 mb-3">
                <div>
                    <div class="d-block">Tenure upto</div>
                    <span class="mt-1 loan-2">Upto 6 Years</span>
                </div>
                </div>

                <div class="col-6 col-md-3 mb-3">
                <div>
                    <div class="d-block">Processing Fee</div>
                    <span class="mt-1 loan-2">Up to ₹40L</span>
                </div>
                </div>
                <div class="col-6 col-md-3 mb-3">
                    <div class=" d-flex justify-content-center">
                        <a
                        href="#modal"
                        data-toggle="modal"
                        data-target="#modal_aside_right"
                        className="btnpora btn-rd2 "
                        data-aos="zoom-out-up"
                        data-aos-delay="600"
                        >
                        Apply Now
                        </a>
                    </div>
                </div>
                
            </div>
            </div>
            </div>
           
              {/* personal Loan Cards */}
            <div className="row border rounded personal-loan-cards-man-div">
              <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                  <div className="border rounded">
                    <img src="/image/user.jpg" width={35} className="p-1" />
                  </div>
                  <p className="px-3 mb-0">HDFC Bank</p>
                </div>
                <div className="d-flex ms-auto gap-3 flex-wrap  flex-md-row card-lables">
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    10 Second Disbursal*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    100% Digital Process*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    Quick Disbursal
                  </p>
                </div>
              </div>

              <div class="container ">
                <div class="row  mt-3">
                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Max. Loan Amt.</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Rate of Interest</div>
                      <span class="mt-1 loan-2">10.85% - 24%</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Tenure upto</div>
                      <span class="mt-1 loan-2">Upto 6 Years</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-3 mb-3">
                    <div>
                      <div class="d-block">Processing Fee</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>
                  <div class="col-6 col-md-3 mb-3">
                        <div class=" d-flex justify-content-center">
                            <a
                            href="#modal"
                            data-toggle="modal"
                            data-target="#modal_aside_right"
                            className="btnpora btn-rd2 "
                            data-aos="zoom-out-up"
                            data-aos-delay="600"
                            >
                            Apply Now
                            </a>
                        </div>
                    </div>
                  
                </div>
              </div>
            </div>
           
              {/* personal Loan Cards */}
            <div className="row border rounded personal-loan-cards-man-div">
              <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                  <div className="border rounded">
                    <img src="/image/user.jpg" width={35} className="p-1" />
                  </div>
                  <p className="px-3 mb-0">HDFC Bank</p>
                </div>
                <div className="d-flex ms-auto gap-3 flex-wrap  flex-md-row card-lables">
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    10 Second Disbursal*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    100% Digital Process*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    Quick Disbursal
                  </p>
                </div>
              </div>

              <div class="container ">
                <div class="row  mt-3">
                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Max. Loan Amt.</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Rate of Interest</div>
                      <span class="mt-1 loan-2">10.85% - 24%</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Tenure upto</div>
                      <span class="mt-1 loan-2">Upto 6 Years</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-3 mb-3">
                    <div>
                      <div class="d-block">Processing Fee</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>
                  <div class="col-6 col-md-3 mb-3">
                        <div class=" d-flex justify-content-center">
                            <a
                            href="#modal"
                            data-toggle="modal"
                            data-target="#modal_aside_right"
                            className="btnpora btn-rd2 "
                            data-aos="zoom-out-up"
                            data-aos-delay="600"
                            >
                            Apply Now
                            </a>
                        </div>
                    </div>
                  
                </div>
              </div>
            </div>
           
              {/* personal Loan Cards */}
            <div className="row border rounded personal-loan-cards-man-div">
              <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                  <div className="border rounded">
                    <img src="/image/user.jpg" width={35} className="p-1" />
                  </div>
                  <p className="px-3 mb-0">HDFC Bank</p>
                </div>
                <div className="d-flex ms-auto gap-3 flex-wrap  flex-md-row card-lables">
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    10 Second Disbursal*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    100% Digital Process*
                  </p>
                  <p className="form-check-label form-check py-1 mb-0 mt-2">
                    Quick Disbursal
                  </p>
                </div>
              </div>

              <div class="container ">
                <div class="row  mt-3">
                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Max. Loan Amt.</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Rate of Interest</div>
                      <span class="mt-1 loan-2">10.85% - 24%</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-2 mb-3">
                    <div>
                      <div class="d-block">Tenure upto</div>
                      <span class="mt-1 loan-2">Upto 6 Years</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-3 mb-3">
                    <div>
                      <div class="d-block">Processing Fee</div>
                      <span class="mt-1 loan-2">Up to ₹40L</span>
                    </div>
                  </div>
                  <div class="col-6 col-md-3 mb-3">
                        <div class=" d-flex justify-content-center">
                            <a
                            href="#modal"
                            data-toggle="modal"
                            data-target="#modal_aside_right"
                            className="btnpora btn-rd2 "
                            data-aos="zoom-out-up"
                            data-aos-delay="600"
                            >
                            Apply Now
                            </a>
                        </div>
                    </div>
                  
                </div>
              </div>
            </div>
           

          </div>
          
          <div className="col-4 mt-20">
          </div>    
                
        </div>
      </section>

      <Footer/>
    </>
  );
}
