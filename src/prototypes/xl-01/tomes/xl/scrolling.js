import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[3]);

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H2,
						content: "What’s next on the Roadmap",
					},
				],
			},
		},
		row,
		tome,
	);
	row.height = 2;

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H4,
						content: "Emphasis tools",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We now support editing on iOS. You can create and manage tomes, write text, or capture media — all from your phone.",
					},
				],
			},
		},
		row,
		tome,
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H4,
						content: "Spatial comments",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We now support editing on iOS. You can create and manage tomes, write text, or capture media — all from your phone.",
					},
				],
			},
		},
		row,
		tome,
	);

	row.height = 4;

// Row
row = appendRowToPageInTome(page, tome);

tile = appendTileToRowInTome(
	{
		type: tileNames.TEXT.name,
		params: {
			alignmentX: alignmentX.LEFT,
			alignmentY: alignmentY.TOP,
			blocks: [
				{
					id: uniqueId("block_h_"),
					type: textBlockType.H3,
					content: "Moving forward",
				},
				{
					id: uniqueId("block_p_"),
					type: textBlockType.P,
					content:
						`“Economic discrimination was not news to me, nor was segregation or class division, but the difference lay in my becoming intimate with these realities in a totally new way,” he wrote. “And I was making photographs in a new way — for a cause, a cause that I knew was right. I found myself working in a spirit that drew on conditions that I had observed and experienced in my family’s factory, but now I was surrendering my secret God-given white self importance; that was new.”`
				},
				{
					id: uniqueId("block_p_"),
					type: textBlockType.P,
					content:
						`For the rest of his life, his motivation in his photography was “to be useful,” he said. In 1964 he became the Peace Corps director in Sarawak, a former British colony in Borneo that had become part of Malaysia the previous year.`
				},
			],
		},
	},
	row,
	tome,
);

row.height = 7;
// Row
row = appendRowToPageInTome(page, tome);


	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/bigImage.png",
				imageSize: "cover",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
	);

	row.height = 15;

	return page;
};
