import React, { useEffect, useState } from "react";
import { fetchData, apiConfig } from '../util/fetchData';
import { useLoader } from "@/context/LoaderContext";
import MainLayout from "../layouts/MainLayout";


export default function Insurance() {

  const { setIsLoading } =  useLoader();
  const [useServices, setServices] = useState(null);
  const [useAllServices, setAllServices] = useState([]);
  const [useInsurance, setInsurance] = useState(null);
  const [useAllInsurance, setAllInsurance] = useState([]); 

   // ****** Fetch Product API Function ******* \\
   const fetchServices = async () => { 
    const slug = 'insurance';
    try {
      // //setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setServices(response.data.data);
      setAllServices(response.data.alldata);
      console.log(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{
      // //setIsLoading(false);
    }
  }; // ***


  // ****** Fetch Product API Function ******* \\
  const fetchInsurance = async () => { 
    const slug = 'insurance-services';
    try {
      //setIsLoading(true);
      //  const response = await fetchData(`page-details?slug=${slug}`);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setInsurance(response.data.data);
      setAllInsurance(response.data.alldata);
      console.log(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{
      //setIsLoading(false);
    }
  }; // ***

  
  useEffect(() => {
    fetchServices();
    fetchInsurance();
    console.log();
  },[]);


  return (
    <>
    
    <MainLayout seo={{ title: 'Insurance' }}>

    {/* insurance */} 
    <section className="agent-section pad-tb" id="insurance">
    <div className="container">
      <div className="row justify-content-center text-center">
        <div className="col-lg-6">
          <div className="common-heading">
            <h2 className="mb20">
              <em>{useServices ? useServices.page_name :''}</em>
            </h2>
            <p  data-aos-delay="300">
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
            </p>
          </div>
        </div>
      </div>

        {useAllServices && useAllServices.length > 0 ? (
          useAllServices.map((row, index) => (         
            <div className="row m-text-c" key={index}>
              <div className="col-lg-6 v-center">
                <div className="about-company">
                  <h4 className="mb20"  data-aos-delay="100">
                    <em>{row.page_title1}</em>
                  </h4>
                  <p  data-aos-delay="300">
                    {row.page_value1}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 v-center">
                <div className="img-box1 m-mt60"  data-aos-delay="500">
                    <img
                      src={`${apiConfig.apiImgUrl}/${row.images}`}
                      alt={`Step ${row.images || 'Not Available'}`}
                      className="img-fluid"
                    />
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="text-center">
              <p>No data available</p>
            </div>
          )}
    </div>
    </section>

    {/* Insurance Services */}
    <section className="agent-section pad-tb" >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-11 ">
            <div className="common-heading">
              <h2 className="mb20"  data-aos-delay="100">
                <em> {useInsurance ? useInsurance.page_name : '...'}</em>
              </h2>
              <p  data-aos-delay="300" className="text-center" >
                {useInsurance ? useInsurance.page_name_title : '...'}
              </p>

              <div className="row divrightbdr">
                {useAllInsurance && useAllInsurance.length > 0 ? (
                  useAllInsurance.map((row, index) => ( 
                  <div className="col-lg-6" key={index}>
                    <div className="steps-div  mt30"  data-aos-delay="100" >
                      <div className="steps-icons-1">
                          <img src={`${apiConfig.apiImgUrl}/${row.images}`}
                          alt={`Step ${row.images || 'Not Available'}`} className="img-fluid"/>
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
      </div>
    </section>
              
    </MainLayout>
    </>
  )
}
