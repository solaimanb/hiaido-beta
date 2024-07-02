import CreateMemberAccountButton from '@/components/CreateMemberAccountButton';
import ExstingMemberAccountButton from '@/components/ExstingMemberAccountButton';
import HelpVideoAWSButton from '@/components/HelpVideoAWSButton';
import OrDevider from '@/components/OrDevider';
import { CopyIcon } from '@radix-ui/react-icons';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import { VerifiedIcon } from 'lucide-react';

const MemberAccountPage = () => {
    const [arnText, setArnText] = useState("")
    const [showCopied, setShowCopied] = useState(false)
    window.scrollTo(0, 0);

    const copyContent = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // toast.success("ARN Copied!");
            setShowCopied(true)
        } catch (err) {
            alert("Failed to copy", err);
        }
    };

    useEffect(() => {
        if (showCopied) {
            setTimeout(() => {
                setShowCopied(false)
            }, 3000);
        }
    }, [showCopied])


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
            {/* <div className='w-full'>
                <div> help</div>
                <HelpVideoAWSButton />
            </div> */}
            <div className='min-h-screen overflow-auto flex justify-center items-center p-3'>
                <div className='p-9 rounded-lg text-center border border-orange-300 '>
                    <div className='w-full flex gap-2 mb-3 pb-3 justify-end items-center'>
                        <div>Help</div>
                        <HelpVideoAWSButton />
                    </div>
                    <div className='w-full flex flex-col md:flex-row gap-6 md:gap-0 items-center'>
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
                        <div className='w-full h-full p-2 md:border-l md:pl-4'>
                            <h2 className='font-bold text-2xl text-nowrap'>Are you an existing AWS user ?</h2>
                            <div className='flex gap-2 w-full justify-center'>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name="accessType" id="admin" defaultChecked />
                                    <label htmlFor="admin">Admin</label>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name="accessType" id="readOnly" />
                                    <label htmlFor="readOnly">Read Only</label>
                                </div>
                            </div>
                            <div className='w-full flex justify-center mt-4 relative'>
                                {showCopied && <div className='bg-white transition-all delay-300 p-3 absolute text-black rounded-lg top-[-60px] left-1 flex gap-2 shadow shadow-white'>
                                    <VerifiedIcon className='text-green-500' />
                                    Policy copied
                                </div>}
                                <button className='flex items-center gap-2 cursor-pointer' onClick={async () => {
                                    await copyContent(JSON.stringify({
                                        "Version": "2012-10-17",
                                        "Statement": [
                                            {
                                                "Sid": "Statement1",
                                                "Effect": "Allow",
                                                "Principal": {
                                                    "AWS": "arn:aws:iam::381492248344:role/hiaido-admin-role"
                                                },
                                                "Action": "sts:AssumeRole"
                                            }
                                        ]
                                    }));
                                }}>
                                    <CopyIcon
                                        id='addPolicy'
                                        className={`cursor-pointer ${showCopied && "text-orange-400"}`}
                                    />
                                    <label htmlFor="addPolicy" className='cursor-pointer'>
                                        Copy policy
                                    </label>
                                </button>
                            </div>

                            <div className='mt-5 w-full flex justify-center'>
                                <input type="text" name="role" id="role" placeholder='Enter Role ARN' className=' p-2 rounded-lg text-black' onChange={(e) => setArnText(e.target.value)} />
                            </div>
                            {/* <hr className='my-4' />

                            <div className='flex gap-2 justify-center md:justify-start  ml-0 sm:ml-2 xl:ml-8 w-full  items-center mt-3'>
                                <input type="radio" name="terms" id="terms" />
                                <label htmlFor="terms">I agree with the terms & Conditions</label>
                            </div>
                            <div className='flex gap-2 justify-center md:justify-start  ml-0 sm:ml-2 xl:ml-8 w-full  items-center'>
                                <input type="radio" name="policy" id="policy" />
                                <label htmlFor="policy" className='flex items-center gap-1'>
                                    <div>{"I agree with HIAIDO's"}
                                    </div>
                                    <NavLink
                                        to="/privacy"
                                        className="lg:block text-blue-400 underline-offset-2 text-sm font-semibold text-center underline"
                                    >
                                        Privacy Policy
                                    </NavLink>
                                </label>
                            </div> */}
                            <ExstingMemberAccountButton disabled={!arnText.length} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberAccountPage