import { apiAxios } from "../../../utils";

export const handleOnSubmit = async (
  query: { data: { data: { [x: string]: { value: string } | number } } },
  values: { [x: string]: { value: string } }
) => {
  const changedValues = new Promise((resolve) => {
    const getChangedValues = () => {
      return Object.entries(values).reduce(
        (acc: { [x: string]: string | number }, [key, projectValue]) => {
          const hasChanged = query.data.data[key] !== projectValue;
          if (hasChanged) {
            if (projectValue.value) {
              acc[key] = projectValue.value;
            } else {
              acc[key] = projectValue as unknown as string;
            }
          }
          return acc;
        },
        {}
      );
    };
    resolve(getChangedValues());
  });
  await apiAxios()
    .put(`projects/${query.data.data.id}`, await changedValues)
    .catch((err: string) => {
      console.error("error:", err);
    });
};
