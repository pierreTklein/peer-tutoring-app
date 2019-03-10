import * as React from "react";
import { IAccount, UserType } from "../config";
import { MaxWidthBox, H1 } from "../shared";
import { Account } from "./Account";
import { Tutor } from "./Tutor";

interface IViewProps {
  account: IAccount;
}

export const View: React.FunctionComponent<IViewProps> = ({ account }) => {
  return (
    <MaxWidthBox m={"auto"}>
      <H1 marginLeft={"0px"}>{account.firstName}'s Profile</H1>
      <Account account={account} />
      {account.accountType.includes(UserType.TUTOR) && (
        <Tutor tutor={account.tutor} />
      )}
    </MaxWidthBox>
  );
};
