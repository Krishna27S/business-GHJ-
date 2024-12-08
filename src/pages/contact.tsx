/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Business Logo and Name */}
      <div className="text-center mb-12">
        <a href="/images/logo.jpg" className="inline-block">
          {/* Replace with your actual logo */}
          <span className="text-3xl font-serif text-gray-800">Ginni House</span>
        </a>
      </div>

      {/* Contact Options */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Email Us</h3>
              <a href="mailto:shekhar.ginnihouse@gmail.com" className="text-blue-600 hover:underline">
                shekhar.ginnihouse@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Call Us</h3>
              <a href="tel:+919431414208" className="text-green-600 hover:underline">
                +91 9431414208
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Follow Us</h3>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                @yourbrand
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
  <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
  <div className="flex-1">
    <h3 className="font-semibold">Visit Us</h3>
    <p className="text-gray-600 mb-2">Ginni House Jewellers</p>
    <a 
      href="https://www.google.com/maps/place/Ginni+house+jewellers/@26.1216362,85.8956459,19.46z/data=!4m14!1m7!3m6!1s0x39edb9731f966623:0x8bfc3e6d7a1b1126!2sGinni+house+jewellers!8m2!3d26.1217797!4d85.8960025!16s%2Fg%2F11rv0h0srb!3m5!1s0x39edb9731f966623:0x8bfc3e6d7a1b1126!8m2!3d26.1217797!4d85.8960025!16s%2Fg%2F11rv0h0srb"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
      Open in Google Maps
    </a>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;