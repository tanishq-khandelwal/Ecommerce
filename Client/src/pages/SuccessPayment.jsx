import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Layout from '../Layout';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl animate__animated animate__bounceIn" />
          </div>
          <h1 className="text-4xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeIn">
            Thank You for Shopping with Us!
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Your payment was successful, and your order is on its way to you. We'll notify you once it's shipped.
          </p>

          <div className="space-x-4">
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Go to Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105"
            >
              View Order
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ThankYouPage;
