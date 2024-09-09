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
						content: "What’s next on the roadmap",
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
							"Tome is made for teams because great ideas need teamwork to become reality. Inviting your team to create together is easy. Simply click Invite Teammates from the left-side navigation in your workspace and add your teammates’ email addresses.",
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
							"Teams are more efficient and innovate faster when they centralize critical information and give everyone the context necessary to do great work quickly and confidently. Visualize your thoughts and suggestions your way. See how Tome increases efficiency through visual collaboration.",
					},
				],
			},
		},
		row,
		tome,
	);

	row.height = 5;

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
					content: "Is the gang all here?",
				},
				{
					id: uniqueId("block_p_"),
					type: textBlockType.P,
					content:
						`Tome is made for teams because great ideas need teamwork to become reality. Inviting your team to create together is easy. Simply click Invite teammates from the left-side navigation in your workspace and add your teammates’ email addresses.`
				},
				{
					id: uniqueId("block_p_"),
					type: textBlockType.P,
					content:
						`Make a picture worth a thousand words — with just a handful of them. Today we’re introducing the DALL·E 2 image generation tile in Tome. Now you have the power to add remarkable visual expression to your story, no stock photography required. Finding the perfect imagery to highlight your point can be a labor of love. Our integration with DALL·E 2 makes it as easy as entering a prompt and picking from a selection of custom, AI-generated images.
						`
				},
			],
		},
	},
	row,
	tome,
);

row.height = 7;



	return page;
};
