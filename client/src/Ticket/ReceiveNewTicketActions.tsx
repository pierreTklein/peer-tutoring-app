import * as React from "react";
import { FrontendRoute } from "../config";
import { Button, ButtonType, Badge } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { Ticket } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface ITicketActionProps {
  numWaiting?: number;
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
      disableRequest,
      numWaiting = 0
    } = this.props;
    return (
      <Flex width={1} justifyContent={"center"}>
        <Box hidden={hideRequest}>
          <Link to={FrontendRoute.CREATE_TICKET}>
            <Button disabled={disableRequest} buttonType={ButtonType.PRIMARY}>
              {disableRequest
                ? "Your question must be resolved before asking another."
                : "Ask a new question"}
            </Button>
          </Link>
        </Box>
        <Box hidden={hideAssign}>
          <Button
            disabled={disableAssign}
            onClick={this.onAssignQuestion}
            buttonType={ButtonType.PRIMARY}
            isLoading={this.state.loading}
          >
            {numWaiting > 0 && (
              <Badge>{numWaiting < 10 ? numWaiting : "10+"}</Badge>
            )}
            Assign new question
          </Button>
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
      if (e && e.data) {
        ToastError(e.data);
      } else {
        toast.error("There was an unexpected error.");
      }
    } finally {
      this.setState({ loading: false });
    }
  }
}
