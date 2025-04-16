import { baseUrl } from "@/api/baseUrl";
import images from "@/assets/Images";
import FormSubmissionModal from "@/components/modals/FormSubmissionModal";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface formData {
    personnelName: string,
    responseId: string,
    organizationName: boolean,
    organizationEmail: boolean,
    employmentStartDate: boolean,
    employmentType: boolean,
    professionalSkills: boolean,
    communicationSkills: boolean,
    performanceTargets: boolean,
    willingness: boolean,
    leaderShipQualities: boolean,
    problemSolving: boolean,
    initiative: boolean,
    disciplinaryIssues: boolean,
    referenceName: boolean,
    organizationId: string,
}

function ProfessionalInfo() {
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { id, personnelName, organizationId } = useParams<{ organizationId: string, id: string, personnelName: string }>();
    const [claim, setClaim] = useState({
        priOrganizationName1: "",
        priOrganizationEmail1: "",
        priEmploymentStartDate1: "",
        priEmploymentType1: "",
        priProfessionalSkills1: "",
        priProfessionalReferenceName1: "",
        priOrganizationName2: "",
        priOrganizationEmail2: "",
        priEmploymentStartDate2: "",
        priEmploymentType2: "",
        priProfessionalSkills2: "",
        priProfessionalReferenceName2: ""
    })

    const [formData, setFormData] = useState<formData>({
        personnelName: `${personnelName}`,
        responseId: `${id}`,
        organizationName: false,
        organizationEmail: false,
        employmentStartDate: false,
        employmentType: false,
        professionalSkills: false,
        referenceName: false,
        communicationSkills: false,
        performanceTargets: false,
        willingness: false,
        leaderShipQualities: false,
        problemSolving: false,
        initiative: false,
        disciplinaryIssues: false,
        organizationId: '1',
    })

    const [formData2, setFormData2] = useState<formData>({
        personnelName: `${personnelName}`,
        responseId: `${id}`,
        organizationName: false,
        organizationEmail: false,
        employmentStartDate: false,
        employmentType: false,
        professionalSkills: false,
        referenceName: false,
        communicationSkills: false,
        performanceTargets: false,
        willingness: false,
        leaderShipQualities: false,
        problemSolving: false,
        initiative: false,
        disciplinaryIssues: false,
        organizationId: '2',
    })

    useEffect(() => {
        const getClaim = async() => {
            try{
            const res = await axios.get(`${baseUrl}/verification-response/one/${id}`)
            setClaim(res.data.data.responses)
            } catch(err){
            console.error(err)
            }
        }
        getClaim()
    }, [id])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log("Changing:", name, "to", value);
        setFormData((prev) => ({
            ...prev,
            [name]: value === "true",
        }));
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log("Changing:", name, "to", value);
        setFormData2((prev) => ({
            ...prev,
            [name]: value === "true",
        }));
    };
    
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try{
            await axios.post(`${baseUrl}/professional-form`, formData)
            setModalOpen(true)
        } catch(err){
            console.error(err)
            toast.error("Can not submit form")
        } 
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            await axios.post(`${baseUrl}/professional-form`, formData2)
            setModalOpen(true)
        } catch(err){
            console.error(err)
            toast.error("Can not submit form")
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
        {<FormSubmissionModal isOpen={modalOpen} />}
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <nav className="max-w-lg w-full bg-white shadow-md rounded-xl py-4 px-6 flex justify-between items-center">
                <div>
                    <img src={images.logo} alt="Vettme" className="h-8 object-contain" />
                </div>
            </nav>

            {organizationId && organizationId == "1" && (
            <div className="bg-white shadow-lg rounded-xl p-6 mt-2 max-w-lg w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Employment Verification for {personnelName}
                </h2>

                <form onSubmit={handleSubmit}>
                {claim.priOrganizationName1 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} work in your Organization ({claim.priOrganizationName1})?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameYes" className="hidden peer" name="organizationName" value="true" checked={formData.organizationName === true} onChange={handleChange} />
                            <label
                                htmlFor="organizationNameYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameNo"  className="hidden peer" name="organizationName" value="false" checked={formData.organizationName === false} onChange={handleChange}/>
                            <label
                                htmlFor="organizationNameNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priEmploymentStartDate1 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} start working in your Organization on {claim.priEmploymentStartDate1}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateYes" className="hidden peer" name="employmentStartDate" value="true" checked={formData.employmentStartDate === true} onChange={handleChange} />
                            <label
                                htmlFor="employmentStartDateYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateNo" className="hidden peer" name="employmentStartDate" value="false" checked={formData.employmentStartDate === false} onChange={handleChange} />
                            <label
                                htmlFor="employmentStartDateNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} demonstrate strong communication skills during their time at your organization?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="communicationSkillsYes" className="hidden peer" name="communicationSkills" value="true" checked={formData.communicationSkills === true} onChange={handleChange} />
                            <label
                                htmlFor="communicationSkillsYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="communicationSkillsNo" className="hidden peer" name="communicationSkills" value="false" checked={formData.communicationSkills === false} onChange={handleChange} />
                            <label
                                htmlFor="communicationSkillsNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} meet performance targets and deadlines in their role?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="performanceTargetsYes" className="hidden peer" name="performanceTargets" value="true" checked={formData.performanceTargets === true} onChange={handleChange} />
                            <label
                                htmlFor="performanceTargetsYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="performanceTargetsNo" className="hidden peer" name="performanceTargets" value="false" checked={formData.performanceTargets === false} onChange={handleChange} />
                            <label
                                htmlFor="performanceTargetsNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} show a willingness to learn and adapt to new tasks or technologies?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="willingnessYes" className="hidden peer" name="willingness" value="true" checked={formData.willingness === true} onChange={handleChange} />
                            <label
                                htmlFor="willingnessYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="willingnessNo" className="hidden peer" name="willingness" value="false" checked={formData.willingness === false} onChange={handleChange} />
                            <label
                                htmlFor="willingnessNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say that Mr./Mrs. {personnelName} demonstrated leadership qualities or potential during their time at your organization?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="leaderShipQualitiesYes" className="hidden peer" name="leaderShipQualities" value="true" checked={formData.leaderShipQualities === true} onChange={handleChange} />
                            <label
                                htmlFor="leaderShipQualitiesYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="leaderShipQualitiesNo" className="hidden peer" name="leaderShipQualities" value="false" checked={formData.leaderShipQualities === false} onChange={handleChange} />
                            <label
                                htmlFor="leaderShipQualitiesNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say Mr./Mrs. {personnelName} possessed problem-solving skills?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="problemSolvingYes" className="hidden peer" name="problemSolving" value="true" checked={formData.problemSolving === true} onChange={handleChange} />
                            <label
                                htmlFor="problemSolvingYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="problemSolvingNo" className="hidden peer" name="problemSolving" value="false" checked={formData.problemSolving === false} onChange={handleChange} />
                            <label
                                htmlFor="problemSolvingNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} take initiative in improving processes or contributing to the success of the organization?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="initiativeYes" className="hidden peer" name="initiative" value="true" checked={formData.initiative === true} onChange={handleChange} />
                            <label
                                htmlFor="initiativeYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="initiativeNo" className="hidden peer" name="initiative" value="false" checked={formData.initiative === false} onChange={handleChange} />
                            <label
                                htmlFor="initiativeNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} have any disciplinary issues during their employment?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="disciplinaryIssuesYes" className="hidden peer" name="disciplinaryIssues" value="true" checked={formData.disciplinaryIssues === true} onChange={handleChange} />
                            <label
                                htmlFor="disciplinaryIssuesYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="disciplinaryIssuesNo" className="hidden peer" name="disciplinaryIssues" value="false" checked={formData.disciplinaryIssues === false} onChange={handleChange} />
                            <label
                                htmlFor="disciplinaryIssuesNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                {claim.priOrganizationEmail1 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Is this your organization's email ({claim.priOrganizationEmail1})?
                    </legend>
                    
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailYes" className="hidden peer" name="organizationEmail" value="true" checked={formData.organizationEmail === true} onChange={handleChange} />
                            <label
                                htmlFor="organizationEmailYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailNo" className="hidden peer" name="organizationEmail" value="false" checked={formData.organizationEmail === false} onChange={handleChange}/>
                            <label
                                htmlFor="organizationEmailNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priEmploymentType1 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Was the employment type of Mr/Mrs {personnelName} {claim.priEmploymentType1}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeYes" className="hidden peer" name="employmentType" value="true" checked={formData.employmentType === true} onChange={handleChange}/>
                            <label
                                htmlFor="employmentTypeYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeNo" className="hidden peer" name="employmentType" value="false" checked={formData.employmentType === false} onChange={handleChange}/>
                            <label
                                htmlFor="employmentTypeNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priProfessionalSkills1 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say that Mr/Mrs {personnelName} possesses these skills: <span className="font-bold">{claim.priProfessionalSkills1}</span>?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsYes" className="hidden peer" name="professionalSkills" value="true" checked={formData.professionalSkills === true} onChange={handleChange}/>
                            <label
                                htmlFor="professionalSkillsYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsNo" className="hidden peer" name="professionalSkills" value="false" checked={formData.professionalSkills === false} onChange={handleChange}/>
                            <label
                                htmlFor="professionalSkillsNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priProfessionalReferenceName1 && (  
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Mr/Mrs {personnelName} used Mr/Mrs {claim.priProfessionalReferenceName1} as a reference. Have you worked with them, and would you consider them a good referral?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="true" checked={formData.referenceName === true} onChange={handleChange}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="false" checked={formData.referenceName === false} onChange={handleChange}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}
                <button 
                className="grid place-items-center w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition" 
                type="submit"
                disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : "Submit"}
                </button>
                </form>
                
            </div>
            )}

            {organizationId && organizationId == "2" && (
            <div className="bg-white shadow-lg rounded-xl p-6 mt-2 max-w-lg w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Employment Verification for {personnelName}
                </h2>

                <form onSubmit={handleSubmit2}>
                {claim.priOrganizationName2 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} work in your Organization ({claim.priOrganizationName2})?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameYes" className="hidden peer" name="organizationName" value="true" checked={formData2.organizationName === true} onChange={handleChange2} />
                            <label
                                htmlFor="organizationNameYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameNo"  className="hidden peer" name="organizationName" value="false" checked={formData2.organizationName === false} onChange={handleChange2}/>
                            <label
                                htmlFor="organizationNameNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priEmploymentStartDate2 && (
                <section className="mb-5 flex items-center gap-2">
                    
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} start working in your Organization on {claim.priEmploymentStartDate2}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateYes" className="hidden peer" name="employmentStartDate" value="true" checked={formData2.employmentStartDate === true} onChange={handleChange2} />
                            <label
                                htmlFor="employmentStartDateYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateNo" className="hidden peer" name="employmentStartDate" value="false" checked={formData2.employmentStartDate === false} onChange={handleChange2} />
                            <label
                                htmlFor="employmentStartDateNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} demonstrate strong communication skills during their time at your organization?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="communicationSkillsYes" className="hidden peer" name="communicationSkills" value="true" checked={formData.communicationSkills === true} onChange={handleChange} />
                            <label
                                htmlFor="communicationSkillsYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="communicationSkillsNo" className="hidden peer" name="communicationSkills" value="false" checked={formData.communicationSkills === false} onChange={handleChange} />
                            <label
                                htmlFor="communicationSkillsNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} meet performance targets and deadlines in their role?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="performanceTargetsYes" className="hidden peer" name="performanceTargets" value="true" checked={formData.performanceTargets === true} onChange={handleChange} />
                            <label
                                htmlFor="performanceTargetsYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="performanceTargetsNo" className="hidden peer" name="performanceTargets" value="false" checked={formData.performanceTargets === false} onChange={handleChange} />
                            <label
                                htmlFor="performanceTargetsNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} show a willingness to learn and adapt to new tasks or technologies?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="willingnessYes" className="hidden peer" name="willingness" value="true" checked={formData.willingness === true} onChange={handleChange} />
                            <label
                                htmlFor="willingnessYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="willingnessNo" className="hidden peer" name="willingness" value="false" checked={formData.willingness === false} onChange={handleChange} />
                            <label
                                htmlFor="willingnessNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say that Mr./Mrs. {personnelName} demonstrated leadership qualities or potential during their time at your organization?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="leaderShipQualitiesYes" className="hidden peer" name="leaderShipQualities" value="true" checked={formData.leaderShipQualities === true} onChange={handleChange} />
                            <label
                                htmlFor="leaderShipQualitiesYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="leaderShipQualitiesNo" className="hidden peer" name="leaderShipQualities" value="false" checked={formData.leaderShipQualities === false} onChange={handleChange} />
                            <label
                                htmlFor="leaderShipQualitiesNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say Mr./Mrs. {personnelName} possessed problem-solving skills?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="problemSolvingYes" className="hidden peer" name="problemSolving" value="true" checked={formData.problemSolving === true} onChange={handleChange} />
                            <label
                                htmlFor="problemSolvingYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="problemSolvingNo" className="hidden peer" name="problemSolving" value="false" checked={formData.problemSolving === false} onChange={handleChange} />
                            <label
                                htmlFor="problemSolvingNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} take initiative in improving processes or contributing to the success of the organization?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="initiativeYes" className="hidden peer" name="initiative" value="true" checked={formData.initiative === true} onChange={handleChange} />
                            <label
                                htmlFor="initiativeYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="initiativeNo" className="hidden peer" name="initiative" value="false" checked={formData.initiative === false} onChange={handleChange} />
                            <label
                                htmlFor="initiativeNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                <section className="mb-5 flex items-center gap-2">  
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr./Mrs. {personnelName} have any disciplinary issues during their employment?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="disciplinaryIssuesYes" className="hidden peer" name="disciplinaryIssues" value="true" checked={formData.disciplinaryIssues === true} onChange={handleChange} />
                            <label
                                htmlFor="disciplinaryIssuesYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="disciplinaryIssuesNo" className="hidden peer" name="disciplinaryIssues" value="false" checked={formData.disciplinaryIssues === false} onChange={handleChange} />
                            <label
                                htmlFor="disciplinaryIssuesNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>

                {claim.priOrganizationEmail2 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Is this your organization's email ({claim.priOrganizationEmail2})?
                    </legend>
                    
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailYes" className="hidden peer" name="organizationEmail" value="true" checked={formData2.organizationEmail === true} onChange={handleChange2} />
                            <label
                                htmlFor="organizationEmailYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailNo" className="hidden peer" name="organizationEmail" value="false" checked={formData2.organizationEmail === false} onChange={handleChange2}/>
                            <label
                                htmlFor="organizationEmailNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priEmploymentType2 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Was the employment type of Mr/Mrs {personnelName} {claim.priEmploymentType2}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeYes" className="hidden peer" name="employmentType" value="true" checked={formData2.employmentType === true} onChange={handleChange2}/>
                            <label
                                htmlFor="employmentTypeYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeNo" className="hidden peer" name="employmentType" value="false" checked={formData2.employmentType === false} onChange={handleChange2}/>
                            <label
                                htmlFor="employmentTypeNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priProfessionalSkills2 && (
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say that Mr/Mrs {personnelName} possesses these skills: <span className="font-bold">{claim.priProfessionalSkills2}</span>?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsYes" className="hidden peer" name="professionalSkills" value="true" checked={formData2.professionalSkills === true} onChange={handleChange2}/>
                            <label
                                htmlFor="professionalSkillsYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsNo" className="hidden peer" name="professionalSkills" value="false" checked={formData2.professionalSkills === false} onChange={handleChange2}/>
                            <label
                                htmlFor="professionalSkillsNo"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                {claim.priProfessionalReferenceName2 && (  
                <section className="mb-5 flex items-center gap-2">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Mr/Mrs {personnelName} used Mr/Mrs {claim.priProfessionalReferenceName2} as a reference. Have you worked with them, and would you consider them a good referral?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="true" checked={formData2.referenceName === true} onChange={handleChange2}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="false" checked={formData2.referenceName === false} onChange={handleChange2}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 p-2 text-xs rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </section>
                )}

                <button 
                className="grid place-items-center w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition" 
                type="submit"
                disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : "Submit"}
                </button>
                </form>
            </div>
            )}
        </div>
        </>
    );
}

export default ProfessionalInfo;