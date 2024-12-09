import React, { useEffect, useState } from 'react';
import { fetchData } from '@/pages/fetchData';
import { useLoader } from '@/context/LoaderContext';
import Footer from "../layouts/Footer";

export default function TermCondition() {

  const { setIsLoading } =  useLoader();
  const [useTermCondition, setTermCondition] = useState(null);
  const [useAllTermCondition, setAllTermCondition] = useState([]);

  
    // ****** Fetch Frequently Asked Questions API Function ******* \\
  const fetchTermCondtion = async () => { 
    const slug = 'terms-conditions';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setTermCondition(response.data.data);
      setAllTermCondition(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }finally{
      setIsLoading(false);
    }
  }; 
  
    useEffect(() => {
      fetchTermCondtion();
    },[]);

  return (
    <>
      <div className="container mt-5 ">
        <div className="d-flex align-items-center justify-content-center mt-5 mb-4 text-primary">
          <h2 className=" mt-5"  data-aos-delay="100">
            <em> {useTermCondition ? useTermCondition.page_name : ''} </em>
          </h2>
        </div>
      
        <ul className="list-unstyled mb-5 ml-5 mr-5">
           {useAllTermCondition && useAllTermCondition.length > 0 ? (
            useAllTermCondition.map((row, index) => (
            <li className="text-justify" key={index}>
              <div className="d-flex flex-column align-items-start">
                <h5 className=""  data-aos-delay="100">
                  <em>{row.page_title1}</em>
                </h5>
                <p  data-aos-delay="300" className="text-start w-100" >
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
