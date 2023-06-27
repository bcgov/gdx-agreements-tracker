import { apiAxios } from 'utils';

interface IhandleExport {
  values: { [key: string]: unknown }, setSearchParams: ((params: Record<string, string>) => void), searchParams: URLSearchParams
}

const convertValueToString = (item: any) => {
  if (!item) {
    return null
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
  setSearchParams(updatedSearchParams);

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
    .then((response: unknown) => {
      console.log('response', response)
    })


}

