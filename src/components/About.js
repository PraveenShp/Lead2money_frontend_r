import React, { useState ,useEffect} from 'react'
import { useRouter } from 'next/router';
import { fetchData ,apiConfig} from '../util/fetchData';
import { useLoader } from '../context/LoaderContext';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';

const About = () => {
 
    const [useAboutUs, setAboutUs] = useState(null);
    const [useAllAboutUs, setAllAboutUs] = useState([]); 
    const router = useRouter();
    const { setIsLoading } = useLoader();
    
  // ****** Fetch WhyChoose Lead2money API Function ******* \\
  const fetchAboutUs = async () => { 
    const slug = 'about-us';
    try {
      // //setIsLoading(true);
      const response = await fetchData(`page-details?slug=${encodeURIComponent(slug)}`);
      setAboutUs(response.data.data);
      setAllAboutUs(response.data.alldata);
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing the payment.");
    }finally{
      // //setIsLoading(false);
    }
  }; 


  useEffect(() => {

    fetchAboutUs();

  }, []);
  
    return (
    <>
      <MainLayout seo={{ title: 'Delivery Return' }}> 
        
        {/* About us */}
      <section className="about-bg-2 pad-tb" id="about">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-11">
            <div className="common-heading">
              <h2 className="mb20"  data-aos-delay="100">
                <em>{useAboutUs ? useAboutUs.page_name : ''}</em>
              </h2>
              <p >
                {useAboutUs ? useAboutUs.page_name_title : ''} 
              </p><br/>
            </div>
          </div>
        </div>
        {useAllAboutUs && useAllAboutUs.length > 0 ? (
          useAllAboutUs.map((row, index) => (
            <div className="row m-text-c" key={index}>
              {index % 2 === 0 ? (
                // For even index: title on top, image on bottom
                <>
                  <div className="col-lg-6 v-center title">
                    <div className="about-company">
                      <h2 className="mb20" data-aos-delay="100">
                        <em>{row.page_title1}</em>
                      </h2>
                      <p data-aos-delay="300">{row.page_value1}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 v-center img-div">
                    <div className="img-box1 m-mt60" data-aos-delay="500">
                      <img width="85%"
                        src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={row.page_name}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </>
              ) : (
                // For odd index: image on top, title on bottom
                <>
                  <div className="col-lg-6 v-center img-div">
                    <div className="img-box1 m-mt60" data-aos-delay="500">
                      <img width="85%"
                        src={`${apiConfig.apiImgUrl}/${row.images}`}
                        alt={row.page_name}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 v-center title">
                    <div className="about-company">
                      <h2 className="mb20" data-aos-delay="100">
                        <em>{row.page_title1}</em>
                      </h2>
                      <p data-aos-delay="300">{row.page_value1}</p>
                     
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <li className="text-center">
            <p>No data available</p>
          </li>
        )}
      </div>
    </section>


    </MainLayout>
    </>

    
    )
}
export default About

