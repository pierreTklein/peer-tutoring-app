import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIResponse } from "../../api";
import {
  instanceOfIValidationErrorItem,
  IValidationError,
  IValidationErrorItem
} from "../../config";

export default function ToastError(
  response: APIResponse<IValidationError>,
  autoClose: boolean = true,
  toastId: string = "apiResponseError"
) {
  if (!response) {
    return;
  }
  const errors: any = response.data;
  toast.error(response.message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose ? 5000 : false,
    toastId: toastId
  });

  for (const key in errors) {
    // check if the property/key is defined in the object itself, not in parent
    if (
      errors.hasOwnProperty(key) &&
      instanceOfIValidationErrorItem(errors[key])
    ) {
      toast.error(validationErrorItem(key, errors[key]), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false
      });
    }
  }
}
function validationErrorItem(key: string, errorItem: IValidationErrorItem) {
  return `Invalid ${key}: ${errorItem.msg}`;
}
