import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const TopCompany = ({ company }) => {
    const navigate = useNavigate();
    return (
        <div className="p-4 rounded-lg shadow-md bg-white border border-gray-200">
            <div className="flex items-center gap-4">
                <img
                    src={company?.logo}
                    alt={`${company?.name} logo`}
                    className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                    <h2 className="text-xl font-bold">{company?.name}</h2>
                    <p className="text-sm text-gray-500">{company?.location}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-700">{company?.description}</p>
            </div>
            <div className=" w-full mt-4 flex justify-between items-center">

                <div className='flex items-center gap-5 mt-5'>
                    <Button className='hover:bg-slate-100'>
                        Visit Site
                    </Button>
                    <Button
                        onClick={() => navigate(`/getJobByCompany/${company?._id}?name=${company?.name}&logo=${encodeURIComponent(company?.logo)}`)}
                        className='bg-[#6A38C2] text-white hover:bg-black'>
                        View Jobs
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TopCompany;