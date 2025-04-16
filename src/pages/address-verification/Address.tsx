import images from "@/assets/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Login as LoginCall} from "@/api/address"

const AddressVerification = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    email: "",
    accessCode: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(false);
    e.preventDefault();
    const form = e.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form))

    console.log(data);

    LoginCall(data, setLoading, navigate)
    // navigate('/address-verification/personnelslist');
  }
  return (
    <div className="h-[100svh] grid place-content-center">
        <form onSubmit={handleSubmit} className="bg-white w-[90%] max-w-[500px] p-5 rounded-lg mx-auto ">
            <img src={images.logo} alt="Vettme" className="h-8" />
            <div className="p-5 mt-10 bg-gray-200 rounded-lg">
                <h1 className="font-light text-xl">Kindly input your email and access code!</h1>
                <label htmlFor="email">
                  <input 
                      type="email"
                      placeholder="Email"
                      id="email" 
                      name="email"
                      value={cred.email}
                      onChange={(e) => setCred({ ...cred, email: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg my-5 shadow-sm shadow-gray-300"
                  />
                 </label>

                <label htmlFor="accessCode">
                  <input 
                      type="password"
                      placeholder="Access Code"
                      id="accessCode" 
                      name="accessCode"
                      value={cred.accessCode}
                      maxLength={6}
                      onChange={(e) => setCred({ ...cred, accessCode: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg mb-5 shadow-sm shadow-gray-300"
                  />
                </label>

                 <button type="submit"
                  className="w-full bg-destructive py-2 mt-2 rounded-lg text-white hover:bg-red-700"
                 >
                  {loading? "Log In": "Loading..."}
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddressVerification