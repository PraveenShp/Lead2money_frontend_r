import React, { useState ,useEffect} from 'react'
import { fetchData,} from '../util/fetchData';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useLoader } from '../context/LoaderContext';
import MainLayout from '../layouts/MainLayout';


const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const router = useRouter();
  const {setIsLoading} = useLoader();
  const [formData, setFormData] = useState({
    product_id: '',
    product_qty_price: '',
    inputQuantity: 1,
  });
  const [inputQuantity, setInputQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState();

  const fetchProductsDetails = async (id) => {
    try {
      //setIsLoading(true);
      const data = await fetchData(`products/${id}`);
        setProducts(data.data || []);
        console.log(data,"Data  Found .!");
        if (data.status == true) {
      } else {
        console.error("Data Not Found .!");
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally{
      //setIsLoading(false);
    }
  };


  const handleInputChange = (event) => {
    const value = event.target.value ? Number(event.target.value) : 1;
    const { price, id } = products;
    const total_price_a = price * value;
    setTotalPrice(total_price_a);
    setInputQuantity(value);
  };
  
  const addToCart = async () => {
    const { price, id } = products;
    const total_price = price * inputQuantity;

    if (!price || price <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Product price should not be 0",
      }));
      return;
    }
    
    // Create FormData and append each field
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("product_qty_price", total_price);
    formData.append("inputQuantity", inputQuantity);

    setFormData(formData);

    try {
      //setIsLoading(true);
      const data = await fetchData(`cart/store`, { method: 'POST', body: formData, });
      if (data) {
        console.log("Product added to cart successfully");
        router.push("/leadweb/product-all-details");
      } else {
        console.log("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }finally{
      //setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchProductsDetails(id);
  }, []);
  
    return (
    <>
    <MainLayout seo={{ title: 'Products' }}>
      
       <section className="agent-section py-5" id="products">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <div className="mb-4">
                <h2 className="mb-3">
                  <em >Product Details</em>
                </h2>
                <p>
                  Fresh Products Finds Await!
                </p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img src={products.product_image}
                  alt={products.title || 'Not Available'}  className="card-img-top img-fluid" />
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                  <p className="card-text text-muted">
                    Product Code: 000{products ? products.id : 'Not Available'}
                  </p>
                  <p className="card-text text-muted">
                    Product Name: { products ? products.title : 'Not Available'}
                  </p>
                  <p className="card-text text-primary">
                    Product Amount: ₹{totalPrice || products.price || 'Not Available'}
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <input
                      type="number"
                      min="1"
                      value={inputQuantity}
                      onChange={handleInputChange}
                      name="Quantity"
                      className="form-control me-2"
                      placeholder="Quantity"
                    />
                    <button className="btn btn-primary" onClick={addToCart}>
                      Add to Cart
                    </button>
                    <button className="btn btn-outline-secondary">
                      View Cart
                    </button>
                  </div>
                  <p className="text-muted">Categories: {products ? products.title : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </MainLayout>
    </>

    
    )
}
export default ProductDetails

