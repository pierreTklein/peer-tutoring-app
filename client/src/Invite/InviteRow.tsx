import React from "react";
import { MaxWidthBox, Button, ButtonType, InputLocation } from "../shared";
import { FastField, ErrorMessage } from "formik";
import { IInviteInfo, UserType } from "../config";
import * as FormikElements from "../shared/Form/FormikElements";
import { getOptionsFromEnum } from "../util";

interface IInviteRowProps {
  invite: IInviteInfo;
  index: number;
  onRemoveRow: () => void;
  isLargeView?: boolean;
}

export const InviteRow: React.FunctionComponent<IInviteRowProps> = ({
  invite,
  index,
  onRemoveRow,
  isLargeView
}) => (
  <React.Fragment>
    <MaxWidthBox width={[0.15, 0.1]} mt={"29px"} pr={[0, "10px"]}>
      <Button
        type="button"
        isNarrow={true}
        buttonType={ButtonType.DANGER}
        onClick={onRemoveRow}
      >
        –
      </Button>
    </MaxWidthBox>
    <MaxWidthBox width={[0.85, 0.45]}>
      <FastField
        name={`invites.${index}.email`}
        label={"Email Address"}
        placeholder={"Email..."}
        value={invite.email}
        component={FormikElements.Email}
        location={isLargeView ? InputLocation.LEFT : InputLocation.FULL}
        required={true}
      />
      <ErrorMessage
        component={FormikElements.Error}
        name={`invites.${index}.email`}
      />
    </MaxWidthBox>
    <MaxWidthBox width={[1, 0.45]}>
      <FastField
        name={`invites.${index}.accountType`}
        label={"Account Type"}
        value={invite.accountType}
        component={FormikElements.Select}
        location={isLargeView ? InputLocation.RIGHT : InputLocation.FULL}
        options={getOptionsFromEnum(UserType)}
        isMulti={true}
        required={true}
      />
      <ErrorMessage
        component={FormikElements.Error}
        name={`invites.${index}.accountType`}
      />
    </MaxWidthBox>
  </React.Fragment>
);
