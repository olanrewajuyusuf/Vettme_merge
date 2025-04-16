import TopupModal from "@/components/modals/TopupModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import loader from "@/assets/loader.svg";
import { useFetchPayment } from "@/hooks/company";
import { useUser } from "@/utils/context/useUser";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";

// const metrics = [
//   {
//     month: "January",
//     amount: "N38,365",
//   },
//   {
//     month: "February",
//     amount: "N38,365",
//   },

//   {
//     month: "March",
//     amount: "N38,365",
//   },
//   {
//     month: "April",
//     amount: "N38,365",
//   },

//   {
//     month: "May",
//     amount: "N38,365",
//   },
//   {
//     month: "June",
//     amount: "N38,365",
//   },

//   {
//     month: "July",
//     amount: "N38,365",
//   },
// ];

interface PaymentProps {
  type: string,
  amount: number,
  createdAt: string;
  status: string,
}

export default function Wallet() {
  const [payments, setPayments] = useState<PaymentProps[] | []>([]);
  const { fetchPayment } = useFetchPayment();
  const { balance } = useUser();
  const [topupModalOpen, setTopupModalOpen] = useState(false);

  useEffect(()=> {
    const getPayment = async () => {
      try {
        const data = await fetchPayment();
          setPayments(data.transactions);
      } catch (error) {
        console.error("Failed to fetch transaction history:", error);
      }
    };

    getPayment();
  }, [fetchPayment])

  return (
    <>
      {<TopupModal isOpen={topupModalOpen} setIsOpen={setTopupModalOpen} />}
      <div className="w-full mb-6 rounded-xl wallet py-4 px-6 flex justify-between items-center text-white">
        <div>
          <p className="text-sm">Available Balance</p>
          <h1 className="flex items-center gap-1"><MdAccountBalanceWallet />{balance.toLocaleString()}</h1>
        </div>
        <Button
          className="bg-white text-base-clr hover:bg-gray-100"
          // onClick={() => setTopupModalOpen(true)}
        >
          <FaPlusCircle className="mr-1 text-blue-800" />
          Add to Balance
        </Button>
      </div>
      <div className="flex gap-6">
        <div className="basis-2/3 bg-white border-[1px] border-stroke-clr rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Transaction History</p>
            <div className="flex gap-1 items-center">
              <MixerHorizontalIcon />
              <p className="text-sm">Filters</p>
            </div>
          </div>

          {payments === null ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <img src={loader} alt="" className="w-10" />
              </div>
          ) :
          payments.length === 0 ? (
              <div className="w-full h-[300px] flex justify-center items-center">
                  <h3>No Transaction history.</h3>
              </div>
          ) : (
          <Table>
            <TableHeader className="bg-stroke-clr">
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.amount.toLocaleString()}</TableCell>
                  <TableCell>{moment(item.createdAt).format("MMM Do YYYY, h:mm A")}</TableCell>
                  <TableCell>
                    <Badge
                      className={`pointer-events-none ${
                        item.status === "success"
                          ? "bg-green-600"
                          : item.status === "pending"
                          ? "border-yellow-500 border-[1px] text-yellow-500 bg-white"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status === "success"
                        ? "successful"
                        : item.status === "pending"
                        ? "Pending"
                        : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
        </div>
        <div className="basis-1/3 bg-white border-[1px] border-stroke-clr rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Usage Metrics</p>
            <div className="flex gap-1 items-center">
              <MixerHorizontalIcon />
              <p className="text-sm">Filters</p>
            </div>
          </div>

          <div className="w-full h-[300px] flex justify-center items-center">
                  <h3>No Metric data.</h3>
              </div>

          {/* <Table>
            <TableHeader className="bg-stroke-clr">
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </div>
      </div>
    </>
  );
}
