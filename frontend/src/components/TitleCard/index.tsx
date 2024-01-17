// This is a wrapper component for tables.
import { ReactNode } from "react";
import { Card, CardHeader } from "@mui/material";
/**
 * Renders a card with a title and children.
 *
 * @param   {object}      props          - The component props.
 * @param   {string}      props.title    - The title of the card.
 * @param   {ReactNode}   props.children - The children to render inside the card.
 * @returns {JSX.Element}                A React element containing the card.
 */
interface TitleCardProps {
  title: string;
  children: ReactNode;
}

const TitleCard = ({ title, children }: TitleCardProps) => (
  <Card>
    <CardHeader
      title={title}
      sx={{ backgroundColor: "#ededed", fontSize: "h6.fontSize" }}
      titleTypographyProps={{ fontSize: "1rem" }}
    />
    {children}
  </Card>
);

export default TitleCard;
