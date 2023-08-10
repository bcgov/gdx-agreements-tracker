import { Grid } from "@mui/material";
import ReadOnlyTable from "components/ReadOnlyTable";
import { useParams } from "react-router-dom";

const BudgetBreakdown = () => {
  const { projectId } = useParams();

  return (
    <Grid container spacing={10}>
      <ReadOnlyTable
        apiEndPoint={`/projects/${projectId}/budget/portfoliobreakdown`}
        tableName="budget"
        title="Portfolio Breakdown"
      />
      <ReadOnlyTable
        apiEndPoint={`/projects/${projectId}/budget/fiscalbreakdown`}
        tableName="budget"
        title="Fiscal Breakdown"
      />
    </Grid>
  );
};

export default BudgetBreakdown;
