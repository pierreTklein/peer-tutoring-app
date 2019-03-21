import * as React from "react";
import { NumberFormatProps, NumberFormatValues } from "react-number-format";
import { Label, LabelText, StyledNumberFormat } from ".";
import { InputLocation } from "../Styles";

interface ILabelledNumberFormatProp {
  value?: string;
  onValueChange: (value: NumberFormatValues) => void;
  label: string;
  placeholder: string;
  required?: boolean;
  location?: InputLocation;
}
export const NumberFormatInput: React.StatelessComponent<
  ILabelledNumberFormatProp & NumberFormatProps
> = props => {
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <StyledNumberFormat {...props} />
    </Label>
  );
};
