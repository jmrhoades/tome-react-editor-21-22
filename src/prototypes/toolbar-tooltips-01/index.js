import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { TopBar } from "./TopBar";
import { Outline } from "./Outline";
import { BottomBar } from "./BottomBar";
import { ToolBar } from "./ToolBar";
import { Page } from "./Page";

const TITLE = "Toolbar Tooltips Prototype 01";

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: #090909;
`;

export const ToolbarTooltips01 = props => {
	return (
		<Wrap>
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
            <TopBar />
            <Outline />
            <BottomBar />
            <ToolBar />
			<Page />
		</Wrap>
	);
};
