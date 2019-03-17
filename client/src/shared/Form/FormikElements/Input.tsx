import { FieldProps } from "formik";
import * as React from "react";
import { Input, Label, LabelText } from "..";
import { InputLocation } from "../../Styles";

interface IInputFormikComponentProp {
  label: string;
  inputType: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  location?: InputLocation;
}
const InputFormikComponent: React.StatelessComponent<
  IInputFormikComponentProp & FieldProps
> = ({
  placeholder,
  location,
  label,
  required,
  inputType,
  field,
  isDisabled
}) => {
  return (
    <Label>
      <LabelText label={label} required={required} />
      <Input
        type={inputType}
        placeholder={placeholder || ""}
        location={location}
        disabled={isDisabled}
        {...field}
      />
    </Label>
  );
};

export { InputFormikComponent as Input };
