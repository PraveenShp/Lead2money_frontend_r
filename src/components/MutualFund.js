import React, { useEffect, useState } from "react";
import { fetchData ,apiConfig} from '../util/fetchData';
import { useLoader } from "@/context/LoaderContext";
import MainLayout from "../layouts/MainLayout";


export default function MutualFund() {

  const { setIsLoading } =  useLoader();
  const [useMutualFund, setMutualFund] = useState(null);
  const [useAllMutualFund, setAllMutualFund] = useState([]);
  const [useOurMutualFund, setOurMutualFund] = useState(null);
  const [useAllOurMutualFund, setAllOurMutualFund] = useState([]);
  const [useOurLeadGeneration, setOurLeadGeneration] = useState(null);
  const [useAllOurLeadGeneration, setAllOurLeadGeneration] = useState([]);
  const [useQuestions, setQuestions] = useState(null);
  const [useAllQuestions, setAllQuestions] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); 
  
    
  // ****** Trusted Partners API Function ******* \\
  const fetchMutualFund = async () => { 
    const slug = 'mutual-fund';
    try {
      //setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setMutualFund(response.data.data);
      setAllMutualFund(response.data.alldata);
      console.log(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{

      //setIsLoading(false);
    }
  }; // ***


  // ****** Fetch our-mutual-fund API Function ******* \\
  const fetchOurMutualFund = async () => {
    const slug = 'our-mutual-fund';
    try {
      //setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setOurMutualFund(response.data.data);
      setAllOurMutualFund(response.data.alldata);
      
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{
      //setIsLoading(false);
    }
  }; // ***


  // ****** Fetch lead-generation-services API Function ******* \\
  const fetchLeadGenerationServices = async () => { 
    const slug = 'lead-generation-services';
    try {
      //setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setOurLeadGeneration(response.data.data);
      setAllOurLeadGeneration(response.data.alldata);
      
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{
      //setIsLoading(false);
    }
  }; // ***

  
  // ****** Fetch Frequently Asked Questions API Function ******* \\
  const fetchQuestions = async () => { 
    const slug = 'frequently-asked-questions';
    try {
      //setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setQuestions(response.data.data);
      setAllQuestions(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{
      //setIsLoading(false);
    }
  }; 

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the state for the clicked index
  };

  useEffect(() => {
    fetchLeadGenerationServices();
    fetchOurMutualFund();
    fetchMutualFund();
    fetchQuestions();
  },[]);


  return (
    <>

    <MainLayout seo={{ title: 'Mutual Fund' }}>
    {/* mutual fund */}
    <section className="agent-section pad-tb" id="mutual-fund">
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-lg-11">
                    <div className="common-heading mt50">
                        <h2 className="mb20" data-aos-delay="100">
                        <em> {useOurMutualFund ? useOurMutualFund.page_name : ''}</em>
                        </h2>
                        <p  data-aos-delay="300" className="text-center">
                            {useOurMutualFund ? useOurMutualFund.page_name_title : ''}
                        </p>
                        <div className="row divrightbdr">
                            {useAllOurMutualFund && useAllOurMutualFund.length > 0 ? (
                            useAllOurMutualFund.map((row, index) => ( 
                            <div className="col-lg-4 h-100" key={index}> {/* Apply key here */}
                                <div className="steps-div mt30" data-aos-delay="100" >
                                <div className="steps-icons-1">
                                    {index === 0 && <img src="/images/icons/choice.png" alt="choice" />}
                                    {index === 1 && <img src="/images/icons/easy.png" alt="easy" />}
                                    {index === 2 && <img src="/images/icons/credit-card.png" alt="credit-card" />}
                                </div>
                                <h4 className="mb10">{row.page_title1}</h4>
                                <p>{row.page_value1}</p>
                                </div>
                            </div>
                            ))
                            ) : (
                                <div className="text-center">
                                <p>No data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

                            
    {/* Why Choose Lead2Money? Mutul Fund */}
    <section className="agent-section pad-tb" id="mutual-fund">
    <div className="container">
    <div className="row justify-content-center text-center">
        <div className="col-lg-11 mt-5">
            <div className="common-heading">
            <h2 className="mb20"  data-aos-delay="100">
            <em>{useOurLeadGeneration ? useOurLeadGeneration.page_name : ''}</em>
            <br/>
            </h2>
            <p className="mb20"  data-aos-delay="100">
                {useOurLeadGeneration ? useOurLeadGeneration.page_name_title : ''}
            </p>

            <div className="row divrightbdr"> 
                { useAllOurLeadGeneration.map((row, index) => (
                <div className="col-lg-6" key={index}>
                    <div className="steps-div  mt30" data-aos-delay="100" >
                        <div className="steps-icons-1">
                        <img src="/images/icons/choice.png" alt="steps" />
                        </div>
                        <h4 className="mb10">{row.page_title1}</h4>
                        <p>
                        {row.page_value1}
                        </p>
                    </div>
                </div>
                ))}

                {/* <div className="steps-div mt30"  data-aos-delay="300" >
                <div className="steps-icons-1">
                    {" "}
                    <img
                    src="/images/icons/credit-card.png"
                    alt="steps"
                    />{" "}
                </div>
                <h4 className="mb10">Diverse Investment Options </h4>
                <p>
                Access leads interested in a variety of mutual funds, allowing you to offer tailored solutions.
                </p>
                </div> */}

            {/* <div className="col-lg-6 mt60 m-m0">
                <div
                className="steps-div mt30"
                
                data-aos-delay="200"
                >
                <div className="steps-icons-1">
                    {" "}
                    <img src="/images/icons/easy.png" alt="steps" />{" "}
                </div>
                <h4 className="mb10">
                Streamlined Process</h4>
                <p>
                Our platform simplifies the lead generation process, giving you more time to focus on advising your clients.
                </p>
                </div>
                <div
                className="steps-div mt30"
                
                data-aos-delay="500"
                >
                <div className="steps-icons-1">
                    {" "}
                    <img src="/images/icons/customers.png" alt="steps" />{" "}
                </div>
                <h4 className="mb10">
                Proven Success</h4>
                <p>
                Join a network of financial professionals who have successfully expanded their client base through Lead2Money.
                </p>
                </div>
            </div> */}
            </div>
            </div>
        </div>
    </div>
    </div>
    </section>
                
    {/* Frequently Asked Questions */}
    <section className="faq-section pad-tb ">
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                <div className="common-heading">
                    <h2  data-aos-delay="100">
                    <em>{useQuestions ? useQuestions.page_name : ''}</em> 
                    </h2>
                    <br/>
                    <p>{useQuestions ? useQuestions.page_name_title : ''}</p>
                </div>
                </div>
            </div>
            <div className="row justify-content-center mt60">
                <div className="col-lg-8">
                    <div id="accordion3" className="accordion">
                        {useAllQuestions.map((row, index) => (
                            <div key={index} className="card-2">
                            <div className="card-header" id={`heading-${index}`}>
                                <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                onClick={() => toggleAccordion(index)} // Call toggleAccordion with current index
                                >
                                {/* Conditionally render "+" or "-" based on whether the current accordion is open */}
                                {row.page_title1}
                                {" "}
                                <span className="mr-2">
                                    {openIndex === index ? "-" : "+"}
                                </span>
                                </button>
                            </div>
                            <div
                                id={`collapse-${index}`}
                                className={`card-body p0 collapse ${openIndex === index ? "show" : ""}`}
                                aria-labelledby={`heading-${index}`} 
                                data-parent="#accordion3"
                            >
                                <div className="data-reqs">
                                <p>{row.page_value1}</p>
                                </div>
                            </div>
                            </div>
                        ))}
                    
                    </div>
                </div>
            </div>
        </div>
    </section>

    </MainLayout>
    </>
  )
}
