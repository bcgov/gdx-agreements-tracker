import { Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ResponsiveStyleValue } from "@mui/system";
import { ILegendValues } from "types";

export const Legend = ({
  legendValues,
  legendTitle,
  orientation,
}: {
  legendValues: ILegendValues[];
  legendTitle: string;
  orientation:
    | ResponsiveStyleValue<"column" | "column-reverse" | "row" | "row-reverse">
    | undefined;
}) => {
  return (
    <Card>
      <CardHeader
        subheader={legendTitle}
        sx={{ background: "#222" }}
        subheaderTypographyProps={{ color: "#fff" }}
      />
      <CardContent>
        <Stack direction={orientation} spacing={3}>
          {legendValues.map(({ caption, label, color }: ILegendValues) => {
            return (
              <Tooltip title={caption} key={label}>
                <Chip label={label} sx={{ background: color }} variant="outlined" />
              </Tooltip>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};
