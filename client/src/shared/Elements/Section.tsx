import * as React from "react";
import { H2 } from ".";
import theme from "../Styles/theme";

interface IProps {
  title: string;
  hidden?: boolean;
  collapsable?: boolean;
  isOpen?: boolean;
}

export const Section: React.FunctionComponent<IProps> = ({
  title,
  children,
  hidden,
  collapsable,
  isOpen
}) => {
  if (hidden) {
    return <div />;
  } else if (collapsable) {
    return (
      <React.Fragment>
        <hr />
        <details style={{ cursor: "pointer" }} open={isOpen}>
          <summary>
            <div>
              <H2 color={theme.colors.primary}>{title}</H2>
            </div>
          </summary>
          {children}
        </details>
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
