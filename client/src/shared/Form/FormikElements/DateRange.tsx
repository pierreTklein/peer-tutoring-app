import * as React from "react";
import { Label, LabelText } from "..";
import { InputLocation } from "../../Styles";
import { DatePicker } from "../DayPicker";
import { Modifier, DateUtils } from "react-day-picker";
import { FieldProps } from "formik";

interface IDateRangeProps extends FieldProps {
  label: string;
  format: string;
  location?: InputLocation;
  value: {
    from: Date;
    to: Date;
  };
  required?: boolean;
}

export const DateRange: React.FunctionComponent<IDateRangeProps> = props => {
  let { value } = props;
  const modifiers = { start: value.from, end: value.to };
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <DatePicker
        selectedDays={{ from: value.from, to: value.to }}
        modifiers={modifiers}
        onDayClick={handleChange(props)}
      />
    </Label>
  );
};

function handleChange(props: IDateRangeProps) {
  return (day: Date) => {
    // @ts-ignore
    const range = DateUtils.addDayToRange(day, props.value);
    const field = props.field;
    const form = props.form;
    form.setFieldValue(field.name, range);
  };
}

export default DateRange;
