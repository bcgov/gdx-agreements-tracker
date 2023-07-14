import { useContext } from 'react';
import { TitleContext } from "context/TitleContext"

const useTitle = () => {
  const { setTitle } = useContext(TitleContext);

  const updateTitle = (newTitle:string) => {
    setTitle(newTitle);
  };

  return {
    updateTitle,
  };
};

export default useTitle;
