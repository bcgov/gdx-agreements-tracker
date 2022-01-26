import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

/**
 * Returns react router link with active class if matches route.
 *
 * @returns
 */
export const ButtonNav = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  if (match) {
    props.className = `${props.className ?? ""} active`;
  }
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default ButtonNav;
