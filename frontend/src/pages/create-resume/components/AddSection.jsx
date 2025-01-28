import React from 'react';

const AddSection = ({ toggleSections, showSections }) => {
  const sectionItems = [
    {
      id: 'skills',
      label: 'Skills',
      toggle: toggleSections.toggleSkillsSection,
      isShown: showSections.showSkills
    },
    {
      id: 'courses',
      label: 'Courses',
      toggle: toggleSections.toggleCoursesSection,
      isShown: showSections.showCourses
    },
    // {
    //   id: 'activities',
    //   label: 'Extra-curricular Activities',
    //   toggle: toggleSections.toggleActivitiesSection,
    //   isShown: showSections.showActivities
    // },
    // {
    //   id: 'internships',
    //   label: 'Internships',
    //   toggle: toggleSections.toggleInternshipsSection,
    //   isShown: showSections.showInternships
    // },
    {
      id: 'hobbies',
      label: 'Hobbies',
      toggle: toggleSections.toggleHobbiesSection,
      isShown: showSections.showHobbies
    },
    {
      id: 'languages',
      label: 'Languages',
      toggle: toggleSections.toggleLanguagesSection,
      isShown: showSections.showLanguages
    },
    {
      id: 'references',
      label: 'References',
      toggle: toggleSections.toggleReferencesSection,
      isShown: showSections.showReferences
    },
    // {
    //   id: 'custom',
    //   label: 'Custom Section',
    //   toggle: toggleSections.toggleCustomSection,
    //   isShown: showSections.showCustomSection
    // }
  ];

  return (
    <div className="add-section mb-8">
      <h2 className="text-2xl font-bold mb-4">Add Section</h2>
      <div className="grid grid-cols-2 gap-4">
        {sectionItems.map(section => (
          <button
            key={section.id}
            onClick={section.toggle}
            className={`p-3 text-left rounded transition-colors ${
              section.isShown
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {section.isShown ? '- Remove ' : '+ Add '}
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddSection; 