import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/global-styles";
import { Routes, Route, useLocation, Link } from "react-router-dom";

import { theme } from "./theme/theme";
import { colors } from "./ds/Colors";

import { DSDemo } from "./ds/index";
import { TileResize01 } from "./prototypes/tile-resize-01/index";
import { TileResize02 } from "./prototypes/tile-resize-02/index";
import { TileResize02Move } from "./prototypes/tile-resize-02-move/index";
import { TileResize02MoveLayout } from "./prototypes/tile-resize-02-move-layout/index";
import { TileResize03 } from "./prototypes/tile-resize-03/index";
import { TileResize03Undo } from "./prototypes/tile-resize-03-undo/index";
import { TileResize04Animations } from "./prototypes/tile-resize-04-animations/index";
import { TileResize04Content } from "./prototypes/tile-resize-04-content/index";
import { ToolbarTooltips01 } from "./prototypes/toolbar-tooltips-01";
import { PageScaling01 } from "./prototypes/page-scaling-01";
import { PageScaling02 } from "./prototypes/page-scaling-02";
import { PageScaling03 } from "./prototypes/page-scaling-03";
import { PageScaling04 } from "./prototypes/page-scaling-04";
import { PageScaling04Content } from "./prototypes/page-scaling-04-content";
import { PageScaling05 } from "./prototypes/page-scaling-05";
import { PageScaling06 } from "./prototypes/page-scaling-06";
import { Present01 } from "./prototypes/present-01";
import { Present02 } from "./prototypes/present-02";
import { Overlay01 } from "./prototypes/overlay-01";
import { Annotation01 } from "./prototypes/annotation-01";
import { Lightweight01 } from "./prototypes/lightweight-01";
import { Lightweight02 } from "./prototypes/lightweight-02";
import { Lightweight03 } from "./prototypes/lightweight-03";
import { Lightweight04 } from "./prototypes/lightweight-04";
import { Lightweight05 } from "./prototypes/lightweight-05";
import { Lightweight06 } from "./prototypes/lightweight-06";
import { OutlineHorizontal01 } from "./prototypes/outline-horizontal-01";
import { OutlineHorizontal01NewTome } from "./prototypes/outline-horizontal-01/new-tome";
import { OutlineHorizontal02 } from "./prototypes/outline-horizontal-02";
import { Diagram01 } from "./prototypes/diagram-01";
import { Diagram02 } from "./prototypes/diagram-02";
import { MobileAnnotations01 } from "./prototypes/mobile-annotations-01";
import { AddTile01 } from "./prototypes/add-tile-01";
import { AddTile02 } from "./prototypes/add-tile-02";
import { FlexiTome01 } from "./prototypes/flexi-tome-01";
import { FlexiTomeBuilder01 } from "./prototypes/flexi-tome-builder-01";
import { FlexiTomeBuilder02 } from "./prototypes/flexi-tome-builder-02";
import { FlexiTomeBuilder03 } from "./prototypes/flexi-tome-builder-03";
import { FlexiTomeBuilder04 } from "./prototypes/flexi-tome-builder-04";
import { FlexiTomeBuilder05 } from "./prototypes/flexi-tome-builder-05";

import { FlexiTomeBuilder05Gapless } from "./prototypes/flexi-tome-builder-05-gapless";
import { FlexiTomeBuilder06 } from "./prototypes/flexi-tome-builder-06";
import { FlexiTomeBuilder07 } from "./prototypes/flexi-tome-builder-07";
import { FlexiTomeBuilder08 } from "./prototypes/flexi-tome-builder-08";
import { Scrollbars01 } from "./prototypes/scrollbars-01";
import { CutCopyPaste01 } from "./prototypes/cut-copy-paste-01";
import { CutCopyPaste02 } from "./prototypes/cut-copy-paste-02";
import { CutCopyPaste03 } from "./prototypes/cut-copy-paste-03";
import { CutCopyPaste04 } from "./prototypes/cut-copy-paste-04";
import { TextTile01 } from "./prototypes/text-tile-01";
import { VarWidth01 } from "./prototypes/variable-width-01";
import { VarWidth02 } from "./prototypes/variable-width-02";
import { VarWidth03 } from "./prototypes/variable-width-03";
import { VarWidth04 } from "./prototypes/variable-width-04";
import { VarWidth05 } from "./prototypes/variable-width-05";
import { NarrationTooltip01 } from "./prototypes/narration-tooltip-01";

