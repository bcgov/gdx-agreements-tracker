import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useFormatTableData } from "hooks";

export const TotalsDisplay = ({
  apiEndPoint,
  tableName,
}: {
  apiEndPoint: string;
  tableName: string;
}) => {
  const totalsData = useFormatTableData({
    apiEndPoint: apiEndPoint,
    tableName: tableName,
  });
  return (
    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
      {totalsData?.data?.rows?.map((row: { [key: string]: string }, index: number) => {
        return (
          <Card key={index} sx={{ backgroundColor: "#e3e3e3" }}>
            <CardContent sx={{ width: "30rem" }}>
              <Grid container spacing={2}>
                {Object.keys(row).map((key) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="subtitle2">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (str) => str.toUpperCase())}
                      :
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                      {row[key]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Grid>
  );
};
