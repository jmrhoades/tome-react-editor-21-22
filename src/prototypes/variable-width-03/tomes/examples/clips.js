import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY, tableTileType } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	const TD = tableTileType.TD;

	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme());

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
		tome,
        6
	);
	row.height = tile.height12;

	// Row
	
	tile = appendTileToRowInTome(
		{
			type: tileNames.TABLE.name,
			height6: 9,
			height12: 12,
			params: {
				columns: [208, 156, 480],
				header: ["Department", "Spend", "Goal"],
				rows: [
					[
						{ type: TD, content: "Manufacturing" },
						{ type: TD, content: "10m/yr" },
						{ type: TD, content: "Increase production volume to meet Q1 projections" },
					],
					[
						{ type: TD, content: "Marketing" },
						{ type: TD, content: "6m/yr" },
						{ type: TD, content: "Scale the team to 20+ and bring all marketing/creative in-house" },
					],
					[
						{ type: TD, content: "Design" },
						{ type: TD, content: "3m/yr" },
						{ type: TD, content: "Scale the team to 15+ with a heavy focus on PD roles" },
					],
					[
						{ type: TD, content: "Engineering" },
						{ type: TD, content: "2m/yr" },
						{ type: TD, content: "Scale the team to 30+ and build our top 10 most requested features" },
					],
					[
						{ type: TD, content: "Business" },
						{ type: TD, content: "1m/yr" },
						{ type: TD, content: "Scale the team to 10+ and develop our international GTM plan" },
					],
					[
						{ type: TD, content: "Operations" },
						{ type: TD, content: "1m/yr" },
						{ type: TD, content: "Complete overhaul of our supply chain management protocols" },
					],

				],
			},
		},
		row,
		tome,
        6
	);
	row.height = tile.height12;

	return page;
};
