import { FieldProps } from "formik";
import * as React from "react";
import { Label, LabelText, StyledCreatableSelect, StyledSelect } from "..";
import { ValueType, ActionMeta } from "react-select/lib/types";
import { InputLocation } from "../../Styles";

interface IStylizedSelectFormikProps {
  label: string;
  options: Array<{ label: string; value: string }>;
  isMulti: boolean;
  placeholder?: string;
  value?: string | string[];
  creatable: boolean;
  location?: InputLocation;
  required?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const StylizedSelectFormikComponent: React.StatelessComponent<
  IStylizedSelectFormikProps & FieldProps
> = props => {
  const commonProps = {
    className: "react-select-container",
    classNamePrefix: "react-select",
    onChange: handleChangeFactory(props),
    location: props.location,
    options: props.options,
    isMulti: props.isMulti,
    placeholder: props.placeholder || "Select...",
    value: generateValue(props.value),
    isDisabled: props.isDisabled,
    isLoading: props.isLoading
  };
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      {props.creatable ? (
        <StyledCreatableSelect
          {...commonProps}
          allowCreateWhileLoading={true}
          createOptionPosition={"first"}
        />
      ) : (
        <StyledSelect {...commonProps} />
      )}
    </Label>
  );
};

function generateValue(
  value:
    | string
    | string[]
    | { label: string; value: string }
    | Array<{ label: string; value: string }>
    | undefined
) {
  if (!value) {
    return "";
  }
  if (typeof value === "string") {
    return { label: value, value };
  } else if (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "string"
  ) {
    value = value as string[];
    return value.map(val => ({ label: val, value: val }));
  } else {
    return value;
  }
}

function handleChangeFactory(props: IStylizedSelectFormikProps & FieldProps) {
  return (newValue: ValueType<any>, actionMeta: ActionMeta) => {
    const field = props.field;
    const form = props.form;
    if (Array.isArray(newValue)) {
      const field = props.field;
      const form = props.form;
      form.setFieldValue(field.name, newValue);
    } else if (newValue) {
      form.setFieldValue(field.name, newValue);
    } else {
      form.setFieldValue(field.name, "");
    }
  };
}

export { StylizedSelectFormikComponent as Select };
