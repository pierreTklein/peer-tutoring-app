import * as React from "react";
import { IAccount, UserType } from "../config";
import { MaxWidthBox, H1 } from "../shared";
import { Basic } from "./Basic";
import { Tutor } from "./Tutor";
import { isUserType } from "../util";

interface IViewProps {
  account: IAccount;
}

export const View: React.FunctionComponent<IViewProps> = ({ account }) => {
  return (
    <MaxWidthBox width={0.9} m={"auto"}>
      <H1 textAlign={"center"}>{account.firstName}'s Profile</H1>
      <Basic account={account} />
      {isUserType(account, UserType.TUTOR) && <Tutor tutor={account.tutor} />}
    </MaxWidthBox>
  );
};
