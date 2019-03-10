import { object, string } from "yup";

const getValidationSchema = (isCreate: boolean) => {
  const password = isCreate
    ? string()
        .min(8, "Must be at least 8 characters")
        .required("Required")
    : string().when("newPassword", {
        is: pass => pass,
        then: string().required("Required to change password"),
        otherwise: string()
      });

  return object().shape({
    firstName: string().required("Required"),
    lastName: string().required("Required"),
    email: string()
      .required("Required")
      .email("Must be a valid email"),
    password,
    newPassword: string().min(8, "Must be at least 8 characters")
  });
};

export default getValidationSchema;
