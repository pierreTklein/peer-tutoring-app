import { FieldProps } from "formik";
import * as React from "react";
import { NumberFormatValues } from "react-number-format";
import { NumberFormatInput, Label, LabelText } from "..";
import { InputLocation } from "../../Styles";
import { DayPicker } from "../DayPicker";
import { Modifier } from "react-day-picker";

interface IDateRangeProps {
  label: string;
  format: string;
  location?: InputLocation;
  value?: [];
  required?: boolean;
}

interface IDateRangeState {
  from: Modifier;
  to: Modifier;
}

export class DateRange extends React.Component<
  IDateRangeProps,
  IDateRangeState
> {
  constructor(props: IDateRangeProps) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined
    };
  }
  public render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <Label>
        <LabelText label={this.props.label} required={this.props.required} />
        <DayPicker
          className="Selectable"
          selectedDays={[from, to]}
          modifiers={modifiers}
        />
      </Label>
    );
  }
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

export default DateRange;
