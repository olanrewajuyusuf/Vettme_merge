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
import Spinner from "@/components/Spinner";
import { IoIosPricetags } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import { baseUrl } from "@/api/baseUrl";
import { useUser } from "@/utils/context/useUser";
import { useFetchCompany } from "@/hooks/company";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  state: any;
}

const PRICE_PER_ITEM = 9000;

export default function PhysicalVettRequestModal({
  isOpen,
  setIsOpen,
  state,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setBalance } = useUser();
  const { fetchCompany } = useFetchCompany();
  const [selections, setSelections] = useState({
    personalAddress: false,
    guarantor1Address: false,
    guarantor2Address: false,
    guarantor3Address: false,
    guarantor4Address: false,
  });

  const handleCheckboxChange = (key: keyof typeof selections) => {
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const totalPrice = PRICE_PER_ITEM * selectedCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (selectedCount === 0) {
      return toast.error("Please select at least one person to verify.");
    }

    console.log({
        responseId: state.id,
        cost: totalPrice,
        ...selections,
      });
    

    setIsLoading(true);

    try {
        const response = await fetch(
            `${baseUrl}/verification-response/physical-address-request`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                responseId: state.id,
                ...selections,
                cost: totalPrice,
            }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            // Check for error message from API
            const errorMessage = data?.message || "Submission failed. Please try again.";
            toast.error(errorMessage);
            return;
        }

        toast.success("Verification request submitted successfully.");
        setIsOpen(false);
        setSelections({
            personalAddress: false,
            guarantor1Address: false,
            guarantor2Address: false,
            guarantor3Address: false,
            guarantor4Address: false,
        });
        const getCompany = async () => {
            try {
              const data = await fetchCompany();
              setBalance(data.result.user.balance);
            } catch (error) {
              console.error("Failed to fetch company info:", error);
            }
        };
        getCompany();
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="h-1/2 overflow-scroll">
            <AlertDialogHeader>
            <AlertDialogTitle>Request for Physical Verification</AlertDialogTitle>
            <AlertDialogDescription>
                Kindly select the people you want to verify...
            </AlertDialogDescription>

            <form onSubmit={handleSubmit}>
                {/* Personnel */}
                <div className="flex flex-col border border-stroke-clr rounded-xl px-4 py-2 mb-4">
                    <label className="w-full flex items-start justify-between">
                        <p className="font-bold">Personnel</p>
                        <Input
                        type="checkbox"
                        checked={selections.personalAddress}
                        onChange={() => handleCheckboxChange("personalAddress")}
                        disabled={isLoading}
                        className="w-5 h-5 cursor-pointer"
                        />
                    </label>
                    <span className="text-sm">
                        {state?.responses.piFullname ||
                        `${state.responses.piFirstName} ${state.responses.piMiddleName} ${state.responses.piLastName}`}
                    </span>
                    <span className="text-sm italic text-red-400">{state.responses.piAddress}</span>
                </div>

                {/* Guarantors */}
                {[
                { index: 1, key: "guarantor1lAddress" },
                { index: 2, key: "guarantor2lAddress" },
                { index: 3, key: "guarantor3lAddress" },
                { index: 4, key: "guarantor4lAddress" },
                ].map(({ index, key }) => {
                const fname = state[`giFirstName${index}`];
                if (!fname) return null;

                return (
                    <div key={index} className="flex flex-col border border-stroke-clr rounded-xl px-4 py-2 mb-4">
                        <label className="w-full flex items-start justify-between">
                            <p className="font-bold">{`${index} Guarantor`}</p>
                            <Input
                            type="checkbox"
                            checked={selections[key as keyof typeof selections]}
                            onChange={() => handleCheckboxChange(key as keyof typeof selections)}
                            disabled={isLoading}
                            className="w-5 h-5 cursor-pointer"
                            />
                        </label>
                        <span className="text-sm">
                            {state.responses[`giFullname${index}`] ||
                            `${state.responses[`giFirstName${index}`]} ${state.responses[`giMiddleName${index}`]} ${state.responses[`giLastName${index}`]}`}
                        </span>
                        <span className="text-sm italic text-red-400">
                            {state.responses[`giAddress${index}`]}
                        </span>
                    </div>
                );
                })}

                {/* Price summary */}
                <div className="flex justify-between items-center mb-4 border border-stroke-clr rounded-xl px-4 py-2">
                    <p className="flex items-center gap-1"><IoIosPricetags />Total Cost:</p>
                    <span className="text-sm text-black font-bold flex items-center">
                        <TbCurrencyNaira className="text-lg" />
                        {totalPrice.toLocaleString()}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                    if (!isLoading) setIsOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="red-gradient text-white font-bold py-2 px-4 rounded mt-3 flex items-center gap-1"
                    disabled={isLoading}
                    autoFocus
                >
                    {isLoading ? (
                    <div className="flex items-center gap-2">
                        Confirming... <Spinner />
                    </div>
                    ) : (
                    "Confirm"
                    )}
                </Button>
                </div>
            </form>
            </AlertDialogHeader>
        </AlertDialogContent>
        </AlertDialog>
  );
}
