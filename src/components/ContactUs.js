import { useLoader } from "@/context/LoaderContext";
import React, { useState,formState ,useEffect} from 'react';
import { fetchData,apiConfig } from '../util/fetchData';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import MainLayout from "../layouts/MainLayout";

export default function ContactUs() {

  const { setIsLoading } =  useLoader();
  const [useHowItWork, setHowItWork] = useState(null);
  const [useHowItWorkAll, setHowItWorkAll] = useState([]);

  
  
  //**************** Contect Form Submit Function Start ************** */
  const [formState, setFormState] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });
  
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  const onlyNumbersRegex = /^[0-9]+$/;
  const onlyTextRegex = /^[A-Za-z\s]+$/;
  const MobileMaxLength = 10;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

  const validateForm = (formState) => {
    let errors = {};
    if (!formState.name || !onlyTextRegex.test(formState.name)) {
      errors.name = 'Name is required and should contain only text.';
    }
    if (!formState.email || !emailRegex.test(formState.email)) {
      errors.email = 'Valid email is required.';
    }
    if (!formState.mobile || !onlyNumbersRegex.test(formState.mobile) || formState.mobile.length !== MobileMaxLength) {
      errors.mobile = 'Mobile number must be 10 digits.';
    }
    if (!formState.message) {
      errors.message = 'Message cannot be empty.';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      if(name === 'mobile' && !/^[0-9]*$/.test(value)){
        return
      }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
	
  
  
    const FormSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validateForm(formState);
    setFieldErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      setError('Please fills all red line fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append("user_name", formState.name); 
    formData.append("mobile", formState.mobile); 
    formData.append("email", formState.email); 
    formData.append("message", formState.message); 
    
    try {
      ////setIsLoading(true);
      const response = await axios.post(apiConfig.apilaravelUrl + "/store-contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        toast.success("Request Submitted successfully!");
        setTimeout(() => {
        setFormState({
          name: '',
          mobile: '',
          email: '',
          message: '',
        });
        setFieldErrors({});
       
         }, 2000);
        setError('');
    } catch (error) {
      console.error("Error submitting form:", error);
      //toast.error("Submit Error.. !");
    }finally{
      ////setIsLoading(false);
    }
  };

  
  useEffect(() => {
  },[]);


  return (
    <>
  
    <MainLayout seo={{ title: 'Contact Us' }}>

      <section section className="agent-section pad-tb" id="how-it-works">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-11 ">
                <div className="common-heading">
                  <h2 className="mb20"  data-aos-delay="100">
                    <em>Contact Us</em>
                  </h2>
				  
                  {/* Step 1 */}
                  {/* <!--contact popup start-->*/}
					<div id="modal_aside_right" >
					  <div class="modal-dialog modal-dialog-aside" role="document">
						<div class="modal-content">
						  <div class="modal-header">
							<h5 class="modal-title">Express Your Interest!</h5>
						  </div>
						  <div class="modal-body">
							<div class="form-block border0 noshadow mt30">
							<form onSubmit={FormSubmit}>
							  <div className="row">
								<div className="form-group col-sm-12">
								  <input
									type="text"
									onChange={handleInputChange}
									value={formState.name}
									name="name"
									className={`form-control ${fieldErrors.name ? 'border border-danger' : 'border border-gray'}`}
									placeholder="Enter name"
								  />
								</div>
								<div className="form-group col-sm-12">
								  <input
									type="email"
									onChange={handleInputChange}
									value={formState.email}
									name="email"
									className={`form-control ${fieldErrors.email ? 'border border-danger' : 'border border-gray'}`}
									placeholder="Enter email"
								  />
								</div>
								<div className="form-group col-sm-12">
								  <input
									type="text"
									onChange={handleInputChange}
									value={formState.mobile}
									name="mobile"
									maxLength={10}
									className={`form-control ${fieldErrors.mobile ? 'border border-danger' : 'border border-gray'}`}
									placeholder="Enter mobile"
								  />
								</div>
								<div className="form-group col-sm-12">
								  <textarea
									onChange={handleInputChange}
									value={formState.message}
									name="message"
									className={`form-control ${fieldErrors.message ? 'border border-danger' : 'border border-gray'}`}
									rows="5"
									placeholder="Enter your message"
								  />
								</div>
							  </div>

							  {error && <div className="text-danger">{error}</div>}

							  <button type="submit" className="btn-rd w-100">
								Submit
							  </button>
							</form>
							</div>
						  </div>
						</div>
					  </div>
					</div>
					{/* <!--contact popup end--> */}
                </div>
              </div>
            </div>
          </div>
      </section>  

    </MainLayout>
    </>
  )
}
