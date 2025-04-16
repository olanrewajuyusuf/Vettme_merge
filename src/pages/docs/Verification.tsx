import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function DocVerification() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Verification Request Process</h1>

      <h2 className="mb-6">Form Setup</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>Users select the type of verification needed (e.g., physical, professional, academic, etc.).</li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>Specify the number of guarantors and professional references if required.</li>
        <li>
            <span className="flex items-center gap-2 mb-3"><StarFilledIcon/> Select all the necessary personnel information such as:</span>
            <ul className="pl-5">
                <li className="flex items-center gap-2 mb-3"> <StarIcon/>First name, middle name, last name</li>
                <li className="flex items-center gap-2 mb-3"> <StarIcon/>Date of birth, nationality, residence details</li>
                <li className="flex items-center gap-2 mb-3"> <StarIcon/>Next of kin, last employment details</li>
                <li className="flex items-center gap-2 mb-5"> <StarIcon/>Email, BVN, and other required details.</li>
            </ul>
        </li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>A form is generated for each selected personnel with a unique ID.</li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>The form is sent to each personnel to fill out with the required information.</li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>The form includes an expiry date; after this date, no submissions will be accepted.</li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>The number of submissions cannot exceed the initially selected number of personnel.</li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>Once the form is filled and submitted, verification begins instantly and continues until the expiry date.</li>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>Verification results are processed in real time and will be concluded when the expiry time is reached.</li>
      </ol>
      <h2 className="my-6">Charges & Fees</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"> <StarFilledIcon/>Standard verifications incur normal charges.</li>
        <li className="flex items-center gap-2"> <StarFilledIcon/>Physical verification is a separate chargeable service.</li>
      </ol>

      <div className="flex justify-start w-full mt-[150px]">
        <Link to="/docs/activation">
          <Button variant="ghost">
            <ArrowLeftIcon /> Activation
          </Button>
        </Link>
      </div>
    </div>
  );
}