import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react'; // Assuming you are using lucide-react icons for Loader2

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "", 
    file: ""
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const validate = () => {
    const newErrors = {};
    if (!input.fullname) newErrors.fullname = "Full Name is required";
    if (!input.email) newErrors.email = "Email is required";
    if (!input.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!input.password) newErrors.password = "Password is required";
    if (!input.role) newErrors.role = "Role selection is required";
    return newErrors;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true // Ensure this is needed for your use case
      });
      if (res.data.success) {
        navigate('/login'); // redirect to login page
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Network Error:', error); // Log the error for debugging
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form
          onSubmit={submitHandler}
          className='w-full lg:w-1/2 border border-gray-200 rounded-md p-6 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

          {/* Full Name */}
          <div className='my-2'>
            <Label className='font-bold'>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter a Full Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
            {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname}</span>}
          </div>

          {/* Email */}
          <div className='my-2'>
            <Label className='font-bold'>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter an Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6 A38C2]"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          {/* Phone Number */}
          <div className='my-2'>
            <Label className='font-bold'>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter a Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
            {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
          </div>

          {/* Password */}
          <div className='my-2'>
            <Label className='font-bold'>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter a Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          {/* Role Selection */}
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input
                  id="student"
                  type='radio'
                  name='role'
                  value='student'
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter"
                  type='radio'
                  name='role'
                  value='recruiter'
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
          </div>

          {/* Profile Picture Upload */}
          <div className='flex items-center gap-2'>
            <Label htmlFor="profile" className="font-bold">Profile</Label>
            <Input
              id="profile"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
          </div>

          {/* Submit Button */}
          {
            loading ? (
              <Button className='w-full my-4 bg-black text-white hover:bg-black focus:bg-black active:bg-black '>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className='w-full my-4 bg-black text-white hover:bg-black focus:bg-black active:bg-black'>
                Signup
              </Button>
            )
          }

          {/* Login Link */}
          <span>Already have an account?
            <Link to="/login" className='text-blue-700'> Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;