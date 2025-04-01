import React from "react";

const CompanyRegistration = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      {/* Image for larger screens */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src="src/assets/Login_image.png"
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>
      
      {/* Form Container */}
      <div className="w-full md:w-1/2 bg-white p-6 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Registration - <span className="font-semibold">Company</span>
        </h2>
        
        {/* Image for mobile screens */}
        <div className="flex justify-center md:hidden mb-4">
          <img
            src="src/assets/Login_image.png"
            alt="Illustration"
            className="max-w-[80%] h-auto"
          />
        </div>

        {/* Form Fields */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Company Name*",
            "Sub-Domain*",
            "Contact Number*",
            "Email Address*",
            "Company Address*",
            "City*",
            "Country Code*",
            "Company's Website",
            "Max. Number of Employees*",
            "Payment",
            "Admin Name*",
          ].map((placeholder, index) => (
            <input
              key={index}
              type={placeholder.includes("Email") ? "email" : "text"}
              placeholder={placeholder.replace("*", "")}
              className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
              required={placeholder.includes("*")}
            />
          ))}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            required
          />
        </form>

        {/* Terms & Conditions */}
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" className="mr-2" required />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the{" "}
            <span className="font-semibold">Terms & Conditions</span> and{" "}
            <span className="font-semibold">Privacy Policy</span>.
          </p>
        </div>

        {/* Register Button */}
        <button className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition block mx-auto">
          Register
        </button>
      </div>
    </div>
  );
};

export default CompanyRegistration;