import { XL01 } from "./prototypes/xl-01";

import { Prompt01 } from "./prototypes/prompt-01";
import { Prompt02 } from "./prototypes/prompt-02";
import { Prompt03 } from "./prototypes/prompt-03";
import { Prompt04 } from "./prototypes/prompt-04";
import { Prompt05 } from "./prototypes/prompt-05";
import { Prompt06 } from "./prototypes/prompt-06";
import { Prompt07 } from "./prototypes/prompt-07";
import { Prompt08 } from "./prototypes/prompt-08";
import { Prompt09 } from "./prototypes/prompt-09";

import { Index01 } from "./prototypes/index-01";

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;
	background-color: #090909;
`;

const IndexNavContent = styled.div`
	color: rgba(255, 255, 255, 0.9);
	font-size: 15px;
	line-height: 1.54;
`;

const Header = styled.div`
	padding: 6em 0;

	& h1 {
		font-weight: 600;
	}
	& h2 {
	}
`;

const Sections = styled.div`
	column-count: 2;
	column-gap: 6em;

	& section {
		margin-bottom: 4em;
		break-inside: avoid;
	}
	& h2 {
		font-weight: 600;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.85px;
		margin-bottom: 1em;
		opacity: 0.5;
	}
	& a {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`;

const Current = styled.ul`
	list-style-type: none;
`;

const Archive = styled.ul`
	list-style-type: none;
	&li {
	}
	& a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.4);
	}
