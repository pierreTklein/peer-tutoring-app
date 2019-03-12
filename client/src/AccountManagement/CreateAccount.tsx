import * as React from "react";
import ManageAccountContainer, {
  ManageAccountModes
} from "../AccountManagement/ManageAccountContainer";
import { RouteProps } from "react-router";

export const CreateAccount: React.FunctionComponent<RouteProps> = (
  props: RouteProps
) => {
  return <ManageAccountContainer mode={ManageAccountModes.CREATE} {...props} />;
};
