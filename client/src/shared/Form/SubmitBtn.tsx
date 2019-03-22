import { Box, Flex, FlexProps } from "@rebass/grid";
import * as React from "react";

import { Button, IButtonProps } from "../Elements";

interface ISubmitBtnProps
  extends IButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  marginBottom?: string | number;
}

export const SubmitBtn: React.StatelessComponent<ISubmitBtnProps> = ({
  marginBottom,
  children,
  ...rest
}) => (
  <Flex justifyContent={"center"} mb={marginBottom || "20px"}>
    <Box>
      <Button type={"submit"} {...rest}>
        {children}
      </Button>
    </Box>
  </Flex>
);
