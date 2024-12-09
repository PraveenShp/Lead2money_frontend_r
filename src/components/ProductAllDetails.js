import React, { useState, useEffect } from 'react'
import { fetchData,apiLiveUrl } from '@/pages/fetchData';
import { useRouter } from 'next/router';
import { useLoader } from '../context/LoaderContext';

const ProductAllDetails = () => {
    const [formData, setFormData] = useState({
      cart_id: '',
    });
    const router = useRouter();
    const { setIsLoading } = useLoader(false);
    const [allProducts, setAllProducts] = useState([]);
    const [error, setErrors] = useState();
    const [shipping, setShipping] = useState(0);
    const [shippingValue, setShippingValue] = useState('local');
    const [subtotal, setSubtotal] = useState('0.00');
    const [total_value, setTotal] = useState('0.00');
    const [cgst, setCgst] = useState('0.00');
    const [sgst, setSgst] = useState('0.00');
    const [igst, setIgst] = useState('0.00');
    const [useCartId, setCartId] = useState('');
    const [CartProductId, setCartProductId] = useState('');
  
    const handleSetCartProductId = (cartId) => {
      const encodedCartId = btoa(cartId); // base64 encoding
      setCartId(encodedCartId);
      console.log(encodedCartId);
    };
    
    const fetchProducts = async () => { // ****** Fetch Product API Function ******* \\
      try {
        setIsLoading(true);
        const data = await fetchData("cart/details");
        setAllProducts(data.data || []);
        setSubtotal(parseInt(data.data[0]['cart_price']));
        if (data && data.data && data.data[0]) {
          const cartId = data.data[0]['cart_id'];
          handleSetCartProductId(cartId);
          setCartProductId(cartId);
        }
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally{
        setIsLoading(false);
      }
    }; // ****** Fetch Product API Function End ******* \\
  
  
    
    // ****** Remove Product API Function ******* \\
    const RemoveProduct = async () => { 
      console.log(error);
      if (!CartProductId) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: "Product price should not be 0",
        }));
        return;
      }
  
      const formData = new FormData();
      formData.append("cart_id", CartProductId);
      setFormData(formData);
      
      try {
        setIsLoading(true);
        const data = await fetchData(`cart/delete`, { method: 'POST', body: formData, });
        if (data) {
          setAllProducts((prevProducts) =>
            prevProducts.filter((product) => product.cart_id !== CartProductId)
          );
          setShipping(0);
          setSubtotal(0);
          setTotal(0);
          setCgst(0);
          setSgst(0);
          setIgst(0);
          console.log("Product Delete to cart successfully");
        } else {
          console.log("Failed to add product to cart");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }finally{
        setIsLoading(false);
      }
    }; // ****** Remove Product API Function End ******* \\
  
  
    
    const handleCheckout = async () => { 
      const ids = Array.isArray(useCartId) ? useCartId : [useCartId];
      ids.push(shippingValue);
      const data = encodeURIComponent(ids.join('&'));
      if(data !== ""){
        router.push(`/leadweb/CheckOut/${data}`);
      }else{
        console.log("Check Out Fetch Error ..");
      }
      
  };
  
  
  
    useEffect(() => {
      fetchProducts();
      // ****** Product Calculete ******* \\
      const calculatedCgst = parseFloat((subtotal * 6) / 100);
      const calculatedSgst = parseFloat((subtotal * 6) / 100);
      const calculatedTotal = parseFloat(subtotal) + parseFloat(shipping) + parseFloat(cgst) + parseFloat(sgst) + parseFloat(igst);
      setCgst(isNaN(calculatedCgst) ? '0.00' : calculatedCgst.toFixed(2));
      setSgst(isNaN(calculatedSgst) ? '0.00' : calculatedSgst.toFixed(2));
      setIgst("0.00");
      setTotal(isNaN(calculatedTotal) ? '0.00' : calculatedTotal.toFixed(2));
      // ****** Product Calculete  ******* \\
      
    }, [subtotal, shipping, cgst, sgst, igst]);
  
  
    const handleShippingChange = (event) => { // ***** Shipping Check Box Function ****** \\
      const value = event.target.value === 'courier' ? 100 : 0.00;
      setShipping(parseInt(value));
      setShippingValue(event.target.value);
      const total = subtotal + value;
      setTotal(parseInt(total));
    }; // ***** Shipping Check Box Function End****** \\
  
  
    return (
        <>
    
        <section className="agent-section pad-tb">
            <div className="border rounded shadow-lg p-3">
            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered text-start">
                <thead className="table-light">
                    <tr>
                    <th className="text-start">Thumbnail image</th>
                    <th className="text-start">Product</th>
                    <th className="text-start">Price</th>
                    <th className="text-start">Quantity</th>
                    <th className="text-start">Subtotal</th>
                    <th className="text-start">Remove item</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map((row, index) => (
                    <tr key={row.cart_id || index}>
                        <td className="text-start">
                        <img src={`${apiLiveUrl}/${row.product_image_name}`} alt={`Thumbnail of ${row.title}`}
                            className="img-thumbnail" style={{ width: '100px' }} />
                        </td>
                        <td className="text-start">
                        <strong>{row.title}</strong>
                        <p className="text-muted">{row.description}</p>
                        </td>
                        <td className="text-start">₹ {parseFloat(row.product_price).toFixed(2)}</td>
                        <td className="text-start">
                        <input type="number" className="form-control" defaultValue={row.qty} readOnly />
                        </td>
                        <td className="text-start">₹ {(row.qty * parseFloat(row.product_price)).toFixed(2)}</td>
                        <td className="text-start">
                        <button type="button" className="btn btn-danger btn-sm" onClick={RemoveProduct} >
                            Remove
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Delivery Options */}
            <div className="mt-4">
                <h5 className="text-primary">Select Delivery Option</h5>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-check">
                        <input type="radio" value="local" name="pickup"
                            onChange={() => handleShippingChange(event)} checked={shipping === 0} className="form-check-input" id="localPickup"
                        />
                        <label className="form-check-label" htmlFor="localPickup">
                            Local Pickup
                        </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check">
                        <input type="radio" value="courier" name="pickup" onChange={() => handleShippingChange(event)} checked={shipping === 100} className="form-check-input" id="courierCharges" />
                        <label className="form-check-label" htmlFor="courierCharges">
                            Courier Charges (₹ 100.00)
                        </label>
                        </div>
                    </div>
                </div>
            </div>
                    
            {/* Cart Totals */}
            <div className="mt-4">
                <h5 className="text-primary">Cart Totals</h5>
                <table className="table">
                <tbody>
                    <tr>
                    <th className="text-start">Subtotal</th>
                    <td className="text-end">₹{parseFloat(subtotal).toFixed(2)}</td>
                    </tr>
                    <tr>
                    <th className="text-start">Shipping</th>
                    <td className="text-end">₹{parseFloat(shipping).toFixed(2)}</td>
                    </tr>
                    <tr>
                    <th className="text-start">CGST</th>
                    <td className="text-end">₹{cgst}</td>
                    </tr>
                    <tr>
                    <th className="text-start">SGST</th>
                    <td className="text-end">₹{sgst}</td>
                    </tr>
                    <tr>
                    <th className="text-start">IGST</th>
                    <td className="text-end">₹{igst}</td>
                    </tr>
                    <tr>
                    <th className="text-start">Total</th>
                    <td className="text-end font-weight-bold">₹{total_value}</td>
                    </tr>
                </tbody>
                </table>
            </div>

            {/* Checkout Button */}
            <div className="text-end">
                <button className="btn btn-primary mt-3" onClick={handleCheckout} >
                    Proceed to Checkout
                </button>
            </div>
            </div>
        </section>
        </>
    )
}
export default ProductAllDetails