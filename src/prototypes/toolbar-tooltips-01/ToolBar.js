import React, { useState, useRef } from "react";
import styled from "styled-components";

import { ToolBarButton } from "./ToolBarButton";
import { ToolBarToolTips } from "./ToolBarToolTips";

const ToolBarWrap = styled.div`
	position: absolute;
	right: 0;
`;

const buttons = [
	{ name: "addTile", toolTip: "Add Tile", shortcut: "T" },
	{ name: "recordOverlay", toolTip: "Record Narration", shortcut: "R" },
	{ name: "comments", toolTip: "Comments", shortcut: "C" },
	{ name: "keyboardShortcuts", toolTip: "Keyboard Shortcuts", shortcut: "K" },
	{ name: "mobilePreview", toolTip: "Mobile Preview", shortcut: "M" },
];

export const ToolBar = props => {
	const [activeButton, setActiveButton] = useState(null);
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
		if (name === activeButton) {
			setActiveButton(null);
		} else {
			setActiveButton(name);
		}
	};

	return (
		<ToolBarWrap>
			{buttons.map(({ name }, i) => (
				<ToolBarButton
					name={name}
					key={i}
					id={i}
					active={activeButton === name}
					onTap={() => {
						onButtonTap(name, i);
					}}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				/>
			))}

			<ToolBarToolTips info={buttons} toolTipState={toolTipState} />
		</ToolBarWrap>
	);
};
