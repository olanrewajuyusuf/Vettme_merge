import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DialogModal {
  isOpen: boolean;
  createdForm: any
}


export default function FormCreation({ isOpen, createdForm }: DialogModal) {
  const { toast } = useToast();

  const url = window.location.hostname + `/forms/${createdForm.data.id}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "URL Copied!",
          description: "The for URL has been copied to your clipboard",
        });
      });
    } else {
      toast({
        variant: "destructive",
        title: "That didn't work!",
        description: "We need permission to write to your clipboard",
      });
    }
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Form Created Successfully</AlertDialogTitle>
          <AlertDialogDescription>
            Congratulations! You have created a new form. The verification
            process will start on 23/01/2024 05:00 when it expires for
            submission by your employees. Copy the form URL below and share it
            with the employees that needs to be verified.
            <span
              className="w-full border-[1px] border-red-clr bg-red-50 hover:bg-red-100 text-xs pl-5 cursor-pointer py-2 rounded-lg my-2 flex gap-2 transition-colors"
              onClick={handleCopy}
            >
              <CopyIcon />
              {url}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            className="bg-gray-400 hover:bg-gray-500"
            onClick={handleCopy}
          >
            Copy Form URL
          </Button>
          <Link to="/verifications">
            <Button className="red-gradient">
              Return to Verifications Page
            </Button>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
