import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText } = useSelector(store => store.company); // Default to an empty array if companies is undefined
    const [filterCompany, setFilterCompany] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany =
            companies.length >= 0 &&
            companies.filter((company) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
            });
        setFilterCompany(filteredCompany || []); // Ensure it's always an array
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-2">Logo</TableHead>
                        <TableHead className="px-4 py-2">Name</TableHead>
                        <TableHead className="px-4 py-2">Date</TableHead>
                        <TableHead className="px-4 py-2 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center py-4">
                                You haven't registered any company yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id} className="border-t">
                                <TableCell className="px-4 py-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={company.logo || 'https://via.placeholder.com/50'}
                                            alt={company.name}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="px-4 py-2">{company.name}</TableCell>
                                <TableCell className="px-4 py-2">{new Date(company.createdAt).toLocaleDateString('en-GB')}</TableCell> 
                                <TableCell className="px-4 py-2 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
