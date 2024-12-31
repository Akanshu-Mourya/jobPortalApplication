import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between mt-32 mb-10'>
                    <Input
                        className='w-fit  border-2'
                        placeholder='Filter by name'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className='bg-gray-800 text-white px-5 py-1 rounded text-sm cursor-pointer hover:bg-gray-800' onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable />

            </div>
        </div>
    )
}

export default Companies