import React from "react";

import { StyledButton } from "../Styles/Styled";

const Button = ({ icon, children, handleClick, altText, ariaLabel }) => (
	<StyledButton onClick={() => handleClick()}>
		{ icon && (<span role="img" alt={altText} aria-label={ariaLabel}>{icon}</span>)}
		{children}
	</StyledButton>
);

export default Button;
