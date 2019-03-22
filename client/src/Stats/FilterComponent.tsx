import { ErrorMessage, FastField, Formik, FormikProps } from "formik";
import * as React from "react";
import { object, string } from "yup";

import { ButtonType, MaxWidthBox } from "../shared/Elements";
import { Form, SubmitBtn } from "../shared/Form";
import * as FormikElements from "../shared/Form/FormikElements";
import { ITicketQuery } from "../config/ITicketQuery";
import MediaQuery from "react-responsive";
import { InputLocation } from "../shared";
import { Flex, Box } from "@rebass/grid";
import { date2input, input2date } from "../util";

interface IFilterComponentProps {
  onSubmit: (query: ITicketQuery) => Promise<void>;
}

export class FilterComponent extends React.Component<
  IFilterComponentProps,
  {}
> {
  constructor(props: IFilterComponentProps) {
    super(props);
    this.state = {};
    this.renderFormik = this.renderFormik.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  public render() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          startDate: date2input(oneWeekAgo),
          endDate: date2input(tomorrow)
        }}
        onSubmit={this.onSubmit}
        validationSchema={object().shape({
          startDate: string(),
          endDate: string()
        })}
        render={this.renderFormik}
      />
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <MediaQuery minDeviceWidth={700}>
        {matches => (
          <Form onSubmit={fp.handleSubmit}>
            <Flex flexWrap={"wrap"} width={1} justifyContent={"center"}>
              <MaxWidthBox width={[1, 0.25]}>
                <FastField
                  name={"startDate"}
                  component={FormikElements.FormattedNumber}
                  label={"Start Date"}
                  placeholder="MM/DD/YYYY"
                  format="##/##/####"
                  location={matches ? InputLocation.LEFT : InputLocation.FULL}
                  value={fp.values.startDate}
                />
                <ErrorMessage
                  component={FormikElements.Error}
                  name="startDate"
                />
              </MaxWidthBox>
              <MaxWidthBox width={[1, 0.25]}>
                <FastField
                  name={"endDate"}
                  component={FormikElements.FormattedNumber}
                  label={"End Date"}
                  placeholder="MM/DD/YYYY"
                  format="##/##/####"
                  location={matches ? InputLocation.RIGHT : InputLocation.FULL}
                  value={fp.values.endDate}
                />
                <ErrorMessage component={FormikElements.Error} name="endDate" />
              </MaxWidthBox>
              <Box alignSelf={"center"} mt={"10px"}>
                <SubmitBtn
                  marginBottom={matches ? "0px" : undefined}
                  buttonType={ButtonType.PRIMARY}
                >
                  Get Stats
                </SubmitBtn>
              </Box>
            </Flex>
          </Form>
        )}
      </MediaQuery>
    );
  }
  private onSubmit(values: any) {
    this.props.onSubmit({
      createBefore: new Date(input2date(values.endDate)),
      endAfter: new Date(input2date(values.startDate))
    });
  }
}

export default FilterComponent;
