import React, { useState } from "react";

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    sub_domain: "",
    email: "",
    password: "",
    address_1: "",
    country: "",
    city: "",
    payment_type: "",
    max_employees_limit: "",
    admin: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //  const navigation = useNavigation()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await axios.post(`${dev_url}/api/auth/company`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status == 200) {
      // navigation('/admin/dashboard')
      console.log("navigatingg to dashbaord");
    } else {
      alert("Facing Some ISsue while creating Company");
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Name"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Sub Domain"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="sub_domain"
            id="sub_domain"
            value={formData.sub_domain}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email ID"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Address"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="address_1"
            id="address_1"
            value={formData.address_1}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Country"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="country"
            id="country"
            maxLength={2}
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            placeholder="City"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Payment"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="number"
            name="payment_type"
            id="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Max Employee Limit"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="number"
            name="max_employees_limit"
            id="max_employees_limit"
            value={formData.max_employees_limit}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Admin Name"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="admin"
            id="admin"
            value={formData.admin}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
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
