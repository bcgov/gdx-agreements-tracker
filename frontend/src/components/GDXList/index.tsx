import * as React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Grid, List, ListItem, Paper, styled, Typography } from "@mui/material";
import { IGDXList } from "types";

export const GDXList = ({ data, title }: any) => {
  const StyledTypographyLeft = styled(Typography)(() => ({
    textAlign: "left",
  }));

  const StyledTypographyRight = styled(Typography)(() => ({
    textAlign: "right",
  }));

  const StyledTitleBox = styled(Box)(() => ({
    textAlign: "center",
    background: "#666",
    color: "#fff",
    padding: "8px",
  }));

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} key={"s"}>
      <Card>
        <StyledTitleBox>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </StyledTitleBox>
        <CardContent>
          {Object.entries(data).map(([key, value], index) => {
            return (
              <List component="ul" aria-labelledby="category-a">
                <ListItem key={key}>
                  <Grid container>
                    <Grid zeroMinWidth item lg={6} md={6} sm={6}>
                      <StyledTypographyLeft variant="h6" noWrap>
                        {key}:
                      </StyledTypographyLeft>
                    </Grid>
                    <Grid zeroMinWidth item lg={6} md={6} sm={6}>
                      <StyledTypographyRight variant="h6" noWrap>
                        {value as string}
                      </StyledTypographyRight>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            );
          })}
          {/* <List component="ul" aria-labelledby="category-a">
            {Object.entries(data).map(([key, value]) => {
              return (
                <ListItem key={key}>
                  <Grid container>
                    <Grid zeroMinWidth item lg={6} md={6} sm={6}>
                      <StyledTypographyLeft variant="h6" noWrap>
                        {key}:
                      </StyledTypographyLeft>
                    </Grid>
                    <Grid zeroMinWidth item lg={6} md={6} sm={6}>
                      <StyledTypographyRight variant="h6" noWrap>
                        {value as string}
                      </StyledTypographyRight>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List> */}
        </CardContent>
      </Card>
    </Grid>
  );
};

<Grid container spacing={4}>
  <Grid item></Grid>
</Grid>;
