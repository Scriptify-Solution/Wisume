export const convertDataToJSON = (values) => {
  var data = {};
  try {
    data = values.reduce((acc, list, index) => {
      acc[`list${index + 1}`] = list;
      return acc;
    }, {});
  } catch (e) {}

  return data;
};

export const convertDataToJSONStringify = (values) => {
  let data = [];
  try {
    // Ensure that 'values' is an array of arrays, and then flatten it
    if (Array.isArray(values)) {
      data = values.reduce((acc, list) => {
        if (Array.isArray(list)) {
          acc.push(...list); // Flatten the inner arrays
        } else {
          acc.push(list); // Just add the list if not an array
        }
        return acc;
      }, []);
    } else {
    }
  } catch (e) {
    console.error("Error processing data:", e);
  }

  return JSON.stringify(data);
};

export const removeEmptyDataFromArray = (data) => {
  const values = data.filter((item) => item && Object.keys(item).length > 0);
  return values;
};

export const convertFormData = (formDataObject) => {
  const formData = new FormData();

  Object.entries(formDataObject).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, JSON.stringify(item));
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export const convertFormDataUpdate = (formDataObject) => {
  const formData = new FormData();

  Object.entries(formDataObject).forEach(([key, value], index) => {
    if (value === null) {
      formData.append(key, "");
    } else if (typeof value === "object" && !Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, JSON.stringify(item));
      });
    } else {
      var newvalue = "";
      try {
        if (value === null || value?.trim() === "") {
          newvalue = "";
        } else {
          newvalue = value;
        }
      } catch (e) {}

      formData.append(key, newvalue);
    }
  });

  return formData;
};
