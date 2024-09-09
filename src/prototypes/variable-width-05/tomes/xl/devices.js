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
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H4,
						content: "New iOS App",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We now support Link on iOS. You can also control the transport, set the time signature and change the BPM — all from your phone.",
					},
				],
			},
		},
		row,
		tome,
		3
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/devices/phone-01.png",
				imageSize: "contain",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
		3
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/devices/phone-02.png",
				imageSize: "contain",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
		3
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/devices/phone-03.png",
				imageSize: "contain",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
		3
	);

	row.height = 12;
	return page;
};
