import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useAPIEnv } from "@/utils/context/useAPIEnv";

export default function ToggleAPIEnv() {
    const {isLive, setIsLive} = useAPIEnv();

    return (
        <div className="flex items-center space-x-2">
            <Switch id="toggle-env" onClick={() => setIsLive(prev => !prev)}/>
            <Label 
            htmlFor="toggle-env"
            className={`px-2 py-1 rounded-full ${isLive ? "bg-green-300" : "bg-red-200"} text-[10px] font-medium`}
            >
                {isLive ? "LIVE" : "SANDBOX"}
            </Label>
        </div>
    )
}
