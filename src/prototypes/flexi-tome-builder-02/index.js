import React from "react";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { Viewport } from "./viewport/Viewport";
import { Page } from "./page/Page";
import { TomeProvider } from "./tome/TomeContext";
import { MetricsProvider } from "./tome/MetricsContext";
import { Toolbar } from "./toolbar/Toolbar";
import { Panel } from "./panel/Panel";
import { Titlebar } from "./titlebar/Titlebar";
import { Outline } from "./outline/Outline";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";

const TITLE = "Flexi Tome Builder 02";

const GlobalStyle = createGlobalStyle`

.react-resizable {
  position: relative;
}
.react-resizable-handle {
  position: absolute;
  width: 100%;
  height: 20px;
  padding: 0;
}
.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
  /* transform: rotate(90deg); */
}
.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
  /* transform: rotate(180deg); */
}
.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: ne-resize;
  /* transform: rotate(270deg); */
}
.react-resizable-handle-w,
.react-resizable-handle-e {
  top: 50%;
  /* margin-top: -10px; */
  cursor: ew-resize;
}
.react-resizable-handle-w {
  left: 0;
  /* transform: rotate(135deg); */
}
.react-resizable-handle-e {
  right: 0;
  transform: rotate(315deg);
}
.react-resizable-handle-n,
.react-resizable-handle-s {
  cursor: ns-resize;
}
.react-resizable-handle-n {
  top: 0;
  /* transform: rotate(225deg); */
}
.react-resizable-handle-s {
  bottom: 0;
  /* transform: rotate(45deg); */
}

.react-grid-layout {
  position: relative;
  transition: height 200ms ease;
}
.react-grid-item {
  transition: all 200ms ease;
  transition-property: left, top;
}
.react-grid-item img {
  pointer-events: none;
  user-select: none;  
}
.react-grid-item.cssTransforms {
  transition-property: transform;
}
.react-grid-item.resizing {
  z-index: 1;
  /* will-change: width, height; */
}

.react-grid-item.react-draggable-dragging {
  transition: none;
  z-index: 3;
  /* will-change: transform; */
}

.react-grid-item.dropping {
  visibility: hidden;
}

/* .react-grid-item.react-grid-placeholder {
  background: red;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
} */

.react-grid-item > .react-resizable-handle {
/* position: absolute;
width: 100px;
height: 20px;
opacity: 0; */
}

.react-grid-item::active {
	opacity: 1;
}

.react-grid-item > .react-resizable-handle::after {
  content: "";
  position: absolute;
  right: 0px;
  left: 0px;
  background-color: white;
  border: 3px solid #ED00EB;
  border-radius: 6px; 
  opacity: 0;
}

.react-resizable-hide > .react-resizable-handle {
  display: none;
}

.react-grid-item > .react-resizable-handle.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
  /* transform: rotate(90deg); */
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
  /* transform: rotate(180deg); */
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: ne-resize;
  /* transform: rotate(270deg); */
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-w,
.react-grid-item > .react-resizable-handle.react-resizable-handle-e {
  top: 50%;
  /* margin-top: -10px; */
  cursor: ew-resize;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-w {
  left: 0;
  /* transform: rotate(135deg); */
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-e {
  right: 0;
  /* transform: rotate(315deg); */
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-n,
.react-grid-item > .react-resizable-handle.react-resizable-handle-s {
  /* left: 50%;
  margin-left: -50px; */
  cursor: ns-resize;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-n {
  top: 0;
  /* transform: rotate(225deg); */
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-s {
  /* bottom: -8px; */
  /* transform: rotate(45deg); */
}



`;

export const FlexiTomeBuilder02 = props => {
	return (
		<TomeProvider>
			<MetricsProvider>
				<Viewport>
					<Helmet>
						<title>{TITLE}</title>
					</Helmet>
					<KeyPress />
					<GlobalStyle />
					<DeselectCatch />
					<Panel />
					<Page />
					<Outline />
					<Toolbar />
					<Titlebar title={TITLE} />
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
