import * as React from "react";

import { StyledModal, H2 } from ".";
import { Flex, Box } from "@rebass/grid";
import Button, { ButtonType } from "./Button";

export interface IConfModalProps {
  title: string;
  body: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  onDeny: () => void;
  isLoading?: boolean;
}

const ConfirmationModal: React.FunctionComponent<IConfModalProps> = ({
  title,
  body,
  isOpen,
  isLoading,
  onRequestClose,
  onConfirm,
  onDeny
}) => {
  return (
    <StyledModal
      appElement={document.getElementById("root") || undefined}
      isOpen={isOpen}
      contentLabel={title}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <Flex
        flexDirection={"column"}
        style={{
          height: "inherit"
        }}
      >
        <Box>
          <H2 textAlign={"center"} marginBottom={"0px"}>
            {title}
          </H2>
        </Box>
        <Box my={"auto"}>
          <div style={{ textAlign: "center" }}>{body}</div>
        </Box>
        <Box mb={"0"}>
          <Flex justifyContent={"center"} mb={"0"} alignItems={"flex-end"}>
            <Box>
              <Button
                buttonType={ButtonType.SECONDARY}
                onClick={onDeny}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                buttonType={ButtonType.PRIMARY}
                onClick={onConfirm}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Confirm
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </StyledModal>
  );
};

export default ConfirmationModal;
