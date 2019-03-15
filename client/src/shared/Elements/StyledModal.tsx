import * as React from "react";
import styled from "../Styles/styled-components";

import Modal from "react-modal";

const ReactModalAdapter = ({ className, ...props }: any) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

interface IStyledModalProps {
  width?: string;
  height?: string;
}

export const StyledModal = styled(ReactModalAdapter)<IStyledModalProps>`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 20;
  }

  &__content {
    margin: auto auto;
    position: absolute;
    height: ${props => props.height || "160px"};
    width: ${props => props.width || "300px"};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    border-radius: 9px;
    -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    outline: none;
    padding: 20px;
  }
`;

export default StyledModal;
