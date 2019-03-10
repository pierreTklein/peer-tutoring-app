import * as React from "react";
import { IAccount } from "../config";
import { Section } from "../shared";
import { Flex } from "@rebass/grid";
import LabelledField from "../shared/Elements/LabelledField";

interface IAccountProps {
  account: IAccount;
}

export const Account: React.FunctionComponent<IAccountProps> = ({
  account
}) => {
  return (
    <Section title={"Basic Info"}>
      <Flex flexDirection={"column"}>
        <LabelledField
          label={"Name"}
          text={`${account.firstName} ${account.lastName}`}
        />
        <LabelledField label={"Email"} text={`${account.email}`} />
        <LabelledField
          label={"User Type"}
          text={`${account.accountType.join(", ").toLowerCase()}`}
        />
      </Flex>
    </Section>
  );
};
