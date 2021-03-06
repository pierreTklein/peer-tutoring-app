import { FieldProps } from "formik";
import * as React from "react";
import { Label, LabelText, Input } from "../";
import { InputLocation } from "../../Styles";

export interface IPasswordProps {
  location?: InputLocation;
  label?: string;
  required?: boolean;
  id?: string;
  isTight?: boolean;
  value?: string;
  isDisabled?: boolean;
}

export const Password: React.StatelessComponent<
  IPasswordProps & FieldProps
> = props => {
  const {
    id,
    location,
    isTight,
    value,
    label,
    required,
    isDisabled,
    field
  } = props;
  return (
    <Label>
      <LabelText label={label} required={required} />
      <Input
        name="password"
        type="password"
        onChange={handleChange(props)}
        placeholder={"Password..."}
        id={id}
        isTight={isTight}
        location={location}
        value={value}
        disabled={isDisabled}
        {...field}
      />
    </Label>
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: IPasswordProps & FieldProps
): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = props.field;
    const form = props.form;
    form.setFieldValue(field.name, event.target.value);
  };
}
