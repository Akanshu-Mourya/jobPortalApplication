import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profile?.profilePhoto || 'https://via.placeholder.com/150'} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname || 'No Name Provided'}</h1>
              <p>{user?.profile?.bio || 'No Bio Available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right">
            <Pen />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-4">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || 'Not Provided'}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || 'Not Provided'}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="text-2xl font-bold mb-4">Skills</h1>
          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <span key={index} className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
                  {skill}
                </span>
              ))
            ) : (
              <span>No Skills Added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start my-5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalName || 'View Resume'}
            </a>
          ) : (
            <span>No Resume Uploaded</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 my-10">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
