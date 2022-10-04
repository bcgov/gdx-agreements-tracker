import * as React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Grid, List, ListItem, Paper, styled, Typography } from "@mui/material";
import { IGDXList } from "types";

export const GDXList = ({ blocks, title }: IGDXList) => {
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
    <div>
      <Card>
        <StyledTitleBox>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </StyledTitleBox>
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {/* // todo: Define a good type. "Any" type temporarily permitted. // */}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {blocks.map((groups: any[]) => {
                return (
                  <>
                    <Grid item sm={4} minWidth={300}>
                      <Paper>
                        <List component="ul" aria-labelledby="category-a">
                          {/* // todo: Define a good type. "Any" type temporarily permitted. // */}
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {groups.map((item: any) => {
                            return (
                              <ListItem key={item}>
                                <Grid container>
                                  <Grid zeroMinWidth item lg={4} md={6} sm={6}>
                                    <StyledTypographyLeft variant="h6" noWrap>
                                      {item.label}:
                                    </StyledTypographyLeft>
                                  </Grid>
                                  <Grid zeroMinWidth item lg={4} md={6} sm={6}>
                                    <StyledTypographyRight variant="h6" noWrap>
                                      {item.value}
                                    </StyledTypographyRight>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Paper>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
