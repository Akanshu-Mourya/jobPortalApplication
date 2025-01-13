import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import FilterCompanyCard from "./FilterCompanyCard";
import TopCompany from "./TopCompany";
import { motion } from "framer-motion";

const TopCompanies = () => {
    // const dispatch = useDispatch();
    const { companies = [], searchedQuery } = useSelector(store => store.company);
    const [FilterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        if (searchedQuery) {
            const filteredCompany = companies.filter((company) => {
                return company.name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    company.location.toLowerCase().includes(searchedQuery.toLowerCase())
            });
            setFilterCompany(filteredCompany);
        } else {
            console.log(companies);

            setFilterCompany(companies);
        }
    }, [companies, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-full md:w-1/4 lg:w-1/5'>
                        <FilterCompanyCard />
                    </div>
                    {
                        FilterCompany.length <= 0 ? <span>Company not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        FilterCompany?.map((company) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={company?._id}>
                                                <TopCompany company={company} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TopCompanies;