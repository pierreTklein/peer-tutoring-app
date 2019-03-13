import * as React from "react";
import { IAccount, UserType } from "../config";
import { Basic } from "./Basic";
import { Tutor } from "./Tutor";
import { isUserType } from "../util";

interface IViewProps {
  account: IAccount;
}

export const View: React.FunctionComponent<IViewProps> = ({ account }) => {
  return (
    <React.Fragment>
      <Basic account={account} />
      {isUserType(account, UserType.TUTOR) && <Tutor tutor={account.tutor} />}
    </React.Fragment>
  );
};
