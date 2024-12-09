import React, { useState,formState ,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import Header from '../../layouts/Header';
import { fetchData,apiConfig } from '@/pages/fetchData';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { useLoader } from '../../context/LoaderContext';

const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { setIsLoading } = useLoader();
  const [usePartners, setPartners] = useState(null);
  const [useAllPartners, setAllPartners] = useState([]);

  const [useMutualFund, setMutualFund] = useState(null);
  const [useAllMutualFund, setAllMutualFund] = useState([]);
  const [useOurMutualFund, setOurMutualFund] = useState(null);
  const [useAllOurMutualFund, setAllOurMutualFund] = useState([]);
  const [useOurLeadGeneration, setOurLeadGeneration] = useState(null);
  const [useAllOurLeadGeneration, setAllOurLeadGeneration] = useState([]);
  const [useQuestions, setQuestions] = useState(null);
  const [useAllQuestions, setAllQuestions] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); 
  const [useWhyChooseLead2money, setWhyChooseLead2money] = useState(null);
  const [useAllWhyChooseLead2money, setAllWhyChooseLead2money] = useState([]); 
  const [useTurn_Your_Network, setTurn_Your_Network] = useState(null);
  const [useAllAllTurn_Your_Network, setAllTurn_Your_Network] = useState([]); 
  const [useTestimonials, setTestimonials] = useState(null);
  const [useAllTestimonials, setAllTestimonials] = useState([]); 
  const [useShowProducts, setShowProducts] = useState(true);
  const [useServiceInsurence, setfetchAllServiceInsurence] = useState(null); 
  const [useAllServiceInsurence, setAllfetchAllServiceInsurence] = useState([]);
  const [useMutualFundService, setMutualFundService] = useState([]); 
  const [useAllMutualFundService, setAllMutualFundService] = useState(null);
  const [useOtherServices, setOtherServices] = useState(null); 
  const [useAllOtherServices, setAllOtherServices] = useState([]);
  const [usehealthServices, sethealthServices] = useState(null); 
  const [useAllhealthServices, setAllhealthServices] = useState([]);
  const [useNonMotorServices, setNonMotorServices] = useState(null); 
  const [useAllNonMotorServices, setAllNonMotorServices] = useState([]);
  const [uselifeServices, setlifeServices] = useState(null); 
  const [useAlllifeServices, setAlllifeServices] = useState([]);
  const [useHealthWellnessPlan, setHealthWellnessPlan] = useState(null); 
  const [useAllHealthWellnessPlan, setAllHealthWellnessPlan] = useState([]);
  const [useLoansServicePlan, setLoansServicePlan] = useState(null); 
  const [useAllLoansServicePlan, setAllLoansServicePlan] = useState([]);
  const [useFixedDepositPlan, setFixedDepositPlan] = useState(null); 
  const [useAllFixedDepositPlan, setAllFixedDepositPlan] = useState([]);
  const [useCreditCardPlan, setCreditCardPlan] = useState(null); 
  const [useAllCreditCardPlan, setAllCreditCardPlan] = useState([]);
  

  // ************************ handleScroll
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

  //**************** Contect Form Submit Function Start ************** */
  const [formState, setFormState] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });
  
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  const onlyNumbersRegex = /^[0-9]+$/;
  const onlyTextRegex = /^[A-Za-z\s]+$/;
  const MobileMaxLength = 10;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

  const validateForm = (formState) => {
    let errors = {};
    if (!formState.name || !onlyTextRegex.test(formState.name)) {
      errors.name = 'Name is required and should contain only text.';
    }
    if (!formState.email || !emailRegex.test(formState.email)) {
      errors.email = 'Valid email is required.';
    }
    if (!formState.mobile || !onlyNumbersRegex.test(formState.mobile) || formState.mobile.length !== MobileMaxLength) {
      errors.mobile = 'Mobile number must be 10 digits.';
    }
    if (!formState.message) {
      errors.message = 'Message cannot be empty.';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      if(name === 'mobile' && !/^[0-9]*$/.test(value)){
        return
      }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validateForm(formState);
    setFieldErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      setError('Please correct the highlighted errors.');
      return;
    }
  
    const formData = new FormData();
    formData.append("user_name", formState.name); 
    formData.append("mobile", formState.mobile); 
    formData.append("email", formState.email); 
    formData.append("message", formState.message); 
    
    try {
      setIsLoading(true);
      const response = await axios.post(apiConfig.apilaravelUrl + "/store-contect", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        toast.success("Request Submitted successfully!");
        setTimeout(() => {
        setFormState({
          name: '',
          mobile: '',
          email: '',
          message: '',
        });
        setFieldErrors({});
        const closeModelButton = document.getElementById('CloseModel');
        if (closeModelButton) {
          closeModelButton.click(); 
        }
         }, 2000);
        setError('');
    } catch (error) {
      console.error("Error submitting form:", error);
      //toast.error("Submit Error.. !");
    }finally{
      setIsLoading(false);
    }
  };

//*********

  // ****** Trusted Partners API Function ******* \\
  const fetchPartners = async () => { 
    const slug = 'trusted-partners';
    try {
      setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setPartners(response.data.data);
      setAllPartners(response.data.alldata);
      console.log(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }finally{

      setIsLoading(false);
    }
  }; // ***


  // ****** Trusted Partners API Function ******* \\
  const fetchMutualFund = async () => { 
    const slug = 'mutual-fund';
    try {
      setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setMutualFund(response.data.data);
      setAllMutualFund(response.data.alldata);
      console.log(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{

      setIsLoading(false);
    }
  }; // ***


  // ****** Fetch our-mutual-fund API Function ******* \\
  const fetchOurMutualFund = async () => {
    const slug = 'our-mutual-fund';
    try {
      setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setOurMutualFund(response.data.data);
      setAllOurMutualFund(response.data.alldata);
      
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; // ***


  // ****** Fetch lead-generation-services API Function ******* \\
  const fetchLeadGenerationServices = async () => { 
    const slug = 'lead-generation-services';
    try {
      setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setOurLeadGeneration(response.data.data);
      setAllOurLeadGeneration(response.data.alldata);
      
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; // ***


  // ****** Fetch Frequently Asked Questions API Function ******* \\
  const fetchQuestions = async () => { 
    const slug = 'frequently-asked-questions';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setQuestions(response.data.data);
      setAllQuestions(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch WhyChoose Lead2money API Function ******* \\
  const fetchWhyChooseLead2money = async () => { 
    const slug = 'why-choose-lead2money';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setWhyChooseLead2money(response.data.data);
      setAllWhyChooseLead2money(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 

  
  // // ****** Fetch Turn Your Network API Function ******* \\
  const Turn_Your_Network = async () => { 
    const slug = 'turn-your-network';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setTurn_Your_Network(response.data.data);
      setAllTurn_Your_Network(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch Testimonials API Function ******* \\
  const fetchTestimonials = async () => { 
    const slug = 'testimonials';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setTestimonials(response.data.data);
      setAllTestimonials(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  
  // ****** Fetch fetch All Service Insurence API Function ******* \\
  const fetchAllServiceInsurence = async () => { 
    const slug = 'all-motor-insurance-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setfetchAllServiceInsurence(response.data.data);
      setAllfetchAllServiceInsurence(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch fetch All Service Insurence API Function ******* \\
  const fetchAllServiceMutualFund = async () => { 
    const slug = 'mutual-fund-service-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setMutualFundService(response.data.data);
      setAllMutualFundService(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 

  // ****** Fetch fetch All Service Insurence API Function ******* \\
  const fatchAllOtherServices = async () => { 
    const slug = 'all-other-services';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setOtherServices(response.data.data);
      setAllOtherServices(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch fetch All Service Insurence API Function ******* \\
  const fatchNonMotorInsurancePlans = async () => { 
    const slug = 'all-non-motor-insurance';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setNonMotorServices(response.data.data);
      setAllNonMotorServices(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch fetch All Service Insurence API Function ******* \\
  const fatchHealthInsurancePlans = async () => { 
    const slug = 'all-health-insurance-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      sethealthServices(response.data.data);
      setAllhealthServices(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 

  // ****** Fetch All Life Insurence API Function ******* \\
  const fatchLifeInsurancePlans = async () => { 
    const slug = 'all-life-insurance-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setlifeServices(response.data.data);
      setAlllifeServices(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 

  // ****** Fetch All Health Wellness API Function ******* \\
  const fatchHealthWellnessPlans = async () => { 
    const slug = 'all-health-wellness-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setHealthWellnessPlan(response.data.data);
      setAllHealthWellnessPlan(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch All Health Wellness API Function ******* \\
  const fatchLoansServicePlans = async () => { 
    const slug = 'all-loans-service-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setLoansServicePlan(response.data.data);
      setAllLoansServicePlan(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch All Health Wellness API Function ******* \\ All Credit Card Service
  const fatchCreditCardPlans = async () => { 
    const slug = 'all-credit-card-service';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setCreditCardPlan(response.data.data);
      setAllCreditCardPlan(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 


  // ****** Fetch All Health Wellness API Function ******* \\All Fixed Deposit Service Plans
  const fatchFixedDepositPlans = async () => { 
    const slug = 'all-fixed-deposit-service-plans';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setFixedDepositPlan(response.data.data);
      setAllFixedDepositPlan(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      //toast.error("An error occurred while processing the payment.");
    }finally{
      setIsLoading(false);
    }
  }; 



  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the state for the clicked index
  };
  // ***


  useEffect(() => {
    Turn_Your_Network();
    fatchLifeInsurancePlans();
    fatchNonMotorInsurancePlans();
    fetchAllServiceInsurence();
    fatchAllOtherServices();
    fatchLoansServicePlans();
    fatchCreditCardPlans();
    fatchFixedDepositPlans();
    fetchAllServiceMutualFund();
    fatchHealthInsurancePlans();
    fatchHealthWellnessPlans();
    fetchPartners();
    fetchMutualFund();
    fetchOurMutualFund();
    fetchLeadGenerationServices();
    fetchWhyChooseLead2money();
    fetchTestimonials();
    fetchQuestions();
  }, []);


    
   return (
      
      <>
      <Header/>
      {/* Top */}
      <section className="hero-section-1  agency-bg" id="home">
        <div className="blur-bg-blocks">
          <aside className="blur-bg-set">
            <div className="blur-bg blur-bg-a"></div>
            <div className="blur-bg blur-bg-b"></div>
            <div className="blur-bg blur-bg-c"></div>
          </aside>
        </div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6 v-center">
              <div className="header-heading-1">
                <h1 className="" data-aos="zoom-out-up">
                  <span className="fw3">
                    {" "}
                    Turn Your Network into Income with <em>Lead2Money</em>
                    {/* <em>{useTurn_Your_Network ? useTurn_Your_Network.page_name_title : ''}</em> */}
                  </span>
                </h1>
                <p data-aos="zoom-out-up" data-aos-delay="400">
                  {useTurn_Your_Network ? useTurn_Your_Network.page_name_title2 : ''}
                </p>
                <a
                  href="/leadweb/signup"
                  className="btnpora btn-rd2 mt30"
                  data-aos="zoom-out-up"
                  data-aos-delay="600"
                >
                  Sign Up
                </a>
              </div>
              <div
                className="hero-feature"
                data-aos="zoom-out-up"
                data-aos-delay="800"
              >
                <div className="media v-center">
                  <div className="icon-pora">
                    <img
                      src="/images/icons/fast-time.png"
                      alt="icon"
                      className="w-100"
                    />
                  </div>
                  <div className="media-body">Quick, Easy & Hassle Free</div>
                </div>
                <div className="media v-center">
                  <div className="icon-pora">
                    <img
                      src="/images/icons/customer-services.png"
                      alt="icon"
                      className="w-100"
                    />
                  </div>
                  <div className="media-body">100% Claims Support</div>
                </div>
                <div className="media v-center">
                  <div className="icon-pora">
                    <img
                      src="/images/icons/customer-services.png"
                      alt="icon"
                      className="w-100"
                    />
                  </div>
                  <div className="media-body">Professional Assistant</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 v-center">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                  <div className="carousel-inner" style={{ height: "380px", overflow: "hidden" ,borderRadius: "15px"}} >
                    {useAllAllTurn_Your_Network && useAllAllTurn_Your_Network.length > 0 ? (
                      useAllAllTurn_Your_Network.map((row, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} >
                          <img className="d-block w-100" src={`${apiConfig.apiImgUrl}/${row.images}`} 
                          alt={`Step ${row.images || 'Not Available'}`} style={{ objectFit: "cover", height: "100%" }}/>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">
                        <p>No data available</p>
                      </div>
                    )}
                    
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
              </div>
            </div>
          </div>
          
        {/* Motor Incurence All Services */}
        <div className="row justify-content-between">
          <div className="col-12">
            <div className='col-lg-6 col-12 v-center'>
              <h3 className=''>
                <em>{useServiceInsurence ? useServiceInsurence.page_name_title : ''}</em>
              </h3>
            </div>
            <div className="service-card insurence">
            {useAllServiceInsurence && useAllServiceInsurence.length > 0 ? (
              useAllServiceInsurence.map((row, index) => (
              <div className="servicecard up-hor" key={index}>
                <a href="#">
                  <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                    alt={`Step ${row.images || "Not Available"}`} />
                  <p>
                    {row.page_title1}
                    <br /> {row.page_value1}
                  </p>
                </a>
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
        

          {/*Non Motor Incurence All Services */}
          <div className="row justify-content-between">
          <div className="col-12">
            <div className='col-lg-6 col-12 v-center'>
              <h3 className=''>
                <em>{useNonMotorServices ? useNonMotorServices.page_name_title : ''}</em>
              </h3>
            </div>
            <div className="service-card insurence">
            {useAllNonMotorServices && useAllNonMotorServices.length > 0 ? (
              useAllNonMotorServices.map((row, index) => (
              <div className="servicecard up-hor" key={index}>
                <a href="#">
                  <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                    alt={`Step ${row.images || "Not Available"}`} />
                  <p>
                    {row.page_title1}
                    <br /> {row.page_value1}
                  </p>
                </a>
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
        

        {/*  Health All Services*/}
        <div className="row justify-content-between">
            <div className="col-12">
              <div className='col-md-6 v-center'>
                <h3 className=''>
                  <em>{usehealthServices ? usehealthServices.page_name_title : ''}</em>
                </h3>
              </div>
              <div className="service-card insurence">
              {useAllhealthServices && useAllhealthServices.length > 0 ? (
                useAllhealthServices.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href="#">
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}{" "}
                    </p>
                  </a>
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


        {/*  Life Insurence All Services*/}
        <div className="row justify-content-between">
            <div className="col-12">
              <div className='col-md-6 v-center'>
                <h3 className=''>
                  <em>{uselifeServices ? uselifeServices.page_name_title : ''}</em>
                </h3>
              </div>
              <div className="service-card insurence">
              {useAlllifeServices && useAlllifeServices.length > 0 ? (
                useAlllifeServices.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href="#">
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}{" "}
                    </p>
                  </a>
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


        {/*  Health Wellness All Services*/}
        <div className="row justify-content-between">
            <div className="col-12">
              <div className='col-md-6 v-center'>
                <h3 className=''>
                  <em>{useHealthWellnessPlan ? useHealthWellnessPlan.page_name_title : ''}</em>
                </h3>
              </div>
              <div className="service-card insurence">
              {useAllHealthWellnessPlan && useAllHealthWellnessPlan.length > 0 ? (
                useAllHealthWellnessPlan.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href="#">
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}{" "}
                    </p>
                  </a>
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


        {/*  All Loans Services*/}
        <div className="row justify-content-between">
            <div className="col-12">
              <div className='col-md-6 v-center'>
                <h3 className=''>
                  <em>{useLoansServicePlan ? useLoansServicePlan.page_name_title : ''}</em>
                </h3>
              </div>
              <div className="service-card insurence">
              {useAllLoansServicePlan && useAllLoansServicePlan.length > 0 ? (
                useAllLoansServicePlan.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href="#">
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}{" "}
                    </p>
                  </a>
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

        {/*  All Credit Card Service */}
        <div className="row justify-content-between">
            <div className="col-12">
              <div className='col-md-6 v-center'>
                <h3 className=''>
                  <em>{useCreditCardPlan ? useCreditCardPlan.page_name_title : ''}</em>
                </h3>
              </div>
              <div className="service-card insurence">
              {useAllCreditCardPlan && useAllCreditCardPlan.length > 0 ? (
                useAllCreditCardPlan.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href="#">
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}{" "}
                    </p>
                  </a>
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

        {/*  All Fixed Deposit Services*/}
        <div className="row justify-content-between">
            <div className="col-12">
              <div className='col-md-6 v-center'>
                <h3 className=''>
                  <em>{useFixedDepositPlan ? useFixedDepositPlan.page_name_title : ''}</em>
                </h3>
              </div>
              <div className="service-card insurence">
              {useAllFixedDepositPlan && useAllFixedDepositPlan.length > 0 ? (
                useAllFixedDepositPlan.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href="#">
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}{" "}
                    </p>
                  </a>
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
       

        {/* Mutual Fund All Services */}
        <div className="row justify-content-between">
          <div className="col-12">
            <div className='col-lg-6 col-12 v-center'>
              <h3 className=''>
                <em>{useMutualFundService ? useMutualFundService.page_name_title : ''}</em>
              </h3>
            </div>
            <div className="service-card insurence">
              {useAllMutualFundService && useAllMutualFundService.length > 0 ? (
                useAllMutualFundService.map((row, index) => (
                <div className="servicecard up-hor" key={index}>
                  <a href={row.page_title2} target='_blank'>
                    <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                      alt={`Step ${row.images || "Not Available"}`} />
                    <p>
                      {row.page_title1}
                      <br /> {row.page_value1}
                    </p>
                  </a>
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
      </section>

      {/* Why Choose Pora */}
      {/* <div className="enquire-form pad-tb pora-bg1 text-white" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cta-heading text-center">
                <span
                  className="subhead"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Why Choose Lead2Money
                </span>
                <h3 data-aos="fade-up" data-aos-delay="300">
                  Live Your Best Life Today, Your Tomorrow Is Secured With Us
                </h3>
              </div>
              <div className="whyus mt60">
                <div
                  className="whyusbox"
                  data-aos="fade-In"
                  data-aos-delay="100"
                >
                  <div className="imgbdr shadows">
                    {" "}
                    <img src="/images/icons/student.png" alt="icon" />{" "}
                  </div>
                  <p>Child's Education</p>
                </div>
                <div
                  className="whyusbox"
                  data-aos="fade-In"
                  data-aos-delay="200"
                >
                  <div className="imgbdr shadows">
                    {" "}
                    <img src="/images/icons/oldman.png" alt="icon" />{" "}
                  </div>
                  <p>Care-free Retirement</p>
                </div>
                <div
                  className="whyusbox"
                  data-aos="fade-In"
                  data-aos-delay="300"
                >
                  <div className="imgbdr shadows">
                    {" "}
                    <img src="/images/icons/security.png" alt="icon" />{" "}
                  </div>
                  <p>Financial Security</p>
                </div>
                <div
                  className="whyusbox"
                  data-aos="fade-In"
                  data-aos-delay="400"
                >
                  <div className="imgbdr shadows">
                    {" "}
                    <img src="/images/icons/insurance.png" alt="icon" />{" "}
                  </div>
                  <p>Family’s Protection</p>
                </div>
                <div
                  className="whyusbox"
                  data-aos="fade-In"
                  data-aos-delay="500"
                >
                  <div className="imgbdr shadows">
                    {" "}
                    <img src="/images/icons/wealth.png" alt="icon" />{" "}
                  </div>
                  <p>Wealth Creation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/*Trusted Partners */}
      <section className="about-bg pad-tb" id="about">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6 v-center">
              <div className="partner-company">
                <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                  {usePartners ? usePartners.page_name_title : ''} <em>{usePartners ? usePartners.page_name : ''}</em>
                </h2>
                <p data-aos="fade-up" data-aos-delay="100">
                  {/* We collaborate with the best and biggest in the banking &
                  financial Lorem Ipsum has been the industry's standard dummy
                  text. */}
                </p>
              </div>
              <div className="partnerlogo mt40" data-aos="fade-In" data-aos-delay="500">
              {useAllPartners && useAllPartners.length > 0 ? (
                useAllPartners.map((row, index) => {
                    return (  // You need to return the JSX here
                        <a href="#" key={index} >
                          <img
                            src={`${apiConfig.apiImgUrl}/${row.images}`}
                            alt={`Step ${row.images || "Not Available"}`}
                          />
                        </a>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <p>No data available</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-5 v-center">
              <div className="img-box1 m-mt60" data-aos="fade-In" data-aos-delay="100" >
                <img src="/image/join-become-member.jpg" alt="image" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    

      {/* Why Choose Lead2money */}
      {/* <section className="step-bg pt50 pb80" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 v-center">
              <div className="common-heading m-text-c pr50">
                <h2 className="mb20" data-aos-delay="100">
                  <em>{useWhyChooseLead2money ? useWhyChooseLead2money.page_name : ''}</em>
                </h2>
                <p data-aos-delay="100">
                  {useWhyChooseLead2money ? useWhyChooseLead2money.page_name_title : ''}
                </p>
              </div>
            </div>
            <div className="col-lg-7 v-center m-mt60">
              <div className="row divrightbdr">
                {useAllWhyChooseLead2money && useAllWhyChooseLead2money.length > 0 ? (
                  useAllWhyChooseLead2money.map((row, index) => (
                  <div className="col-lg-6" key={index}> 
                    <div className="steps-div  mt30" data-aos-delay="100" >
                      <div className="steps-icons-1">
                        <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                            alt={`Step ${row.images || 'Not Available'}`} />
                      </div>
                      <h4 className="mb10">{row.page_title1}</h4>
                      <p>
                        {row.page_value1}
                      </p>
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
      </section> */}


      <section className="agent-section pad-tb" id="mutual-fund">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-11">
            <div className="common-heading">
              <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                <em>{useWhyChooseLead2money ? useWhyChooseLead2money.page_name : ''}</em>
              </h2>
              <p data-aos="fade-up" data-aos-delay="300" className="text-center">
                {useWhyChooseLead2money ? useWhyChooseLead2money.page_name_title : ''}
              </p>
              <div className="row divrightbdr">
                {useAllWhyChooseLead2money && useAllWhyChooseLead2money.length > 0 ? (
                  useAllWhyChooseLead2money.map((row, index) => ( 
                  <div className="col-lg-4 h-100" key={index}> {/* Apply key here */}
                    <div className="steps-div mt30" data-aos-delay="100" >
                      <div className="steps-icons-1">
                      <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                            alt={`Step ${row.images || 'Not Available'}`} />
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

      {/* Join the Lead2Money Community */}
      <div
        className="cta-section pad-tb bg-fixed-img"
        data-parallax="scroll"
        data-speed="0.5"
        data-image-src="/image/hero-bg.jpg"
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="cta-heading">
                <h2
                  className="mb20 text-w"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Join the Lead2Money Community: Become a Member Today!
                </h2>
                <p className="text-w" data-aos="fade-up" data-aos-delay="300">
                  With Lead2Money, you’re not just signing up for a
                  platform—you’re joining a community of driven individuals and
                  businesses who are turning connections into income. Whether
                  you're looking to generate leads or explore new product
                  opportunities, we provide the tools and support you need to
                  succeed.
                  <br />
                  <br />
                  Don’t wait—start your journey to success today.
                </p>
                <a
                  href="#modal"
                  data-toggle="modal"
                  data-target="#modal_aside_right"
                  className="btnpora btn-rd3 mt40 noshadow"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  {" "}
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet The Agents */}
      {/* <section className="agent-section pad-tb" id="agent">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <div className="common-heading">
                <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                  Meet The <em>Agents</em>
                </h2>
                <p data-aos="fade-up" data-aos-delay="300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt30">
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="100"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img
                      src="images/agents/team-1.jpg"
                      alt="team"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5>
                    <a href="#">Shakita Daoust</a>
                  </h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="blank">
                      <i className="fab fa-facebook-f"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-twitter"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-linkedin-in"></i>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="300"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img
                      src="images/agents/team-2.jpg"
                      alt="team"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5>
                    <a href="#">Gerard Licari</a>
                  </h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="blank">
                      <i className="fab fa-facebook-f"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-twitter"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-linkedin-in"></i>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="500"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img
                      src="images/agents/team-3.jpg"
                      alt="team"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5>
                    <a href="#">Cary Montgomery</a>
                  </h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="blank">
                      <i className="fab fa-facebook-f"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-twitter"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-linkedin-in"></i>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="700"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img
                      src="images/agents/team-4.jpg"
                      alt="team"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5>
                    <a href="#">Herman Running</a>
                  </h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="blank">
                      <i className="fab fa-facebook-f"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-twitter"></i>{" "}
                    </a>
                    <a href="#" target="blank">
                      <i className="fab fa-linkedin-in"></i>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
              
      {/*Testimonials  */}
      <section className="reviews-section pad-tb review-bg2" id="review">
        <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <div className="comon-heading">
                    <h2 className="mb20">Our <em>Happy</em> Customers <em>{useTestimonials ? useTestimonials.page_name : ''}</em></h2>
                    <p>{ useTestimonials ? useTestimonials.page_name_title : ''}</p>
                  </div>
                  <h5 className="mt40">{useTestimonials ? useTestimonials.page_name_title2 : ''}</h5>
                  <ul className="overallrating mt20">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <li key={index}>
                        <a href="javascript:void(0)" className={index < 3 ? "chked" : ""}>
                          <i className={`fas fa-star ${index < 3 ? "fa fa-star" : "fa-star-half-alt"}`} aria-hidden="true" ></i>
                        </a>
                      </li>
                    ))}
                  </ul>
              </div>
                <div className="col-lg-6 v-center">
                  <div id="carouselTestimonials" className="carousel slide" data-ride="carousel" data-interval="3000">
                    <ol className="carousel-indicators">
                      <li data-target="#carouselTestimonials" data-slide-to="0" className="active"></li>
                      <li data-target="#carouselTestimonials" data-slide-to="1"></li>
                      <li data-target="#carouselTestimonials" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" style={{ height: "300px", overflow: "hidden" }}>
                    {useAllTestimonials && useAllTestimonials.length > 0 ? (
                      useAllTestimonials.map((row, index) => (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} >
                        <div className="-client-details-">
                          <div className="-reviewr">
                            <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                              alt={`Step ${row.images || 'Not Available'}`} className="img-fluid" />
                          </div>
                          <div className="reviewer-text">
                            <h5>{row.page_title1}</h5>
                            <p>{row.page_title2}</p>
                            <div className="star-rate">
                              <ul>
                                <li><a href="javascript:void(0)" className="chked"><i className="fas fa-star" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void(0)" className="chked"><i className="fas fa-star" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void(0)" className="chked"><i className="fas fa-star" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void(0)" className="chked"><i className="fas fa-star" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void(0)" className="chked"><i className="fas fa-star-half-alt"></i></a></li>
                                <li><a href="javascript:void(0)">4.2</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="review-text pb0 pt30">
                          <p>
                          {row.page_value1}
                          </p>
                        </div>
                      </div>
                        ))
                      ) : (
                        <div className="text-center">
                          <p>No data available</p>
                        </div>
                      )}
                    </div>
                      <a className="carousel-control-prev" href="#carouselTestimonials" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselTestimonials" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
            </div>
        </div>
      </section>
      
    {/* mutual fund  Lead Generation Services */}
    <section className="agent-section pad-tb" id="mutual-fund">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-11">
            <div className="common-heading">
              <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                <em>{useOurMutualFund ? useOurMutualFund.page_name_title : ''}</em>
              </h2>
              <p data-aos="fade-up" data-aos-delay="300" className="text-center">
                {useOurMutualFund ? useOurMutualFund.page_name : ''}
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
                  <h4 className="mb20" data-aos="fade-up" data-aos-delay="100">
                    <em>{useOurLeadGeneration ? useOurLeadGeneration.page_name_title : ''}</em>
                  <br/>
                  </h4>
                  <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                    {useOurLeadGeneration ? useOurLeadGeneration.page_name : ''}
                  </h2>

                  <div className="row divrightbdr"> 
                    { useAllOurLeadGeneration.map((row, index) => (
                      <div className="col-lg-6">
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

                    {/* <div className="steps-div mt30" data-aos="fade-up" data-aos-delay="300" >
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
                      data-aos="fade-up"
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
                      data-aos="fade-up"
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
                <h2 data-aos="fade-up" data-aos-delay="100">
                 <em>{useQuestions ? useQuestions.page_name : ''}</em> 
                </h2>
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
              
                {/* <div className="card-2 mt10">
                  <div className="card-header" id="acc2">
                    <button
                      className="btn btn-link btn-block text-left acc-icon collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapse-2"
                      aria-expanded="false"
                      aria-controls="collapse-2"
                    >
                      Is it possible to lose money in mutual funds?
                    </button>
                  </div>
                  <div
                    id="collapse-2"
                    className="card-body p0 collapse"
                    aria-labelledby="acc2"
                    data-parent="#accordion3"
                  >
                    <div className="data-reqs">
                      <p>
                        The returns from a mutual fund are largely influenced by
                        the performance of the underlying securities and the
                        overall market conditions. Due to this volatility, there
                        is no guarantee that you will not incur losses in mutual
                        funds. Experts advise understanding how mutual funds
                        operate before investing in them.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-2 mt10">
                  <div className="card-header" id="acc3">
                    <button
                      className="btn btn-link btn-block text-left acc-icon collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapse-3"
                      aria-expanded="false"
                      aria-controls="collapse-3"
                    >
                      What factors should you consider when choosing the best
                      mutual fund scheme?
                    </button>
                  </div>
                  <div
                    id="collapse-3"
                    className="card-body p0 collapse"
                    aria-labelledby="acc3"
                    data-parent="#accordion3"
                  >
                    <div className="data-reqs">
                      <p>
                        Before choosing a mutual fund scheme one should look for
                        the following factors like performance, AMC track
                        record, the fund manager’s experience, performance
                        against category, expense ratio, the scheme’s Assets
                        Under Management (AUM), etc.{" "}
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--contact popup start-->*/}
      <div id="modal_aside_right" class="modal fixed-left fade" role="dialog" >
        <div class="modal-dialog modal-dialog-aside" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Express Your Interest!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" id='CloseModel'>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-block border0 noshadow mt30">
              <form onSubmit={FormSubmit}>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <input
                      type="text"
                      onChange={handleInputChange}
                      value={formState.name}
                      name="name"
                      className={`form-control ${fieldErrors.name ? 'border border-danger' : 'border border-gray'}`}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group col-sm-12">
                    <input
                      type="email"
                      onChange={handleInputChange}
                      value={formState.email}
                      name="email"
                      className={`form-control ${fieldErrors.email ? 'border border-danger' : 'border border-gray'}`}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group col-sm-12">
                    <input
                      type="text"
                      onChange={handleInputChange}
                      value={formState.mobile}
                      name="mobile"
                      maxLength={10}
                      className={`form-control ${fieldErrors.mobile ? 'border border-danger' : 'border border-gray'}`}
                      placeholder="Enter mobile"
                    />
                  </div>
                  <div className="form-group col-sm-12">
                    <textarea
                      onChange={handleInputChange}
                      value={formState.message}
                      name="message"
                      className={`form-control ${fieldErrors.message ? 'border border-danger' : 'border border-gray'}`}
                      rows="5"
                      placeholder="Enter your message"
                    />
                  </div>
                </div>

                {error && <div className="text-danger">{error}</div>}

                <button type="submit" className="btn-rd w-100">
                  Submit
                </button>
              </form>
                {/* <div class="form-btm-set">
                  <h5>We Deliver</h5>
                  <div class="icon-setss mt20">
                    <div class="icon-rows">
                      <div class="icon-imgg">
                        <img src="/images/icons/money.svg" alt="#" />
                      </div>
                      <div class="icon-txt">
                        <p>Best Price</p>
                      </div>
                    </div>
                    <div class="icon-rows">
                      <div class="icon-imgg">
                        <img src="/images/icons/quality.svg" alt="#" />
                      </div>
                      <div class="icon-txt">
                        <p>Quality Service</p>
                      </div>
                    </div>
                    <div class="icon-rows">
                      <div class="icon-imgg">
                        <img src="/images/icons/call-agent.svg" alt="#" />
                      </div>
                      <div class="icon-txt">
                        <p>Good Support</p>
                      </div>
                    </div>
                    <div class="icon-rows">
                      <div class="icon-imgg">
                        <img src="/images/icons/satisfaction.svg" alt="#" />
                      </div>
                      <div class="icon-txt">
                        <p>Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--contact popup end--> */}
    </>
   )
}
export default HomeComponent