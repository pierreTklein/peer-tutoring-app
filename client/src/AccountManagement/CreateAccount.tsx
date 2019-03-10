import * as React from "react";
import ManageAccountContainer, {
  ManageAccountModes
} from "../AccountManagement/ManageAccountContainer";

export const CreateAccount: React.FunctionComponent<{}> = ({}) => {
  return <ManageAccountContainer mode={ManageAccountModes.CREATE} />;
};
