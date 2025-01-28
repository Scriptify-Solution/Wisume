import React from "react";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import EmploymentHistory from "./EmploymentHistory";
import Education from "./Education";
import Websites from "./Websites";
import Skills from "./Skills";
import Courses from "./Courses";
import Activities from "./Activities";
import Internships from "./Internships";
import Hobbies from "./Hobbies";
import Languages from "./Languages";
import References from "./References";
import CustomSection from "./CustomSection";
import AddSection from "./AddSection";

const ResumeEditor = ({
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

  // Custom Section
  customSectionFormValues,
  setCustomSectionFormValues,

  // Section Visibility
  showSections,
  toggleSections,
}) => {
  const {
    showSkills,
    showCourses,
    showActivities,
    showInternships,
    showHobbies,
    showLanguages,
    showReferences,
    showCustomSection,
  } = showSections;

  return (
    <div className="col-span-7">
      <PersonalDetails formValues={formValues} setFormValues={setFormValues} />
      <ProfessionalSummary
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <EmploymentHistory
        employmentFormValues={employmentFormValues}
        setEmploymentFormValues={setEmploymentFormValues}
      />
      <Education
        educationFormValues={educationFormValues}
        setEducationFormValues={setEducationFormValues}
      />
      <Websites
        websiteFormValues={websiteFormValues}
        setWebsiteFormValues={setWebsiteFormValues}
      />

      {(skillFormValues.length > 0 || showSkills) && (
        <Skills
          skillFormValues={skillFormValues}
          setSkillFormValues={setSkillFormValues}
          hideSkillLevels={hideSkillLevels}
          setHideSkillLevels={setHideSkillLevels}
        />
      )}

      {showCourses && (
        <Courses
          courseFormValues={courseFormValues}
          setCourseFormValues={setCourseFormValues}
        />
      )}

      {showActivities && (
        <Activities
          activityFormValues={activityFormValues}
          setActivityFormValues={setActivityFormValues}
        />
      )}

      {showInternships && (
        <Internships
          internshipFormValues={internshipFormValues}
          setInternshipFormValues={setInternshipFormValues}
        />
      )}

      {showHobbies && <Hobbies hobbies={hobbies} setHobbies={setHobbies} />}

      {showLanguages && (
        <Languages
          languageFormValues={languageFormValues}
          setLanguageFormValues={setLanguageFormValues}
        />
      )}

      {showReferences && (
        <References
          referenceFormValues={referenceFormValues}
          setReferenceFormValues={setReferenceFormValues}
          hideReferences={hideReferences}
        />
      )}

      {showCustomSection && (
        <CustomSection
          customSectionFormValues={customSectionFormValues}
          setCustomSectionFormValues={setCustomSectionFormValues}
        />
      )}

      <AddSection toggleSections={toggleSections} showSections={showSections} />
    </div>
  );
};

export default ResumeEditor;
