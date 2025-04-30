import { Button } from "@/components/ui/button";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import noAvatar from "@/assets/noAvatar.jpeg";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "@/components/Logo";
import { VerificationDataType } from "@/lib/definitions";

export default function VerificationResult() {
  const location = useLocation();
  const data = location.state as VerificationDataType;

  const base64Img = data?.image || data?.photo;

  useEffect(() => {
    const img = document.getElementById("img") as HTMLImageElement | null;
    if (img) {
      if (base64Img) {
        img.setAttribute("src", "data:image/jpg;base64," + base64Img);
      } else {
        img.src = noAvatar;
      }
    }
  }, [base64Img]);

  const downloadResult = () => {
    const input = document.getElementById("verification-result") as HTMLElement | null;
    const pdfHeader = document.getElementById("pdf-header") as HTMLElement | null;
    if (!input || !pdfHeader) return;

    pdfHeader.style.display = "block";

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const margin = 10;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `verification result -${data?.first_name || data?.firstName || ""} ${
          data?.middle_name || data?.middleName || ""
        } ${data?.lastName || data?.last_name || ""} ${data?.other_names || ""} ${
          data?.full_name || ""
        }.pdf`
      );
    });

    pdfHeader.style.display = "none";
  };

  return (
    <>
      <div className="max-w-screen-sm mx-auto px-[4vw]">
        <div className="mb-5">
          <h1 className="text-header">Verification Successful</h1>
          <p className="text-body">
            Here are the information pertaining to the user you verified.
            Compare this with their claim
          </p>
        </div>

        <div
          className="p-6 bg-white rounded-lg overflow-y-scroll"
          id="verification-result"
        >
          <div className="hidden mb-10 pb-10" id="pdf-header">
            <Logo />
          </div>
          <div className="mb-3">
            <div className="w-full aspect-square rounded-md overflow-hidden">
              <img
                src={noAvatar}
                alt="No Image for this data"
                className="w-full h-full object-cover"
                id="img"
              />
            </div>
          </div>
          {data?.first_name && (
            <div className="mb-3">
              <p className="text-xs">Full Name</p>
              <p className="text-lg font-medium">{`${
                data?.first_name || data?.firstName || ""
              } ${data?.middle_name || data?.middleName || ""} ${
                data?.last_name || data?.lastName || ""
              }`}</p>
            </div>
          )}

          {data?.full_name && (
            <div className="mb-3">
              <p className="text-xs">Full Name</p>
              <p className="text-lg font-medium">{data?.full_name || ""}</p>
            </div>
          )}

          {data?.email && (
            <div className="mb-3">
              <p className="text-xs">Email Address</p>
              <p className="text-lg font-medium">
                {data?.email.toLowerCase() || ""}
              </p>
            </div>
          )}

          {data?.other_names && (
            <div className="mb-3">
              <p className="text-xs">Other Names</p>
              <p className="text-lg font-medium">{data?.other_names || ""}</p>
            </div>
          )}

          {data?.phone_number && (
            <div className="mb-3">
              <p className="text-xs">Phone Number</p>
              <p className="text-lg font-medium">{data?.phone_number || ""}</p>
            </div>
          )}

          {data?.phone_number1 && (
            <div className="mb-3">
              <p className="text-xs">Phone Number 1</p>
              <p className="text-lg font-medium">{data?.phone_number1 || ""}</p>
            </div>
          )}

          {data?.phone_number2 && (
            <div className="mb-3">
              <p className="text-xs">Phone Number 2</p>
              <p className="text-lg font-medium">{data?.phone_number2 || ""}</p>
            </div>
          )}

          {data?.gender && (
            <div className="mb-3">
              <p className="text-xs">Gender</p>
              <p className="text-lg font-medium">{data?.gender || ""}</p>
            </div>
          )}

          {data?.msisdn && (
            <div className="mb-3">
              <p className="text-xs">MSISDN</p>
              <p className="text-lg font-medium">{data?.msisdn || ""}</p>
            </div>
          )}

          {data?.voter_identification_number && (
            <div className="mb-3">
              <p className="text-xs">Noter's Identification Number</p>
              <p className="text-lg font-medium">
                {data?.voter_identification_number || ""}
              </p>
            </div>
          )}

          {data?.occupation && (
            <div className="mb-3">
              <p className="text-xs">Occupation</p>
              <p className="text-lg font-medium">{data?.occupation || ""}</p>
            </div>
          )}

          {data?.time_of_registration && (
            <div className="mb-3">
              <p className="text-xs">Time of Registration</p>
              <p className="text-lg font-medium">
                {data?.time_of_registration || ""}
              </p>
            </div>
          )}

          {data?.state && (
            <div className="mb-3">
              <p className="text-xs">State of Registration</p>
              <p className="text-lg font-medium">{data?.state || ""}</p>
            </div>
          )}

          {data?.local_government && (
            <div className="mb-3">
              <p className="text-xs">LGA of Registration</p>
              <p className="text-lg font-medium">
                {data?.local_government || ""}
              </p>
            </div>
          )}

          {data?.registration_area_ward && (
            <div className="mb-3">
              <p className="text-xs">Registration Area Ward</p>
              <p className="text-lg font-medium">
                {data?.registration_area_ward || ""}
              </p>
            </div>
          )}

          {data?.polling_unit && (
            <div className="mb-3">
              <p className="text-xs">Polling Unit</p>
              <p className="text-lg font-medium">{data?.polling_unit || ""}</p>
            </div>
          )}

          {data?.polling_unit_code && (
            <div className="mb-3">
              <p className="text-xs">Polling Unit Code</p>
              <p className="text-lg font-medium">
                {data?.polling_unit_code || ""}
              </p>
            </div>
          )}

          {data?.address && (
            <div className="mb-3">
              <p className="text-xs">Address</p>
              <p className="text-lg font-medium">{data?.address || ""}</p>
            </div>
          )}

          {data?.date_of_birth && (
            <div className="mb-3">
              <p className="text-xs">Date of Birth</p>
              <p className="text-lg font-medium">{data?.date_of_birth || ""}</p>
            </div>
          )}

          {data?.dateOfBirth && (
            <div className="mb-3">
              <p className="text-xs">Date of Birth</p>
              <p className="text-lg font-medium">{data?.dateOfBirth || ""}</p>
            </div>
          )}

          {data?.dob && (
            <div className="mb-3">
              <p className="text-xs">Date of Birth</p>
              <p className="text-lg font-medium">{data?.dob || ""}</p>
            </div>
          )}

          {data?.birthDate && (
            <div className="mb-3">
              <p className="text-xs">Date of Birth</p>
              <p className="text-lg font-medium">{data?.birthDate || ""}</p>
            </div>
          )}

          {data?.account_currency && (
            <div className="mb-3">
              <p className="text-xs">Account Currency</p>
              <p className="text-lg font-medium">
                {data?.account_currency || ""}
              </p>
            </div>
          )}

          {data?.account_name && (
            <div className="mb-3">
              <p className="text-xs">Account Name</p>
              <p className="text-lg font-medium">{data?.account_name || ""}</p>
            </div>
          )}

          {data?.account_number && (
            <div className="mb-3">
              <p className="text-xs">Account Number</p>
              <p className="text-lg font-medium">
                {data?.account_number || ""}
              </p>
            </div>
          )}

          {data?.account_type && (
            <div className="mb-3">
              <p className="text-xs">Account Type</p>
              <p className="text-lg font-medium">{data?.account_type || ""}</p>
            </div>
          )}

          {data?.address_1 && (
            <div className="mb-3">
              <p className="text-xs">Address</p>
              <p className="text-lg font-medium">{data?.address_1 || ""}</p>
            </div>
          )}

          {data?.address_2 && (
            <div className="mb-3">
              <p className="text-xs">Address</p>
              <p className="text-lg font-medium">{data?.address_2 || ""}</p>
            </div>
          )}

          {data?.address_city && (
            <div className="mb-3">
              <p className="text-xs">City</p>
              <p className="text-lg font-medium">{data?.address_city || ""}</p>
            </div>
          )}

          {data?.city && (
            <div className="mb-3">
              <p className="text-xs">City</p>
              <p className="text-lg font-medium">{data?.city || ""}</p>
            </div>
          )}

          {data?.address_state && (
            <div className="mb-3">
              <p className="text-xs">State</p>
              <p className="text-lg font-medium">{data?.address_state || ""}</p>
            </div>
          )}

          {data?.country_code && (
            <div className="mb-3">
              <p className="text-xs">Country Code</p>
              <p className="text-lg font-medium">{data?.country_code || ""}</p>
            </div>
          )}

          {data?.country_of_birth && (
            <div className="mb-3">
              <p className="text-xs">Country of Birth</p>
              <p className="text-lg font-medium">
                {data?.country_of_birth || ""}
              </p>
            </div>
          )}

          {data?.country_of_issue && (
            <div className="mb-3">
              <p className="text-xs">Country of Issue</p>
              <p className="text-lg font-medium">
                {data?.country_of_issue || ""}
              </p>
            </div>
          )}

          {data?.expiry_date && (
            <div className="mb-3">
              <p className="text-xs">Expiry Date</p>
              <p className="text-lg font-medium">{data?.expiry_date || ""}</p>
            </div>
          )}

          {data?.identity_number && (
            <div className="mb-3">
              <p className="text-xs">Identity Number</p>
              <p className="text-lg font-medium">
                {data?.identity_number || ""}
              </p>
            </div>
          )}

          {data?.identity_type && (
            <div className="mb-3">
              <p className="text-xs">Identity Type</p>
              <p className="text-lg font-medium">{data?.identity_type || ""}</p>
            </div>
          )}

          {data?.postal_code && (
            <div className="mb-3">
              <p className="text-xs">Postal Code</p>
              <p className="text-lg font-medium">{data?.postal_code || ""}</p>
            </div>
          )}

          {data?.state_code && (
            <div className="mb-3">
              <p className="text-xs">State Code</p>
              <p className="text-lg font-medium">{data?.state_code || ""}</p>
            </div>
          )}

          {data?.phone && (
            <div className="mb-3">
              <p className="text-xs">Phone Number</p>
              <p className="text-lg font-medium">{data?.phone || ""}</p>
            </div>
          )}

          {data?.employment_status && (
            <div className="mb-3">
              <p className="text-xs">Employment Status</p>
              <p className="text-lg font-medium">
                {data?.employment_status || ""}
              </p>
            </div>
          )}

          {data?.marital_status && (
            <div className="mb-3">
              <p className="text-xs">Marital Status</p>
              <p className="text-lg font-medium">
                {data?.marital_status || ""}
              </p>
            </div>
          )}

          {data?.uuid && (
            <div className="mb-3">
              <p className="text-xs">UUID</p>
              <p className="text-lg font-medium">{data?.uuid || ""}</p>
            </div>
          )}

          {data?.licenseNo && (
            <div className="mb-3">
              <p className="text-xs">License Number</p>
              <p className="text-lg font-medium">{data?.licenseNo || ""}</p>
            </div>
          )}

          {data?.issuedDate && (
            <div className="mb-3">
              <p className="text-xs">Issued Date</p>
              <p className="text-lg font-medium">{data?.issuedDate || ""}</p>
            </div>
          )}

          {data?.expiryDate && (
            <div className="mb-3">
              <p className="text-xs">Expiry Date</p>
              <p className="text-lg font-medium">{data?.expiryDate || ""}</p>
            </div>
          )}

          {data?.stateOfIssue && (
            <div className="mb-3">
              <p className="text-xs">State of Issue</p>
              <p className="text-lg font-medium">{data?.stateOfIssue || ""}</p>
            </div>
          )}

          {data?.lga_of_origin && (
            <div className="mb-3">
              <p className="text-xs">LGA of Origin</p>
              <p className="text-lg font-medium">{data?.lga_of_origin || ""}</p>
            </div>
          )}

          {data?.lga_of_residence && (
            <div className="mb-3">
              <p className="text-xs">LGA of Residence</p>
              <p className="text-lg font-medium">
                {data?.lga_of_residence || ""}
              </p>
            </div>
          )}

          {data?.state_of_origin && (
            <div className="mb-3">
              <p className="text-xs">State of Origin</p>
              <p className="text-lg font-medium">
                {data?.state_of_origin || ""}
              </p>
            </div>
          )}

          {data?.state_of_residence && (
            <div className="mb-3">
              <p className="text-xs">State of Residence</p>
              <p className="text-lg font-medium">
                {data?.state_of_residence || ""}
              </p>
            </div>
          )}

          {data?.nationality && (
            <div className="mb-3">
              <p className="text-xs">Nationality</p>
              <p className="text-lg font-medium">{data?.nationality || ""}</p>
            </div>
          )}

          {data?.nin && (
            <div className="mb-3">
              <p className="text-xs">National Identification Number</p>
              <p className="text-lg font-medium">{data?.nin || ""}</p>
            </div>
          )}

          {data?.bvn && (
            <div className="mb-3">
              <p className="text-xs">Bank Verification Number</p>
              <p className="text-lg font-medium">{data?.bvn || ""}</p>
            </div>
          )}

          {data?.watch_listed && (
            <div className="mb-3">
              <p className="text-xs">Criminal Record</p>
              <p className="text-lg font-medium">{data?.watch_listed || ""}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 my-4">
          <Button
            className="w-full red-gradient uppercase"
            size="lg"
            onClick={downloadResult}
          >
            Download Data
          </Button>
          <Link to="/">
            <Button className="bg-stroke-clr text-grey-clr h-full" size="icon">
              <GoHome className="text-2xl" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
