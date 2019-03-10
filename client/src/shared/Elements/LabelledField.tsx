import * as React from "react";

import { PrewrapBox } from ".";

interface IFieldProps {
  text: string | number | undefined;
  label: string;
  hidden?: boolean;
}

const LabelledField: React.FunctionComponent<IFieldProps> = ({
  text,
  label,
  hidden
}) => {
  return (
    <PrewrapBox width={1} hidden={hidden}>
      <strong>{label}</strong>: {text}
    </PrewrapBox>
  );
};

export default LabelledField;
