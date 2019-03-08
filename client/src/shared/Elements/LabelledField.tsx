import * as React from "react";

import { Box } from "@rebass/grid";

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
    <Box width={[1, 1 / 2]} hidden={hidden}>
      <strong>{label}</strong>: {text}
    </Box>
  );
};

export default LabelledField;
