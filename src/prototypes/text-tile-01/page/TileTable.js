import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { tableTileType } from "./TileConstants";
import { uniqueId } from "lodash";

const Wrap = styled(motion.div)`
	position: relative;
`;

const TableTitle = styled(motion.div)`
	position: relative;
	line-height: 1;
`;

const Table = styled(motion.table)`
	table-layout: fixed;
	text-align: left;
	max-width: 100%;
`;

const Scrim = styled(motion.div)`
	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;
	background: linear-gradient(
		270deg,
		rgba(20, 20, 20, 0.95) 0%,
		rgba(20, 20, 20, 0.949719) 0.03%,
		rgba(20, 20, 20, 0.947748) 0.24%,
		rgba(20, 20, 20, 0.9424) 0.8%,
		rgba(20, 20, 20, 0.931985) 1.9%,
		rgba(20, 20, 20, 0.914815) 3.7%,
		rgba(20, 20, 20, 0.8892) 6.4%,
		rgba(20, 20, 20, 0.853452) 10.16%,
		rgba(20, 20, 20, 0.805882) 15.17%,
		rgba(20, 20, 20, 0.7448) 21.6%,
		rgba(20, 20, 20, 0.668518) 29.63%,
		rgba(20, 20, 20, 0.575348) 39.44%,
		rgba(20, 20, 20, 0.4636) 51.2%,
		rgba(20, 20, 20, 0.331585) 65.1%,
		rgba(20, 20, 20, 0.177615) 81.3%,
		rgba(20, 20, 20, 0) 100%
	);
`;

const TableRow = styled(motion.tr)``;
const THEAD = styled(motion.thead)``;

const TBODY = styled(motion.tbody)``;

const THEADING = styled(motion.th)``;

const TDATA = styled(motion.td)``;

export const TileTable = props => {
	const { scale } = useContext(MetricsContext).metrics;

	let tilePaddingX = 12 * scale;
	let tilePaddingY = 17 * scale;

	const fontFamily = props.theme ? props.theme.typography.fontFamily : "unset";

	let tableHeadingFontSize = 21 * scale;
	let tableHeadingWeight = 700;
	let tableHeadingLetterSpacing = tableHeadingFontSize * -0.01 + "px";
	let tableHeadingLineHeight = tableHeadingFontSize * 1.1 + "px";
	let tableHeadingPaddingBottom = 8 * scale + "px";

	let tableBodyfontSize = 18.22 * scale;
	let tableBodyLineHeight = 1.3 * tableBodyfontSize + "px";

	const cellGap = 4 * scale;

	const getNodeFromObject = o => {
		const style = {
			fontFamily: fontFamily,
			fontSize: tableBodyfontSize,
			lineHeight: tableBodyLineHeight,
			backgroundColor: props.theme ? props.theme.colors.table.cell : "transparent",
			borderRadius: 3 * scale,
			padding: 11 * scale,
		};
		if (o.type === tableTileType.TD) {
			return (
				<TDATA
					key={uniqueId("table_data_")}
					style={{
						...style,
					}}
				>
					{o.content}
				</TDATA>
			);
		}
		if (o.type === tableTileType.TH) {
			return (
				<THEADING
					key={uniqueId("table_heading_")}
					style={{
						...style,
					}}
				>
					{o.content}
				</THEADING>
			);
		}
	};

	return (
		<Wrap
			style={{
				paddingLeft: tilePaddingX,
				paddingRight: tilePaddingX,
				paddingTop: tilePaddingY,
			}}
		>
			{props.title && (
				<TableTitle
					style={{
						fontFamily: fontFamily,
						fontSize: tableHeadingFontSize,
						fontWeight: tableHeadingWeight,
						letterSpacing: tableHeadingLetterSpacing,
						lineHeight: tableHeadingLineHeight,
						color: props.theme ? props.theme.colors.table.heading : "transparent",
						paddingBottom: tableHeadingPaddingBottom,
					}}
				>
					{props.title}
				</TableTitle>
			)}

			<Table
				style={{
					fontFamily: fontFamily,
					color: props.theme ? props.theme.colors.table.body : "transparent",
					borderCollapse: "separate",
					borderSpacing: cellGap * scale,
					width: "100%",
				}}
			>
				<colgroup>
					{props.columns.map(w => (
						<col
							key={uniqueId("table_col_")}
							style={{
								width: w * scale,
							}}
						/>
					))}
				</colgroup>

				{props.header && (
					<THEAD>
						<TableRow>
							{props.header.map(h => (
								<THEADING
									key={uniqueId("table_heading_")}
									style={{
										backgroundColor: props.theme ? props.theme.colors.table.cell : "transparent",
										borderRadius: 3 * scale,
										padding: 11 * scale,
										fontWeight: 700,
										fontSize: tableBodyfontSize,
										lineHeight: 1.3 * tableBodyfontSize + "px",
									}}
								>
									{h}
								</THEADING>
							))}
						</TableRow>
					</THEAD>
				)}

				<TBODY>
					{props.rows.map(r => (
						<TableRow key={uniqueId("table_row_")}>{r.map(o => getNodeFromObject(o))}</TableRow>
					))}
				</TBODY>
			</Table>

			

			{/* <Scrim
				style={{
					width: 58 * scale,
				}}
			/> */}
		</Wrap>
	);
};
