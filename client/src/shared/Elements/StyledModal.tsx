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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  &__content {
    margin: auto auto;
    position: absolute;
    width: ${props => props.width || "500px"};
    height: ${props => props.height || "400px"};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 4px;
    outline: none;
    padding: 20px;
  }
`;

export default StyledModal;
