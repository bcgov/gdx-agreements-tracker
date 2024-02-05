import { FC, useEffect } from "react";
// import { Renderer } from "components/Renderer";
// import { useQuery } from "@tanstack/react-query";
// import { useAxios } from "hooks/useAxios";
import useTitle from "hooks/useTitle";

export const Glossary: FC = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Glossary");
  }, [updateTitle]);

  /*
   * The renderer is disabled for now to avoid dangerously setting HTML directly.
   * instead, we are simply rendering it directly inside a div as a static component.
   *
   * If you would like to make the glossary editable, take the following steps:
   *
   * 1) uncomment the code below
   * 2) find the HTML document at backend/docs/Glossary/Glossary.html
   * 3) remove the static HTML inside the return() and uncomment the Renderer JSX line.
   * 4) refresh and start editing the HTML file
   *
   *
   */

  /**
   * Gets the glossary definition HTML.
   *
   * @returns {null|object}
   */
  // const { axiosAll } = useAxios();
  // const getGlossary = async () => {
  //   const response = await axiosAll().get(`/glossary`);
  //   return { __html: response.data as string };
  // };

  // // Queries
  // const { data, isLoading } = useQuery([`glossary`], getGlossary, {
  //   refetchOnWindowFocus: false,
  //   retryOnMount: false,
  //   refetchOnReconnect: false,
  //   retry: false,
  //   staleTime: Infinity,
  // });

  return (
    <div>
      <h4 id="term-1-">Term 1:</h4>
      <p>
        Lorem <em>ipsum</em> dolor sit <strong>amet</strong>, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </p>
      <p>Second line text.</p>

      <h4 id="term-2-">Term 2:</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h4 id="term-3-">Term 3:</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h4 id="term-4-">Term 4:</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h4 id="term-5-">Term 5:</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h4 id="term-6-">Term 6:</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      {/* <Renderer isLoading={isLoading} component={<div dangerouslySetInnerHTML={data}></div>} /> */}
    </div>
  );
};
