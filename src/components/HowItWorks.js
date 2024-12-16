import React, { useEffect, useState } from "react";
import { fetchData ,apiConfig} from '../util/fetchData';
import { useLoader } from "@/context/LoaderContext";
import MainLayout from "../layouts/MainLayout";


export default function HowItWorks() {

  const { setIsLoading } =  useLoader();
  const [useHowItWork, setHowItWork] = useState(null);
  const [useHowItWorkAll, setHowItWorkAll] = useState([]);

  
    // ****** Fetch Howe It Works API Function ******* \\
    const fetcHoweWorks = async () => { 
        const slug = 'how-it-works';
        try {
          //setIsLoading(true);
          const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
          setHowItWork(response.data.data);
          setHowItWorkAll(response.data.alldata);
        } catch (error) {
          console.error("Error occurred:", error.response ? error.response.data : error.message);
          toast.error("An error occurred while processing the payment.");
        }finally{
          //setIsLoading(false);
        }
      }; // ***
  
  useEffect(() => {
    fetcHoweWorks();
  },[]);

  
  return (
    <>
    <MainLayout seo={{ title: 'How It Work' }}>
       <section section className="agent-section pad-tb" id="how-it-works">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-11 ">
                <div className="common-heading">
                  <h2 className="mb20" data-aos-delay="100">
                    <em>{useHowItWork ? useHowItWork.page_name : ''}</em>
                  </h2>
                  <p data-aos-delay="300" className=" text-center" >
                     {useHowItWork ? useHowItWork.page_name_title : ''}
                  </p>
                  {/* Step 1 */}
                 {useHowItWorkAll.map((row, index) => (
                    row.page_title1 !== "" && (
                      <div
                        className={`container mt-5`}
                        key={index}
                      >
                        <div className={`row align-items-center bg-white ${index % 2 === 0 ? "" : "flex-row-reverse d-flex"}`}>
                          {/* Text Section */}
                          <div className="col-lg-6 text-center py-4" data-aos-delay="100">
                            <h2 className="mb-20">
                              <em>{row.page_title1}</em>
                            </h2>
                            <p className="text-center" data-aos-delay="300">
                              {row.page_value1}
                            </p>
                          </div>

                          {/* Image Section */}
                          <div className="col-lg-6 text-center py-4">
                            <div className="m-mt60" data-aos-delay="100">
                              <img
                                src={`${apiConfig.apiImgUrl}/${row.images}`}
                                alt={`Step ${row.images || "Not Available"}`}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
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
