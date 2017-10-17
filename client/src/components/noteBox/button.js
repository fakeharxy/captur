import * as React from 'react';

const Button = ({
    onClick,
    children
  }) =>
  <span>
        <button
          onClick={onClick}
          type="button">
            {children}
        </button>
      </span>

export default Button;
