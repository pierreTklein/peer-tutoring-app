import * as React from "react";
import { IAccount } from "../config";
import { Section } from "../shared";
import { Flex } from "@rebass/grid";
import LabelledField from "../shared/Elements/LabelledField";

interface IBasicProps {
  account: IAccount;
}

export const Basic: React.FunctionComponent<IBasicProps> = ({ account }) => {
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
        <LabelledField label={"user ID"} text={account.id || account._id} />
      </Flex>
    </Section>
  );
};
