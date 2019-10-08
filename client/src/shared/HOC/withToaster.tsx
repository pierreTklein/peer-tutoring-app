import * as React from "react";
import { ToastContainer } from "react-toastify";

const WithToasterContainer = <P extends {}>(
  Component: React.ComponentType<P>
) => (props: P) => {
  return (
    <React.Fragment>
      <Component {...props} />
      <ToastContainer toastClassName="toast-notification" />
    </React.Fragment>
  );
};

export default WithToasterContainer;
