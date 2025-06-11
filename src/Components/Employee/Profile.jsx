import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Briefcase,
  Building2,
  Users2,
} from "lucide-react";
import { BiSolidUserDetail } from "react-icons/bi";
import dev_url from "../../config";
const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.emp_id;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id || !token) return;

        const res = await axios.get(`${dev_url}api/employee/id/?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployee(res.data.employee);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchEmployee();
  }, []);
  if (!employee) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* Profile Image + Welcome */}
      <div className="flex flex-col items-start">
        <img
          src={employee.photo}
          alt="Profile"
          className="w-24 h-24 rounded object-cover mb-2"
        />
        <p className="text-lg md:text-xl font-medium">
          Welcome back,{employee.first_name} {employee.last_name}!
        </p>
      </div>

      {/* Two columns */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Briefcase size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Employee ID:</span>
            <span>{id ?? ""}</span>
          </div>

          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Designation:</span>
            <span>{employee.designation ?? ""}</span>
          </div>

          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Joining Date:</span>
            <span>
              {new Date(employee.hire_date).toLocaleDateString("en-CA")}
            </span>
          </div>

          <div className="flex items-center">
            <Users2 size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Reporting Mgr:</span>
            <span>{employee.reportingManager ?? ""}</span>
          </div>

          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Department ID: </span>
            <span>{employee.department_id}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Email ID:</span>
            <span>{employee.email ?? ""}</span>
          </div>

          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Contact No. :</span>
            <span>{employee.mobile ?? ""}</span>
          </div>

          <div className="flex items-center">
            <Building2 size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Department:</span>
            <span>{employee.department ?? ""}</span>
          </div>

          <div className="flex items-center">
            <BiSolidUserDetail size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">Gender:</span>
            <span>{employee.gender ?? ""}</span>
          </div>

          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span className="font-semibold w-36 shrink-0">D.O.B. :</span>
            <span>{employee.birthday ?? ""}</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-8 flex items-start">
        <MapPin size={16} className="mr-2 mt-1" />
        <div className="flex">
          <span className="font-semibold w-36 shrink-0">Address:</span>
          <span className="max-w-md">{employee.address ?? ""}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
