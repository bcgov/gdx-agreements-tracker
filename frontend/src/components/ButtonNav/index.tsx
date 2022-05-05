import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

/**
 * Returns react router link with active class if matches route.
 *
 * @param {LinkProps} root0 Link properties.
 * @param {ReactNode | undefined} root0.children Child nodes.
 * @param {To} root0.to Destination.
 * @returns {React.ReactNode}
 */
export const ButtonNav = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
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
