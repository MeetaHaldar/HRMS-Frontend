import { useState, useEffect } from "react";
import axios from "axios";
import dev_url from "./config";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    msg: "",
  });

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [plans, setPlans] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${dev_url}api/auth/contactUS`, formData);

      setPopupMsg("Form submitted successfully!");
      setPopupVisible(true);

      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        msg: "",
      });

      setTimeout(() => {
        setPopupVisible(false);
      }, 4500);
    } catch (error) {
      console.log(error);
      setPopupMsg("Something went wrong. Try again.");
      setTimeout(() => setPopupMsg(""), 3000);
    }
  };

  useEffect(() => {
    axios
      .get(`${dev_url}subscription`)
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, []);
  const images = [
    "src/assets/image7.png",
    "src/assets/image2.png",
    "src/assets/image3.png",
    "src/assets/image4.png",
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="font-sans text-gray-800">
      <section className="bg-[#FFF9EB] px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000] leading-tight mb-6">
            Streamline Your Workforce <br /> with Smart Employee Management
          </h1>
          <p className="text-lg text-[#333] mb-10">
            Simplify HR tasks, boost productivity, and manage your team—all from
            one powerful, easy-to-use platform.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#FFD84D] text-[#444] font-semibold px-6 py-3 rounded-full shadow hover:bg-[#f7cc3c] transition">
              Get Started
            </button>
            <button className="bg-white text-[#555] border border-[#FFD84D] font-semibold px-6 py-3 rounded-full shadow hover:bg-[#FFF5D6] transition">
              Preview Platform
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF9EB] px-6 py-12 flex justify-center">
        <div className="w-1/2 max-w-5xl h-64 bg-gray-200 border border-gray-300 rounded-xl flex items-center justify-center text-gray-500">
          <img src="src\assets\image1.png" />
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block border border-[#FFD84D] px-4 py-1 rounded-full font-semibold text-sm mb-4">
            Features
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-12">
            Boost Productivity with our <br className="hidden md:block" />
            user -friendly App
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center text-left">
              <img
                src="src\assets\image2.png"
                alt="Employee List"
                className="rounded w-full h-40 object-contain bg-[#FFF6DC] mb-4"
              />
              <h3 className="text-lg font-semibold text-[#2A2A2A] mb-2 w-full">
                Employee List Details
              </h3>
              <p className="text-sm text-[#555] mb-4 w-full">
                Simplify HR tasks, boost productivity, and manage your team—all
                from one powerful, easy-to-use platform.
              </p>
              <button className="border border-[#FFD84D] text-[#555] font-semibold px-5 py-2 rounded-full hover:bg-[#FFF5D6] transition">
                Learn More
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center text-left">
              <img
                src="src\assets\image3.png"
                alt="Register Employee"
                className="rounded w-full h-40 object-contain bg-[#FFF6DC] mb-4"
              />
              <h3 className="text-lg font-semibold text-[#2A2A2A] mb-2 w-full">
                Register Employee
              </h3>
              <p className="text-sm text-[#555] mb-4 w-full">
                Simplify HR tasks, boost productivity, and manage your team—all
                from one powerful, easy-to-use platform.
              </p>
              <button className="border border-[#FFD84D] text-[#555] font-semibold px-5 py-2 rounded-full hover:bg-[#FFF5D6] transition">
                Learn More
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center text-left">
              <img
                src="src\assets\image4.png"
                alt="Attendance and Leave"
                className="rounded w-full h-40 object-contain bg-[#FFF6DC] mb-4"
              />
              <h3 className="text-lg font-semibold text-[#2A2A2A] mb-2 w-full">
                Attendance and Leave
              </h3>
              <p className="text-sm text-[#555] mb-4 w-full">
                Simplify HR tasks, boost productivity, and manage your team—all
                from one powerful, easy-to-use platform.
              </p>
              <button className="border border-[#FFD84D] text-[#555] font-semibold px-5 py-2 rounded-full hover:bg-[#FFF5D6] transition">
                Learn More
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center text-left">
              <img
                src="src\assets\image5.png"
                alt="Documents"
                className="rounded w-full h-40 object-contain bg-[#FFF6DC] mb-4"
              />
              <h3 className="text-lg font-semibold text-[#2A2A2A] mb-2 w-full">
                Documents
              </h3>
              <p className="text-sm text-[#555] mb-4 w-full">
                Simplify HR tasks, boost productivity, and manage your team—all
                from one powerful, easy-to-use platform.
              </p>
              <button className="border border-[#FFD84D] text-[#555] font-semibold px-5 py-2 rounded-full hover:bg-[#FFF5D6] transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFF9EB] px-6 py-20 text-center relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="inline-block border border-[#FFD84D] px-4 py-1 rounded-full font-semibold text-sm mb-4">
            Subscription
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-2">
            Manage leave and <br className="hidden md:block" /> attendance,
            built-in.
          </h2>
          <p className="text-[#555] max-w-2xl mx-auto mb-16">
            Create custom leave types, allow employees to apply for leaves,
            approve or reject leaves, manage attendance.
          </p>

          {/* --- ROW 1 --- */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12 relative z-10 mb-10">
            {plans[0] && <Card data={plans[0]} />}
            {plans[1] && <Card data={plans[1]} />}
            {plans[2] && <Card data={plans[2]} />}
            {plans[3] && <Card data={plans[3]} />}
          </div>
        </div>
      </section>

      <section className=" px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block border border-[#FFD84D] px-4 py-1 rounded-full font-semibold text-sm mb-4">
            Free Device
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-4">
            Get a Free Device with Your <br className="hidden md:block" />
            Employee Management System!
          </h2>

          <p className="text-[#555] max-w-2xl mx-auto mb-10">
            Boost productivity instantly — our powerful software now comes with
            a free device to get you started.
          </p>

          <div className="relative flex justify-center items-center">
            <div className="absolute w-[90%] h-[260px] bg-[#FFD84D] rounded-2xl z-0"></div>

            <div className="relative z-10 w-[320px] rounded-lg overflow-hidden shadow-lg mr-[40px]">
              <img
                src="src\assets\image9.jpg"
                alt="Device 1"
                className="w-full h-[200px] object-cover"
              />
            </div>

            <div className="relative z-10 w-[320px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="src\assets\image10.png"
                alt="Device 2"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFF9EB] px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block border border-[#FFD84D] px-4 py-1 rounded-full font-semibold text-sm mb-4">
            Salary Templates
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-2">
            Manage leave and <br className="hidden md:block" /> attendance,
            built-in.
          </h2>

          <p className="text-[#555] max-w-2xl mx-auto mb-10">
            Create custom leave types, allow employees to apply for leaves,
            approve or reject leaves, manage attendance.
          </p>

          <div className="relative flex justify-center items-center">
            {/* Background block */}
            <div className="hidden md:block absolute left-0 w-full h-60 bg-[#FFD84D] rounded"></div>

            <img
              src={images[currentIndex]}
              alt="Carousel"
              className="relative z-10 w-full max-w-xl h-72 object-cover rounded shadow-lg transition-all duration-500"
            />

            {/* Left arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>

            {/* Right arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-4">
              Interested in a product? Talk to our sales team
            </h2>
            <p className="text-[#555] mb-6">
              From questions about pricing to one-on-one personalized demos,
              we'd love to connect and help get you started.
            </p>
            <p className="text-[#333] font-medium mb-2">
              Mobile No - 994XXXXXXXX
            </p>
            <p className="text-[#333] font-medium">Email- ABC@gmail.com</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full border border-gray-400 px-4 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email*"
              required
              className="w-full border border-gray-400 px-4 py-2 rounded"
            />
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="Mobile No.*"
              required
              className="w-full border border-gray-400 px-4 py-2 rounded"
            />
            <textarea
              name="msg"
              value={formData.msg}
              onChange={handleInputChange}
              placeholder="Message*"
              required
              rows="4"
              className="w-full border border-gray-400 px-4 py-2 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-[#FFD84D] text-black font-semibold px-6 py-2 rounded hover:bg-[#f7cc3c] transition w-full cursor-pointer"
            >
              Submit
            </button>

            {popupVisible && (
              <div className="fixed top-10 left-0 z-50">
                <div className="bg-green-600 text-white px-6 py-3 rounded-r shadow-lg transform transition-transform duration-500 translate-x-0 animate-slide-in">
                  {popupMsg}
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
const Card = ({ data }) => (
  <div className="bg-white border border-gray-200 shadow rounded-xl p-6 text-left w-[300px]">
    <h3 className="text-lg font-semibold text-[#2A2A2A] mb-1">{data.name}</h3>
    <p className="text-xl font-bold mb-2">₹{data.total_amount}/ month</p>
    <p className="text-sm text-[#666] mb-3">{data.description}</p>
    <ul className="text-sm text-[#444] space-y-1">
      <li>
        <b>Max Employee limit:</b> {data.max_employee_no}
      </li>
      <li>
        <b>Subscription Amount:</b> {data.total_amount}
      </li>
      <li>
        <b>Limited period Discount:</b> {data.discount}
      </li>
      <li>
        <b>Discounted Offer Price:</b>{" "}
        {data.total_amount - data.total_amount * (data.discount / 100)}
      </li>
    </ul>
    <button className="mt-4 bg-[#FFD84D] text-black font-semibold px-4 py-2 rounded hover:bg-[#f7cc3c] transition w-full">
      Get Started
    </button>
  </div>
);

export default Home;
