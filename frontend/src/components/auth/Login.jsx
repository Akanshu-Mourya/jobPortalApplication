import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react'; // Assuming you are using lucide-react icons for Loader2

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try { 
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Set the user in the redux store
        navigate('/'); // Redirect to the home page after successful login
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Login Error:', error); // Log the error for debugging
      toast.error(error.response?.data?.message || "An error occurred during login");
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
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          {/* Email */}
          <div className='my-2'>
            <Label className='font-bold'>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter an Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
              required
            />
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
              required
            />
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
          </div>

          {/* Submit Button */}
          {
            loading ? (
              <Button className='w-full my-4 bg-black text-white hover:bg-black focus:bg-black active:bg-black'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className='w-full my-4 bg-black text-white hover:bg-black focus:bg-black active:bg-black'>
                Login
              </Button>
            )
          }

          {/* Login Link */}
          <span>Don't have an account?
            <Link to="/signup" className='text-blue-700'>SignUp</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;