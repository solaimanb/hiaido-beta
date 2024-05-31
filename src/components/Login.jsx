// import { useState } from "react";
// import { hiaido } from "../assets";
// import { useStore } from "../store/Store";

// const Login = () => {
//   const { login } = useStore();
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");

//   return (
//     <section className="md:flex-row flex flex-col items-center h-screen">
//       <div className=" lg:flex md:w-1/2 xl:w-2/3 flex items-center justify-center w-full h-screen">
//         <div>
//           <img src={hiaido} alt="logo" width={400} />
//         </div>
//       </div>

//       <div className="md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 flex items-center justify-center w-full h-screen px-6 bg-white">
//         <div className="h-100 w-full">
//           <h1 className="md:text-2xl mt-12 text-xl font-bold leading-tight">
//             Log in to your account
//           </h1>

//           <form className="mt-6" action="#" method="POST">
//             <div>
//               <label className="block text-gray-700">Email Address</label>
//               <input
//                 value={user}
//                 onChange={(e) => setUser(e.target.value)}
//                 type="email"
//                 name=""
//                 id="username"
//                 placeholder="Enter Email Address"
//                 className="text-gray-950 focus:border-blue-800 focus:bg-white focus:outline-none w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg"
//                 autoFocus
//                 required
//               />
//             </div>

//             <div className="mt-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 value={pass}
//                 onChange={(e) => setPass(e.target.value)}
//                 type="password"
//                 name=""
//                 id="password"
//                 placeholder="Enter Password"
//                 minLength="6"
//                 className="focus:border-blue-800 focus:bg-white focus:outline-none text-gray-950 w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg"
//                 required
//               />
//             </div>

//             <div className="mt-2 text-right">
//               <a
//                 href="#"
//                 className="hover:text-blue-700 focus:text-blue-700 text-sm font-semibold text-gray-700"
//               >
//                 Forgot Password?
//               </a>
//             </div>

//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 login(user, pass);
//               }}
//               className="hover:bg-yellow-500 focus:bg-orange-500 hover:text-black block w-full px-4 py-3 mt-6 font-semibold text-white bg-orange-500 rounded-full"
//             >
//               Log In
//             </button>
//           </form>

//           <hr className="w-full my-6 border-gray-300" />
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Login;
