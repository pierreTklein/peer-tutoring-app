import { Box, Flex } from "@rebass/grid";
import * as React from "react";

import Logo from "../assets/images/logo/logo_full_color.svg";
import { FrontendRoute } from "../config/frontendRoutes";
import { Image } from "../shared/Elements";
import { isLoggedIn } from "../util/UserInfoHelperFunctions";
import LogoutBtn from "./LogoutButton";
import Nav from "./Nav";
import { Link } from "react-router-dom";

interface INavbarState {
  loggedIn: boolean;
}
interface INavbarProps {
  showDivider?: boolean;
}

export default class Navbar extends React.Component<
  INavbarProps,
  INavbarState
> {
  private mounted: boolean;
  constructor(props: INavbarProps) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.mounted = false;
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }
  public componentDidMount() {
    this.mounted = true;
    this.checkLoggedIn();
  }
  public componentWillUnmount() {
    this.mounted = false;
  }

  public render() {
    const logoutBtn = this.state.loggedIn ? <LogoutBtn /> : "";
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
              <Image src={Logo} imgHeight={"50px"} />
            </Link>
          </Box>
          <Box alignSelf={"center"} my={"auto"}>
            {logoutBtn}
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
}
