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
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap1.jpg",
				imageSize: "cover",
				caption: {
					background: page.theme.colors.media.caption.light.background,
					color: page.theme.colors.media.caption.light.text,
					content: "Olive oil based soaps",
					alignmentY: alignmentY.BOTTOM,
				},
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {
				image: "/images/soap2.jpg",
				video: "/humankind/humankind-intro.mp4",
			},
		},
		row,
		tome
	);
	row.height = 12;

	return page;
};
