import images from "@/assets/Images";
import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordMail() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Check your Mailbox!</h1>
      <div className="mt-10 w-[300px] flex items-center justify-center flex-col text-center">
        <img src={images.mailbox} alt="Email" className="w-[150px]" />
        <p className="mt-4">
          We sent a link to the email you provided. Use the link to create a new password.
        </p>
        <Link to="https://mail.google.com" target="_blank" className="mt-6">
          <Button className="red-gradient">Open Mail</Button>
        </Link>

        <div className="mt-20">
            <p>
              Didn't get the mail?{" "}
              <span className="font-medium text-red-clr cursor-pointer">
                <Link to='/forgot-password'>Resend It</Link>
              </span>
            </p>
        </div>
      </div>
    </div>
  );
}
