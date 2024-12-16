import React, { useEffect, useState } from "react";
import { useLoader } from "@/context/LoaderContext";
import { redirect, useParams } from 'next/navigation';
import { fetchData ,apiConfig} from '../util/fetchData';
import { useRouter } from 'next/router';
import { v5 as uuidv5 } from 'uuid';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

export default function Login() {
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
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
        setError("Please fills all red line fields.");
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


    const Login = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});  
        const {
            mobileNumber,
        } = formState;
       
        if (!mobileNumber || !onlyNumbersRegex.test(mobileNumber) || mobileNumber.length !== MobileMaxLength) {
            handleFieldError("mobileNumber", "Mobile number must be 10 digits and contain only numbers.");
            return;
        }
        // Prepare the data
        const FormData = {
            mobile_no: mobileNumber,
        };
        try {
            //setIsLoading(true);
            const response = await axios.post(apiConfig.apilaravelUrl + "/login", FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.statusText == "OK" && response.status === 200){
                localStorage.setItem("member_mobile_no", mobileNumber);
                router.push('/leadweb/otp-verify');
            }else{
                console.log('error');
                setFormState((prevProducts) =>
                prevProducts.filter()); 
            }
           
        } catch (error) {
            console.error("Error occurred:", error.response ? error.response.data : error.message);
        }finally {
            //setIsLoading(false); 
          }
    };



    useEffect(() => {
       
    }, []);


  return (
    <>
   <MainLayout seo={{ title: 'Login' }}>

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
                <form onSubmit={Login}>
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
                            placeholder="Mobile Number"
                            value={formState.mobileNumber}
                            onChange={(e) => setFormState({ ...formState, mobileNumber: e.target.value })}
                            className={`form-control ${fieldErrors.mobileNumber ? "is-invalid" : ""}`}
                        />
                        </div>
                    </div>
                    <button type="submit"
                        className="btnpora btn-rd2 mt30"
                    
                        data-aos-delay="600"> Login </button>
                </form>

                </div>
                <div className="mt30">
                Don't have an account? <Link href="/leadweb/signup">Sing Up </Link>
                By clicking continue, you agree to our<br/> <Link href="/leadweb/term-condition">Terms & Conditions</Link> 
                and that you have read our <Link href="/leadweb/privacy-policy">Privacy Policy</Link>. </div>
            </div>
            </div>
        </div>
        </section>
        
    </MainLayout>
    </>
  )
}
