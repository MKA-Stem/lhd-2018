import React from 'react';
import './Modal.css';
import Cover from 'components/Cover.js';

export const Modal = ({children, ...rest}) => (
  <Cover>
    <div className="Modal">{children}</div>
  </Cover>
);

export const ModalTitle = ({children}) => <h1 className="Modal_title">{children}</h1>;

export const ModalBody = ({children}) => <div className="Modal_body">{children}</div>;

export const ModalActions = ({children}) => <div className="Modal_actions">{children}</div>;
