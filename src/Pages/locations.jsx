import React from 'react';
import QRLoc from '../image/QRLoc.png'
function Locations() {

  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.027320731005!2d72.12730690953241!3d23.853163578511186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c87de463b178f%3A0x8b3c40d217290c1c!2sAdarsh%20Statioanry%20Mart!5e0!3m2!1sen!2sin!4v1749031770246!5m2!1sen!2sin";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl w-full">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-accent">
          Location of Adarsh Stationery Mart
        </h1>

        {/* Container for Map and QR Code, responsive layout */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Map Section */}
          <div className="flex-1 w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
            <iframe
              src={googleMapsEmbedUrl}
              className="w-full h-64 md:h-96 rounded-lg"
              style={{ border: 0 }} // React style object
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Adarsh Stationery Mart Location Map"
            >
            </iframe>
          </div>

          {/* QR Code Section */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            {/* QR Code Image */}
            <img
              src={QRLoc} 
              alt="QR Code for Adarsh Stationery Mart Location"
              className="w-48 h-48 rounded-lg shadow-md object-contain border border-gray-300 p-2 bg-white"
            />
            {/* Instruction for QR Code */}
            <p className="text-gray-600 text-center text-sm">
              Scan this QR code to open the location in Google Maps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locations;
