import React, { useState ,useEffect} from 'react'
import { fetchData,apiConfig} from '@/pages/fetchData';
import { useRouter } from 'next/router';
import Footer from '../layouts/Footer'
import { useLoader } from '../context/LoaderContext';
import Header from '../layouts/Header';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const {setIsLoading} = useLoader();
  const [useShowProducts, setShowProducts] = useState(true);
  const [useFormData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  //***** Product Fatch Data Api */
  const fetchProducts = async() => {
    try {
      setIsLoading(true);
     console.log('successfull');
      const data = await fetchData("products");
      setProducts(data.data || []);
      console.log('responce data get' ,data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally {
      setIsLoading(false);
    }
  };

  
  // All Product Details Get url function 
  const handleProductDetails = async (Id) => { 
    const id = Id;
    if(id !== ""){
      router.push(`/leadweb/ProductDetails/${id}`);
    }else{
      console.log("Check Out Fetch Error ..");
    }
};

  // ******  Product Toggle Button ****************\\ 
  const setShowTerracotta = (value) => {
    console.log(value);
    if (value === "Terracotta") {
        setShowProducts(true);
        setFormData("Terracotta");
    } else {
        setShowProducts(false);
        setFormData("Garments");
    }
    setErrors({ ...errors, [value]: "" });
  };


  useEffect(() => {

    fetchProducts();

  }, []);
  
    return (
    <>
    {/* Products */}
        <section className="agent-section pad-tb" id="products">
        <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-6">
                  <div className="common-heading">
                    <h2 className="mb20" data-aos="fade-up" data-aos-delay="100"><em>Products</em></h2> 
                    <p data-aos="fade-up" data-aos-delay="300">Fresh Products Finds Await!
                    </p>
                  </div>
                  <div className="text-primary text-center d-flex align-items-center justify-content-center gap-3 my-3">
                    <button
                      className={`btn border-0 px-3 pb-2 ${useShowProducts ? "border-bottom border-danger" : ""}`}
                      onClick={() => setShowTerracotta("Terracotta")} >
                      Terracotta
                    </button>
                    <button
                      className={`btn border-0 px-3 pb-2 ${!useShowProducts ? "border-bottom border-danger" : ""}`}
                      onClick={() => setShowTerracotta("Garments")} >
                      Garments
                    </button>
                  </div>
              </div>
            </div>

            <div className="row mt30">
                {products && products.length > 0 ? (
                  products.map((row, index) => {
                  if (
                    (row.product_type === 'terracotta') && 
                    (useShowProducts === true)
                  ) {
                  return (
                  <div key={index} className="col-lg-3 col-6 mt-3" data-aos="fade-In" data-aos-delay="100">
                      <div className="full-image-card hover-scale">
                        <div className="image-div">
                              <a href="#"><img src={`${apiConfig.apiLiveUrl}/${row.product_image}`} 
                                alt={row.name} className="img-fluid" /></a>
                        </div>
                        <div className="info-text-block ">
                          <h5><a href="#" className='d-flex justify-content-center align-items-center'>{row.title}</a></h5>
                          <div className="d-flex justify-content-center align-items-center mt-1">
                            {[...Array(5)].map((_, index) => (
                                <span key={index} className="text-warning fs-4">
                                      ★
                                </span>
                            ))}
                          </div>
                            <p className='d-flex justify-content-center align-items-center'> <span >₹</span> {row.price}</p>
                            <button onClick={()=>handleProductDetails(row.id)} className="btn btn-success allbuttonscss d-flex align-items-center">
                              <i className="fas fa-shopping-cart me-2"></i> Buy Now
                            </button>
                        </div>
                      </div>
                  </div>
                      );
                    }
                    return null; 
                  })
                ) : (
                  <div className="text-center">
                    <p>No data available</p>
                  </div>
                )}
            </div>

            <div className="row mt30">
                {products && products.length > 0 ? (
                  products.map((row, index) => {
                  if (
                    (row.product_type === 'garments') && 
                    (useShowProducts === false)
                  ) {
                  return (
                  <div key={index} className="col-lg-3 col-6 mt-3" data-aos="fade-In" data-aos-delay="100">
                      <div className="full-image-card hover-scale">
                        <div className="image-div">
                              <a href="#"><img src={`${apiConfig.apiLiveUrl}/${row.product_image}`} 
                                alt={row.name} className="img-fluid" /></a>
                        </div>
                        <div className="info-text-block ">
                          <h5><a href="#" className='d-flex justify-content-center align-items-center'>{row.title}</a></h5>
                          <div className="d-flex justify-content-center align-items-center mt-1">
                            {[...Array(5)].map((_, index) => (
                                <span key={index} className="text-warning fs-4">
                                      ★
                                </span>
                            ))}
                          </div>
                            <p className='d-flex justify-content-center align-items-center'> <span >₹</span> {row.price}</p>
                            <button onClick={()=>handleProductDetails(row.id)} className="btn btn-success allbuttonscss d-flex align-items-center">
                              <i className="fas fa-shopping-cart me-2"></i> Buy Now
                            </button>
                        </div>
                      </div>
                  </div>
                      );
                    }
                    return null; 
                  })
                ) : (
                  <div className="text-center">
                    <p>No data available</p>
                  </div>
                )}
            </div>

        </div>
      </section>

      <Footer/>
    </>

    
    )
}
export default ProductDetails

