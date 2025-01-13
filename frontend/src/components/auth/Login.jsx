import React, { useEffect, useState } from 'react';
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
import { Loader2, Eye, EyeOff } from 'lucide-react'; // Added Eye and EyeOff icons

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const { loading, user } = useSelector(store => store.auth);
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
        dispatch(setUser(res.data.user));
        navigate('/'); 
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <form
          onSubmit={submitHandler}
          className='w-full sm:w-4/5 md:w-3/4 lg:w-1/2 border border-gray-200 rounded-md p-6 my-10'>
          <h1 className='font-bold text-xl mb-5 text-center'>Login</h1>

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
              type={showPassword ? 'text' : 'password'}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter a Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
              required
            />
            {/* Toggle Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
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
