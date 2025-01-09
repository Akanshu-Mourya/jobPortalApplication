import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector((store) => store.job || {});

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center">
                                You haven't applied for any job yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob.createdAt.split('T')[0]}</TableCell>
                                <TableCell>{appliedJob.job.title}</TableCell>
                                <TableCell>{appliedJob.job.company.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        className={`bg-gray-800 text-white px-5 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 ${
                                            appliedJob?.status === 'rejected'
                                                ? 'bg-red-500'
                                                : appliedJob.status === 'pending'
                                                ? 'bg-gray-500'
                                                : 'bg-green-500'
                                        }`}
                                    >
                                        {appliedJob.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
