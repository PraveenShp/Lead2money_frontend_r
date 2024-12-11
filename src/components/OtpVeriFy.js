import React, { useEffect, useState } from "react";
import { useLoader } from "@/context/LoaderContext";
import Footer from '../layouts/Footer';
import Header from "../layouts/Header";
import { redirect, useParams } from 'next/navigation';
import { fetchData ,apiConfig} from '@/pages/fetchData';
import { useRouter } from 'next/router';
import { v5 as uuidv5 } from 'uuid';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OtpVerify() {
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [storedMobileNumber, setStoredMobileNumber] = useState(null);
    const { setIsLoading } = useLoader();
    const [formState, setFormState] = useState({
        mobileNumber: '',
        otp: '',
    });
   
    const router = useRouter();
    const onlyNumbersRegex = /^[0-9]+$/;
    const MobileMaxLength = 10;
    const OTP = 6;

    const handleFieldError = (field, message) => {
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [field]: message,
        }));
        setError("Please correct the highlighted errors.");
    };

    
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const OtpVerify = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});  
        
        const {
            otp,
            mobileNumber
        } = formState;
       
         if (!otp || !onlyNumbersRegex.test(otp) || otp.length !== OTP) {
            handleFieldError("otp", "otp must be 6 digits and contain only numbers.");
            return;
        }
        // Prepare the data
        const FormData = {
            mobile_no: mobileNumber,
            otp:otp
        };
        
        try {
            setIsLoading(true);
            const response = await axios.post(apiConfig.apilaravelUrl + "/otp/verify", FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // setFormState((prevProducts) =>
            //     prevProducts.filter()); 
            if(response.statusText == "OK" && response.status === 200){
                setMemberMobileNumber(mobileNumber);
                const Status = response.status;
                router.push('/');
            }else{
                console.log('error');
                setFormState((prevProducts) =>
                prevProducts.filter()); 
            }

        } catch (error) {
            console.error("Error occurred:", error.response ? error.response.data : error.message);
        }finally {
            setIsLoading(false); 
          }
    };


    useEffect(() => {
        const mobileNumber = localStorage.getItem("member_mobile_no");
        setStoredMobileNumber(mobileNumber);
    }, []);


  return (
    <>
        <Header/>

        <section className="agent-section">
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
              <div className="carousel slide" data-ride="carousel" data-interval="3000">
                  <div className="carousel-inner" style={{ height: "380px", overflow: "hidden" ,borderRadius: "15px"}} >
                    <div className="carousel-item active" >
                        <img className="d-block w-100" src="/image/hero-img-1.jpg" 
                        alt="Not Available" style={{ objectFit: "cover", height: "100%" }}/>
                    </div>
                  </div>
              </div>
            </div>
            <div className="col-lg-6 v-center">
              <div className="header-heading-1">
                <form onSubmit={OtpVerify}>
                    <h1 className="">
                    <span className="fw3">
                        {" "}
                        Login with <em>Mobile</em> Number 
                        {/* <em>{useTurn_Your_Network ? useTurn_Your_Network.page_name_title : ''}</em> */}
                    </span>
                    </h1>
                    <p data-aos-delay="400">
                    We need to send OTP to authenticate your number.
                    </p>    

                    <div className="col-md-8 mt30">
                        <div className="form-floating">
                        <input
                            name="mobileNumber"
                            maxLength={10}
                            readOnly
                            placeholder="Mobile Number"
                            value={storedMobileNumber}
                            onChange={(e) => setFormState({ ...formState, storedMobileNumber: e.target.value })}
                            className={`form-control ${fieldErrors.mobileNumber ? "is-invalid" : ""}`}
                        />
                        </div>
                    </div>
                    <div className="col-md-8 mt30">
                        <div className="form-floating">
                        <input
                            name="opt"
                            maxLength={6}
                            placeholder="OTP"
                            value={formState.otp}
                            onChange={(e) => setFormState({ ...formState, otp: e.target.value })}
                            className={`form-control ${fieldErrors.otp ? "is-invalid" : ""}`}
                        />
                        </div>
                    </div>
                    <button type="submit"
                        className="btnpora btn-rd2 mt30"
                        data-aos-delay="600"> Verify Otp </button>
                </form>

              </div>
              <div className="mt30">
                Don't have an account? <a href="/leadweb/signup">Sing Up </a>
                By clicking continue, you agree to our<br/> <a href="/leadweb/term-condition">Terms & Conditions</a> 
                and that you have read our <a href="/leadweb/privacy-policy">Privacy Policy</a>. </div>
            </div>
          </div>
        </div>
      </section>
        <Footer/>
    </>
  )
}
