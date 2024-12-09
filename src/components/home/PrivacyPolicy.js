import React, { useEffect, useState } from 'react';
import { fetchData } from '@/pages/fetchData';
import { useLoader } from '@/context/LoaderContext';
import Footer from "../../layouts/Footer";


export default function TermCondition() {
  const { setIsLoading } =  useLoader();
  const [ useAllPrivecyPolicy, setAllPrivecyPolicy] = useState([]);
  const [ usePrivecyPolicy, setPrivecyPolicy] = useState(null);
  
    // ****** Fetch fetchPrivacyPolicy API Function ******* \\
  const fetchPrivacyPolicy = async () => { 
    const slug = 'privacy-policy';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setPrivecyPolicy(response.data.data);
      setAllPrivecyPolicy(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }finally{
      setIsLoading(false);
    }
  }; 
  
    useEffect(() => {
      fetchPrivacyPolicy();
    },[]);

  return (
    <>
      <div className="container mt-5 ">
        <div className="d-flex align-items-center justify-content-center mt-5 mb-4 text-primary">
          <h2 className=" mt-5" data-aos="fade-up" data-aos-delay="100">
            <em> {usePrivecyPolicy ? usePrivecyPolicy.page_name : ''}</em>
          </h2>
        </div>

        <ul className="list-unstyled mb-5 ml-5 mr-5">
          <p data-aos="fade-up" data-aos-delay="300" className="text-start w-100 mb-4" >
            {usePrivecyPolicy ? usePrivecyPolicy.page_name_title : ''}
          </p>
            {useAllPrivecyPolicy && useAllPrivecyPolicy.length > 0 ? (
              useAllPrivecyPolicy.map((row, index) => (
              <li className="text-justify" key={index}>
                <div className="d-flex flex-column align-items-start">
                  <h5 className="" data-aos-delay="100">
                    <em>{row.page_title1}</em>
                  </h5>
                    <p data-aos-delay="300" className="text-start w-100" >
                    {row.page_value1}
                    </p>
                  <br/>
                </div>
              </li>
            ))
            ) : (
              <li className="text-center">
                <p>No data available</p>
              </li>
            )}
        </ul>
      </div>
      <Footer/>
    </>
  );
}
