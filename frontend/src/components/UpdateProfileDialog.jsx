import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    // Set loading state
    const [loading, setLoading] = useState(false);

    // Get user data from store
    const { user } = useSelector((store) => store.auth);

    // Set data into input states
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '', // Corrected casing
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join() || '', // Joined array to string for display
        file: null, // File starts as null
    });

    // Get dispatch
    const dispatch = useDispatch();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput((prev) => ({ ...prev, file }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected case
        setLoading(true);

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('resume', input.file);
        }

        try {
            const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                console.log(input);

                dispatch(setUser(response.data.user));
                toast.success(response.data.message);

                setOpen(false); // Close dialog on success
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false); // Ensure loading is stopped
        }
    };

    return (
        <div>
            <Dialog open={open} className="text-white">
                <DialogContent
                    className="bg-white rounded-md sm:max-w-[425px]"
                    onInteractOutside={() => setOpen(false)} // Ensures the dialog closes on outside click
                >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            {/* Edit Name */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullname" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={handleChange}
                                    className="col-span-3 border-2"
                                />
                            </div>
                            {/* Edit Email */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={handleChange}
                                    className="col-span-3 border-2"
                                />
                            </div>
                            {/* Edit Phone Number */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phoneNumber" className="text-right">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={handleChange}
                                    className="col-span-3 border-2"
                                />
                            </div>
                            {/* Edit Bio */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={handleChange}
                                    className="col-span-3 border-2"
                                />
                            </div>
                            {/* Edit Skills */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">
                                    Skills
                                </Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={handleChange}
                                    className="col-span-3 border-2"
                                />
                            </div>
                            {/* Edit Resume */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    Resume
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="application/pdf"
                                    className="col-span-3 border-2"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4 bg-black text-white hover:bg-black focus:bg-black active:bg-black">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full my-4 bg-black text-white hover:bg-black focus:bg-black active:bg-black"
                                >
                                    Update
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfileDialog;
