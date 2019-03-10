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
  return () => {
    Auth.logout()
      .then(() => {
        console.log(props);
        props.history.push(FrontendRoute.LOGIN_PAGE);
      })
      .catch((response: AxiosResponse<APIResponse<IValidationError>>) => {
        if (response && response.data) {
          ToastError(response.data);
        }
      });
  };
}

export default withRouter<RouteComponentProps>(LogoutBtn);
