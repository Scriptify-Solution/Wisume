import { useEffect, useState } from "react";

const useFormValues = () => {
  // Personal Details & Summary
  const [formValues, setFormValues] = useState({});

  // Employment History
  const [employmentFormValues, setEmploymentFormValues] = useState([]);

  // Education
  const [educationFormValues, setEducationFormValues] = useState([]);

  // Websites
  const [websiteFormValues, setWebsiteFormValues] = useState([]);

  // Skills
  const [skillFormValues, setSkillFormValues] = useState([]);
  const [hideSkillLevels, setHideSkillLevels] = useState(false);

  // Courses
  const [courseFormValues, setCourseFormValues] = useState([]);

  // Activities
  const [activityFormValues, setActivityFormValues] = useState([]);

  // Internships
  const [internshipFormValues, setInternshipFormValues] = useState([]);

  // Hobbies
  const [hobbies, setHobbies] = useState("");

  // Languages
  const [languageFormValues, setLanguageFormValues] = useState([]);

  // References
  const [referenceFormValues, setReferenceFormValues] = useState([]);
  const [hideReferences, setHideReferences] = useState(false);

  // Custom Section
  const [customSectionFormValues, setCustomSectionFormValues] = useState([]);

  return {
    // Personal Details & Summary
    formValues,
    setFormValues,

    // Employment
    employmentFormValues,
    setEmploymentFormValues,

    // Education
    educationFormValues,
    setEducationFormValues,

    // Websites
    websiteFormValues,
    setWebsiteFormValues,

    // Skills
    skillFormValues,
    setSkillFormValues,

    hideSkillLevels,
    setHideSkillLevels,

    // Courses
    courseFormValues,
    setCourseFormValues,

    // Activities
    activityFormValues,
    setActivityFormValues,

    // Internships
    internshipFormValues,
    setInternshipFormValues,

    // Hobbies
    hobbies,
    setHobbies,

    // Languages
    languageFormValues,
    setLanguageFormValues,

    // References
    referenceFormValues,
    setReferenceFormValues,
    hideReferences,
    setHideReferences,

    // Custom Section
    customSectionFormValues,
    setCustomSectionFormValues,
  };
};

export default useFormValues;
