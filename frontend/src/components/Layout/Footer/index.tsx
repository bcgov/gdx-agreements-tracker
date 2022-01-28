// import React, { FC } from "react";
//
// export const Footer: FC = () => {
//   return <footer id={"BcFooter"}></footer>;
// };
// export default Footer;

import React, { FC } from "react";
import { Box, Grid, Link } from "@mui/material";
import "./footer.scss";

export const Footer: FC = () => {
  return (
    <Box id="BC-Footer" px={{ xs: 1, sm: 1 }} py={{ xs: 1, sm: 1 }} justifyContent="flex-end">
      <Grid item xs={12} sm={4}>
        <Box display="flex">
          <Link href="/" color="inherit">
            Disclaimer
          </Link>
          <Link href="/" color="inherit">
            Privacy
          </Link>
          <Link href="/" color="inherit">
            Accessibility
          </Link>
          <Link href="/" color="inherit">
            Copyright
          </Link>
          <Link href="/" color="inherit">
            Contact Us
          </Link>
        </Box>
      </Grid>
    </Box>
  );
};
