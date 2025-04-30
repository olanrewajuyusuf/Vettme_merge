import { ServicesCarousel } from "@/components/ServicesCarousel";
import TopupModal from "@/components/modals/TopupModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import { LuCodesandbox } from "react-icons/lu";
import { MdAccountBalanceWallet, MdLock, MdOutlineSecurity } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { HiAcademicCap } from "react-icons/hi";
import { FaPeopleArrows } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const serviceCards = [
      {name: "Sandbox", icon: <LuCodesandbox />, link: "/api/applications", content: "Try our API testing environment with provided public key and switch to live enviroment to access private key."},
      {name: "Physical Verification", icon: <ImProfile />, link: "/pro/verifications/new", content: "We send trained field agents to a specified address to verify the existence and accuracy of provided information."},
      {name: "Academic Verification", icon: <HiAcademicCap />, link: "/pro/verifications/new", content: "This service ensure the authenticity of educational qualifications. Whether for employment or admissions."},
      {name: "Professional Verification", icon: <FaPeopleArrows />, link: "/pro/verifications/new", content: "This verification service confirms an individual’s work history, job title, and more from previous or current employers"},
  ]

  return (
    <>
    {<TopupModal isOpen={topupModalOpen} setIsOpen={setTopupModalOpen} />}
    <div className="grid grid-cols-3 gap-5">
      <Card className="bg-img border border-stroke-clr p-8 col-span-2 flex justify-start items-center">
        <div className="w-1/2">
          <CardTitle>
            Welcome to <span className="text-destructive">Vettme</span>!
          </CardTitle>
          <CardDescription className="my-5 mr-7">
            Your best 3 in 1 verification solution.<br/> Gives control to the information
            and data of your Employees, Loan applicants, Logistic Drivers and more.
          </CardDescription>
          <div className="mt-10">
            <Button className="blue-red-gradient">Get Started <ArrowBigRight /></Button>
          </div>
        </div>
        <div className="border border-red-300 p-3 rounded-lg">
          <ServicesCarousel />
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="w-full h-[200px]">
          <img src="/wallet.jpg" alt="wallet" className="w-full h-full object-cover" />
        </div>
        <CardTitle className="px-5 pt-7 text-blue-400 text-lg flex items-center gap-1 mb-5"><MdAccountBalanceWallet/> Wallet</CardTitle>
        <CardContent>
          <p>Top up your wallet via online payment or bank transfer and start enjoying our services.</p>
        </CardContent>
        <div className="px-2">
          <Button 
          variant="link" 
          className="text-blue-400 font-bold flex justify-center"
          onClick={() => setTopupModalOpen(true)}
          >
            Top up <ArrowBigRight />
          </Button>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-3 gap-5 mt-10">
      <Card className="overflow-hidden">
        <div className="relative w-full h-[200px] bg-gradient-to-b from-blue-900 to-blue-700 flex justify-center items-center">
          <div className="w-[150px] h-[150px] bg-pink-400 rounded-full blur-2xl mx-auto"></div>
          <MdOutlineSecurity className="text-9xl absolute"/>
          <MdLock className="text-7xl text-orange-900 absolute"/>
        </div>
        <div className="px-5 py-10">
          <span className="text-blue-400 text-[16px] font-bold flex items-center gap-1 mb-5">
            Data Protection Commitment
          </span>
          <p>We are committed to safeguarding our customers' personal 
            information with the highest standards of security and confidentiality.
          </p>
        </div>
      </Card>
      <div className="col-span-2 grid grid-cols-2 gap-5">
        {serviceCards.map((service, ind) => (
          <Link to={service.link} key={ind}>
            <Card className="p-5 h-full hover:border hover:border-blue-400">
              <CardTitle className="text-blue-400">
                <span className="mb-5 bg-black">{service.icon}</span>
                <span className="mt-3 text-[16px]">{service.name}</span>
              </CardTitle>
              <p className="mt-5 text-gray-500">{service.content}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}