export const checkChildrenNullorNotEmpty = (value) => {
  try {
    const validLanguages = value.filter(
      (lang) =>
        lang &&
        Object.values(lang).some((value) => value !== null && value !== "")
    );

    return value?.length && validLanguages.length > 0;
  } catch (e) {
    return false;
  }
};

export const getConvertedFormData = (formData) => {
  if (formData === null || formData === undefined) return {};

  const formDataObj = {};

  formData.forEach((value, key) => {
    try {
      const parsedValue = JSON.parse(value);
      if (
        parsedValue === null ||
        (Array.isArray(parsedValue) && parsedValue.length === 0) ||
        (typeof parsedValue === "object" &&
          Object.keys(parsedValue).length === 0)
      ) {
        formDataObj[key] = "";
      } else {
        formDataObj[key] = parsedValue;
      }
    } catch (error) {
      formDataObj[key] = value?.trim() || "";
    }
  });

  return formDataObj;
};

export const cleanFormData = (data) => {
  // Handle null/undefined input
  if (!data) return {};

  // Helper function to check if a value is empty
  const isEmpty = (value) => {
    if (value === null || value === undefined || value === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    // if(Array.isArray(value) && ((value[0]).length===0 || (value[0])==='')) return true;
    if (typeof value === "object" && Object.keys(value).length === 0)
      return true;
    return false;
  };

  // Recursively clean object
  const cleanObject = (obj) => {
    const cleaned = {};

    for (const [key, value] of Object.entries(obj)) {
      // Handle nested objects
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const cleanedValue = cleanObject(value);
        if (!isEmpty(cleanedValue)) {
          cleaned[key] = cleanedValue;
        }
      }
      // Handle arrays
      else if (Array.isArray(value)) {
        const cleanedArray = value
          .map((item) => {
            if (typeof item === "object") return cleanObject(item);
            return isEmpty(item) ? null : item;
          })
          .filter((item) => !isEmpty(item));

        if (cleanedArray.length > 0) {
          cleaned[key] = cleanedArray;
        }
      }
      // Handle primitive values
      else if (!isEmpty(value)) {
        cleaned[key] = value;
      }
    }
    return cleaned;
  };

  return cleanObject(data);
};
