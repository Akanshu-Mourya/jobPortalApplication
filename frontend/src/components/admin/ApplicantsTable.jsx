import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

const shortListingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => {
                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell className='text-blue-600 cursor-pointer'><a href={item?.applicant?.profile?.resumeOriginalName} target='_blank' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className='text-right cursor-pointer'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-32 bg-white'>
                                                {
                                                    shortListingStatus.map((status, index) => {
                                                        return (
                                                            <div key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;

// 12:14