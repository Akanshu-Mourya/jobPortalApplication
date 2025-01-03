import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import UseGetCompanyById from '@/hooks/UseGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    UseGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store => store.company);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success('Company information updated.');
                navigate('/admin/companies');
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>

                        <Button onClick={() => navigate("/admin/companies")} className='bg-gray-100 text-gray-600 px-5 py-1 font-semibold rounded text-sm cursor-pointer hover:bg-gray-300' >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
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
                                Update
                            </Button>
                        )
                    }
                </form>
            </div>
        </div >
    )
}

export default CompanySetup
