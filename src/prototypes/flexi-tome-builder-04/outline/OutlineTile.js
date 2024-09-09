import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { tileNames } from "../page/TileConstants";
import { TileText } from "../page/TileText";
import { TileImage } from "../page/TileImage";
import { TileVideo } from "../page/TileVideo";
import { TileTable } from "../page/TileTable";
import { TileCode } from "../page/TileCode";
import { TileWeb } from "../page/TileWeb";
import { TileTwitter } from "../page/TileTwitter";
import { TileGiphy } from "../page/TileGiphy";
import { TileAirtable } from "../page/TileAirtable";
import { TileFigma } from "../page/TileFigma";
import { TileColor } from "../page/TileColor";
import { colors } from "../../../ds/Colors";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

export const OutlineTile = ({
	tomeData,
	page,
	tile,
	columnWidth,
	columnGutter,
	pageMargin,
	minPageHeight,
	rowHeight,
	rowMargin,
}) => {
	// other tiles in the same row & page
	const tiles = tomeData.tiles.filter(t => {
		return t.pageId === tile.pageId && t.rowId === tile.rowId;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

	// the row the tile is in
	const row = tomeData.rows.filter(r => {
		return r.id === tile.rowId;
	})[0];

	// all the rows sorted by order
	const rows = tomeData.rows.filter(r => {
		return r.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
	tileWidth
	*/
	const tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);

	/*
	tileLeft
	*/
	let tileLeft = pageMargin;
	// Set based on order
	if (tile.order === 1) {
		tileLeft = pageMargin;
	}
	if (tile.order === 2) {
		// const firstTile = tiles[0];
		const firstTile = tiles.filter(tile => {
			return tile.order === 1;
		})[0];
		const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
		tileLeft = pageMargin + firstTileWidth + columnGutter;
	}
	if (tile.order === 3) {
		const firstTile = tiles.filter(tile => {
			return tile.order === 1;
		})[0];
		const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
		const secondTile = tiles.filter(tile => {
			return tile.order === 2;
		})[0];
		const secondTileWidth = columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
		tileLeft = pageMargin + firstTileWidth + columnGutter + secondTileWidth + columnGutter;
	}

	/*
	tileTop
	*/
	let tileTop = pageMargin;
	if (row.order !== 1) {
		rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < row.order) {
				tileTop +=
					r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
				tileTop += rowMargin;
			}
		});
	}

	/*
	tileHeight
	*/
	const tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);

	return (
		<Wrap
			style={{
				y: tileTop,
				x: tileLeft,
				width: tileWidth,
				height: tileHeight,
				backgroundColor: colors.z1,
			}}
		>
			{tile.type === tileNames.TEXT.name && (
				<TileText
					blocks={tile.params.blocks}
					tileSize={tile.size}
					isSelected={false}
					onContentSizeChange={() => {}}
					scale={1}
				/>
			)}
			{tile.type === tileNames.IMAGE.name && (
				<TileImage
					image={tile.params.image}
					imageSize={tile.params.imageSize}
					imagePosition={tile.params.imagePosition}
					tileSize={tile.size}
				/>
			)}
			{tile.type === tileNames.VIDEO.name && <TileVideo video={tile.params.video} tileSize={tile.size} />}
			{tile.type === tileNames.TABLE.name && <TileTable tileSize={tile.size} />}
			{tile.type === tileNames.CODE.name && <TileCode tileSize={tile.size} />}
			{tile.type === tileNames.WEB.name && <TileWeb tileSize={tile.size} />}
			{tile.type === tileNames.TWITTER.name && <TileTwitter tileSize={tile.size} />}

			{tile.type === tileNames.GIPHY.name && <TileGiphy tileSize={tile.size} />}
			{tile.type === tileNames.AIRTABLE.name && <TileAirtable tileSize={tile.size} />}
			{tile.type === tileNames.FIGMA.name && <TileFigma tileSize={tile.size} />}
			{tile.type === tileNames.COLOR.name && <TileColor tileSize={tile.size} color={tile.params.color} />}
		</Wrap>
	);
};
