import { FaBars } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Topbar({ heading }: {heading: string}) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between h-[100px]">
      <div className="flex items-center justify-center cursor-pointer">
        <FaArrowLeftLong onClick={() => navigate(-1)} />
      </div>
      <h1 className="text-header">{heading}</h1>
      <div className="opacity-0 pointer-events-none">
        <FaBars />
      </div>
    </div>
  );
}
