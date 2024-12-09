import React, { useEffect, useState } from "react";
import { fetchData } from '@/pages/fetchData';
import { useLoader } from "@/context/LoaderContext";
import Footer from '../layouts/Footer';


export default function Shipping() {

  const { setIsLoading } =  useLoader();
  const [useAllShipping, setAllShipping] = useState([]);
  const [useShipping, setShipping] = useState(null); 

  
    // ****** Fetch Frequently Asked Questions API Function ******* \\
  const fetchShipping = async () => { 
    const slug = 'shipping-policy';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setShipping(response.data.data);
      setAllShipping(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }finally{
      setIsLoading(false);
    }
  }; 
  
  useEffect(() => {
    fetchShipping();
  },[]);


  return (
    <>
      <div className="container mt-5 ">
        <div className="d-flex align-items-center justify-content-center mt-5 mb-4 text-primary">
          <h2 className=" mt-5" data-aos="fade-up" data-aos-delay="100">
            <em> {useShipping ? useShipping.page_name : ''}</em>
          </h2>
        </div>

        <ul className="list-unstyled mb-5 ml-5 mr-5">
        {useAllShipping && useAllShipping.length > 0 ? (
            useAllShipping.map((row, index) => (
            <li className="text-justify" key={index}>
              <div className="d-flex flex-column align-items-start">
                <h5 className="" data-aos-delay="100">
                  <em>{row.page_title1}</em>
                </h5>
                <p className="text-start w-100" >
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
          <p data-aos="fade-up" className="text-start w-100 mt-5" >
             If you have any questions or need further assistance regarding shipping, feel free to contact our customer support team. We appreciate your support and hope our terracotta utensils and other items bring joy and functionality to your life!
          </p>
        </ul>
      </div>
      <Footer/>
    </>
  )
}
