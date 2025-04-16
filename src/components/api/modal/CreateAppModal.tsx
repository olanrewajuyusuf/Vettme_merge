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
import toast from "react-hot-toast";
import { axiosInstance } from "@/api/axiosConfig";
import { useQueryClient } from "@tanstack/react-query";
import { Cross2Icon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";

export default function CreateAppModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [appName, setAppName] = useState("");
  
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const toastId = toast.loading("Creating App", { id: "createToast" });

    await axiosInstance
      .post("/user/application", { appName })
      .then((res) => {
        toast.success(res?.data?.message || "Application created succesfully", {
          id: toastId,
        });
        queryClient.invalidateQueries({
          queryKey: ["Applications"],
        });
        setIsLoading(false);
        setIsOpen(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong", {
          id: toastId,
        });
      });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="-mt-16">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Create New Application</AlertDialogTitle>
          <span
            className={`absolute top-0 right-0 ${
              isLoading && "pointer-events-none"
            }`}
            onClick={() => (isLoading ? null : setIsOpen(false))}
          >
            <Cross2Icon className="cursor-pointer hover:text-red-500" />
          </span>
          <AlertDialogDescription>
            Provide an application name for your new application
          </AlertDialogDescription>
          <form onSubmit={handleCreate}>
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
            <Button
              type="submit"
              className="pry-btn w-max"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-4">
                  Creating App
                  <Spinner />
                </div>
              ) : (
                "Create New App"
              )}
            </Button>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
