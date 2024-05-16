import { awsLogo } from "../../assets"
import azure from '../../assets/images/azure.png';
import gcp from '../../assets/images/gcp.png'
import { useStore } from "../../store/Store";
import VerticalStepper from "./VerticalStepper";

function Stepper() {
    const { start, setStart, setUser, user } = useStore()
    return (
        <>
            {!start ? (
                <div className="w-full text-center">
                    {/* <ul className="flex justify-around items-center w-full gap-2 md:grid-cols-3">
                        <li>
                            <input type="radio" id="hosting-small" name="check" value="hosting-small" className="hidden peer" required />
                            <label htmlFor="hosting-small" className="inline-flex items-center justify-between p-5 text-gray-500 bg-white border-4 border-gray-200 rounded-lg cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-800 hover:bg-gray-300">
                                <img src={awsLogo} alt="aws" width={50} />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="azure-big" name="check" value="azure-big" className="hidden peer" />
                            <label htmlFor="azure-big" className="inline-flex items-center justify-between p-5 text-gray-500 bg-white border-4 border-gray-200 rounded-lg cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-800 hover:bg-gray-300">
                                <img src={azure} width={50} alt="azure" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="gcp-big" name="check" value="gcp-big" className="hidden peer" />
                            <label htmlFor="gcp-big" className="inline-flex items-center justify-between p-5 text-gray-500 bg-white border-4 border-gray-200 rounded-lg cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-800 hover:bg-gray-300">
                                <img src={gcp} width={50} alt="gcp" />
                            </label>
                        </li>
                    </ul> */}
                    <ul className="my-4 custom-radio flex justify-around items-center w-full gap-2 md:grid-cols-3">
                        <li>
                            <input type="radio" id="myradio1" name="myRadio" value={"aws"} className="hidden peer" />
                            <label htmlFor="myradio1" className="block relative text-gray-500 border-4 rounded-lg cursor-pointer peer-checked:border-green-500"><img width={100} height={"auto"} src={awsLogo} /></label>
                        </li>
                        <li>
                            <input type="radio" id="myradio2" name="myRadio" value={"azure"} className="hidden peer" />
                            <label htmlFor="myradio2" className="block relative text-gray-500 border-4 rounded-lg cursor-pointer peer-checked:border-green-500"><img width={100} height={"auto"} src={azure} /></label>
                        </li>
                        <li>
                            <input type="radio" id="myradio3" name="myRadio" value={"gcp"} className="hidden peer" />
                            <label htmlFor="myradio3" className="block relative text-gray-500 border-4 rounded-lg cursor-pointer peer-checked:border-green-500"><img width={100} height={"auto"} src={gcp} /></label>
                        </li>
                    </ul>
                    <button onClick={() => { setStart(true); setUser({ ...user, firstTime: false }) }} className="w-1/5 px-6 py-2 my-5 bg-green-700 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-md">Start</button>
                </div>
            ) : (
                <>
                    {/* <div className="container justify-center flex items-center py-6">
                        <div className="w-1/2">
                            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                        <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                    </span>
                                    <div className="pl-2">
                                        <h3 className="font-medium leading-tight">Step 1</h3>
                                        <p className="text-sm">Provide Knowladge base details</p>
                                    </div>
                                </li>
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-400 animate-spin dark:text-gray-600 fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </span>
                                    <div className="pl-2">
                                        <h3 className="font-medium leading-tight">Step 2</h3>
                                        <p className="text-sm">Setup Data Source</p>
                                    </div>
                                </li>
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                        <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                        </svg>
                                    </span>
                                    <div className="pl-2">
                                        <h3 className="font-medium leading-tight">Step 3</h3>
                                        <p className="text-sm">Select embeddings model and configu
                                            re vector store</p>
                                    </div>
                                </li>
                                <li className="ms-6">
                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                        <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                                        </svg>
                                    </span>
                                    <div className="pl-2">
                                        <h3 className="font-medium leading-tight">Step 4</h3>
                                        <p className="text-sm">Review and store</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div> */}
                    <VerticalStepper />
                </>
            )}
        </>
    )
}

export default Stepper