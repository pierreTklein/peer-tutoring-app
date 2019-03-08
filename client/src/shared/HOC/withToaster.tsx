import { Box } from "@rebass/grid";
import * as React from "react";
import { ToastContainer } from "react-toastify";

const WithToasterContainer = <P extends {}>(
  Component: React.ComponentType<P>
) =>
  class extends React.Component<P> {
    constructor(props: any) {
      super(props);
    }

    public render() {
      return (
        <React.Fragment>
          <Component {...this.props} />
          <ToastContainer toastClassName="toast-notification" />
        </React.Fragment>
      );
    }
  };

export default WithToasterContainer;