import { apiAxios } from 'utils';

interface IhandleExport {
  values: { [key: string]: unknown }, setSearchParams: ((params: Record<string, string>) => void), searchParams: URLSearchParams
}

const convertValueToString = (item: any) => {
  console.log('item', item)
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

export const handleExport = ({ values, setSearchParams, searchParams }: IhandleExport) => {
  const updatedSearchParams: any = {};
  Object.entries(values).forEach(([key, item]) => {
    updatedSearchParams[key] = convertValueToString(item);
  });
  console.log('updatedSearchParams', updatedSearchParams)
  setSearchParams(updatedSearchParams);
  console.log('searchParams', searchParams)

  const url = `report/projects/${updatedSearchParams.type}`;
  apiAxios()
    .get(url, {
      params: searchParams,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "arraybuffer",
      },
      responseType: "blob",
    })
    .then((response: any) => {
      // attn: Adam - Handle the error gracefully - to be addressed in a future ticket
      try {
        const fileURL = window.URL.createObjectURL(response?.data);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${updatedSearchParams.type}${updatedSearchParams.exportType}`;
        alink.click();
      } catch (err) {
        alert(err);
      }
    });


}

