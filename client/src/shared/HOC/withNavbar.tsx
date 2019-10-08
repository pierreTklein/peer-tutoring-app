import * as React from "react";
import Navbar from "../../Nav/Navbar";
import { FooterContainer } from "../../Footer/FooterContainer";

const withNavbar = <P extends {}>(Component: React.ComponentType<P>) => (
  props: P
) => {
  return (
    <React.Fragment>
      <Navbar />
      <Component {...props} />
      <FooterContainer />
    </React.Fragment>
  );
};

export default withNavbar;
