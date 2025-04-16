import { baseUrl } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

interface company{
  id: string,
  companyName: string,
  companyId: string,
  address: string
}

interface formData {
  id: string,
  companyName: string,
  address: string
}

interface formData2 {
  token: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}


export default function Account() {
  const companyId = localStorage.getItem("companyId")
  const usertoken = localStorage.getItem("token")
  const [companyData, setCompanyData] = useState<company>({
    id: "",
    companyName: "",
    companyId: "",
    address: ""
  })

  useEffect(() => {
    const getCompany = async() => {
      try{
        const res = await axios.get(`${baseUrl}/company/${companyId}`, 
        {
          headers: {
          Authorization: `Bearer ${usertoken}`
        }
      }
        )
        console.log(res.data.result.company)
        setCompanyData(res.data.result.company)
      } catch(err){
        console.error(err)
      }
    }
    getCompany()
  }, [companyId, usertoken])

  const [formData, setFormData] = useState<formData>({
    id: `${companyId}`,
    companyName: `${companyData.companyName}`,
    address: `${companyData.address}`
  })

  const [formData2, setFormData2] = useState<formData2>({
    token: `${usertoken}`,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `${baseUrl}/company/${companyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        }
      );
      alert("Company information updated successfully!");
      // setCompanyData(formData); // Update displayed data
    } catch (error) {
      console.error("Error updating company data", error);
    }
  };

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseUrl}/auth/reset-password`,
        formData2,
        {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        }
      );
      alert("Password updated successfully!");
      // setCompanyData(formData); // Update displayed data
    } catch (error) {
      console.error("Error updating password", error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="mb-[30px]">
        <h2>Account</h2>
        <p className="text-sm">Manage and update your account information </p>
      </div>
      <label className="block w-full mb-4">
        <p>Company Name</p>
        <Input type="text" placeholder={companyData.companyName} name="companyName" value={formData.companyName} onChange={handleChange}/>
      </label>
      <label className="block w-full mb-4">
        <p>Company ID</p>
        <Input type="text" disabled placeholder={companyData.companyId} />
      </label>
      <label className="block w-full mb-4">
        <p>Company Address</p>
        <Input
          type="text"
          placeholder={companyData.address}
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <Button type="submit" className="red-gradient mb-2">
          Save Changes
      </Button>
      </form>
     
     <form onSubmit={handleSubmit2}>
      <hr className="mb-6" />
      <h2 className="font-semibold mb-6">Update Password</h2>
      <label className="block w-full mb-4">
        <p>Old Password</p>
        <Input type="password" placeholder="*" minLength={8} name="oldPassword" value={formData2.oldPassword} onChange={handleChange2}/>
      </label>
      <label className="block w-full mb-4">
        <p>New Password</p>
        <Input type="password" placeholder="*" minLength={8} name="newPassword" value={formData2.newPassword} onChange={handleChange2}/>
      </label>
      <label className="block w-full mb-4">
        <p>Confirm new Password</p>
        <Input type="password" placeholder="*" minLength={8} name="confirmPassword" value={formData2.confirmPassword} onChange={handleChange2}/>
      </label>
      <div className="flex gap-3 items-center">
        <Button type="submit" className="red-gradient">
          Save Changes
        </Button>
        <Button
          type="reset"
          className="bg-gray-200 text-base-clr hover:bg-gray-300"
        >
          Reset
        </Button>
      </div>
    </form>
    </>
  );
}