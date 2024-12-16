import React, { useEffect, useState } from 'react';
import { fetchData } from '../util/fetchData';
import { useLoader } from '@/context/LoaderContext';
import MainLayout from '../layouts/MainLayout';

export default function DeliveryReturn() {

  const { setIsLoading } =  useLoader();
  const [useDeliveryReturns, setDeliveryReturns] = useState(null);
  const [useAllDeliveryReturns, setAllDeliveryReturns] = useState([]);

  
    // ****** Fetch Frequently Asked Questions API Function ******* \\
  const fetchDeliveryReturns = async () => { 
    const slug = 'delivery-policy';
    try {
      //setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setDeliveryReturns(response.data.data);
      setAllDeliveryReturns(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }finally{
      //setIsLoading(false);
    }
  }; 
  
    useEffect(() => {
      fetchDeliveryReturns();
    },[]);
    
  return (
    <>
     <MainLayout seo={{ title: 'Delivery Return' }}>

      <div className="container mt-5 ">
        <div className="d-flex align-items-center justify-content-center mt-5 mb-4 text-primary">
          <h2 className=" mt-5" data-aos-delay="100">
            <em> {useDeliveryReturns ? useDeliveryReturns.page_name_title : ''}</em>
          </h2>
        </div>

        <ul className="list-unstyled mb-5 ml-5 mr-5">
          {useAllDeliveryReturns && useAllDeliveryReturns.length > 0 ? (
                useAllDeliveryReturns.map((row, index) => (
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
        </ul>
      </div>

    </MainLayout>

    </>
  )
}
