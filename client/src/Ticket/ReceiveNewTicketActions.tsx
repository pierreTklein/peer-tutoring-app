import * as React from "react";
import { IAccount, UserType, FrontendRoute } from "../config";
import { Button, ButtonType } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { isUserType } from "../util";
import { Ticket } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { Link } from "react-router-dom";
import { boolean } from "yup";

interface ITicketActionProps {
  hideAssign?: boolean;
  hideRequest?: boolean;
  disableAssign?: boolean;
  disableRequest?: boolean;
  onQuestionAssigned?: () => void;
}
interface ITicketActionState {
  loading: boolean;
}

export class TicketActions extends React.Component<
  ITicketActionProps,
  ITicketActionState
> {
  constructor(props: ITicketActionProps) {
    super(props);
    this.state = {
      loading: false
    };
    this.onAssignQuestion = this.onAssignQuestion.bind(this);
  }
  public render() {
    const {
      hideAssign,
      hideRequest,
      disableAssign,
      disableRequest
    } = this.props;
    return (
      <Flex width={1} justifyContent={"center"}>
        <Box hidden={hideAssign}>
          <Button
            disabled={disableAssign}
            onClick={this.onAssignQuestion}
            buttonType={ButtonType.PRIMARY}
            isLoading={this.state.loading}
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
  }
  private async onAssignQuestion() {
    try {
      this.setState({ loading: true });
      await Ticket.assignUnk();
      this.props.onQuestionAssigned && this.props.onQuestionAssigned();
    } catch (e) {
      ToastError(e.data);
    } finally {
      this.setState({ loading: false });
    }
  }
}
