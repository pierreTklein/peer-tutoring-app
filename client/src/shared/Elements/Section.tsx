import * as React from "react";
import { H2 } from ".";
import theme from "../Styles/theme";
import Collapsible from "./Collapsible";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  hidden?: boolean;
  collapsable?: boolean;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const Section: React.FunctionComponent<IProps> = ({
  title,
  children,
  hidden,
  collapsable,
  defaultOpen,
  onToggle,
  ...rest
}) => {
  if (hidden) {
    return <div />;
  } else if (collapsable) {
    return (
      <React.Fragment>
        <hr />
        <Collapsible
          open={defaultOpen || false}
          title={title}
          onToggle={onToggle}
          {...rest}
        >
          {children}
        </Collapsible>
      </React.Fragment>
    );
  } else {
    return (
      <section {...rest}>
        <hr />
        <H2 color={theme.colors.primary}>{title}</H2>
        {children}
      </section>
    );
  }
};

export default Section;
