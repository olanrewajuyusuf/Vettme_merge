const personalInfoFields = [
    {id: "piFirstName", label: 'First Name'},
    {id: "piMiddleName", label: 'Middle Name'},
    {id: "piLastName", label: 'Last Name'},
    {id: 'piDateOfBirth', label: 'Date of Birth'},
    {id: 'piGender', label: 'Gender'},
    {id: 'piNationality', label: 'Nationality'},
    {id: 'piAddress', label: 'Address'},
    {id: 'piPhoneNumber', label: 'Phone Number'},
    {id: 'piEmailAddress', label: 'Email Address'},
    {id: 'piMaritalStatus', label: 'Marital Status'},
    {id: 'piNextofKinName', label: 'Next of Kin Name'},
    {id: 'piNextofKinRelationship', label: 'Next of Kin Relationship'},
    {id: 'piNextofKinPhoneNumber', label: 'Next of Kin Phone Number'},
    {id: 'piPhysicalAddressRequest', label: 'Request for physical Address verification'},
];

const guarantorInfoFields = [
    {id: "giFirstName1", label: 'First Name'},
    {id: "giMiddleName1", label: 'Middle Name'},
    {id: "giLastName1", label: 'Last Name'},
    {id: 'giRelationshiptoPersonnel1', label: 'Relationship to Personnel'},
    {id: 'giOccupation1', label: 'Occupation'},
    {id: 'giPhoneNumber1', label: 'Phone Number'},
    {id: 'giAddress1', label: 'Address'},
    {id: 'giEmailAddress1', label: 'Email Address'},
    {id: 'giYearsKnown1', label: 'Years Known'},
    {id: 'giPhysicalAddressRequest1', label: 'Request for physical Address verification'},
];

const academicInfoFields = [
    {id: 'aiHighestQualification', label: 'Highest Qualification'},
    {id: 'aiNameofInstitution', label: 'Name of Institution'},
    {id: 'aiYearofGraduation', label: 'Year of Graduation'},
    {id: 'aiDegreeOrCertificationUpload', label: 'Degree Or Certification Upload'},
    {id: 'aiProfessionalCertifications', label: 'Professional Certifications'},
];

const professionalInfoFields = [
    {id: 'priOrganizationName1', label: 'Organization Name'},
    {id: 'priEmploymentStartDate1', label: 'Employment Start Date'},
    {id: 'priEmploymentType1', label: 'Employment Type'},
    {id: 'priProfessionalSkills1', label: 'Professional Skills'},
    {id: 'priProfessionalReferenceName1', label: 'Professional Reference Name'},
    {id: 'priOrganizationEmail1', label: 'Organization Email'},
    {id: 'priProfessionalReferencePhoneNumber1', label: 'Professional Reference Phone Number'},
];

const mentalHealthFields = [
    {id: 'mhaCurrentMentalHealthCondition', label: 'Current Mental Health Condition'},
    {id: 'mhaHistoryofMentalHealthConditions', label: 'History of Mental Health Conditions'},
    {id: 'mhaAreYouCurrentlyUnderAnyMedicationOrTreatment', label: 'Are you currently under any Medication or Treatment'},
    {id: 'mhaHaveYouHadAnyPreviousPsychiatricConsultations', label: 'Have you had any previous Psychiatric Consultations'},
    {id: 'mhaHaveYouExperiencedAnyMajorTraumaInThePastYear', label: 'Have you experienced any major trauma in the past Year'},
    {id: 'mhaEmotionalWellbeing', label: 'Emotional Wellbeing'},
];

export {personalInfoFields, guarantorInfoFields, academicInfoFields, professionalInfoFields, mentalHealthFields};