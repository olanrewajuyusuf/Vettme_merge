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

const FormSubmissionModal = ({ isOpen }: DialogModal) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-600 mb-3">
            Form Submitted Successfully
          </AlertDialogTitle>
          <AlertDialogDescription>
            Congratulations! The information provided has been submitted successfully.
            Thanks for your coperation.
            <br />
            <span className="block mt-6">You may close this page.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FormSubmissionModal;