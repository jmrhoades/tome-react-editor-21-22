import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

const PlacementIndicator = styled(motion.div)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	/* z-index: 2; */
`;

// const Material = styled(motion.div)`
// 	position: absolute;
// 	left: 50%;
// 	top: 50%;
// `;

export const TilePlacementIndicator = props => {
	const { getTileRect, metrics } = useContext(MetricsContext);
	const { tileCornerRadius, tileBorderSize } = metrics;
	const { tomeData, showTileDropTarget } = useContext(TomeContext);

	// const isTall = tileDropInfo.height > tileDropInfo.width;

	// // const length = `calc(100% + ${pageMargin * 2}px)`;
	// const length = `100%`;

	//const [tileDropInfo, setTileDropInfo] = useState({x:0,y:0,width:100,height:100});

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);

	/*
	Animate visual changes to tile when tome data changes
	*/
	const indicatorAnimation = useAnimation();
	useEffect(() => {
		//console.log("change", tileDropInfo)

		if (tomeData.tileDropInfo && tomeData.tileDropInfo.tile) {
			const tile = tomeData.tileDropInfo.tile;
			const rect = getTileRect(tile);
			//console.log(rect.y)
			x.set(rect.x);
			y.set(rect.y);
			width.set(rect.width);
			height.set(rect.height);
			//console.log(getTileRect(tile))
			//setTileDropInfo(getTileRect(tomeData.tileDropInfo.tile));
		}
	}, [tomeData, getTileRect, x, y, height, width]);

	useEffect(
		() =>
			showTileDropTarget.onChange(latest => {
				//console.log("indicator show", latest);
				if (latest === true) {
					//console.log("fade in");
					indicatorAnimation.start({
						opacity: [0, 1],
						scale: [0.95, 1],
					});
				} else {
					//console.log("fade out");
					indicatorAnimation.start({
						opacity: [1, 0],
						scale: [1, 1],
					});
				}
			}),
		[showTileDropTarget, indicatorAnimation]
	);

	return (
		<PlacementIndicator
			transition={{
				type: "tween",
				duration: 0.2,
			}}
			initial={{
				opacity: 0,
			}}
			animate={indicatorAnimation}
			style={{
				boxShadow: `0 0 0 ${tileBorderSize}px ${props.theme.colors.z2}`,
				// backgroundColor: tileDropInfo.type === "add" ? colors.addTile : colors.accent,
				//backgroundColor: props.theme.colors.z1,
				borderRadius: tileCornerRadius,
				x: x,
				y: y,
				width: width,
				height: height,
			}}
		></PlacementIndicator>
	);
};
