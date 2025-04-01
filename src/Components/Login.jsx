import React,{useState} from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const[err,setErr]=useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
   try{
    const response = await axios.post(`${dev_url}/api/auth/login`,formData)

    const {token,user}=response.data
  
    localStorage.setItem('token',token)
    localStorage.setItem('user',JSON.stringify(user))
    if (user.role === 'superAdmin') {
      window.location.href = '/admin/dashboard';
     } 
    
    else if (user.role === 'systemAdmin') {
      window.location.href = '/company/dashboard';
    }
   }
   catch(err){
    setErr(
      'Failed to login . Please try again later'
    )
   }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      {/* Mobile View: Heading First */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:hidden">
        Login
      </h2>

      {/* Left Side - Image (Mobile: appears after heading, Desktop: appears first) */}
      <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
        <img
          src="src/assets/Login_image.png"
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white p-6 border-gray-200 flex flex-col items-center justify-center">
        {/* Desktop View: Heading inside form */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center hidden md:block">
          Login
        </h2>

        <form  onSubmit={handleSubmit} className="flex flex-col gap-5 w-[90%] md:w-[50%]">
     
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
            <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Checkbox & Terms Section - Properly aligned */}
          <div className="flex items-start gap-2 mt-2">
            <input type="checkbox" className="mt-1" required />
            <p className="text-sm text-gray-600">
              By continuing, I agree to the{" "}
              <span className="font-semibold">Terms & Conditions</span> and{" "}
              <span className="font-semibold">Privacy Policy</span>.
            </p>
          </div>

          {/* Login Button - Centered */}
          <button className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition mx-auto">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
