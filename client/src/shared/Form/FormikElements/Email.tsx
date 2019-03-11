import { FieldProps } from "formik";
import * as React from "react";
import { Label, LabelText, Input } from "../";

export interface IEmailProps {
  label?: string;
  required?: boolean;
  id?: string;
  isTight?: boolean;
  value?: string;
}

export const Email: React.StatelessComponent<
  IEmailProps & FieldProps
> = props => {
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <Input
        name="email"
        type="email"
        onChange={handleChange(props)}
        id={props.id}
        isTight={props.isTight}
        value={props.value}
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
  props: IEmailProps & FieldProps
): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = props.field;
    const form = props.form;
    form.setFieldValue(field.name, event.target.value);
  };
}
