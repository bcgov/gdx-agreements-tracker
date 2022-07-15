export const useFormSubmit = (currentRowData: { data: { data: { [x: string]: unknown; }; }; }) => {
  const changedValues = (values: unknown) => {
    console.log('values', values)
    new Promise((resolve) => {
      const getChangedValues = () => {
        return Object.entries(values as []).reduce(
          (acc: { [x: string]: string | number }, [key, projectValue]:any) => {
            const hasChanged = currentRowData.data.data[key] !== projectValue;
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
  };

    const handleOnSubmit = async (values: { [x: string]: { value: string } }) => {
     console.log(' changedValues(values);',  changedValues(values))
    };

  return { handleOnSubmit };
};
