import React, { useState, useEffect } from 'react'
import { redirect, useParams } from 'next/navigation';
import { fetchData ,apiConfig} from '../util/fetchData';
import { useRouter } from 'next/router';
import { v5 as uuidv5 } from 'uuid';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainLayout from '../layouts/MainLayout';

export default function Checkout() {
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const [formState, setFormState] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfBirth: null,
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

    const [useShippingValue, setShippingValue] = useState(0);
    const [subtotal, setSubtotal] = useState('0.00');
    const [total, setTotal] = useState('0.00');
    const [cgst, setCgst] = useState('0.00');
    const [sgst, setSgst] = useState('0.00');
    const [igst, setIgst] = useState('0.00');
    const router = useRouter();
    const { id } = useParams();

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
        setError("Please fills all red line fields.");
    };


    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleDateChange = (date) => {
        setFormState({ ...formState, dateOfBirth: date });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    

    const SuccessFullPayNow = async () => {

        const NAMESPACE = uuidv5.URL;
        const transitionId = `L2M-${Date.now()}`;
        const rawUuid = uuidv5('phonpay', NAMESPACE);
        const numericUuid = rawUuid.replace(/\D/g, '');

        const payload = {
            merchantId: apiConfig.merchantId,
            merchantTransactionId: transitionId,
            merchantUserId: `MUID${numericUuid.slice(-12)}`,
            amount: 1,
            redirectUrl: apiConfig.liveUrl2,
            redirectMode: "POST",
            callbackUrl: apiConfig.liveUrl2,
            phone: apiConfig.paymentMobile,
            paymentInstrument: {
                type: "PAY_PAGE"
            },
        }
        const dataPayload = JSON.stringify(payload);
        const dataBase64 = Buffer.from(dataPayload).toString("base64");

        const fullUrl = dataBase64 + "/pg/v1/pay" + apiConfig.saltKey;
        const dataSha256 = SHA256(fullUrl);
        const checksum = dataSha256 + "###" + apiConfig.saltIndex;
        console.log('fullUrl ==== ', fullUrl);
        console.log('dataBase64 ==== ', dataBase64);
        console.log('checksum ==== ', checksum);
        //------UTL PHONE PAY URL ----- https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay 
        // ----   Production URL =======  https://api.phonepe.com/apis/hermes/pg/v1/pay
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        // const Url = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';
        const Url = 'https://api-preprod.phonepe.com/apis/hermes';
        try {
            console.log('true');
            const response = await axios.post( Url, {
                    request: dataBase64, },
                { headers: {
                        accept: "application/json",
                        'Content-Type': "application/json",
                        "X-VERIFY": checksum
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log('Payment Successful:', data);
            } else if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After') || 2000;
                console.warn(`Too many requests. Retrying in ${retryAfter}ms...`);
                await delay(retryAfter);
                //   return SuccessFullPayNow();
            } else {
                console.error('Failed Payment:', response.status, await response.json());
            }

        } catch (error) {
            console.error('Error:', error);
        }finally {
            console.log('false');; 
          }

    }
    

    const proceedToPayNow = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});  
        SuccessFullPayNow();
        return;
       
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
        const FormData = {
            first_name: firstName,
            middle_name: middleName || undefined,
            last_name: lastName,
            gender: gender,
            date_of_birth: dateOfBirth,
            mobile_no: mobileNumber,
            email: email,
            occupation: occupation,
            address1: address1,
            address2: address2 || undefined,
            pincode: pinCode,
            city: useStateAndCity.cityName,
            state: useStateAndCity.stateName,
            qualification: qualification,
            refer_code: useReferCode || undefined,
        };

        try {
            console.log('true');;
            const response = await axios.post(apiConfig.apilaravelUrl + "/paynow", FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log('response--------------', response);
            toast.success("Payment processed successfully!");
            setFormState((prevProducts) =>
                prevProducts.filter());                 
        } catch (error) {
            console.error("Error occurred:", error.response ? error.response.data : error.message);
            toast.error(error.response.data.message);
        }finally {
            console.log('false');; 
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


    const handleCheckout = async (id) => {
        // const ids = Array.isArray(useCartId) ? useCartId : [useCartId];
        // ids.push(shippingValue);
        // const data = encodeURIComponent(ids.join('&'));
        try {
            console.log('true');; 
            const data = await fetchData(`cart/filteritem/${id}`);
            if (data) {
                console.log("success", data.data);
                setCheckOut(data.data.cart_data[0]);
                setShippingValue(data.data['shipping'] == 'courier' ? 100 : 0);
                console.log(useShippingValue);
                if (Array.isArray(data.data.cart_data)) {
                    data.data.cart_data.map((item, index) => {
                        const calculatedCgst = parseFloat((item.cart_price * 6) / 100);
                        const calculatedSgst = parseFloat((item.cart_price * 6) / 100);
                        const calculatedTotal = parseFloat(item.cart_price)
                        + parseFloat(data.data['shipping'] == 'courier' ? 100 : 0) + parseFloat(calculatedCgst) + parseFloat(calculatedSgst) + parseFloat(igst);
                        setIgst(0);
                        setCgst(isNaN(calculatedCgst) ? '0.00' : calculatedCgst);
                        setSgst(isNaN(calculatedSgst) ? '0.00' : calculatedSgst);
                        setTotal(isNaN(calculatedTotal) ? '0.00' : calculatedTotal);
                    });
                } else {
                    console.error("cart_data is not an array.");
                }

            } else {
                console.error("Data Not Found .!");
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }finally {
            console.log('false');; 
          }
    };


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
        handleCheckout(id);
        getOccupations();
        getQualifications();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [id]);


    return (
        <>
        <MainLayout seo={{ title: 'Check Out' }}>
        
        <section class="agent-section">
            <div className="container">
                <div className="d-flex align-items-center justify-content-center mt-4 mb-4 ">
                    <h2 className="d-flex align-items-center justify-content-center">
                        <em> Check Out</em>
                    </h2>
                </div>

                <form onSubmit={proceedToPayNow}>
                <div class="row">
                    {/* <!-- Form Section --> */}
                    <div class="col-lg-8">
                        <div className="card shadow p-4">
                                <h3 className="mb-4">Personal Information</h3>
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
                                            {/* <input
                                                name="dateOfBirth"
                                                type='date'
                                                placeholder="Date of Birth"
                                                value={formState.dateOfBirth}
                                                onChange={(e) => setFormState({ ...formState, dateOfBirth: e.target.value })}
                                                className={`form-control ${fieldErrors.dateOfBirth ? "is-invalid" : ""}`}
                                            /> */}
                                            <DatePicker
                                                selected={formState.dateOfBirth}
                                                onChange={handleDateChange}
                                                className="form-control"
                                                dateFormat="dd/MM/yyyy" // Custom date format
                                                placeholderText="DD/MM/YYYY"
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
                        </div>
                    </div>

                    {/* <!-- Order Summary Section --> */}
                    <div class="col-lg-4">
                        <div class="card shadow p-2">
                            <h3 class="fs-3 text-center mb-2">Your Order</h3>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between">
                                <b>Product</b>
                                <b>Subtotal</b>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <b>{useCheckOut ? useCheckOut.title : ''} × {useCheckOut ? useCheckOut.qty : '0'}</b>
                                <span>₹{parseFloat(useCheckOut ? useCheckOut.cart_price : '0.00')}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <b>Shipping</b>
                                <span>₹{parseFloat(useShippingValue) ? useShippingValue : '0.00'}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <b>CGST (6%)</b>
                                <span>₹{parseFloat(cgst) ? cgst : '0.00'}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <b>SGST (6%)</b>
                                <span>₹{parseFloat(sgst) ? sgst : '0.00'}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between fw-bold">
                                <b>Total</b>
                                <span>₹{parseInt(total) ? total : '0.00'}</span>
                            </li>
                            </ul>
                            <button type="submit" class="btn btn-primary w-100 mt-4">
                            Pay Now
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </section>
            
        </MainLayout>                         
      </>
      
    );
}
