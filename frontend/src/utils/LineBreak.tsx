/**
 * Renders two lines of text with a line break between them.
 *
 * @param   {string}      line1 - The first line of text.
 * @param   {string}      line2 - The second line of text.
 * @returns {JSX.Element}       A React element containing the two lines of text.
 */
const LineBreak = (line1: string, line2: string) => {
  const lineBreakStyle = { lineHeight: "1.5em" };

  return (
    <div style={lineBreakStyle}>
      <span>{line1}</span>
      <br />
      <span>{line2}</span>
    </div>
  );
};

export default LineBreak;
