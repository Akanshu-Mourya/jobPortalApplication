import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
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
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    uploadedFile: user?.profile?.resume || '',
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'resumeFile'); // Replace with your Cloudinary preset

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzas4slym/upload', // Replace with your Cloudinary cloud name
        formData
      );

      const uploadedFile = response.data.secure_url;
      setInput((prevState) => ({ ...prevState, uploadedFile }));
      toast.success('Resume uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname || !input.email) {
      toast.error('Name and email are required');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    formData.append('uploadedFile', input.uploadedFile);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { label: 'Name', id: 'name', name: 'fullname', type: 'text', value: input.fullname },
              { label: 'Email', id: 'email', name: 'email', type: 'email', value: input.email },
              { label: 'Phone Number', id: 'phoneNumber', name: 'phoneNumber', type: 'text', value: input.phoneNumber },
              { label: 'Bio', id: 'bio', name: 'bio', type: 'text', value: input.bio },
              { label: 'Skills', id: 'skills', name: 'skills', type: 'text', value: input.skills },
            ].map(({ label, id, name, type, value }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={name}
                  type={type}
                  value={value}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
            ))}
            {/* Resume Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uploadedFile" className="text-right">
                Resume
              </Label>
              <Input
                id="uploadedFile"
                name="uploadedFile"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className={`w-full my-4 bg-black text-white hover:bg-black focus:bg-black ${
                loading && 'pointer-events-none'
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
