import * as React from "react";
import { H2 } from ".";
import theme from "../Styles/theme";

interface IProps {
  title: string;
  hidden?: boolean;
}

export const Section: React.FunctionComponent<IProps> = ({
  title,
  children,
  hidden
}) => {
  return hidden ? (
    <div />
  ) : (
    <section>
      <hr />
      <H2 color={theme.colors.primary}>{title}</H2>
      {children}
    </section>
  );
};

export default Section;
