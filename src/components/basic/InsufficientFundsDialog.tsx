import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface InsufficientFundsDialogProps {
  isInsufficientFunds: boolean;
  setIsInsufficientFunds: (open: boolean) => void;
  userBalance: number;
}

export function InsufficientFundsDialog({
  isInsufficientFunds,
  setIsInsufficientFunds,
  userBalance,
}: InsufficientFundsDialogProps) {
  return (
    <AlertDialog
      open={isInsufficientFunds}
      onOpenChange={setIsInsufficientFunds}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Insufficient Funds!</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-body">
              This verificaton costs <strong>NGN300</strong> but you have{" "}
              <strong className="text-red-clr">
                NGN
                {userBalance}
              </strong>{" "}
              in your wallet. Topup your wallet to complete this verification.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="green-gradient">
            <Link to="/wallet/topup">Topup your wallet</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
