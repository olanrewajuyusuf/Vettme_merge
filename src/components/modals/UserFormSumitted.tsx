import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogModal {
  isOpen: boolean;
}
export default function UserFormSumitted({ isOpen }: DialogModal) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-600 mb-3">
            Form Submitted Successfully
          </AlertDialogTitle>
          <AlertDialogDescription>
            Congratulations! Your information has been submitted for
            verification. Note that we may contact your{" "}
            <b>
              guarantor, previous employer, academic institution and
              professional reference
            </b>{" "}
            in the verification process. You may also be contacted by a{" "}
            <b>health practitioner</b> to verify your health condition
            <span className="block mt-6">You may close this page.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
