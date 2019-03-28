import * as React from "react";
import Navbar from "../../Nav/Navbar";
import { FooterContainer } from "../../Footer/FooterContainer";

const withNavbar = <P extends {}>(Component: React.ComponentType<P>) =>
  class extends React.Component<P> {
    constructor(props: any) {
      super(props);
    }

    public render() {
      return (
        <React.Fragment>
          <Navbar />
          <Component {...this.props} />
          <FooterContainer />
        </React.Fragment>
      );
    }
  };

export default withNavbar;
