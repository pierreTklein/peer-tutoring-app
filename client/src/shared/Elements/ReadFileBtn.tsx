import * as React from "react";
import { FileInput } from "..";
import Button, { ButtonType, IButtonProps } from "./Button";

interface IReadFileBtn extends IButtonProps {
  onFileUploaded: (file: File) => void;
}

export const ReadFileBtn: React.StatelessComponent<IReadFileBtn> = props => {
  const { onFileUploaded, children, ...rest } = props;
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block"
      }}
    >
      <Button buttonType={ButtonType.SECONDARY} type={"button"} {...rest}>
        {children}
        <FileInput type="file" onChange={handleChange(props)} />
      </Button>
    </div>
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange({
  onFileUploaded
}: IReadFileBtn): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileUploaded(event.target.files[0]);
    } else {
    }
  };
}
