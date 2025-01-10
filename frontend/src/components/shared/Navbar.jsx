import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div >
            <div className="flex items-center justify-between px-4 lg:px-8 mx-auto max-w-7xl h-16">
                {/* Logo */}
                <div>
                    <h1 className="text-2xl font-bold">
                        Job <span className="text-[#F83002]">Portal</span>
                    </h1>
                </div>

                {/* Hamburger Menu Button (Visible on Small Screens) */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation Links */}
                <div
                    className={`${menuOpen ? 'block' : 'hidden'
                        } absolute md:relative top-16 left-0 md:top-0 md:left-0 w-full md:w-auto bg-white md:bg-transparent md:flex items-center gap-8 py-4 md:py-0 px-4 md:px-0`}
                >
                    <ul className="flex flex-col md:flex-row font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/Topcompanies">Companies</Link>
                                </li>
                                <li>
                                    <Link to="/jobs">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse">Browse</Link>
                                </li>

                            </>
                        )}
                    </ul>

                    {/* Login/Signup or Profile */}
                    <div className="flex flex-col md:flex-row items-center gap-5 mt-4 md:mt-0">
                        {!user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button>Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white">
                                    <div>
                                        <div className="flex gap-4 space-y-2">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 text-gray-600">
                                            {user && user.role === 'student' && (
                                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                    <User2 />
                                                    <Button variant="link">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
