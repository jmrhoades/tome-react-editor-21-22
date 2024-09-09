import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme({ mode: "dark" }));

	

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TWITTER.name,
			height6: 8,
			height12: 6,
			params: {
				displayName: "Kristy Tillman",
				userName: "@KristyT",
				avatar: "/images/avatars/kristy_tillman.png",
				tweet: "Watching Willy Wonka for the 1000th and wondering how many people have ever seen all 4 of their grandparents in the same bed?",
				time: "1:02 PM",
				date: "Apr 15, 2022",
				retweets: 5,
				likes: 51,
			},
		},
		row,
		tome
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.FIGMA.name,
			params: {
                src: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FxOMBWPz4l3rY8eqE1yiF2l%2FVariable-Tile-Wdith%3Fnode-id%3D76%253A1365",
            },
		},
		row,
		tome
	);
	row.height = 6;

	

	row.height = tile.height12;
	row.height = 12;

	return page;
};
