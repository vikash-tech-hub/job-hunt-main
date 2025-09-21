import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/application/${params.id}/applicants`,
                    { withCredentials: true }
                );
               dispatch(setAllApplicants(res.data.job.applications));

            } catch (error) {
                console.log(error);
            }
        };
        if (params.id) fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">
                    Applicants {applicants?.applications?.length}
                </h1>
                
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
