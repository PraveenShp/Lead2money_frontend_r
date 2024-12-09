import React, { useEffect, useState } from 'react';
import { fetchData } from '@/pages/fetchData';
import { useLoader } from '@/context/LoaderContext';
import Footer from '../layouts/Footer'

export default function DeliveryReturn() {

  const { setIsLoading } =  useLoader();
  const [useDeliveryReturns, setDeliveryReturns] = useState(null);
  const [useAllDeliveryReturns, setAllDeliveryReturns] = useState([]);

  
    // ****** Fetch Frequently Asked Questions API Function ******* \\
  const fetchDeliveryReturns = async () => { 
    const slug = 'delivery-policy';
    try {
      setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setDeliveryReturns(response.data.data);
      setAllDeliveryReturns(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
    }finally{
      setIsLoading(false);
    }
  }; 
  
    useEffect(() => {
      fetchDeliveryReturns();
    },[]);
  return (
    <>
      <div className="container mt-5 ">
        <div className="d-flex align-items-center justify-content-center mt-5 mb-4 text-primary">
          <h2 className=" mt-5" data-aos="fade-up" data-aos-delay="100">
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

          {/* <li className="text-justify mt-4">
            <div className="d-flex flex-column align-items-start">
              <h5 className="" data-aos="fade-up" data-aos-delay="100">
                <em>
                Return Policy:</em>
              </h5>
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-start w-100"
              >
                While we strive for your complete satisfaction, we understand that circumstances may require a return. If you receive a damaged or defective item, please contact us within 7 days of receiving your order. We will gladly replace the item or provide a refund, ensuring you are delighted with your purchase. <br/>
In case you wish to return an item for reasons other than damage or defect, we accept returns within 14 days of delivery. The returned item must be unused, in its original packaging, and in the same condition as received. Return shipping costs will be the responsibility of the customer. <br/>
To initiate a return, please contact our customer support team with your order number and details of the issue. We will guide you through the return process and provide any necessary instructions.<br/>
Refunds are processed promptly upon receipt of the returned item. Please note that it may take a few business days for the refund to reflect in your account , we assure that it will be within 10 working days from the date of item received back to us in original condition.<br/>
For any queries or assistance regarding delivery or returns, feel free to reach out to our customer support team. Your satisfaction is our priority, and we are here to ensure your experience with our terracotta utensils is nothing short of exceptional.
              </p>
            </div>
          </li> */}
        </ul>
      </div>
      <Footer/>
    </>
  )
}
