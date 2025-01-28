import { useCallback } from "react";

export const getConvertedDate = (givenDate) => {
  const date = new Date(givenDate);

  // Format the date
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate}, ${formattedTime}`;
};

export const getMonthFromString = (isoDate) => {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1;
  return month;
};

export const getYearFromString = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  return year;
};

export const getDateFromString = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  return day;
};

export const convertDateToString = (date = "1", month = "1", year = "1990") => {
  // 2015-09-01T00:00:00.000Z"
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDate = date.toString().padStart(2, "0");
  // Construct the ISO string
  const isoString = `${year}-${formattedMonth}-${formattedDate}`;
  return isoString.split("T")[0];
};

export const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const getTemplateById = (templateList, templateId) => {
  return templateList.find((template) => template._id === templateId);
};

export const formatISODate = (isoDateString) => {
  return isoDateString.split("T")[0];
};

export const getColorList = () => {
  return [
    "#647C3E",
    "#34393E",
    "#AF9B94",
    "#144181",
    "#4585DD",
    "#00A4C1",
    "#2C806E",
    "#F6911E",
    "#CB454E",
  ];
};

export const getBase64FromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image:", error);
    return null;
  }
};
