import { tiles } from "../page/Tile";

const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
	H2: "h2",
	H3: "h3",
};

export const TestTome = [
	{
		id: "pageA",
		order: 1,
		gridTemplate: "auto / 1fr",
		tiles: [
			{
				id: "tileAPageA",
				gridColumn: "1 / 2",
				order: 1,
				size: "full",
				type: tiles.TEXT,

				resizeRight: true,
				resizeLeft: true,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "The Dolomites",
						},
						{
							type: textBlockType.P,
							content: `The Dolomites, also known as the "Pale Mountains", take their name from the carbonate rock dolomite.`,
						},
						{
							type: textBlockType.P,
							content: `For millennia, hunters and gatherers had advanced into the highest rocky regions and had probably also climbed some peaks. There is evidence that the Jesuit priest Franz von Wulfen from Klagenfurt climbed the Lungkofel and the Dürrenstein in the 1790s. In 1857 the Briton John Ball was the first to climb Monte Pelmo. Paul Grohmann later climbed numerous peaks such as the Antelao, Marmolata, Tofana, Monte Cristallo, and the Boè`,
						},
					],
				},
			},
		],
	},
];
