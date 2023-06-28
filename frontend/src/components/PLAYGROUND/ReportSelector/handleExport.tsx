import { apiAxios } from 'utils';

interface IhandleExport {
  values: { [key: string]: unknown }
}

const convertValueToString = (item: any) => {
  if (!item) {
    return ""
  }
  if (Array.isArray(item)) {
    return item.map((item) => item.value).join(',');
  }
  if (typeof item === 'object') {
    return JSON.stringify(item.value);
  }
  return String(item);
};

export const handleExport = ({ values }: IhandleExport) => {

  const updatedSearchParams: any = { templateType: values.exportType };

  Object.entries(values).forEach(([key, item]) => {
    updatedSearchParams[key] = convertValueToString(item);
  });


  const querystringParams = new URLSearchParams(updatedSearchParams);

  const url = `report/projects/${updatedSearchParams.type}`;

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
    .then((response: any) => {
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


}

