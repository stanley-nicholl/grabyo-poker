import React, { Fragment } from "react";
import { Main, Header } from "../Styles/Styled";


const Layout = ({ children }) => (
	<Fragment>
		<Header>
			<img src="/logo.svg" alt="Grabyo logo" width="50" style={{ verticalAlign: "middle" }} />
			<h1>
				Grabyo Poker
			</h1>
		</Header>
		<Main role="main">
			{children}
		</Main>
	</Fragment>
);

export default Layout;
