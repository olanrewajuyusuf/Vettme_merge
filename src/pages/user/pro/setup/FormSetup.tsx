import { Input } from "@/components/ui/input";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FormCreation from "@/components/modals/FormCreation";
import {
  personalInfoFields,
  guarantorInfoFields,
  academicInfoFields,
  professionalInfoFields,
  mentalHealthFields,
} from "@/utils/formSetupData";
import { CreateForm } from "@/api/form";
import Spinner from "@/components/Spinner";
import { useFetchCompany } from "@/hooks/company";
import { useUser } from "@/utils/context/useUser";

const fieldGroups: { [key: string]: { fields: string[]; cost: number } } = {
  PersonalInformationGroup: {
    fields: [
      "piFirstName",
      "piMiddleName",
      "piLastName",
      "piDateOfBirth",
      "piGender",
      "piAddress",
      "piNationality",
      "piNextofKinName",
      "piNextofKinRelationship",
      "piNextofKinPhoneNumber",
      "piPhoneNumber",
      "piEmailAddress",
      "piMaritalStatus",
    ],
    cost: 500,
  },
  PersonalAddressGroup: {
    fields: [ "piPhysicalAddressRequest" ],
    cost: 9000,
  },

  GuarantorInformationGroup: {
    fields: [
      "giFirstName1",
      "giMiddleName1",
      "giLastName1",
      "giRelationshiptoPersonnel1",
      "giOccupation1",
      "giAddress1",
      "giPhoneNumberPhone1",
      "giEmailAddress1",
      "giYearsKnown1",
    ],
    cost: 500,
  },
  GuarantorAddressGroup: {
    fields: [ "giPhysicalAddressRequest1" ],
    cost: 9000,
  },

  AcademicInformationGroup: {
    fields: [
      "aiHighestQualification",
      "aiNameofInstitution",
      "aiYearofGraduation",
      "aiDegreeOrCertificationUpload",
      "aiProfessionalCertifications",
    ],
    cost: 15000,
  },

  ProfessionalInformationGroup: {
    fields: [
      "priOrganizationName1",
      "priEmploymentStartDate1",
      "priEmploymentType1",
      "priProfessionalSkills1",
      "priProfessionalReferenceName1",
      "priOrganizationEmail",
      "priProfessionalReferencePhoneNumber1",
    ],
    cost: 1000,
  },
};

function splitCamelCase(str: any) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2'); // Adds space before uppercase letters
}

