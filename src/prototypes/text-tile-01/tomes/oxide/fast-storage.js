import { uniqueId } from "lodash";
import { tileNames, textBlockType, tableTileType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	// Page
	let page = appendPageToTome(tome, createTheme({ mode: "oxide" }));

	// Row
	let row = appendRowToPageInTome(page, tome);
	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H3,
						content: "Fast storage",
					},
				],
			},
		},
		row,
		tome
	);
    appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "All NVMe. Developers no longer need to worry about which disk type to use; we've selected the fastest one for you. We will automatically snapshot your disks based on disk usage to assure redundancy, even if you forget to turn on snapshots.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 6;
    row.autoHeight = false;

    // Row
    row = appendRowToPageInTome(page, tome);
	appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/oxide/image-5.webp",
				imageSize: "cover",
				imagePosition: "left"
			},
		},
		row,
		tome
	);

	row.height = 6;

	return page;
};
