// wrapper component for tables
import { ReactNode } from "react";
import { Card, CardHeader } from "@mui/material";
interface MyCardProps {
  title: string;
  children: ReactNode;
}

export const TitleCard = ({ title, children }: MyCardProps) => (
  <Card sx={{ height: "400px" }}>
    <CardHeader title={title} sx={{ backgroundColor: "#ededed" }} />
    {children}
  </Card>
);
