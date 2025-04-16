import images from "@/assets/Images";
import UserFormSumitted from "@/components/modals/UserFormSumitted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createFormResponse } from "@/api/form";
import Spinner from "@/components/Spinner";
import { baseUrl } from "@/api/baseUrl";
import { 
  academicInfoResponse, 
  guarantorInfoResponse, 
  guarantorInfoResponse2, 
  guarantorInfoResponse3, 
  guarantorInfoResponse4, 
  mentalHealthResponse, 
  personalInfoResponse, 
  professionalInfoResponse, 
  professionalInfoResponse2 } from "@/utils/responseFields";
import FormComponent from "./FormComponent";

interface FormData {
  formId: string;
  responses: {
    [key: string]: string | number;
  };
}

export default function GenForms() {
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    title: "",
  });
  const url = window.location.href.split("/")[4];
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  // const [createdResponse, setCreatedResponse] = useState<any | null>(null);
  const [formData, setFormData] = useState<FormData>({
    formId: `${url}`,
    responses: {},
  });
  const [file, setFile] = useState<string | null>(null);

  // Handle change function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      responses: {
        ...prevData.responses,
        [name]:
          type === "checkbox" && e.target instanceof HTMLInputElement
            ? e.target.checked
              ? "yes"
              : "no" // ✅ Store as "yes" or "no"
            : type === "number" && e.target instanceof HTMLInputElement
            ? value === ""
              ? ""
              : parseFloat(value) // ✅ Convert number values
            : value, // ✅ Handles text and select inputs correctly
      },
    }));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'vettmepro') // Replace with your upload preset
        const response = await axios.post('https://api.cloudinary.com/v1_1/ijm-global-limited/image/upload', formData)
        setFile(response.data.secure_url)
      } catch (err) {
        console.error('Error uploading image:', err)
        alert('Failed to upload image')
      }
    }
  }

  // Handle response submission
  const handleSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormData = {
      ...formData,
      responses: {
        ...formData.responses,
        ...(visibleFields.includes("aiDegreeOrCertificationUpload") && file
          ? { aiDegreeOrCertificationUpload: file }
          : {}),
      },
    };

    console.log("Payload before sending: ", newFormData);

    const createdResponse = await createFormResponse(newFormData, setIsLoading);

    if (createdResponse) {
      console.log("Created Form Response:", createdResponse);
      // setCreatedResponse(createdResponse)
      setModalOpen(true);
    } else {
      console.error("Response creaton failed or no data returned.");
    }
  };

  useEffect(() => {
    // Fetch the form visibility data from the backend
    axios
      .get(`${baseUrl}/verification/form/${url}`)
      // Adjust the URL to your API endpoint
      .then((response) => {
        // Extract keys from the backend response where the value is true
        const data = response.data.data;
        setFormInfo(data);
        const visibleFieldKeys = Object.keys(data.fields).filter(
          (key) => response.data.data.fields[key] === true
        );
        setVisibleFields(visibleFieldKeys); // Set the visible fields in state
      })
      .catch((error) => {
        console.error("Error fetching visibility data:", error);
      });
  }, [url, token]);
  
  // Filter personalInfoFields based on visibleFields
  const filteredFields = personalInfoResponse.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredGuarantor = guarantorInfoResponse.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredGuarantor2 = guarantorInfoResponse2.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredGuarantor3 = guarantorInfoResponse3.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredGuarantor4 = guarantorInfoResponse4.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredAcademic = academicInfoResponse.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredProfessional = professionalInfoResponse.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredProfessional2 = professionalInfoResponse2.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredMentalHealth = mentalHealthResponse.filter((field) =>
    visibleFields.includes(field.id)
  );  

  return (
    <>
      <form
        className="max-w-screen-sm mx-auto px-[4vw] my-6"
        onSubmit={handleSetup}
      >
        <div className="w-full mb-6">
          <img src={images.logo} alt="Vettme" className="h-8" />
        </div>
        <div className="w-full bg-white rounded-2xl border-[1px] border-stroke-clr">
          <div className="p-4 border-b-[1px] border-stroke-clr">
            <h2>{formInfo.title}</h2>
            <p className="py-2">
              Please complete this form to provide accurate and up-to-date
              information for verification purposes. Ensure all details are
              filled in correctly before submission.
            </p>
            <p><strong>All fields must be filled.</strong></p> <br />
            <p><strong>Please be informed that civil servants cannot be used as guarantors for this verification process. Civil servants are restricted from acting as guarantors due to regulatory and employment policies.</strong></p>
          </div>

          <div className="w-full">
            <Tabs defaultValue="personal" className="w-full">
              <div className="overflow-x-scroll">
                <TabsList className="min-w-full rounded-none border-b-[1px] border-stroke-clr overflow-hidden">
                  {filteredFields.length !== 0 && (
                    <TabsTrigger value="personal" className="w-full">
                      Personal Information
                    </TabsTrigger>
                  )}

                  {filteredGuarantor.length !== 0 && (
                    <TabsTrigger value="guarantor" className="w-full">
                      {filteredGuarantor2.length !== 0 ? "1st Guarantor Information" : "Guarantor Information"}
                    </TabsTrigger>
                  )}

                  {filteredGuarantor2.length !== 0 && (
                    <TabsTrigger value="guarantor2" className="w-full">
                      2nd Guarantor Information
                    </TabsTrigger>
                  )}

                  {filteredGuarantor3.length !== 0 && (
                    <TabsTrigger value="guarantor3" className="w-full">
                      3rd Guarantor Information
                    </TabsTrigger>
                  )}

                  {filteredGuarantor4.length !== 0 && (
                    <TabsTrigger value="guarantor4" className="w-full">
                      4th Guarantor Information
                    </TabsTrigger>
                  )}

                  {filteredAcademic.length !== 0 && (
                    <TabsTrigger value="academic" className="w-full">
                      Academic Information
                    </TabsTrigger>
                  )}

                  {filteredProfessional.length !== 0 && (
                    <TabsTrigger value="professional" className="w-full">
                      {filteredProfessional2.length !== 0 ? "1st Professional Information" : "Professional Information"}
                    </TabsTrigger>
                  )}

                  {filteredProfessional2.length !== 0 && (
                    <TabsTrigger value="professional2" className="w-full">
                      2nd Professional Information
                    </TabsTrigger>
                  )}

                  {filteredMentalHealth.length !== 0 && (
                    <TabsTrigger value="mental" className="w-full">
                      Mental Assessment
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <div className="p-3 pb-0">
                <TabsContent value="personal">
                  <FormComponent data={filteredFields} formData={formData} handleChange={handleChange} country="piCountry" state="piState" lga="piLGA"/>
                </TabsContent>

                <TabsContent value="guarantor">
                    <FormComponent data={filteredGuarantor} formData={formData} handleChange={handleChange} country="giCountry1" state="giState1" lga="giLGA1"/>
                </TabsContent>

                <TabsContent value="guarantor2">
                    <FormComponent data={filteredGuarantor2} formData={formData} handleChange={handleChange} country="giCountry2" state="giState2" lga="giLGA2"/>
                </TabsContent>

                <TabsContent value="guarantor3">
                    <FormComponent data={filteredGuarantor3} formData={formData} handleChange={handleChange} country="giCountry3" state="giState3" lga="giLGA3"/>
                </TabsContent>

                <TabsContent value="guarantor4">
                    <FormComponent data={filteredGuarantor4} formData={formData} handleChange={handleChange} country="giCountry4" state="giState4" lga="giLGA4"/>
                </TabsContent>

                <TabsContent value="academic">
                  <FormComponent data={filteredAcademic} formData={formData} handleChange={handleChange} handleFile={handleFile}/>
                </TabsContent>

                <TabsContent value="professional">
                  <FormComponent data={filteredProfessional} formData={formData} handleChange={handleChange}/>
                </TabsContent>

                <TabsContent value="professional2">
                  <FormComponent data={filteredProfessional2} formData={formData} handleChange={handleChange}/>
                </TabsContent>

                <TabsContent value="mental">
                  <label htmlFor="health_conditon" className="block mb-4">
                    <p>Current Mental Health Condition (if known)</p>
                    <Input
                      type="text"
                      id="health_conditon"
                      placeholder="e.g. Asthmatic"
                    />
                  </label>

                  <label htmlFor="health_history" className="block mb-4">
                    <p>History of Mental Health Conditions</p>
                    <Input
                      type="text"
                      id="health_history"
                      placeholder="e.g. I used to be asthmatic"
                    />
                  </label>

                  <label htmlFor="is_under_treatment" className="block mb-4">
                    <p>Are you currently under any medication or treatment?</p>
                    <select
                      name="is_under_treatment"
                      id="is_under_treatment"
                      className="w-full btn"
                    >
                      <option value="" selected={true} disabled>
                        Select an Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label htmlFor="was_psychiatric" className="block mb-4">
                    <p>Have you had any previous psychiatric consultations?</p>
                    <select
                      name="was_psychiatric"
                      id="was_psychiatric"
                      className="w-full btn"
                    >
                      <option value="" selected={true} disabled>
                        Select an Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label htmlFor="self_assessment_scale" className="block mb-4">
                    <p>Self-assessment of Stress Level (1 - Low, 10 - High)</p>
                    <Input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      id="self_assessment_scale"
                      placeholder="e.g. 7"
                    />
                  </label>

                  <label htmlFor="was_traumatic" className="block mb-4">
                    <p>
                      Have you experienced any major trauma in the past year?
                    </p>
                    <select
                      name="was_traumatic"
                      id="was_traumatic"
                      className="w-full btn"
                    >
                      <option value="" selected={true} disabled>
                        Select an Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label htmlFor="emotional_wellbeing" className="block mb-4">
                    <p>Describe your Emotional Well-being Briefly</p>
                    <Textarea
                      className="resize-none"
                      id="emotional_wellbeing"
                    />
                  </label>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          {/* <label htmlFor="email_copy" className="flex items-center gap-2 p-3">
            <input type="checkbox" name="email_copy" id="email_copy" />
            <p>Send a copy of my data to my email</p>
          </label> */}
        </div>
        <Button type="submit" className="red-gradient mt-3">
          {isLoading ? <Spinner /> : "Submit Data for Verification"}
        </Button>
      </form>
      {<UserFormSumitted isOpen={modalOpen} />}
    </>
  );
}