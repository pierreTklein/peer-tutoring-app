import { AxiosResponse } from "axios";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { APIResponse, Auth } from "../api";
import { FrontendRoute, IValidationError } from "../config";
import Button, { ButtonType } from "../shared/Elements/Button";
import ToastError from "../shared/Form/validationErrorGenerator";

const LogoutBtn: React.StatelessComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  return (
    <Button onClick={handleLogout(props)} buttonType={ButtonType.PRIMARY}>
      Logout
    </Button>
  );
};

function handleLogout(props: RouteComponentProps): () => void {
  return async () => {
    try {
      await Auth.logout();
      props.history.push(FrontendRoute.LOGIN_PAGE);
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    }
  };
}

export default withRouter<RouteComponentProps>(LogoutBtn);
