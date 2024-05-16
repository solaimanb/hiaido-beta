import { useState } from "react";

const Inputs = () => {
  const [bucket, setBucket] = useState("")
  const [region, setRegion] = useState("")
  return (

    <section className="flex flex-col md:flex-row items-center">

      <div className="bg-blue-800 w-1/2 md:max-w-md lg:max-w-full p-6
      flex items-center">

        <div className="w-full">
          <h6 className="font-bold leading-tight">Alright prove required field</h6>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-300">Bucket name</label>
              <input value={bucket} onChange={(e) => setBucket(e.target.value)} type="email" name="" id="username" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg text-gray-950 bg-gray-200 mt-2 border focus:border-blue-800 focus:bg-white focus:outline-none" autoFocus required />
            </div>

            <div className="mt-4">
              <label className="block text-gray-300">Region</label>
              <input value={region} onChange={(e) => setRegion(e.target.value)} type="text" name="" id="password" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-800
              focus:bg-white focus:outline-none text-gray-950" required />
            </div>

            <button onClick={(e) => {
              e.preventDefault()
              setRegion("us-east-1")
              setBucket("raw-data")
            }} className="w-full block bg-orange-500 hover:bg-yellow-500 focus:bg-orange-500 hover:text-black text-white font-semibold rounded-full
            px-4 py-3 mt-6">Auto generate</button>
          </form>

          <hr className="my-2 border-gray-300 w-full" />


        </div>
      </div>

    </section>
  )
}
export default Inputs;