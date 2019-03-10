import * as React from "react";
import { IAccount, UserType, FrontendRoute } from "../config";
import { Button, ButtonType } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { isUserType } from "../util";
import { Ticket } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { Link } from "react-router-dom";

interface ITicketActionProps {
  hideAssign?: boolean;
  hideRequest?: boolean;
  disableAssign?: boolean;
  disableRequest?: boolean;
  onQuestionAssigned?: () => void;
}

export const TicketActions: React.FunctionComponent<ITicketActionProps> = ({
  hideAssign,
  hideRequest,
  disableAssign,
  disableRequest,
  onQuestionAssigned
}) => {
  return (
    <Flex width={1} justifyContent={"center"}>
      <Box hidden={hideAssign}>
        <Button
          disabled={disableAssign}
          onClick={() => {
            onAssignQuestion(onQuestionAssigned);
          }}
          buttonType={ButtonType.PRIMARY}
        >
          Assign new question
        </Button>
      </Box>
      <Box hidden={hideRequest}>
        <Link to={FrontendRoute.CREATE_TICKET}>
          <Button disabled={disableRequest} buttonType={ButtonType.PRIMARY}>
            Ask new question
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

async function onAssignQuestion(callback?: () => void) {
  try {
    await Ticket.assign();
    callback && callback();
  } catch (e) {
    ToastError(e.data);
  }
}
