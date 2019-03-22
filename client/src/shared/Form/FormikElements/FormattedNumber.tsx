import { FieldProps } from "formik";
import * as React from "react";
import { NumberFormatValues, NumberFormatProps } from "react-number-format";
import { NumberFormatInput } from "..";
import { InputLocation } from "../../Styles";

interface INumberFormatFormikComponent {
  label: string;
  format: string;
  location?: InputLocation;
  placeholder?: string;
  value?: string;
  required?: boolean;
  keyDownUpdate?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    oldValue: number
  ) => string;
}

const NumberFormatFormikComponent: React.StatelessComponent<
  INumberFormatFormikComponent &
    FieldProps &
    NumberFormatProps &
    React.HTMLAttributes<HTMLInputElement>
> = ({ keyDownUpdate, ...rest }) => {
  const placeholder = rest.placeholder ? rest.placeholder : "";
  return (
    <NumberFormatInput
      onValueChange={handleChange(rest)}
      label={rest.label}
      placeholder={placeholder}
      format={rest.format}
      value={rest.value}
      required={rest.required}
      location={rest.location}
      onKeyDown={handleKeyDownChange({ ...rest, keyDownUpdate })}
      {...rest}
    />
  );
};

function handleKeyDownChange({
  field,
  form,
  keyDownUpdate
}: FieldProps & INumberFormatFormikComponent) {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    e = e || window.event;
    const newValue = keyDownUpdate
      ? keyDownUpdate(e, field.value)
      : field.value;
    form.setFieldValue(field.name, newValue);
  };
}

/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Textarea component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange({ field, form }: FieldProps) {
  return (value: NumberFormatValues) => {
    form.setFieldValue(field.name, value.value);
  };
}

export { NumberFormatFormikComponent as FormattedNumber };
