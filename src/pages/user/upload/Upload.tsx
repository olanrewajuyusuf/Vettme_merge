import { useState } from "react";
import { FileDropZone } from "react-file-uploadify";
import "react-file-uploadify/dist/index.css";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const updateFiles = (incommingFiles: any) => {
    setFiles(incommingFiles);
  };

  const handleUpload = () => {
    const emptyToast = () => {
      toast({
        title: "Not there yet!",
        description: "Upload an excel or csv file to continue",
        variant: "destructive",
      });
    };
    if (files.length === 0) {
      emptyToast();
      return;
    }

    navigate("/verifications/new/upload/setup");
  };
  return (
    <div className="w-full">
      <div className="w-full max-w-[600px] mt-10 mx-auto rounded-xl bg-white border-[1px] border-stroke-clr">
        <div className="p-4 border-b-[1px] border-stroke-clr">
          <h2>Upload Personnel Data</h2>
        </div>
        <div className="p-4">
          <FileDropZone
            onChange={updateFiles}
            maxFilesSizeInMb={200}
            acceptTypes={[".xlsx", ".csv"]}
            haveFileList={true}
            maxFiles={1}
            lang={"en"}
          />
          <Button onClick={handleUpload} className="w-full red-gradient mt-6">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
