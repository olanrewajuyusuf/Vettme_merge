// import { useFetchUserVerifications } from "@/API/Vett";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiCheckboxBlankLine } from "react-icons/ri";
// import moment from "moment";
// import loader from "@/assets/loader.svg";

// Define the type
type Verification = {
  title: string;
  personnel_name: string;
  verified_with: string;
  status: string;
  createdAt: string;
  // createdAt: string | Date;
};

export default function VerificationTable({VerificationsPlaceholder}: {VerificationsPlaceholder: Verification[]}) {
  // const { isLoading, data } = useFetchUserVerifications() as {
  //   isLoading: boolean;
  //   data: Verification[];
  // };

  // const verifications = data;

  // if (isLoading) {
  //   return (
  //     <div className="w-full flex flex-col items-center justify-center gap-6 py-10">
  //       <img src={loader} alt="" className="w-10" />
  //     </div>
  //   );
  // }

  return (
    <>
      {VerificationsPlaceholder?.length > 0 ? (
        <Table className="min-w-max h-full">
          <TableHeader className="bg-stroke-clr text-white">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Verified With</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VerificationsPlaceholder
              .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
              })
              .map((vett, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{vett.title}</TableCell>
                  <TableCell>{vett.personnel_name}</TableCell>
                  <TableCell>{vett.verified_with.toUpperCase()}</TableCell>
                  <TableCell className={`${vett.status === "success" ? "text-green-600" : "text-destructive"}`}>{vett.status}</TableCell>
                  <TableCell>
                    {/* {moment(vett.createdAt).format("MMMM Do YYYY, h:mm")} */}
                    {vett.createdAt}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-6 py-10">
          <RiCheckboxBlankLine className="text-5xl" />
          <span className="text-center">
            <p className="text-sm">There's nothing here yet</p>
          </span>
        </div>
      )}
    </>
  );
}
