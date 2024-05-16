import { useState } from "react";
import { hiaido } from "../assets";
import { useStore } from "../store/Store";

const Login = () => {
  const { login } = useStore()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  return (

    <section className="flex flex-col md:flex-row h-screen items-center">

      <div className=" flex justify-center items-center lg:flex w-full md:w-1/2 xl:w-2/3 h-screen">
        <div>
          <img src={hiaido} alt="logo" width={400} />
        </div>
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input value={user} onChange={(e) => setUser(e.target.value)} type="email" name="" id="username" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg text-gray-950 bg-gray-200 mt-2 border focus:border-blue-800 focus:bg-white focus:outline-none" autoFocus required />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="" id="password" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-800
              focus:bg-white focus:outline-none text-gray-950" required />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>

            <button onClick={(e) => {
              e.preventDefault()
              login(user, pass)
            }} className="w-full block bg-orange-500 hover:bg-yellow-500 focus:bg-orange-500 hover:text-black text-white font-semibold rounded-full
            px-4 py-3 mt-6">Log In</button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />


        </div>
      </div>

    </section>
  )
}
export default Login;