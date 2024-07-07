import CreateMemberAccountButton from '@/components/CreateMemberAccountButton';
import ExstingMemberAccountButton from '@/components/ExstingMemberAccountButton';
import OrDevider from '@/components/OrDevider';
import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

const MemberAccountPage = () => {
    window.scrollTo(0, 0);
    return (
        <>
            <Helmet>
                <title>
                    Hiaido | AI Powered Cloud Automation Platform | Seamlessly automate
                    tasks, optimize resources, and drive efficiency for your business.
                </title>
                <meta
                    name="description"
                    content="HIAIDO is your intelligent cloud assistant, enabling you to effortlessly manage your cloud operations through natural language commands."
                />
                <meta
                    name="keywords"
                    content="Cloud, Automation, AI, Operations, India, Cloud Operations, Cloud Automation, AI Platform, Task Automation, Efficiency, Scalability, Cloud Infrastructure, Cloud Services, Cloud Computing"
                />
                <meta name="author" content="Hiaido" />
            </Helmet>
            <div className='min-h-screen overflow-auto flex justify-center items-center p-3'>
                <div className='p-9 rounded-lg text-center border border-orange-300 flex flex-col md:flex-row gap-6 md:gap-0 items-center'>
                    <div className='w-full p-2'>
                        <h2 className='font-bold text-2xl'>No Member Account Found</h2>
                        <p className="mt-3 w-full max-w-md">
                            You need to create a member account first before using the chatbot
                        </p>
                        <CreateMemberAccountButton className={"bg-black"} />
                    </div>
                    {/* <hr className='my-5' /> */}
                    <OrDevider className={"py-5 w-full block md:hidden"} />
                    <div className='translate-x-3 hidden md:block font-bold bg-black'>
                        OR
                    </div>
                    <div className='w-full h-full p-2 md:border-l'>
                        <h2 className='font-bold text-2xl'>Are you an existing AWS user ?</h2>
                        <div className='flex gap-2 justify-center md:justify-start  ml-0 sm:ml-2 xl:ml-12 w-full  items-center mt-3'>
                            <input type="radio" name="terms" id="terms" className='' />
                            <label htmlFor="terms">I agree with the terms & Conditions</label>
                        </div>
                        <div className='flex gap-2 justify-center md:justify-start  ml-0 sm:ml-2 xl:ml-12 w-full  items-center'>
                            <input type="radio" name="policy" id="policy" className='' />
                            <label htmlFor="policy" className='flex items-center gap-1'>
                                <div>I agree with HIAIDO's
                                </div>
                                <NavLink
                                    to="/privacy"
                                    className="lg:block text-blue-400 underline-offset-2 text-sm font-semibold text-center underline"
                                >
                                    Privacy Policy
                                </NavLink>
                            </label>
                        </div>
                        <ExstingMemberAccountButton />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberAccountPage