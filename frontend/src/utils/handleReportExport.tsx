import { ConvertToStringItem, UpdatedSearchParams } from "types";
import { apiAxios } from "utils";

const convertValueToString = (item: ConvertToStringItem) => {
  if (Array.isArray(item)) {
    return item.map((item) => item.value).join(",");
  }
  if ("object" === typeof item) {
    return JSON.stringify(item.value);
  }
  return String(item);
};

export const handleReportExport = (values: { [key: string]: string | null }) => {
  const updatedSearchParams: UpdatedSearchParams = { templateType: values.templateType as string };

  Object.entries(values).forEach(([key, item]) => {
    if (!item || 0 === item.length) return;
    updatedSearchParams[key] = convertValueToString(item);
  });

  const querystringParams = new URLSearchParams(updatedSearchParams);

  const url = `report/${updatedSearchParams.type}`;

  apiAxios()
    .get(url, {
      params: querystringParams,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "arraybuffer",
      },
      responseType: "blob",
    })
    .then((response) => {
      try {
        const fileURL = window.URL.createObjectURL(response?.data);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${updatedSearchParams.type}.${updatedSearchParams.exportType}`;
        alink.click();
      } catch (err) {
        alert(err);
      }
    });
};
