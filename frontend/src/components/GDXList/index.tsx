import * as React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Grid, List, ListItem, Paper, styled, Typography } from "@mui/material";
import { IGDXList, IStandardRow } from "types";

export const GDXList = ({ data, title }: IGDXList) => {
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
          <Grid container>
            {data.map((row: IStandardRow, index: number) => {
              return (
                <Grid xs spacing={3} key={index}>
                  <List component="ul" aria-labelledby="category-a">
                    <Paper>
                      {Object.entries(row).map(([key, value]) => {
                        return (
                          <ListItem key={key}>
                            <Grid container>
                              <Grid zeroMinWidth item xs={6}>
                                <StyledTypographyLeft variant="h6" noWrap>
                                  {key}:
                                </StyledTypographyLeft>
                              </Grid>
                              <Grid zeroMinWidth item xs={6}>
                                <StyledTypographyRight variant="h6" noWrap>
                                  {value as string}
                                </StyledTypographyRight>
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })}
                    </Paper>
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

<Grid container spacing={4}>
  <Grid item></Grid>
</Grid>;
