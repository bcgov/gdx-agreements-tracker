import { FC, useEffect } from "react";
import { Renderer } from "components/Renderer";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";
import useTitle from "hooks/useTitle";

export const Glossary: FC = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Glossary");
  }, [updateTitle]);

  const { axiosAll } = useAxios();

  /**
   * Gets the glossary definition HTML.
   *
   * @returns {null|object}
   */
  const getGlossary = async () => {
    const response = await axiosAll().get(`/glossary`);
    return { __html: response.data as string };
  };

  // Queries
  const { data, isLoading } = useQuery([`glossary`], getGlossary, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      <Renderer isLoading={isLoading} component={<div dangerouslySetInnerHTML={data}></div>} />
    </>
  );
};
