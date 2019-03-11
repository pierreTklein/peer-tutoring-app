import * as React from "react";
import { H2 } from ".";
import theme from "../Styles/theme";
import Details from "./Details";
import Summary from "./Summary";

interface IProps extends React.HTMLAttributes<HTMLDetailsElement> {
  title: string;
  titleColor?: string;
  open: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export class Collapsible extends React.Component<IProps, {}> {
  private nv: HTMLDetailsElement | null = null;
  private suppressFirstToggle: boolean;
  public constructor(props: IProps) {
    super(props);
    /**
     * When the initial prop requests that it is by default open, it will trigger a
     * toggle event. However, we don't want to bubble that up via the onToggle event,
     * since that could cause a circular feedback loop. Therefore, we will suppress the
     * first toggle if props.open is true.
     */
    this.suppressFirstToggle = props.open;
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  public render() {
    const { title, titleColor, children, open, onToggle, ...rest } = this.props;
    return (
      <Details
        ref={elem => (this.nv = elem as HTMLDetailsElement)}
        open={open}
        {...rest}
      >
        <Summary style={{ cursor: "pointer" }}>
          <H2 color={titleColor || theme.colors.primary}>{title}</H2>
        </Summary>
        {children}
      </Details>
    );
  }
  public componentDidMount() {
    if (this.nv) {
      this.nv.addEventListener("toggle", this.onToggle);
    }
  }

  public onToggle(e: Event) {
    const _onToggle = this.props.onToggle;
    if (this.nv && this.nv.open && this.suppressFirstToggle) {
      /**
       * This means that the first toggle event was triggered and successfully suppressed,
       * so we can set this flag to false for subsequent toggles.
       */

      this.suppressFirstToggle = false;
      return;
    }
    if (_onToggle) {
      const newToggle = this.props.open === undefined || !this.props.open;
      _onToggle(newToggle);
    }
  }
  public componentWillUnmount() {
    if (this.nv) {
      this.nv.removeEventListener("toggle", this.onToggle);
    }
  }
}

export default Collapsible;
