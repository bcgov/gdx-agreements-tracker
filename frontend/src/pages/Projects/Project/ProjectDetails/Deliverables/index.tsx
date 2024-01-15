import { TableWithModal } from "components/TableWithModal";
import { FormConfig } from "./FormConfig";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls, ILegendValues } from "types";
import { tableConfig } from "./tableConfig";
import { Grid, useTheme } from "@mui/material";
import DeliverablesTotals from "./DeliverablesTotals";
import { Legend } from "components/Legend";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * A component representing the Deliverables section of a project, displaying a table with modal
 * for project deliverables and a section for deliverables totals.
 *
 * @returns {JSX.Element} JSX element representing the component.
 */

export const DeliverablesSection = (): JSX.Element => {
  const theme = useTheme();

  const lessThanLarge = useMediaQuery(theme.breakpoints.down("lg"));

  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  const legendValues: ILegendValues[] = [
    { label: "Not Started", color: "#ffffff", caption: "Not Started" },
    { label: "Active", color: "#00ff00", caption: "Active and on-track" },
    {
      label: "Minor",
      color: "#ffff00",
      caption: "Active but some concerns need to be monitored closely",
    },
    {
      label: "Major",
      color: "#ff0000",
      caption: "Active But Major Concerns and needs corrective action",
    },
    { label: "Complete", color: "#5a83ff", caption: "Complete" },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={10} xl={11} sx={{ overflowX: "scroll" }}>
        <TableWithModal
          tableName={"project_deliverable"}
          tableConfig={tableConfig()}
          formControls={formControls}
          formConfig={FormConfig}
          tableDataApiEndPoint={`projects/${projectId}/deliverables`}
          formDataApiEndpoint={`/projects/deliverables/${formControls.currentRowData?.id}`}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={2} xl={1}>
        <Legend
          legendValues={legendValues}
          legendTitle="Health"
          orientation={lessThanLarge ? "row" : "column"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <DeliverablesTotals />
      </Grid>
    </Grid>
  );
};
