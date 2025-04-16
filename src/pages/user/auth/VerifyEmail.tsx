import { EmailVerification } from "@/api/auth";
import images from "@/assets/Images";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const handleVerifyEmail = () => {
        console.log("Email Verified");
        EmailVerification(id, navigate);
    }
    return (
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-center">Verify your email!</h1>
        <div className="mt-10 w-[300px] flex items-center justify-center flex-col text-center">
            <img src={images.verify} alt="Email" className="w-[200px]" />
            <p className="mt-4">
            Thanks for helping us keep your account secure! Click the button below to finish verifying your email address
            </p>
            <Button 
            className="red-gradient mt-6"
            onClick={handleVerifyEmail}
            >
                Confirm email
            </Button>
        </div>
        </div>
    );
}