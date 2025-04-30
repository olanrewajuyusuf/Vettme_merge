import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchUserVerifications } from "@/hooks/basic/Vett";
import { RiCheckboxBlankLine } from "react-icons/ri";
import moment from "moment";
import loader from "@/assets/loader.svg";
import { Verification } from "@/lib/definitions";

export default function VerificationTable({isNumber}: {isNumber?: boolean}) {
  const { isLoading, data } = useFetchUserVerifications() as {
    isLoading: boolean;
    data: Verification[];
  };  

  const verifications = data?.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
  const recentVerifications = verifications?.slice(0, 5);  

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6 py-10">
        <img src={loader} alt="" className="w-10" />
      </div>
    );
  }

  return (
    <>
      {verifications?.length > 0 ? (
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
            {(isNumber ? recentVerifications : verifications)
              .map((vett, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{vett.title}</TableCell>
                  <TableCell>{vett.personnel_name}</TableCell>
                  <TableCell>{vett.verified_with.toUpperCase()}</TableCell>
                  <TableCell className={`${vett.status === "success" ? "text-green-600" : "text-destructive"}`}>{vett.status}</TableCell>
                  <TableCell>
                    {moment(vett.createdAt).format("MMMM Do YYYY, h:mm")}
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
