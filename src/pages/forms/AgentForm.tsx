import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAgent } from "@/api/address";
import images from "@/assets/Images";
import { statesInNigeria, stateToLGA } from "@/lib/statesAndLgas";

const AgentForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [cred, setCred] = useState({
        agentName: "",
        email: "",
        address: "",
        state: "",
        phone_number: "",
        lga: ""
    });

    const [lgaOptions, setLgaOptions] = useState<string[]>([]);

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = e.target.value;
        if (selectedState in stateToLGA) {
            setCred({ ...cred, state: selectedState, lga: "" }); // Reset LGA when state changes
            setLgaOptions(stateToLGA[selectedState as keyof typeof stateToLGA] || []);
        } else {
            setLgaOptions([]);
        }
    };

    const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCred({ ...cred, lga: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form));
        console.log(data);
        
        RegisterAgent(data, setIsLoading, navigate);
    };

    return (
        <div className="p-5 md:w-[50%] lg:w-[40%] mx-auto">
            <img src={images.logo} alt="Vettme" className="h-8 mb-5" />
            <h1 className="my-2 font-light text-3xl text-left">Agent Registration Form</h1>
            <p>Register yourself as as one of our Vettme App Field Agent.</p>
            <form onSubmit={handleSubmit} className="mt-[50px] w-full">
                <label htmlFor="agentName" className="block">
                    <p className="text-sm">Full Name</p>
                    <Input
                        type="text"
                        placeholder="e.g. John Doe"
                        disabled={isLoading}
                        id="agentName"
                        name="agentName"
                        value={cred.agentName}
                        required
                        className="mb-2"
                        onChange={(e) => setCred({...cred, agentName: e.target.value})}
                    />
                </label>
                <label htmlFor="address" className="block">
                    <p className="text-sm">Home Address</p>
                    <Input
                        type="text"
                        placeholder="e.g. No2. Somewhere str."
                        disabled={isLoading}
                        id="address"
                        name="address"
                        value={cred.address}
                        required
                        className="mb-2"
                        onChange={(e) => setCred({...cred, address: e.target.value})}
                    />
                </label>
                <label htmlFor="email" className="block">
                    <p className="text-sm">Email Address</p>
                    <Input
                        type="email"
                        placeholder="e.g. yourcompany@email.com"
                        disabled={isLoading}
                        id="email"
                        name="email"
                        value={cred.email}
                        required
                        className="mb-2"
                        onChange={(e) => setCred({...cred, email: e.target.value})}
                    />
                </label>
                <label htmlFor="state" className="block">
                    <p className="text-sm">State</p>
                    <select
                        id="state"
                        name="state"
                        value={cred.state}
                        required
                        className="mb-2 w-full p-2 border rounded text-sm"
                        onChange={handleStateChange}
                        disabled={isLoading}
                    >
                        <option value="">Select State</option>
                        {statesInNigeria.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="lga" className="block">
                    <p className="text-sm">Local Government Area (LGA)</p>
                    <select
                        id="lga"
                        name="lga"
                        value={cred.lga}
                        required
                        className="mb-2 w-full p-2 border rounded text-sm"
                        onChange={handleLgaChange}
                        disabled={isLoading || !cred.state}
                    >
                        <option value="">Select LGA</option>
                        {lgaOptions.map(lga => (
                            <option key={lga} value={lga}>{lga}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="phone_number" className="block">
                    <p className="text-sm">Phone number</p>
                    <Input
                        type="string"
                        placeholder="e.g. +234-9102102011"
                        disabled={isLoading}
                        id="phone_number"
                        name="phone_number"
                        value={cred.phone_number}
                        required
                        onChange={(e) => setCred({...cred, phone_number: e.target.value})}
                    />
                </label>
                <Button
                    className="w-full red-gradient mt-6"
                    disabled={isLoading || cred.email.length < 5}
                    type="submit"
                >
                    {isLoading ? <Loader /> : "Register"}
                </Button>
            </form>
        </div>
    );
}

export default AgentForm;