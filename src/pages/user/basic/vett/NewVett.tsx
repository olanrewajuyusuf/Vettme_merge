import { Button } from "@/components/ui/button";
// import { useContext, useState } from "react";
// import { vettPersonnel } from "./../../API/Vett";
// import { useNavigate } from "react-router-dom";
import Topbar from "@/components/basic/Topbar";
// import { UserContext } from "@/utils/UserContext";
import { InsufficientFundsDialog } from "@/components/basic/InsufficientFundsDialog";
import { useState } from "react";
import { BankCodes } from "@/lib/BankCodes";
import { useUser } from "@/utils/context/useUser";

export default function NewVett() {
  const { balance } = useUser();
  // const user = useContext(UserContext).user;
  // const [isLoading, setIsLoading] = useState(false);
  const [isInsufficientFunds, setIsInsufficientFunds] = useState(false);
  // const navigate = useNavigate();
  const verificationCost = 300;

  const vettUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Throw error if user does not have enough balance
    if (balance < verificationCost) {
      setIsInsufficientFunds(true);
      return;
    }

    const verificationData = Object.fromEntries(new FormData(e.currentTarget));
    console.log(verificationData)

    // vettPersonnel(verificationData, setIsLoading, navigate);
  };

  const [vettData, setVettData] = useState<string | undefined>(undefined);
  const [vettWithNuban, setVettWithNuban] = useState(false);

  return (
    <>
      <div className="w-1/2 mx-auto mb-10">
        <Topbar heading="New Verification" />
        <div className="my-5">
          <h1 className="text-header text-2xl">Enter Verification Details</h1>
          <p className="text-body">
            Select your preferred verification method below
          </p>
        </div>

        <form onSubmit={vettUser} className="vett-form">
          <div className="bg-white p-4 rounded-lg">
            <label htmlFor="title" className="block mb-4">
              <p className="uppercase text-body">title</p>
              <input
                type="text"
                name="title"
                id="title"
                required
                maxLength={30}
                pattern="^[A-Za-z]+(?:\s[A-Za-z]+)*$"
                title="Only letters are allowed for title input"
                placeholder="e.g. My Truck Driver"
                className="text-input"
              />
            </label>
            <label htmlFor="name" className="block mb-4">
              <p className="uppercase text-body">full name</p>
              <input
                type="text"
                name="name"
                id="name"
                maxLength={30}
                pattern="^[A-Za-z]+(?:\s[A-Za-z]+)*$"
                title="Only letters are allowed for name input"
                required
                placeholder="e.g. John Doe"
                className="text-input"
              />
            </label>
            <label htmlFor="vett_data_type" className="block mb-4">
              <p className="uppercase text-body">
                Select a Verification Method
              </p>
              <select
                name="vett_data_type"
                id="vett_data_type"
                className="text-input py-0"
                required
                onChange={(e) => {
                  const selectedOption = e.target.selectedOptions[0];
                  setVettData(selectedOption.dataset.alias);
                  if (e.target.value.toLowerCase() === "nuban") {
                    setVettWithNuban(true);
                  } else {
                    setVettWithNuban(false);
                  }
                }}
              >
                <option value="">-- Select Verification Type --</option>
                <option
                  value="bvn"
                  id="bank verification number"
                  data-alias="Bank Verification Number"
                >
                  Bank Verification Number (BVN)
                </option>
                <option
                  value="nin"
                  id="National Identity Number"
                  data-alias="National Identity Number"
                >
                  National Identity Number (NIN)
                </option>
                <option
                  value="phone_number"
                  id="Phone number"
                  data-alias="Phone Number"
                >
                  Phone Number
                </option>
                <option
                  value="drivers_license"
                  id="Driver's License"
                  data-alias="Driver's Licence Number"
                >
                  Driver's License
                </option>
                <option
                  value="voters_id"
                  id="Voter's id"
                  data-alias="Voter's Identification Number"
                >
                  Voter's ID
                </option>
                <option value="nuban" id="nuban" data-alias="Nuban">
                  NUBAN
                </option>
              </select>
            </label>
            {vettData && (
              <label htmlFor="data_num" className="block mb-4">
                <p className="uppercase text-body">{vettData}</p>
                <input
                  type="text"
                  name="data_num"
                  id="data_num"
                  required
                  maxLength={20}
                  className="text-input"
                />
              </label>
            )}
            {vettWithNuban && (
              <label htmlFor="bank_code" className="block mb-4">
                <p className="uppercase text-body">bank name</p>
                <select
                  name="bank_code"
                  id="bank_code"
                  className="text-input py-0"
                  required
                >
                  {BankCodes.map((code, idx) => (
                    <option key={idx} value={code.code}>
                      {code.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <Button
            type="submit"
            className="mt-5 red-gradient w-full uppercase"
            size="lg"
            // disabled={isLoading}
            // disabled
          >
            Click to Verify
          </Button>
        </form>
      </div>
      {isInsufficientFunds && (
        <InsufficientFundsDialog
          isInsufficientFunds={isInsufficientFunds}
          setIsInsufficientFunds={setIsInsufficientFunds}
          userBalance={balance}
        />
      )}
    </>
  );
}
