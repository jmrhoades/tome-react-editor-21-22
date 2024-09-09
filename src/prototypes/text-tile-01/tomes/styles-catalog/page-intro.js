import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	// Page
	let page = appendPageToTome(tome, createTheme());

	// Row
	let row = appendRowToPageInTome(page, tome);
	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 9,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.DISTRIBUTE,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,

						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Style",
								color: "#FFFFFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " updates",
								color: "#FFFFFF",
							},
						],
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Updated ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "base font  size: 24pt → 22pt. ",
								color: "#FFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Updated ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "heading sizes. ",
								color: "#FFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "New ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "display and caption sizes. ",
								color: "#FFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "New ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "alignment options. ",
								color: "#FFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "New ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "list styles. ",
								color: "#FFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "New ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "blockquote styles. ",
								color: "#FFF",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.STRIKETHROUGH,
								color: "#FFF",
								blocks: [
									{
										id: uniqueId("block_span"),
										type: textBlockType.SPAN,
										content: "New ",
										color: "#FDFA57",
									},
									{
										id: uniqueId("block_span"),
										type: textBlockType.SPAN,
										content: "color options.",
										color: "#FFF",
									},
								],
							},
						],
					},
					{
						id: uniqueId("block_caption_"),
						type: textBlockType.CAPTION,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Last updated July 21 · ",
								color: "#666",
							},
							{
								id: uniqueId("block_link"),
								type: textBlockType.LINK,
								href: "https://www.figma.com/file/yFiQkSuVVJPHw4LusCSvlg/Text-Tile-v2?node-id=2%3A2",
								content: "Figma",
								color: "#666",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 12;

	return page;
};
