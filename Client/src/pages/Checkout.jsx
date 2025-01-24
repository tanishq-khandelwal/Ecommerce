import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import deliveryIcon from "../assets/delivery.png";
import { useGetCartDetailsQuery } from "../services/cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const { data, isLoading, error } = useGetCartDetailsQuery(userId);
  const firstName=useSelector((state)=>state.auth.user.data.first_name);
  const last_name=useSelector((state)=>state.auth.user.data.last_name);
  const phone=useSelector((state)=>state.auth.user.data.phone);
  const address=useSelector((state)=>state.auth.user.data.address);

  
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const navigate=useNavigate('/success');

  useEffect(() => {
    if (Array.isArray(data)) {
      setCartItems(data);

      // Calculate total value
      const calculatedTotalValue = data.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
      setTotalValue(calculatedTotalValue);

      // Calculate tax (18%)
      const calculatedTax = (calculatedTotalValue * 0.18).toFixed(2);
      setTax(calculatedTax);

      // Calculate final total
      const delivery = 150;
      const calculatedFinalTotal = (calculatedTotalValue + delivery + parseFloat(calculatedTax)).toFixed(2);
      setFinalTotal(calculatedFinalTotal);
    }
  }, [data]);

  const today = new Date();
  today.setDate(today.getDate() + 3);

  const day = today.getDate();
  const options = { weekday: "long", month: "short" };
  const formattedDate = `${day} ${today.toLocaleString("en-GB", options)}`;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-center py-10 px-4 space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Left Side */}
        <div className="lg:w-1/2 bg-white border border-gray-200 rounded-md shadow-md p-6">
          {/* Delivery Method */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-4 border border-gray-300 rounded-md p-4 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="h-5 w-5 text-blue-500"
                  defaultChecked
                />
                <div className="flex-1">
                  <p className="font-medium">
                    Get it delivered by {formattedDate}
                  </p>
                </div>
              </label>
              <label className="flex items-center space-x-4 border border-gray-300 rounded-md p-4 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="h-5 w-5 text-blue-500"
                />
                <div className="flex-1">
                  <p className="font-medium">
                    Pickup available in 3 stores near you
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
            <div className="border border-gray-300 rounded-md p-4 font-sans font-medium">
              <p>{firstName} {last_name} ,</p>
              <p>{phone} ,</p>
              <p>{address}</p>
              {/* <p>98 Kile Close, 8-3, Marsfield, Sydney Australia 2723</p> */}
              <button className="text-blue-500 text-sm mt-2">
                Edit Details
              </button>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={deliveryIcon} alt="Card" className="h-8 w-12" />
                <p>MasterCard ending in 8763</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="XXX"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/3 bg-white border border-gray-200 rounded-md shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item?.product?.product_id}
                    className="flex justify-between"
                  >
                    <div>{item.product.name} </div>
                    <div>
                      {item.product.price} x {item.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Sub Total</span>
              <span>₹{totalValue}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>150</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Tax</span>
              <span>{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="w-auto px-3 bg-blue-500 text-white py-3 rounded-md shadow-md" onClick={()=>{
              navigate('/success')
            }}>
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
