import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Features</h1>

      <h2 className="mb-6">Physical Verification</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Field agents visit the personnel’s address for verification.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Geolocation tracking from start to submission.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Captures information like landmarks, nearest bus stop, and a live-recorded video of the residence.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Offline video recording with an option to upload later when online.</li>
      </ol>
      <h2 className="my-6">Guarantor Verification</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Guarantors provide detailed personal information.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Liveness check to confirm the identity of the guarantor.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Cross-verification against BVN (Bank Verification Number) or NIN (National Identification Number).</li>
      </ol>
      <h2 className="my-6">Professional Information Verification</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> A verification form is sent to the company or organization where the personnel claims to have worked.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Confirms employment history, work ethics, and character.</li>
      </ol>
      <h2 className="my-6">Academic & Mental Health Verification</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Academic records validation.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon /> Mental health screening and assessment.</li>
      </ol>

      <div className="flex justify-between w-full mt-[150px]">
        <Link to="/docs">
          <Button variant="ghost">
          <ArrowLeftIcon /> Introduction
          </Button>
        </Link>
        <Link to="/docs/activation">
          <Button variant="ghost">
            Activation <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}