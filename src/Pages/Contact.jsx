import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-6xl mx-auto">
        {/* Company Information, Address, Contact Us sections */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info Card */}
          <div className="bg-accent p-6 rounded-lg shadow-md flex flex-col items-center text-center text-secondary">
            <div className="mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h12"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Company Information:</h3>
            <p className="text-sm">Adarsh LLC</p>
            <p className="text-sm">Tax id: USXXXXXX</p>
          </div>

          {/* Address Card */}
          <div className="bg-accent p-6 rounded-lg shadow-md flex flex-col items-center text-center text-secondary">
            <div className="mb-4">
              <FaLocationDot className='h-8 w-8 font-bold'/>
            </div>
            <h3 className="text-lg font-semibold mb-2">Address:</h3>
            <p className="text-sm">Opp of V.K Bhula High School</p>
            <p className="text-sm">Railway Station Road, Patan, Gujarat</p>
            <p className="text-sm">Pin code: 384265</p>
          </div>

          {/* Contact Us Card */}
          <div className="bg-accent p-6 rounded-lg shadow-md flex flex-col items-center text-center text-secondary">
            <div className="mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Contact us:</h3>
            <p className="text-sm">Email us for general queries, including marketing and partnership opportunities.</p>
            <a href="mailto:hello@flowbite.com" className="text-secondary hover:underline text-sm mt-2">adarsh@gmail.com</a>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-accent p-8 rounded-lg shadow-md">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-secondary mb-2">First name</label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-secondary mb-2">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="your_email" className="block text-sm font-medium text-secondary mb-2">Your email</label>
                <input
                  type="email"
                  id="your_email"
                  className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background"
                  placeholder="name@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-secondary mb-2">Phone number</label>
                <input
                  type="text"
                  id="phone_number"
                  className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background"
                  placeholder="+1(12) 345 6789"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-secondary mb-2">
                  Country
                  <span className="ml-1 text-xs text-secondary-light">(?)</span> {/* Placeholder for info icon */}
                </label>
                <select
                  id="country"
                  className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background"
                >
                  <option>United States</option>
                  <option>Gujarat</option>
                  <option>Maharastra</option>
                  <option>Rajasthan</option>
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-secondary mb-2">
                  Language
                  <span className="ml-1 text-xs text-secondary-light">(?)</span> {/* Placeholder for info icon */}
                </label>
                <select
                  id="language"
                  className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background"
                >
                  <option>English (US)</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="your_message" className="block text-sm font-medium text-secondary mb-2">Your message</label>
              <textarea
                id="your_message"
                rows="6"
                className="w-full p-3 bg-text border border-secondary rounded-md focus:ring-secondary focus:border-secondary text-background resize-y"
                placeholder=""
              ></textarea>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="agree_terms"
                type="checkbox"
                className="w-4 h-4 text-secondary bg-text border-secondary rounded focus:ring-secondary"
              />
              <label htmlFor="agree_terms" className="ml-2 text-sm text-secondary">
                I confirm that you have read and agreed to{' '}
                <a href="#" className="text-secondary hover:underline">Flowbite's Terms of Service</a> and{' '}
                <a href="#" className="text-secondary hover:underline">Privacy Statement</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-secondary text-accent font-semibold rounded-lg hover:bg-opacity-80 transition duration-300"
            >
              Send message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactUsPage;