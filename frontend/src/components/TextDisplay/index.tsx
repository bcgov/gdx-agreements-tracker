import { Typography } from "@mui/material";
import React from "react";

/**
 * This reusable component renders two pieces of text in one, title and value
 *
 * @param   {{title: string, value: string}}   An object with value and title
 * @returns {React.ReactElement}               A two piece text component
 */
export const TextDisplay = ({ title, value }: { title: string; value: string }) => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom component="div">
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {value}
      </Typography>
    </>
  );
};
