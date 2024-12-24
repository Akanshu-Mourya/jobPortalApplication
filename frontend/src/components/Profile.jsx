import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'

const skills = ["Html", "css", "Javascript", "Reactjs"]
const Profile = () => {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>

          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="Profile Image" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>Full Name</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque omnis amet, aperiam quae ipsum perferendis p</p>
            </div>
          </div>
          <Button className='text-right'  > <Pen /></Button>
        </div>
        <div>
          <div className='flex items-center gap-3  my-2'>

            <Mail />
            <span>akanshu@gmail.com</span>
          </div>
          <div className='flex items-center gap-3 my-2'>

            <Contact />
            <span>9303709571</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-2xl font-bold mb-4">Skills</h1>
          <div className="flex items-center gap-3 my-2">
            {
              skills.length > 0 ? skills.map((item, index) => (<span key={index} className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm cursor-pointer">{item}</span>)) : <span>No Skills</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold '>Resume </Label>
          {
            isResume ? <a target='blank' href="https://youtube.com" className='text-blue-500 w-full hover:underline cursor-pointer'>Akanshu Resume</a> : <span>No Resume</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>
    </div>
  )
}

export default Profile