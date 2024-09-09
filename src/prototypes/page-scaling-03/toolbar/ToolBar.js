import React, { useState, useRef } from "react";
import styled from "styled-components";

import { ToolBarButton } from "./ToolBarButton";
import { ToolBarToolTips } from "./ToolBarToolTips";
import { toolbarButtons } from "../index";

const ToolBarWrap = styled.div`
	position: absolute;
	right: 0;
`;


export const ToolBar = props => {
	const [toolTipState, setToolTipState] = useState({ state: "hide", button: 0 });
	const showToolTipTimerRef = useRef(null);

	const onMouseEnter = id => {
		// console.log("onMouseEnter", id);
		if (toolTipState.state === "hide") {
			if (showToolTipTimerRef.current) {
				clearTimeout(showToolTipTimerRef.current);
			}
			showToolTipTimerRef.current = setTimeout(() => setToolTipState({ state: "show", button: id }), 1000);
		} else {
			setToolTipState({ state: "moveTo", button: id });
		}
	};

	const onMouseLeave = id => {
		// console.log("onMouseLeave", id);
		if (showToolTipTimerRef.current) {
			clearTimeout(showToolTipTimerRef.current);
		}
		setToolTipState({ state: "hide", button: id });
	};

	const onButtonTap = (name, id) => {

		if (showToolTipTimerRef.current) {
			clearTimeout(showToolTipTimerRef.current);
		}
		
		setToolTipState({ state: "hide", button: id });
		
		if (name === props.panelName) {
			props.setPanelState(false);
			props.setActivePanelName("")
		} else {
			props.setPanelState(true);
			props.setActivePanelName(name)
		}
	};

	return (
		<ToolBarWrap>
			{toolbarButtons.map(({ name }, i) => (
				<ToolBarButton
					name={name}
					key={i}
					id={i}
					active={props.panelName === name}
					onTap={() => {
						onButtonTap(name, i);
					}}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				/>
			))}

			<ToolBarToolTips info={toolbarButtons} toolTipState={toolTipState} />
		</ToolBarWrap>
	);
};
