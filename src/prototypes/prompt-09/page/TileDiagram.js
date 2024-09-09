import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Vec from "@tldraw/vec";

import { Renderer, TLBinding, TLPage, TLPageState, TLPointerEventHandler } from "@tldraw/core";
import { RectUtil } from "../tlshapes/rect/RectUtil.ts";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;

  /*
	.tldraw {
		--tl-accent: rgb(255, 0, 0);
		--tl-brushFill: rgba(0, 0, 0, 0.05);
		--tl-brushStroke: rgba(0, 0, 0, 0.25);
		--tl-brushDashStroke: rgba(0, 0, 0, 0.6);
		--tl-selectStroke: rgb(66, 133, 244);
		--tl-selectFill: rgba(65, 132, 244, 0.05);
		--tl-binding: rgba(65, 132, 244, 0.12);
		--tl-background: rgb(0, 0, 0);
		--tl-foreground: rgb(51, 51, 51);
		--tl-grid: rgba(144, 144, 144, 1);
	}

`;

const shapeUtils = {
	rect: new RectUtil(),
};

//const shapeUtils = {}

export const TileDiagram = props => {
	const [page, setPage] = React.useState({
		id: "page1",
		shapes: {
			box1: {
				id: "box1",
				type: "rect",
				parentId: "page1",
				name: "Box",
				childIndex: 1,
				rotation: 0,
				point: [0, 0],
				size: [100, 100],
			},
		},
		bindings: {},
	});

	const [pageState, setPageState] = React.useState({
		id: "page",
		selectedIds: [],
		hoveredId: undefined,
		camera: {
			point: [0, 0],
			zoom: 1,
		},
	});
	const onHoverShape = e => {
		setPageState(prevState => ({
			...prevState,
			hoveredId: e.target,
		}));
	};

	const onUnhoverShape = () => {
		setPageState(prevState => ({
			...prevState,
			hoveredId: null,
		}));
	};

	const onPointShape = info => {
		setPageState(prevState => ({ ...prevState, selectedIds: [info.target] }));
	};

	const onPointCanvas = () => {
		setPageState(prevState => ({ ...prevState, selectedIds: [] }));
	};

	const onDragShape = e => {
		setPage(page => {
			const shape = page.shapes[e.target];
			return {
				...page,
				shapes: {
					...page.shapes,
					[shape.id]: {
						...shape,
						point: Vec.sub(e.point, Vec.div(shape.size, 2)),
					},
				},
			};
		});
	};

	const onPointerMove: TLPointerEventHandler = info => {
		if (info.shiftKey) {
			setPageState(prevState => ({
				...prevState,
				camera: {
					...prevState.camera,
					point: Vec.add(prevState.camera.point, info.delta),
				},
			}));
		}
	};

	const [meta] = React.useState({
		isDarkMode: true,
	});
	
	const theme = React.useMemo(
		() =>
			meta.isDarkMode
				? {
						accent: "rgb(255, 0, 0)",
						brushFill: "rgba(0,0,0,.05)",
						brushStroke: "rgba(0,0,0,.25)",
						brushDashStroke: "rgba(0,0,0,.6)",
						selectStroke: "rgb(66, 133, 244)",
						selectFill: "rgba(65, 132, 244, 0.05)",
						background: "rgb(0, 0, 0)",
						foreground: "rgb(51, 51, 51)",
				  }
				: {
						accent: "rgb(255, 0, 0)",
						brushFill: "rgba(0,0,0,.05)",
						brushStroke: "rgba(0,0,0,.25)",
						brushDashStroke: "rgba(0,0,0,.6)",
						selectStroke: "rgb(66, 133, 244)",
						selectFill: "rgba(65, 132, 244, 0.05)",
						background: "rgb(248, 249, 250)",
						foreground: "rgb(51, 51, 51)",
				  },
		[meta]
	);

	return (
		<div
			className="tldraw"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
			}}
		>
			<Renderer
				shapeUtils={shapeUtils} // Required
				page={page} // Required
				pageState={pageState} // Required
				onHoverShape={onHoverShape}
				onUnhoverShape={onUnhoverShape}
				onPointShape={onPointShape}
				onPointCanvas={onPointCanvas}
				onPointerMove={onPointerMove}
				onDragShape={onDragShape}
				meta={meta}
				theme={theme}
				id={undefined}
				containerRef={undefined}
				hideBounds={false}
				hideIndicators={false}
				hideHandles={false}
				hideCloneHandles={false}
				hideBindingHandles={false}
				hideRotateHandles={false}
				userId={undefined}
				users={undefined}
				snapLines={undefined}
				onBoundsChange={undefined}
			/>
		</div>
	);
};
