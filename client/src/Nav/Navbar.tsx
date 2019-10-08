import { Box, Flex } from "@rebass/grid";
import * as React from "react";

import Logo from "../assets/images/logo/logo_full_color.svg";
import { FrontendRoute } from "../config/frontendRoutes";
import { Image, Button, ButtonType } from "../shared/Elements";
import { isLoggedIn } from "../util/UserInfoHelperFunctions";
import Nav from "../shared/Elements/Nav";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Auth } from "../api";
import ToastError from "../shared/Form/validationErrorGenerator";

interface INavbarState {
  loggedIn: boolean;
}
interface INavbarProps extends RouteComponentProps {
  showDivider?: boolean;
}

class Navbar extends React.Component<INavbarProps, INavbarState> {
  private mounted: boolean;
  constructor(props: INavbarProps) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.mounted = false;
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  public componentDidMount() {
    this.mounted = true;
    this.checkLoggedIn();
  }
  public componentWillUnmount() {
    this.mounted = false;
  }

  public render() {
    return (
      <Nav borderThickness={this.props.showDivider ? "1px" : "0px"}>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          p={"1rem"}
          alignItems={"stretch"}
        >
          <Box alignSelf={"center"} my={"auto"}>
            <Link to={FrontendRoute.HOME_PAGE}>
              <Image src={Logo} imgHeight={"50px"} alt={"Link to home page"} />
            </Link>
          </Box>
          <Box>
            <Flex>
              <Box alignSelf={"center"} my={"auto"}>
                <Link to={FrontendRoute.FAQ}>
                  <Button buttonType={ButtonType.PRIMARY} isNarrow={true}>
                    FAQ
                  </Button>
                </Link>
              </Box>
              {this.state.loggedIn && (
                <React.Fragment>
                  <Box alignSelf={"center"} my={"auto"}>
                    <Link to={FrontendRoute.EDIT_ACCOUNT_PAGE}>
                      <Button buttonType={ButtonType.PRIMARY} isNarrow={true}>
                        Account
                      </Button>
                    </Link>
                  </Box>
                  <Box alignSelf={"center"} my={"auto"}>
                    <Button
                      onClick={this.handleLogout}
                      buttonType={ButtonType.PRIMARY}
                      isNarrow={true}
                    >
                      Logout
                    </Button>
                  </Box>
                </React.Fragment>
              )}
              {!this.state.loggedIn && (
                <Box alignSelf={"center"} my={"auto"}>
                  <Link to={FrontendRoute.LOGIN_PAGE}>
                    <Button buttonType={ButtonType.PRIMARY}>Login</Button>
                  </Link>
                </Box>
              )}
            </Flex>
          </Box>
        </Flex>
      </Nav>
    );
  }
  private checkLoggedIn() {
    isLoggedIn().then(result => {
      if (this.mounted) {
        this.setState({
          loggedIn: result
        });
      }
    });
  }
  private async handleLogout() {
    try {
      await Auth.logout();
      this.props.history.push(FrontendRoute.LOGIN_PAGE);
    } catch (e) {
      if (e && e.data) {
        ToastError(e.data);
      }
    }
  }
}

export default withRouter(Navbar);
