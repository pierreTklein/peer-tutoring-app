import * as React from "react";

import { PrewrapBox, StyledModal, H2 } from ".";
import { Flex, Box } from "@rebass/grid";
import Button, { ButtonType } from "./Button";
import Paragraph from "./Paragraph";

export interface IConfModalProps {
  title: string;
  body: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  onDeny: () => void;
}

const ConfirmationModal: React.FunctionComponent<IConfModalProps> = ({
  title,
  body,
  isOpen,
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
        justifyContent={"space-around"}
        alignSelf={"stretch"}
        style={{
          height: "inherit"
        }}
      >
        <Box flex={1}>
          <H2>{title}</H2>
        </Box>
        <Box flex={1}>
          <Paragraph>{body}</Paragraph>
        </Box>
        <Box mb={"0"} flex={1}>
          <Flex justifyContent={"center"} mb={"0"} alignItems={"flex-end"}>
            <Box>
              <Button buttonType={ButtonType.SECONDARY} onClick={onDeny}>
                Cancel
              </Button>
              <Button buttonType={ButtonType.PRIMARY} onClick={onConfirm}>
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
