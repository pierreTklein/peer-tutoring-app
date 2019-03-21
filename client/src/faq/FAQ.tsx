import { Flex, Box } from "@rebass/grid";
import * as React from "react";

import { SERVICE_NAME, SERVICE_LOCATION } from "../config/constants";

import {
  Card,
  H1,
  H2,
  Image,
  LinkDuo,
  PageContainer,
  Panel,
  Paragraph
} from "../shared/Elements";
import { FrontendRoute } from "../config";
import { Link } from "react-router-dom";
import theme from "../shared/Styles/theme";
import Question from "./Question";

interface IFAQProps {}

const FAQContainer: React.FunctionComponent<IFAQProps> = ({}) => {
  return (
    <PageContainer title={"FAQ"}>
      <H1 textAlign={"center"}>{SERVICE_NAME} FAQ</H1>
      <Question title={"Who or what is the CSUS Helpdesk?!"}>
        The CSUS Helpdesk is a free, peer-to-peer tutoring service that is run
        by the Computer Science Undergraduate Society, and is comprised of
        undergraduate students in the faculty of Computer Science at McGill
        Univeristy.
      </Question>
      <Question title={"Where is the CSUS Helpdesk located?"}>
        We are located in Trottier building, on the third floor, in room 3090{" "}
        <LinkDuo to={SERVICE_LOCATION}>(Google Maps)</LinkDuo>.
      </Question>
      <Question title={"When is the Helpdesk open?"}>
        The hours of operation are from 10AM to 5PM, Monday through Friday. We
        usually begin tutoring services the day after add-drop, and end one week
        before final exams.
      </Question>
      <Question title={"How do I get help from the Helpdesk?"}>
        Sign up for an account{" "}
        <Link to={FrontendRoute.CREATE_ACCOUNT_PAGE}>here</Link>, if you haven't
        already. Then, ask a question, and sit tight! A tutor should be with you
        shortly.
      </Question>
      <Question title={"Where can I find review sessions?"}>
        Review sessions are held for both midterms and finals of most
        introductory courses, such as Comp 202, Comp 204, Comp 206, and Comp
        250. The information for these sessions can be found on our{" "}
        <LinkDuo to={"https://www.facebook.com/pg/myCSUS/events"}>
          facebook page
        </LinkDuo>
        . As of Winter 2018, review sessions are free to attend.
      </Question>
      <Question title={"How is the CSUS Helpdesk funded?"}>
        <LinkDuo
          to={
            "https://www.mcgill.ca/tpulse/tomlinson-engagement-award-mentoring-team"
          }
        >
          The Tomlinson Engagement Award for Mentoring
        </LinkDuo>
        , as well as budget from the Computer Science Undergraduate Society.
      </Question>
      <Question title={"How can I join the CSUS Helpdesk?"}>
        The CSUS Helpdesk holds interviews before each term. Please be on the
        look out for the applications on our facebook page, or in the listserv.
      </Question>
    </PageContainer>
  );
};

export default FAQContainer;
