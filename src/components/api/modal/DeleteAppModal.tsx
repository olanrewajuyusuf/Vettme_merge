import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { handleAppDelete } from "@/hooks/apps";
import { Cross2Icon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  applicationName: string;
  appId: string;
}
export default function DeleteAppModal({
  isOpen,
  setIsOpen,
  applicationName,
  appId,
}: ModalProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [appName, setAppName] = useState("");

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!appName) return;

    if (applicationName !== appName) {
      toast.error("Application name mismatch", { id: "deleteToast" });
      return;
    }

    console.log(appId, setIsLoading, setIsOpen, queryClient);
    
    // handleAppDelete(appId, setIsLoading, setIsOpen, queryClient);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="-mt-16">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Delete Application</AlertDialogTitle>
          <span
            className={`absolute top-0 right-0 ${
              isLoading && "pointer-events-none"
            }`}
            onClick={() => (isLoading ? null : setIsOpen(false))}
          >
            <Cross2Icon className="cursor-pointer hover:text-red-500" />
          </span>
          <AlertDialogDescription>
            Are you sure you want to delete this application? Deleting this
            application will clear its log from our servers. This action cannot
            be undone. To delete, type{" "}
            <span className="text-red-500 font-semibold">
              {applicationName}
            </span>{" "}
            in the input field below
          </AlertDialogDescription>
          <form onSubmit={handleDelete}>
            <label htmlFor="appName" className="block mb-3">
              <p className="text-sm">Application Name</p>
              <Input
                type="text"
                placeholder="e.g. My App"
                id="appName"
                name="appName"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                disabled={isLoading}
              />
            </label>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 w-max"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-4">
                    Deleting App
                    <Spinner />
                  </div>
                ) : (
                  "Delete Application"
                )}
              </Button>
            </div>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