const Form = () => {
  const [selectedGroups, setSelectedGroups] = useState<{
    [key: string]: number;
  }>({});
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [creationModalActive, setCreationModalActive] = useState(false);
  const [createdForm, setCreatedForm] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const companyId = localStorage.getItem("companyId");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const { fetchCompany } = useFetchCompany();
  const { setBalance } = useUser();

  const [formData, setFormData] = useState<{
    [key: string]: string | boolean | number;
  }>({
    title: "",
    verificationType: "",
    max: 0,
    giNumberofGuarantors: 0,
    priNumberofProfessionalReferences: 0,
    cost: totalCost,
    status: "PENDING",
    companyId: `${companyId}`,
  });

  // Function to update cost dynamically
  const updateCost = (updatedFields: string[]) => {
    let cost = 0;
    const newSelectedGroups: { [key: string]: number } = {};
    
    Object.entries(fieldGroups).forEach(([groupName, group]) => {
      if (group.fields.some((field) => updatedFields.includes(field))) {
        let groupCost = group.cost;
    
        // Multiply cost by giNumberofGuarantors if GuarantorInformationGroup or GuarantorAddressGroup is selected
        if (
          groupName === "GuarantorInformationGroup" ||
          groupName === "GuarantorAddressGroup"
        ) {
          groupCost *= (formData.giNumberofGuarantors as number) || 1;
        }
    
        // Multiply cost by priNumberofProfessionalReferences if ProfessionalInformationGroup is selected
        if (groupName === "ProfessionalInformationGroup") {
          groupCost *= (formData.priNumberofProfessionalReferences as number) || 1;
        }
    
        cost += groupCost;
        newSelectedGroups[splitCamelCase(groupName)] = groupCost; // Store cost breakdown with readable names
      }
    });
    
    setTotalCost(cost);
    setSelectedGroups(newSelectedGroups);
  };

  // Handle changes for inputs and checkboxes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    let updatedFormData;
  
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      updatedFormData = { ...formData, [name]: checked };
  
      const updatedFields = checked
        ? [...selectedFields, name]
        : selectedFields.filter((field) => field !== name);
  
      setSelectedFields(updatedFields);
      updateCost(updatedFields);
    } else {
      updatedFormData = {
        ...formData,
        [name]:
          type === "number" && e.target instanceof HTMLInputElement
            ? value === ""
              ? ""
              : parseFloat(value)
            : value,
      };
  
      // Recalculate cost if giNumberofGuarantors or priNumberofProfessionalReferences changes
      if (
        name === "giNumberofGuarantors" ||
        name === "priNumberofProfessionalReferences"
      ) {
        updateCost(selectedFields);
      }
    }
  
    setFormData(updatedFormData);
    localStorage.setItem("data", JSON.stringify(updatedFormData));
  };     

  // Handle form submission
  const handleSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calculatedCost = Math.floor(totalCost * Number(formData.max)); // Calculate cost before submission

    const newFormData = {
        ...formData,
        cost: calculatedCost, // ✅ Update cost dynamically
    };

    console.log("Payload before sending:", newFormData);

    const createdForm = await CreateForm(newFormData, setCreationModalActive, setIsLoading);

    if (createdForm) {
        console.log("Created form:", createdForm);
        setCreatedForm(createdForm);
        // Fetch company data
    const getCompany = async () => {
      try {
        const data = await fetchCompany();
        setBalance(data.result.company.balance);
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      }
    };

    getCompany();
    } else {
        console.error("Form creation failed or no data returned.");
    }
};


  return (
    <>
      {creationModalActive && createdForm && (
        <FormCreation isOpen={creationModalActive} createdForm={createdForm} />
      )}
      <div className="mb-[30px]">
        <h2>Create Verification Form</h2>
        <p className="text-sm">
          Enter form title and select the fields that you want your employee to
          fill in the options below. The defaults cannot be deselected.
        </p>
      </div>
      <div className="flex items-start gap-4">
        <form onSubmit={handleSetup} className="basis-2/3">
          <div className="w-full py-5 px-7 rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
            <div className="mb-5">
              <label htmlFor="title" className="w-full">
                <p className="text-[16px] font-medium">Form Title</p>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title as string}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </label>
            </div>
            <div className="w-full flex items-center gap-5 mb-5">
              <label htmlFor="max" className="block w-full">
                <p className="font-semibold">
                  Number of expected Personnel
                </p>
                <Input
                  type="number"
                  id="max"
                  name="max"
                  min='0'
                  value={formData.max as number}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </label>
              <label htmlFor="verificationType" className="w-full">
                <p className="font-semibold">Verification Type</p>
                <select
                  id="verificationType"
                  name="verificationType"
                  className="btn px-2 w-full"
                  value={formData.verificationType as string}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Verification Type</option>
                  <option value="PERSONNEL">Professional Verification</option>
                  <option value="LOAN">Loan Verification</option>
                  <option value="CRIMINALRECORD">
                    Logistics Driver Verification
                  </option>
                </select>
              </label>
            </div>
            <div className="w-full flex items-center gap-5">
              <label htmlFor="giNumberofGuarantors" className="w-full">
                <p className="font-semibold">Number of Guarantors</p>
                <Input
                  type="number"
                  id="giNumberofGuarantors"
                  name="giNumberofGuarantors"
                  min='0'
                  max='4'
                  value={formData.giNumberofGuarantors as number}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </label>
              <label htmlFor="priNumberofProfessionalReferences" className="w-full">
                <p className="font-semibold">Number of Professional References</p>
                <Input
                  type="number"
                  id="priNumberofProfessionalReferences"
                  name="priNumberofProfessionalReferences"
                  min='0'
                  max='2'
                  value={formData.priNumberofProfessionalReferences as number}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </label>
            </div>
          </div>

          {/* Sections for each information category */}
          {[
            { title: "Personal Information", fields: personalInfoFields },
            { title: "Guarantor's Information", fields: guarantorInfoFields },
            { title: "Academic Information", fields: academicInfoFields },
            {
              title: "Professional Information",
              fields: professionalInfoFields,
            },
            { title: "Mental Health Assessment", fields: mentalHealthFields },
          ].map((section, index) => (
            <div
              key={index}
              className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]"
            >
              <div
                className="py-5 px-7 border-b-[1px] border-stroke-clr flex justify-between items-center cursor-pointer"
                // onClick={() => setActiveTab(index + 1)}>
                onClick={() => setActiveTab((index + 1) as 1 | 2 | 3 | 4 | 5)}
              >
                <p className="text-[16px] font-medium">{section.title}</p>
                {activeTab === index + 1 ? (
                  <TriangleDownIcon />
                ) : (
                  <TriangleRightIcon />
                )}
              </div>
              {activeTab === index + 1 && (
                <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                  {section.fields.map((field) => (
                    <label
                      htmlFor={field.id}
                      className="flex gap-2"
                      key={field.id}
                    >
                      <input
                        type="checkbox"
                        id={field.id}
                        name={field.id}
                        checked={!!formData[field.id]}
                        onChange={handleChange}
                      />
                      <p className="text-sm">{field.label}</p>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3">
            <Link to="/preview-form" target="_blank">
              <Button type="button" className="bg-gray-400 hover:bg-gray-500">
                Preview Form
              </Button>
            </Link>
            <Button
              type="submit"
              className="red-gradient flex items-center justify-center"
            >
              {isLoading ? <Spinner /> : "Complete Form Setup"}
            </Button>
          </div>
        </form>

        <div className="basis-1/3 sticky top-0 bg-white py-4 px-7 rounded-xl border-[1px] border-stroke-clr">
          <h3>Order Summary</h3>
          <p>Breakdown of selected services:</p>
          <ul className="mt-2">
            {Object.entries(selectedGroups).map(([groupName, cost]) => (
              <li key={groupName} className="text-sm">
                ✅ {groupName.replace(/Group$/, "")}: <strong>₦{cost}</strong>
              </li>
            ))}
            <li>
              ✅ Number of forms: <strong>{formData.max}</strong>
            </li>
          </ul>
          <p className="mt-3 text-lg font-semibold">
            Total:{" "}
            <strong>₦{Math.floor(totalCost * Number(formData.max))}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
