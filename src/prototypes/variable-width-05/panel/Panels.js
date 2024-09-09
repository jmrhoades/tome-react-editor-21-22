import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { updateThemeBaseFontSize } from "../tome/Themes";

import { tileNames, panelNames } from "../page/TileConstants";
import { AddTilePanel } from "./AddTilePanel";
import { ThemePanel } from "./ThemePanel";
import { PagePanel } from "./PagePanel";
import { RecordPanel } from "./RecordPanel";
import { TextTileProperties } from "./TextTileProperties";
import { PanelBackground } from "./PanelContainer";
import { LayoutsPanel } from "./LayoutsPanel";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	pointer-events: none;
`;

const Constraints = styled(motion.div)`
	position: absolute;
	top: 12px;
	bottom: 12px;
	left: 12px;
	right: 12px;
	pointer-events: none;
`;

const ContainerWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;
`;

const Container = styled(motion.div)`
	position: relative;
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 12px;
	pointer-events: auto;
`;

const DragBlocker = styled(motion.div)`
	position: absolute;
	//top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	//height: 48px;
	height: calc(100% - 40px);
	/* background: red; */
`;

const DragIndicator = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 40px;
	background: transparent;
	cursor: move;
`;

const PanelHeader = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	padding: 12px;
	padding-bottom: 0;
`;
const PanelTitle = styled(motion.div)`
	font-family: "Inter";
	font-style: "normal";
	font-weight: 700;
	font-size: 15px;
	line-height: 20px;
`;

export const Panels = props => {
	const { sidePanelOpen, panelName, selectedTile, currentPage } = useContext(TomeContext);
	
	const panelRef = React.useRef(null);
	const panelX = useMotionValue(0);
	const panelY = useMotionValue(0);
	const [isDraggable, setIsDraggable] = React.useState(false);
	const constraintsRef = React.useRef(null);
	const [constraitsRect, setConstraintsRect] = React.useState({});

	const isRightAligned = panelName !== panelNames.ADD_PAGE.name;
	const marginX = panelName !== panelNames.ADD_PAGE.name ? 72 : 104;

	const getPanel = () => {
		switch (panelName) {
			case tileNames.TEXT.name:
				return <TextTileProperties theme={currentPage.theme} />;
			case panelNames.ADD_PAGE.name:
				return <LayoutsPanel theme={currentPage.theme} />;

			case panelNames.ADD_TILE.name:
				return <AddTilePanel theme={currentPage.theme} />;

			case panelNames.THEME.name:
				return <ThemePanel theme={currentPage.theme} />;

			case panelNames.PAGE.name:
				return <PagePanel theme={currentPage.theme} layout={currentPage.layout} />;

			case panelNames.RECORD.name:
				return <RecordPanel theme={currentPage.theme} />;

			default:
				return <></>;
		}
	};

	
	React.useEffect(() => {
		panelX.set(0);
		panelY.set(0);

		if (panelRef.current) {
			const r = panelRef.current.getBoundingClientRect();
			setConstraintsRect({
				top: -window.innerHeight / 2 + r.height / 2 + 12,
				left: -window.innerWidth + r.width + 69 + 16,
				bottom: window.innerHeight / 2 - r.height / 2 - 12,
				right: 69 - 12,
			});
		}

		switch (panelName) {
			case tileNames.TEXT.name:
				setIsDraggable(true);
				break;
			default:
				setIsDraggable(false);
		}
	}, [panelName, selectedTile, sidePanelOpen]);

	return (
		<Wrap>
			<Constraints ref={constraintsRef} key={"panel_constraints_wrap"} />
			<ContainerWrap
				style={{
					left: isRightAligned ? "auto" : marginX,
					right: isRightAligned ? marginX : "auto",
					width: panelName !== panelNames.ADD_PAGE.name ? 240 : 280,
				}}
			>
				{sidePanelOpen && (
					<Container
						ref={panelRef}
						key={"panel_container"}
						style={{
							x: panelX,
							y: panelY,
						}}
						exit={{
							scale: 0.9,
							opacity: 0,
							transition: {
								duration: 0.15,
							},
						}}
						initial={{
							scale: 0.975,
							opacity: 0,
						}}
						animate={{
							scale: 1,
							opacity: 1,
						}}
						transition={{
							scale: {
								type: "spring",
								stiffness: 450,
								damping: 40,
							},
							x: {
								type: "spring",
								stiffness: 450,
								damping: 40,
							},
							y: {
								type: "spring",
								stiffness: 450,
								damping: 40,
							},
							opacity: {
								type: "tween",
								ease: "easeOut",
								duration: 0.2,
							},
						}}
						drag={isDraggable}
						dragMomentum={false}
						dragElastic={0.1}
						dragConstraints={constraitsRect}
						dragPropagation={true}
						//dragConstraints={constraintsRef}
						//transition={transitions.layoutTransition}
					>
						{panelName !== panelNames.ADD_TILE.name && (
							<PanelBackground
								style={{
									background: currentPage.theme.colors.backgrounds.panel,
									borderRadius: 16,
									boxShadow: currentPage.theme.shadows.medium,
								}}
							/>
						)}

						{isDraggable && (
							<DragBlocker
								drag
								dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
								dragElastic={false}
								dragMomentum={false}
							/>
						)}

						{panelName !== panelNames.ADD_TILE.name && (
							<PanelHeader>
								<PanelTitle
									style={{
										color: currentPage.theme.colors.t9,
									}}
								>
									{panelName}
								</PanelTitle>
							</PanelHeader>
						)}
						{getPanel()}

						{isDraggable && <DragIndicator />}
					</Container>
				)}
			</ContainerWrap>
		</Wrap>
	);
};
