import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";
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

const PlaceholderTable = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
`;

const PlaceholderTableCell = styled(motion.div)`
	background-color: rgba(255, 255, 255, 0.04);
	border-radius: 2px;
`;

const Table = styled(motion.table)`
	table-layout: fixed;
	text-align: left;
`;

const TableRow = styled(motion.tr)``;
const THEAD = styled(motion.thead)``;

const TBODY = styled(motion.tbody)``;

const THEADING = styled(motion.th)``;

const TDATA = styled(motion.td)``;

export const TileTable = props => {
	const { scale } = useContext(MetricsContext).metrics;

	let tilePadding = 12 * scale;
	let tableHeadingfontSize = 21 * scale;
	let tableHeadingPadding = 12 * scale;

	let tableBodyfontSize = 18.22 * scale;

	let cellHeight = 40 * scale;
	const cellGap = 4 * scale;

	const cells = [];
	for (var i = 0; i < 9; i++) {
		cells.push(
			<PlaceholderTableCell
				key={i}
				style={{
					height: cellHeight,
					backgroundColor: colors.z2,
				}}
			/>
		);
	}
	const getNodeFromObject = o => {
		const style = {
			backgroundColor: "#1f1f1f",
			borderRadius: 3 * scale,
			padding: 11 * scale,
			fontSize: tableBodyfontSize,
			lineHeight: 1.3*tableBodyfontSize + "px",
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
						fontWeight: 700,
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
				padding: tilePadding,
			}}
		>
			{props.title && (
				<TableTitle
					style={{
						fontWeight: 700,
						letterSpacing: "-1%",
						lineHeight: "110%",
						fontSize: tableHeadingfontSize,
						color: "rgba(255, 255, 255, 1)",
						paddingBottom: tableHeadingPadding,
					}}
				>
					{props.title}
				</TableTitle>
			)}

			<Table
				style={{
					color: "rgba(255, 255, 255, 1)",
					borderCollapse: "separate",
					borderSpacing: 6 * scale,
					width: "100%",
					marginLeft: -6 * scale,
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
										backgroundColor: "#1f1f1f",
										borderRadius: 3 * scale,
										padding: 11 * scale,
										fontWeight: 700,
										lineHeight: 1.3*tableBodyfontSize + "px",
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

			{/* 			
			<PlaceholderTable
            
            style={{
                columnGap: cellGap,
                rowGap: cellGap,
            }}
            >
				{cells}
			</PlaceholderTable> */}
		</Wrap>
	);
};
