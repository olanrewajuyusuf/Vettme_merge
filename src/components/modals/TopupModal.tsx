import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl";

interface DialogModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TopupModal({ isOpen, setIsOpen }: DialogModal) {
  const [amount, setAmount] = useState("")
  const token = localStorage.getItem("token")

  const topUp = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const {data} = await axios.post(`${baseUrl}/payment/create`, {
        amount
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      window.location.href = `${data.data.authorization_url}`

    } catch(err){
      console.error(err)
      alert("Payment couldn't go through")
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <span
          className="absolute top-2 right-2"
          onClick={() => setIsOpen(false)}
        >
          <CrossCircledIcon className="cursor-pointer hover:text-red-clr" />
        </span>
        <AlertDialogHeader>
          <AlertDialogTitle>Topup your wallet</AlertDialogTitle>
          <AlertDialogDescription>
            Enter how much you'll like to topup your wallet with
            </AlertDialogDescription>
            </AlertDialogHeader>
            <form className="flex w-full items-center relative gap-2" onSubmit={topUp}>
              
              <span className="pointer-events-none absolute left-2 text-gray-300">
                NGN |
              </span>
              <Input
                type="number"
                placeholder="e.g. 3000"
                className="w-full pl-14"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button type="submit" className="red-gradient" >
                Topup Wallet
              </Button>

            </form>
            
      </AlertDialogContent>
    </AlertDialog>
  );
}
