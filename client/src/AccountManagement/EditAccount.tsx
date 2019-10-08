import * as React from "react";
import ManageAccountContainer, {
  ManageAccountModes
} from "../AccountManagement/ManageAccountContainer";

export const EditAccount: React.FunctionComponent<{}> = () => {
  return <ManageAccountContainer mode={ManageAccountModes.EDIT} />;
};
