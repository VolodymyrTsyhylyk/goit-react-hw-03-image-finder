import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { ModalOverlay, ModalContainer, Image } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
    static propTypes = {
        selectedImg: PropTypes.string,
        tags: PropTypes.string,
        onClose: PropTypes.func,
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === "Escape") {
            this.props.onClose();
        }
    }

    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    
    render() {
        const { selectedImg, tags } = this.props;

        return createPortal(
            <ModalOverlay onClick={this.handleBackdropClick}>
             <ModalContainer>
                 <Image src={selectedImg} alt={tags}/>
             </ModalContainer>
            </ModalOverlay>, modalRoot)
    }
}