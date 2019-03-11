import * as React from "react";
import { H2 } from ".";
import theme from "../Styles/theme";
import Collapsible from "./Collapsible";

interface IProps {
  title: string;
  hidden?: boolean;
  collapsable?: boolean;
  defaultOpen?: boolean;
}

export const Section: React.FunctionComponent<IProps> = ({
  title,
  children,
  hidden,
  collapsable,
  defaultOpen
}) => {
  if (hidden) {
    return <div />;
  } else if (collapsable) {
    return (
      <React.Fragment>
        <hr />
        <Collapsible open={defaultOpen || false} title={title}>
          {children}
        </Collapsible>
      </React.Fragment>
    );
  } else {
    return (
      <section>
        <hr />
        <H2 color={theme.colors.primary}>{title}</H2>
        {children}
      </section>
    );
  }
};

export default Section;
