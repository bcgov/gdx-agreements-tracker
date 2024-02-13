import ReadOnlyTable from "components/ReadOnlyTable";

export const Logs = () => {
  return <ReadOnlyTable apiEndPoint={`/logs`} tableName={"db_logs"} title={"Logs"} />;
};