`;

export const App = () => {
	const location = useLocation();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />

			<Routes location={location} key={location.pathname}>
				<Route exact path="/tile-resize-01" element={<TileResize01 key="tile-resize-01" />} />

				<Route exact path="/tile-resize-02" element={<TileResize02 key="tile-resize-02" />} />

				<Route exact path="/tile-resize-02-move" element={<TileResize02Move key="tile-resize-02-move" />} />

				<Route
					exact
					path="/tile-resize-02-move-layout"
					element={<TileResize02MoveLayout key="tile-resize-02-move-layout" />}
				/>

				<Route exact path="/tile-resize-03" element={<TileResize03 key="tile-resize-03" />} />

				<Route exact path="/tile-resize-03-undo" element={<TileResize03Undo key="tile-resize-03-undo" />} />

				<Route
					exact
					path="/tile-resize-04-animations"
					element={<TileResize04Animations key="tile-resize-04-animations" />}
				/>

				<Route
					exact
					path="/tile-resize-04-content"
					element={<TileResize04Content key="tile-resize-04-content" />}
				/>

				<Route exact path="/toolbar-tooltips-01" element={<ToolbarTooltips01 key="toolbar-tooltips-01" />} />

				<Route exact path="/page-scaling-01" element={<PageScaling01 key="page-scaling-01" />} />

				<Route exact path="/page-scaling-02" element={<PageScaling02 key="page-scaling-02" />} />

				<Route exact path="/page-scaling-03" element={<PageScaling03 key="page-scaling-03" />} />

				<Route exact path="/page-scaling-04" element={<PageScaling04 key="page-scaling-04" />} />

				<Route
					exact
					path="/page-scaling-04-content"
					element={<PageScaling04Content key="page-scaling-04-content" />}
				/>

				<Route exact path="/page-scaling-05" element={<PageScaling05 key="page-scaling-05" />} />

				<Route exact path="/page-scaling-06" element={<PageScaling06 key="page-scaling-06" />} />

				<Route exact path="/present-01" element={<Present01 key="present-01" />} />

				<Route exact path="/present-02" element={<Present02 key="present-02" />} />

				<Route exact path="/overlay-01" element={<Overlay01 key="overlay-01" />} />

				<Route exact path="/annotation-01" element={<Annotation01 key="annotation-01" />} />

				<Route exact path="/mobile-annotations-01" element={<MobileAnnotations01 key="mobile-annotations-01" />} />

				<Route exact path="/lightweight-01" element={<Lightweight01 key="lightweight-01" />} />

				<Route exact path="/lightweight-02" element={<Lightweight02 key="lightweight-02" />} />

				<Route exact path="/lightweight-03" element={<Lightweight03 key="lightweight-03" />} />

				<Route exact path="/lightweight-04" element={<Lightweight04 key="lightweight-04" />} />

				<Route exact path="/lightweight-05" element={<Lightweight05 key="lightweight-05" />} />

				<Route exact path="/lightweight-06" element={<Lightweight06 key="lightweight-06" />} />

				<Route exact path="/outline-horizontal-01" element={<OutlineHorizontal01 key="outline-horizontal-01" />} />

				<Route
					exact
					path="/outline-horizontal-01-new-tome"
					element={<OutlineHorizontal01NewTome key="outline-horizontal-01-new-tome" />}
				/>

				<Route exact path="/outline-horizontal-02" element={<OutlineHorizontal02 key="outline-horizontal-02" />} />

				<Route exact path="/diagram-01" element={<Diagram01 key="diagram-01" />} />

				<Route exact path="/diagram-02" element={<Diagram02 key="diagram-02" />} />

				<Route exact path="/ds" element={<DSDemo key="dsdemo" />} />

				<Route exact path="/add-tile-01" element={<AddTile01 key="add-tile-01" />} />

				<Route exact path="/add-tile-02" element={<AddTile02 key="add-tile-02" />} />

				<Route exact path="/flexi-tome-01" element={<FlexiTome01 key="flexi-tome-01" />} />

				<Route exact path="/flexi-tome-builder-01" element={<FlexiTomeBuilder01 key="flexi-tome-builder-01" />} />

				<Route exact path="/flexi-tome-builder-02" element={<FlexiTomeBuilder02 key="flexi-tome-builder-02" />} />

				<Route exact path="/flexi-tome-builder-03" element={<FlexiTomeBuilder03 key="flexi-tome-builder-03" />} />

				<Route exact path="/flexi-tome-builder-04" element={<FlexiTomeBuilder04 key="flexi-tome-builder-04" />} />

				<Route
					exact
					path="/flexi-tome-builder-04/six-eight-margins"
					element={
						<FlexiTomeBuilder04
							key="flexi-tome-builder-04-six-eight-margins"
							pageMargin={6}
							gaps={8}
							tileCornerRadius={8}
						/>
					}
				/>

				<Route
					exact
					path="/flexi-tome-builder-04/tile-bg-no-page-bg"
					element={
						<FlexiTomeBuilder04
							key="tile-bg-no-page-bg"
							pageMargin={12}
							gaps={12}
							tileCornerRadius={12}
							tileBackgroundColor={colors.z1}
							pageBackgroundColor={colors.z0}
						/>
					}
				/>

				<Route
					exact
					path="/flexi-tome-builder-04/tile-bg-page-bg"
					element={
						<FlexiTomeBuilder04
							key="tile-bg-page-bg"
							pageMargin={12}
							gaps={12}
							tileCornerRadius={12}
							tileBackgroundColor={colors.z2}
							pageBackgroundColor={colors.z1}
						/>
					}
				/>

				<Route
					exact
					path="/flexi-tome-builder-04/tile-radius-4"
					element={
						<FlexiTomeBuilder04
							key="tile-bg-page-bg"
							pageMargin={8}
							gaps={8}
							tileCornerRadius={4}
							tileBackgroundColor={colors.z1}
							pageBackgroundColor={colors.z0}
						/>
					}
				/>

				<Route
					exact
					path="/flexi-tome-builder-04/tile-radius-8"
					element={
						<FlexiTomeBuilder04
							key="tile-bg-page-bg"
							pageMargin={4}
							gaps={8}
							tileCornerRadius={8}
							tileBackgroundColor={colors.z1}
							pageBackgroundColor={colors.z0}
						/>
					}
				/>

				<Route exact path="/flexi-tome-builder-05" element={<FlexiTomeBuilder05 key="flexi-tome-builder-05" />} />

				<Route
					exact
					path="/flexi-tome-builder-05-gapless"
					element={<FlexiTomeBuilder05Gapless key="flexi-tome-builder-05-gapless" />}
				/>

				<Route exact path="/flexi-tome-builder-06" element={<FlexiTomeBuilder06 key="flexi-tome-builder-06" />} />

				<Route exact path="/flexi-tome-builder-07" element={<FlexiTomeBuilder07 key="flexi-tome-builder-07" />} />

				<Route exact path="/flexi-tome-builder-08" element={<FlexiTomeBuilder08 key="flexi-tome-builder-08" />} />

				<Route exact path="/scrollbars-01" element={<Scrollbars01 key="scrollbars-01" />} />

				<Route exact path="/cut-copy-paste-01" element={<CutCopyPaste01 key="cutcopypaste-01" />} />

				<Route exact path="/cut-copy-paste-02" element={<CutCopyPaste02 key="cutcopypaste-02" />} />

				<Route exact path="/cut-copy-paste-03" element={<CutCopyPaste03 key="cutcopypaste-03" />} />

				<Route exact path="/cut-copy-paste-v1" element={<CutCopyPaste04 key="cutcopypaste-04" />} />

				<Route exact path="/narration-tooltip-01" element={<NarrationTooltip01 key="narration-tooltip-01" />} />

				<Route path="/text-tile-1/:tomeId/:pageNumber" element={<TextTile01 key="text-tile-1" />} />

				<Route path="/text-tile-1/:tomeId" element={<TextTile01 key="text-tile-1" />} />

				<Route exact path="/text-tile-1" element={<TextTile01 key="text-tile-1" />} />

				<Route path="/variable-width-1/:tomeId/:pageNumber" element={<VarWidth01 key="variable-width-1" />} />

				<Route path="/variable-width-1/:tomeId" element={<VarWidth01 key="variable-width-1" />} />

				<Route path="/variable-width-2/:tomeId/:pageNumber" element={<VarWidth02 key="variable-width-2" />} />

				<Route path="/variable-width-2/:tomeId" element={<VarWidth02 key="variable-width-2" />} />

				<Route path="/variable-width-3/:tomeId/:pageNumber" element={<VarWidth03 key="variable-width-3" />} />

				<Route path="/variable-width-3/:tomeId" element={<VarWidth03 key="variable-width-3" />} />

				<Route path="/variable-width-4/:tomeId/:pageNumber" element={<VarWidth04 key="variable-width-4" />} />

				<Route path="/variable-width-4/:tomeId" element={<VarWidth04 key="variable-width-4" />} />

				<Route path="/variable-width-5/:tomeId/:pageNumber" element={<VarWidth05 key="variable-width-5" />} />

				<Route path="/variable-width-5/:tomeId" element={<VarWidth05 key="variable-width-5" />} />

				<Route path="/xl-1/:tomeId/:pageNumber" element={<XL01 key="xl-1" />} />

				<Route path="/xl-1/:tomeId" element={<XL01 key="xl-1" />} />

				<Route path="/prompt-1/:tomeId/:pageNumber" element={<Prompt01 key="prompt-1" />} />

				<Route path="/prompt-1/:tomeId" element={<Prompt01 key="prompt-1" />} />

				<Route path="/prompt-2/:tomeId/:pageNumber" element={<Prompt02 key="prompt-2" />} />

				<Route path="/prompt-2/:tomeId" element={<Prompt02 key="prompt-2" />} />

				<Route path="/prompt-3/:tomeId/:pageNumber" element={<Prompt03 key="prompt-3" />} />

				<Route path="/prompt-3/:tomeId" element={<Prompt03 key="prompt-3" />} />

				<Route path="/prompt-4/:tomeId/:pageNumber" element={<Prompt04 key="prompt-4" />} />

				<Route path="/prompt-4/:tomeId" element={<Prompt04 key="prompt-4" />} />

				<Route path="/prompt-5/:tomeId/:pageNumber" element={<Prompt05 key="prompt-5" />} />

				<Route path="/prompt-5/:tomeId" element={<Prompt05 key="prompt-5" />} />

				<Route path="/prompt-6/:tomeId/:pageNumber" element={<Prompt06 key="prompt-6" />} />

				<Route path="/prompt-6/:tomeId" element={<Prompt06 key="prompt-6" />} />

				<Route path="/prompt-7/:tomeId/:pageNumber" element={<Prompt07 key="prompt-7" />} />

				<Route path="/prompt-7/:tomeId" element={<Prompt07 key="prompt-7" />} />

				<Route path="/prompt-8/:tomeId/:pageNumber" element={<Prompt08 key="prompt-8" />} />

				<Route path="/prompt-8/:tomeId" element={<Prompt08 key="prompt-8" />} />

				<Route path="/prompt-9/:tomeId/:pageNumber" element={<Prompt09 key="prompt-9" />} />

				<Route path="/prompt-9/:tomeId" element={<Prompt09 key="prompt-9" />} />

				<Route exact path="/index-a" element={<Index01 key="index-a" />} />

				<Route
					exact
					path="/"
					element={
						<Wrap>
							<IndexNavContent>
								<Header>
									<h1>Tome Interaction Prototypes</h1>
								</Header>

								<Sections>
									<section>
										<h2>Prompt</h2>

										<Current>
											<li>
												<Link to="/prompt-9/skateboard">Skateboard</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/prompt-8/new">Settings / Try again</Link>
											</li>
											<li>
												<Link to="/prompt-7/new">Keep / Retry</Link>
											</li>
											<li>
												<Link to="/prompt-6/new">States</Link>
											</li>
											<li>
												<Link to="/prompt-5/new">Context</Link>
											</li>
											<li>
												<Link to="/prompt-4/new">Suggest</Link>
											</li>
											<li>
												<Link to="/prompt-3/new">Chip</Link>
											</li>
											<li>
												<Link to="/prompt-2/new">List</Link>
											</li>
											<li>
												<Link to="/prompt-1/new">Cycle</Link>
											</li>
										</Archive>
									</section>

									<section>
										<h2>Tome XL</h2>
										<Current>
											<li>
												<Link to="/xl-1/new">Background Tile</Link>
											</li>
										</Current>
									</section>
									<section>
										<h2>Variable Width</h2>
										<Current>
											<li>
												<Link to="/variable-width-5/xl">XL</Link>
											</li>
											<li>
												<Link to="/variable-width-5/new">New</Link>
											</li>
											<li>
												<Link to="/variable-width-3/pixy">Pixy</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/variable-width-3/overline-lightcast">03 - Lightcast</Link>
											</li>
											<li>
												<Link to="/variable-width-2/examples">02 - Examples</Link>
											</li>
											<li>
												<Link to="/variable-width-2/pixy">02 - Pixy</Link>
											</li>
											<li>
												<Link to="/variable-width-2/overline-lightcast">02 - Lightcast</Link>
											</li>
											<li>
												<Link to="/variable-width-1/examples">01 - Examples</Link>
											</li>
											<li>
												<Link to="/variable-width-1/fitwell">01 - Fitwell</Link>
											</li>
											<li>
												<Link to="/variable-width-1/oxide">01 - Oxide</Link>
											</li>
										</Archive>
									</section>
									<section>
										<h2>Text Tile</h2>
										<Current>
											<li>
												<Link to="/text-tile-1/fitwell">Fitwell</Link>
											</li>
											<li>
												<Link to="/text-tile-1/pixy-demo">Pixy</Link>
											</li>
											<li>
												<Link to="/text-tile-1/oxide-demo">Oxide</Link>
											</li>
											<li>
												<Link to="/text-tile-1/humankind-demo">Humankind Soaps</Link>
											</li>
											<li>
												<Link to="/text-tile-1/styles-catalog">Style updates</Link>
											</li>
											<li>
												<Link to="/text-tile-1/placeholder-demo">Placeholder</Link>
											</li>
										</Current>
									</section>
									<section>
										<h2>Cut, Copy, Paste</h2>
										<Current>
											<li>
												<Link to="/cut-copy-paste-v1">CCP v1</Link>
											</li>
											<li>
												<Link to="/cut-copy-paste-03">CCP 3</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/cut-copy-paste-02">CCP 2</Link>
											</li>
											<li>
												<Link to="/cut-copy-paste-01">CCP 1</Link>
											</li>
										</Archive>
									</section>
									<section>
										<h2>Scrollbars</h2>
										<Current>
											<li>
												<Link to="/scrollbars-01">Scrollbars 01</Link>
											</li>
										</Current>
									</section>
									<section>
										<h2>Flex Tome</h2>
										<Current>
											<li>
												<Link to="/flexi-tome-builder-08">FTB 08</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/flexi-tome-builder-07">FTB 07</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-06">FTB 06</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-05">FTB 05</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-05-gapless">FTB 05 — Gapless</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-04/tile-radius-8">FTB 04 — 8pt gaps, no page bg</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-04/tile-bg-page-bg">FTB 04 — tile bg, page bg</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-04/tile-bg-no-page-bg">
													FTB 04 — tile bg, no page bg
												</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-04">Flex Tome Builder 04</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-03">Flex Tome Builder 03</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-02">Flex Tome Builder 02</Link>
											</li>
											<li>
												<Link to="/flexi-tome-builder-01">Flex Tome Builder 01</Link>
											</li>
											<li>
												<Link to="/flexi-tome-01">Flex Tome 01</Link>
											</li>
										</Archive>
									</section>
									<section>
										<h2>Add Tile</h2>
										<Current>
											<li>
												<Link to="/add-tile-02">Add Tile 02</Link>
											</li>
											<li>
												<Link to="/add-tile-01">Add Tile 01</Link>
											</li>
										</Current>
									</section>
									<section>
										<h2>Diagrams</h2>
										<Current>
											<li>
												<Link to="/diagram-02">Diagram 02</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/diagram-01">Diagram 01</Link>
											</li>
										</Archive>
									</section>
									<section>
										<h2>Annotations</h2>
										<Current>
											<li>
												<Link to="/mobile-annotations-01">Mobile Annotations 01</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/annotation-01">Annotations 01</Link>
											</li>
										</Archive>
									</section>
									<section>
										<h2>Horizontal Outline</h2>
										<Current>
											<li>
												<Link to="/outline-horizontal-02">Outline 02</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/outline-horizontal-01-new-tome">Outline 01 — New Tome</Link>
											</li>
											<li>
												<Link to="/outline-horizontal-01">Outline 01</Link>
											</li>
										</Archive>
									</section>
									<section>
										<h2>Lightweight Idea Sharing</h2>
										<Current>
											<li>
												<Link to="/lightweight-06">Lightweight 06</Link>
											</li>
											<li>
												<Link to="/lightweight-05">Lightweight 05</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/lightweight-04">Lightweight 04</Link>
											</li>
											<li>
												<Link to="/lightweight-03">Lightweight 03</Link>
											</li>
											<li>
												<Link to="/lightweight-02">Lightweight 02</Link>
											</li>
											<li>
												<Link to="/lightweight-01">Lightweight 01</Link>
											</li>
										</Archive>
									</section>

									<section>
										<h2>Narration tooltip</h2>
										<Current>
											<li>
												<Link to="/narration-tooltip-01">NT01</Link>
											</li>
										</Current>
									</section>

									<section>
										<h2>Design System</h2>
										<Current>
											<li>
												<Link to="/ds">Buttons</Link>
											</li>
										</Current>
									</section>

									<section>
										<h2>A/V Overlay</h2>
										<Current>
											<li>
												<Link to="/overlay-01">Overlay 01</Link>
											</li>
										</Current>
									</section>

									<section>
										<h2>Present Mode</h2>
										<Current>
											<li>
												<Link to="/present-02">Present 02</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/present-01">Present 01</Link>
											</li>
										</Archive>
									</section>

									<section>
										<h2>Tooltips</h2>
										<Current>
											<li>
												<Link to="/toolbar-tooltips-01">Toolbar Tooltips 01</Link>
											</li>
										</Current>
									</section>

									<section>
										<h2>Page Scaling</h2>
										<Current>
											<li>
												<Link to="/page-scaling-06">Page Scaling 06</Link>
											</li>
											<li>
												<Link to="/page-scaling-05">Page Scaling 05</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/page-scaling-04-content">Page Scaling 04 - Content</Link>
											</li>
											<li>
												<Link to="/page-scaling-04">Page Scaling 04</Link>
											</li>
											<li>
												<Link to="/page-scaling-03">Page Scaling 03</Link>
											</li>
											<li>
												<Link to="/page-scaling-02">Page Scaling 02</Link>
											</li>
											<li>
												<Link to="/page-scaling-01">Page Scaling 01</Link>
											</li>
										</Archive>
									</section>

									<section>
										<h2>Tile Resize</h2>
										<Current>
											<li>
												<Link to="/tile-resize-04-animations">Tile Resize - Animations</Link>
											</li>
											<li>
												<Link to="/tile-resize-04-content">Tile Resize - Content</Link>
											</li>
										</Current>
										<Archive>
											<li>
												<Link to="/tile-resize-01">tile-resize-01</Link>
											</li>
											<li>
												<Link to="/tile-resize-02">tile-resize-02</Link>
											</li>
											<li>
												<Link to="/tile-resize-02-move">tile-resize-02-move</Link>
											</li>
											<li>
												<Link to="/tile-resize-02-move-layout">tile-resize-02-move-layout</Link>
											</li>
											<li>
												<Link to="/tile-resize-03">tile-resize-03</Link>
											</li>
											<li>
												<Link to="/tile-resize-03-undo">tile-resize-03-undo</Link>
											</li>
										</Archive>
									</section>
								</Sections>
							</IndexNavContent>
						</Wrap>
					}
				/>
			</Routes>
		</ThemeProvider>
	);
};
