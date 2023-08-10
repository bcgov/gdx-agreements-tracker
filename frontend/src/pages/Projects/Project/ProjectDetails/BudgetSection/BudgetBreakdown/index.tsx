import { Grid } from "@mui/material";
import ReadOnlyTable from "components/ReadOnlyTable";
import { useParams } from "react-router-dom";

const BudgetBreakdown = () => {
  const { projectId } = useParams();

  return (
    <Grid container spacing={10} sx={{pt:"2rem"}}>
      <ReadOnlyTable
        apiEndPoint={`/projects/${projectId}/budget/portfoliobreakdown`}
        tableName="budget"
        title="Portfolio Breakdown"
      />
      <ReadOnlyTable
        apiEndPoint={`/projects/${projectId}/budget/deliverablesbreakdown`}
        tableName="budget"
        title="Deliverable Breakdown"
      />
      <ReadOnlyTable
        apiEndPoint={`/projects/${projectId}/budget/fiscalbreakdown`}
        tableName="budget"
        title="Fiscal Breakdown"
        mdSize={12}
        lgSize={12}
        xlSize={12}
      />
    </Grid>
  );
};

export default BudgetBreakdown;
