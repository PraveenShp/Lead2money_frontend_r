import React, { useEffect, useState } from "react";
import { useLoader } from "@/context/LoaderContext";
import Footer from '../layouts/Footer';
import Header from "../layouts/Header";
import { redirect, useParams } from 'next/navigation';
import { fetchData ,apiConfig} from '@/pages/fetchData';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const { setIsLoading } = useLoader();
    const [formState, setFormState] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        mobileNumber: '',
        email: '',
        occupation: '',
        address1: '',
        address2: '',
        pinCode: '',
        city: '',
        state: '',
        qualification: '',
        referenceCode: '',

    });
    const [useStateAndCity, setUseStateAndCity] = useState({
        cityId: "",
        cityName: "",
        stateId: "",
        stateName: "",
    });
    const [useMemberName, setMemberName] = useState(""); // To store member name from API
    const [useReferCode, setReferCode] = useState('');
    const [useMobileView, setMobileView] = useState('no');
    const [isVisible, setIsVisible] = useState(false);
    const [useCheckOut, setCheckOut] = useState([]);
    const [useOccupations, setOccupations] = useState([]);
    const [useQualifications, setQualifications] = useState([]);
    const [useMamberData, setMamberData] = useState('');

    const [useFirstError, setFirstError] = useState(false);
    const [useMiddleError, setMiddleError] = useState(false);
    const [useLastError, setLastError] = useState(false);
    const [useGenderError, setGenderError] = useState(false);
    const [useDobError, setDobError] = useState(false);
    const [useMobileError, setMobileError] = useState(false);
    const [useEmailError, setEmailError] = useState(false);
    const [useOccupationError, setOccupationError] = useState(false);
    const [useAddressError, setAddressError] = useState(false);
    const [useAddress2Error, setAddress2Error] = useState(false);
    const [usePincodeError, setPincodeError] = useState(false);
    const [useCityError, setCityError] = useState(false);
    const [useStateError, setStateError] = useState(false);
    const [useQualificationError, setQualificationError] = useState(false);
    const [useReferenceCodeError, setUseReferenceCodeError] = useState(false);
    const router = useRouter();

    const onlyNumbersRegex = /^[0-9]+$/;
    const onlyTextRegex = /^[A-Za-z\s]+$/;
    const PinCodeMaxLength = 6;
    const MobileMaxLength = 10;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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


    const SignUp = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});  
        // SuccessFullPayNow();
        // return;
       
        const {
            firstName, middleName, lastName, gender, dateOfBirth,
            mobileNumber, email, occupation, address1, address2,
            pinCode, qualification, referenceCode,
        } = formState;
        // Validation
        if (!firstName || !onlyTextRegex.test(firstName)) {
            handleFieldError("firstName", "First name is required and must contain only letters.");
            return;
        }
        // if (!lastName || !onlyTextRegex.test(lastName)) {
        //     handleFieldError("lastName", "Last name is required and must contain only letters.");
        //     return;
        // }
        if (!gender) {
            handleFieldError("gender", "Gender is required.");
            return;
        }
        if (!dateOfBirth) {
            handleFieldError("dateOfBirth", "Date of birth is required.");
            return;
        }
        if (!mobileNumber || !onlyNumbersRegex.test(mobileNumber) || mobileNumber.length !== MobileMaxLength) {
            handleFieldError("mobileNumber", "Mobile number must be 10 digits and contain only numbers.");
            return;
        }
        if (!email || !emailRegex.test(email)) {
            handleFieldError("email", "A valid email is required.");
            return;
        }
        if (!occupation) {
            handleFieldError("occupation", "Occupation is required.");
            return;
        }
        if (!address1) {
            handleFieldError("address1", "Address is required.");
            return;
        }
        if (!pinCode || !onlyNumbersRegex.test(pinCode) || pinCode.length !== PinCodeMaxLength) {
            handleFieldError("pinCode", "Pin code must be 6 digits and contain only numbers.");
            return;
        }
        if (!useStateAndCity.cityName) {
            handleFieldError("city", "City is required.");
            return;
        }
        if (!useStateAndCity.stateName) {
            handleFieldError("state", "State is required.");
            return;
        }

        if (!qualification) {
            handleFieldError("qualification", "Qualification is required.");
            return;
        }
        if (!useMemberName) {
            handleFieldError("refercode", "Refer Code is required.");
            return;
        }

        // Prepare the data
        // const FormData = {
        //     first_name: firstName,
        //     middle_name: middleName || undefined,
        //     last_name: lastName,
        //     gender: gender,
        //     date_of_birth: dateOfBirth,
        //     mobile_no: mobileNumber,
        //     email: email,
        //     occupation: occupation,
        //     address1: address1,
        //     address2: address2 || undefined,
        //     pincode: pinCode,
        //     city: useStateAndCity.cityName,
        //     state: useStateAndCity.stateName,
        //     qualification: qualification,
        //     refer_code: useReferCode || undefined,
        // };

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("middle_name", middleName);
        formData.append("last_name", lastName);
        formData.append("gender", gender);
        formData.append("date_of_birth", dateOfBirth);
        formData.append("mobile_no", mobileNumber);
        formData.append("email", email);
        formData.append("occupation", occupation);
        formData.append("address1", address1);
        formData.append("address2", address2);
        formData.append("pincode", pinCode);
        formData.append("city", useStateAndCity.cityName);
        formData.append("state", useStateAndCity.stateName);
        formData.append("qualification", qualification);
        formData.append("refer_code", useReferCode);
        formData.append("deviceToken", "");
        formData.append("deviceType" , "");
    
        setFormState(formData);

        try {
            setIsLoading(true);
            const response = await axios.post(apiConfig.apilaravelUrl + "/member/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Mamber Register successfully!",response);
            // setFormState((prevProducts) =>
            //     prevProducts.filter());       
            console.log("response occurred:", response);

        } catch (error) {
            console.error("Error occurred:", error);
            toast.error(error);
        }finally {
            setIsLoading(false); 
          }
    };


    const CheckReferralMember = async (event) => {
        const ref = event.target.value.trim();
        if (!ref || ref.length <= 5) {
            setMemberName("");
            return;
        }
        setReferCode(ref);
        try {
           
            console.log('true');; 
            const data = await fetchData(`check_referral/${ref}`);
            if (data) {
                console.log("success", data.data);
                const {
                    member_first_name = "",
                    member_middle_name = "",
                    member_last_name = "",
                } = data.data;

                setMemberName(
                    `${member_first_name} ${member_middle_name} ${member_last_name}`.trim()
                );
            } else {
                setMemberName("");
                toast.error("Data Not Found .!");
            }
        } catch (error) {
            setMemberName("");
        }finally {
            console.log('false');; 
          }

    }


    const getOccupations = async () => {
        try {
            console.log('true');;
            const data = await fetchData(`occupations`);
            if (data) {
                setOccupations(data.data || []);
                // toast.success('Data fetched successfully!');

            } else {
                console.error("Data Not Found .!");
                // toast.error('Error fetching data. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            // toast.error('Error fetching data. Please try again.');
        }finally {
            console.log('false');; // Stop loader after operation
          }

    };


    const getQualifications = async () => {
        try {
            console.log('true');;
            const data = await fetchData(`qualifications`);
            if (data) {
                setQualifications(data.data || []);
                console.log(data.data);
            } else {
                console.error("Data Not Found .!");
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }finally {
            console.log('false');; 
          }

    };


    const getCityAndStateByPincode = async (event) => {
        const pincode = event.target.value.trim();

        console.log("Entered Pincode:", pincode);
        setFormState({ ...formState, pinCode: pincode })

        if (pincode.length === 6 && /^[0-9]+$/.test(pincode)) {
            try {
                
                const formData = JSON.stringify({ pincode });
                console.log('false');;
                const data = await fetchData(`city-state-by-pincode`, {
                    method: 'POST',
                    body: formData
                });

                if (data && data.data) {
                    const { cityId, cityName, stateId, stateName } = data.data;
                    setUseStateAndCity({
                        cityId,
                        cityName,
                        stateId,
                        stateName,
                    });
                    console.log('Updated useStateAndCity:', { cityId, cityName, stateId, stateName });
                } else {
                    console.error("Data not found in response!");
                    setUseStateAndCity({ cityId: '', cityName: '', stateId: '', stateName: '' });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setUseStateAndCity({ cityId: '', cityName: '', stateId: '', stateName: '' });;
            } finally {
                console.log('false');; 
              }
        } else if (pincode.length < 6 && useStateAndCity.cityName && useStateAndCity.stateName) {
            setUseStateAndCity({ cityId: '', cityName: '', stateId: '', stateName: '' });;
            console.log(pincode, 'Cleared due to insufficient length');
        }
    };
        

    useEffect(() => {
        getOccupations();
        getQualifications();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


  return (
    <>
        <Header/>

        <section class="agent-section">
            <div className="container">
                <div className="d-flex align-items-center justify-content-center mt-4 mb-4 ">
                    <h2 className="d-flex align-items-center justify-content-center">
                        <em> Sign Up</em>
                    </h2>
                </div>

                <form onSubmit={SignUp}>
                <div class="row">
                    {/* <!-- Form Section --> */}
                    <div class="col-lg-12">
                        <div className="card shadow p-4">
                                <h3 className="mb-4">Create an Account!</h3>
                                {error && <div id="error" className="text-danger mb-3">{error}</div>}
                                <div className="row mb-3">
                                    {/* First Name Field */}
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                        <input className={`form-control ${fieldErrors.firstName ? "is-invalid" : ""}`}
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formState.firstName}
                                            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="middleName"
                                                placeholder="Middle Name"
                                                value={formState.middleName}
                                                onChange={(e) => setFormState({ ...formState, middleName: e.target.value })}
                                                className={`form-control ${fieldErrors.middleName ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={formState.lastName}
                                                onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                                                className={`form-control ${fieldErrors.lastName ? "is-invalid" : ""}`}
                                            />
                                        </div> 
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <select name="gender" id="" className={`form-control ${fieldErrors.gender ? "is-invalid" : ""}`} placeholder="Gender"
                                                onChange={(e) => setFormState({ ...formState, gender: e.target.value })} >
                                                <option value="" className='bg-gray-300'>Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="FeMale">Female</option>
                                                <option value="Transgender">Transgender</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="dateOfBirth"
                                                type='date'
                                                placeholder="Date of Birth"
                                                value={formState.dateOfBirth}
                                                onChange={(e) => setFormState({ ...formState, dateOfBirth: e.target.value })}
                                                className={`form-control ${fieldErrors.dateOfBirth ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
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
                                </div>
                                
                                <div className='row mb-3'>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="email"
                                                placeholder="Email"
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <select
                                                className={`form-control ${fieldErrors.occupation ? "is-invalid" : ""}`}
                                                placeholder="Occupation" name="occupation"
                                                value={formState.occupation}
                                                onChange={(e) => setFormState({ ...formState, occupation: e.target.value })}
                                            >
                                                <option className='bg-gray-300' value="">Occupations</option>
                                                {useOccupations?.map((row, index) => (
                                                    <option key={index} value={row.id}>{row.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="address1"
                                                placeholder="Address 1"
                                                value={formState.address1}
                                                onChange={(e) => setFormState({ ...formState, address1: e.target.value })}
                                                className={`form-control ${fieldErrors.address1 ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="address2"
                                                placeholder="Address 2"
                                                value={formState.address2}
                                                onChange={(e) => setFormState({ ...formState, address2: e.target.value })}
                                                className={`form-control ${fieldErrors.address2 ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="pinCode"
                                                maxLength={6}
                                                placeholder="Enter Pincode"
                                                onChange={(e) => setFormState({ ...formState, pinCode: e.target.value })}
                                                onKeyUp={getCityAndStateByPincode}
                                                className={`form-control ${fieldErrors.pinCode ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="city"
                                                readOnly
                                                placeholder="City"
                                                value={useStateAndCity.cityName}
                                                className={`form-control ${fieldErrors.cityName ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="state"
                                                readOnly
                                                placeholder='State'
                                                value={useStateAndCity.stateName}
                                                className={`form-control ${fieldErrors.stateName ? "is-invalid" : ""}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <select
                                                className={`form-control ${fieldErrors.qualification ? "is-invalid" : ""}`}
                                                placeholder="Qualification"
                                                name="qualification"
                                                value={formState.qualification}
                                                onChange={(e) => setFormState({ ...formState, qualification: e.target.value })}
                                            >
                                                <option className="bg-gray-300" value="">Qualification</option>
                                                {useQualifications?.map((row, index) => (
                                                    <option key={index} value={row.id}>{row.name}</option>
                                                ))}
                                            </select>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <input
                                                name="referenceCode"
                                                placeholder="Reference Code"
                                                onKeyUpCapture={(event) => CheckReferralMember(event)}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        referenceCode: e.target.value,
                                                    })
                                                }
                                                className={`form-control ${fieldErrors.referenceCode ? "is-invalid" : ""}`}
                                            />
                                            {useMemberName && (
                                                <div className="absolute top-10 right-30 bg-gray-200 text-sm text-black px-2 py-1 rounded">
                                                    {useMemberName}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-sm-12">
                                        <div className="d-flex align-items-center justify-content-center mt-4 mb-4 ">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <button type="submit" class="btn btn-primary w-100 mt-4">
                                                Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="col-sm-12">
                                        <div className="d-flex align-items-center justify-content-center mt-4 mb-4 ">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>
                                                    Already have an account? 
                                                </span>
                                                <a href="/leadweb/login">
                                                    Login here!
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </section>

        
        <Footer/>
    </>
  )
}
