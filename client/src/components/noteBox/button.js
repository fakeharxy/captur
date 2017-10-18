import * as React from 'react';

const Button = ({
    onClick,
    children
  }) =>
  <span>
        <button
          className="btn btn-info pull-right"
          onClick={onClick}
          type="button">
            {children}
        </button>
      </span>

export default Button;
