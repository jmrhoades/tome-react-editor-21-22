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
	{
		id: "pageD",
		order: 2,
		gridTemplate: "auto / 1fr 33%",
		tiles: [
			{
				id: "tileAPageD",
				order: 1,
				gridColumn: "1 / 2",
				size: "two-thirds",
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
			{
				id: "tileBPageD",
				order: 2,
				gridColumn: "2 / 3",
				size: "one-third",
				type: tiles.IMAGE,
				resizeLeft: true,
				resizeBottom: true,
				params: {
					image: "./images/device-mock-01.png",
					size: "cover",
				},
			},
		],
	},
	{
		id: "pageB",
		order: 3,
		gridTemplate: "auto / repeat(2, 1fr)",
		tiles: [
			{
				id: "tileAPageB",
				gridColumn: "1 / 2",
				order: 1,
				size: "half",
				type: tiles.TEXT,

				resizeRight: true,
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
			{
				id: "tileBPageB",
				order: 2,
				gridColumn: "2 / 3",
				size: "half",
				type: tiles.IMAGE,
				resizeLeft: true,
				resizeBottom: true,

				params: {
					image: "./images/ds-image-square-mountains-1.jpg",
					size: "cover",
				},
			},
		],
	},
	{
		id: "pageC",
		order: 4,
		gridTemplate: "auto / 33% 1fr",
		tiles: [
			{
				id: "tileAPageC",
				order: 1,
				gridColumn: "1 / 2",
				size: "one-third",
				type: tiles.TEXT,
				
				
				resizeRight: true,
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
			{
				id: "tileBPageC",
				order: 2,
				gridColumn: "2 / 3",
				size: "two-thirds",
				type: tiles.IMAGE,
				resizeLeft: true,
				resizeBottom: true,

				params: {
					image: "./images/ds-image-square-mountains-1.jpg",
					size: "cover",
				},
			},
		],
	},

	{
		id: "pageE",
		order: 5,
		gridTemplate: "auto / 1fr 1fr 1fr",
		tiles: [
			{
				id: "tileAPageE",
				order: 1,
				gridColumn: "1 / 2",
				size: "one-third",
				type: tiles.TEXT,

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
						
					],
				},
			},
			{
				id: "tileBPageE",
				order: 1,
				gridColumn: "2 / 3",
				size: "one-third",
				type: tiles.IMAGE,
				resizeBottom: true,
				params: {
					image: "./images/device-mock-01.png",
					size: "cover",
				},
			},
			{
				id: "tileCPageE",
				order: 1,
				gridColumn: "3 / 4",
				size: "one-third",
				type: tiles.IMAGE,
				resizeBottom: true,
				params: {
					image: "./images/device-mock-02.png",
					size: "cover",
				},
			},
		],
	},
	{
		id: "pageF",
		order: 6,
		gridTemplate: "auto 30vw auto / 1fr 1fr 1fr",
		tiles: [
			{
				id: "tileAPageF",
				order: 1,
				gridColumn: "1 / 4",
				size: "full",
				type: tiles.TEXT,

				resizeLeft: true,
				resizeRight: true,
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
					],
				},
			},
			{
				id: "tileBPageF",
				order: 2,
				gridColumn: "1 / 4",
				size: "full",
				type: tiles.IMAGE,
				resizeBottom: true,
				resizeLeft: true,
				resizeRight: true,
				params: {
					image: "./images/ds-image-wide-mountains-1.jpg",
					size: "cover",
				},
			},
			{
				id: "tileCPageF",
				order: 1,
				gridColumn: "1 / 2",
				size: "one-third",
				type: tiles.TEXT,
				
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Etymology",
						},
						{
							type: textBlockType.P,
							content: `The Dolomites, also known as the "Pale Mountains", take their name from the carbonate rock dolomite.`,
						},
					],
				},
			},
			{
				id: "tileDPageF",
				order: 1,
				gridColumn: "2 / 3",
				size: "one-third",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Geography",
						},
						{
							type: textBlockType.P,
							content: `The mountain is located about 100 kilometres (62 mi) north-northwest of Venice, from which it can be seen on a clear day. It consists of a ridge running west to east. Towards the south it breaks suddenly into sheer cliffs, forming a rock face several kilometres long. On the north side there is a comparatively flat glacier, the only large glacier in the Dolomites (the Marmolada Glacier, Ghiacciaio della Marmolada).`,
						},
					],
				},
			},
			{
				id: "tileEPageF",
				order: 1,
				gridColumn: "3 / 4",
				size: "one-third",
				type: tiles.TEXT,
				
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "History",
						},
						{
							type: textBlockType.P,
							content: `Paul Grohmann made the first ascent in 1864, along the north route. The south face was climbed for the first time in 1901 by Beatrice Tomasson, Michele Bettega and Bartolo Zagonel.`,
						},
						{
							type: textBlockType.P,
							content: `Until the end of World War I the border between Austria-Hungary and Italy ran over Marmolada, so it formed part of the front line during that conflict. Austro-Hungarian soldiers were quartered in deep tunnels bored into the northern face's glacier, and Italian soldiers were quartered on the south face's rocky precipices. It was also the site of fierce mine warfare on the Italian Front. As glaciers retreat, soldiers' remains and belongings are occasionally discovered.`,
						},
					],
				},
			},
		],
	},
	{
		id: "pageG",
		order: 7,
		gridTemplate: "auto 40vw auto 20vw auto / 1fr 1fr 1fr",
		tiles: [
			{
				id: "tileAPageG",
				order: 1,
				gridColumn: "1 / 4",
				size: "full",
				type: tiles.TEXT,

				resizeLeft: true,
				resizeRight: true,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "The Dolomites",
						},
						{
							type: textBlockType.P,
							content: `The Dolomites, also known as the Dolomite Mountains, Dolomite Alps or Dolomitic Alps, are a mountain range located in northeastern Italy.`,
						},
					],
				},
			},
			{
				id: "tileBPageG",
				order: 2,
				gridColumn: "1 / 4",
				size: "full",
				type: tiles.IMAGE,
				resizeBottom: true,
				resizeLeft: true,
				resizeRight: true,
				params: {
					image: "./images/ds-image-square-mountains-1.jpg",
					size: "contain",
				},
			},
			{
				id: "tileCPageG",
				order: 1,
				gridColumn: "1 / 2",
				size: "one-third",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Etymology",
						},
						{
							type: textBlockType.P,
							content: `The Dolomites, also known as the "Pale Mountains", take their name from the carbonate rock dolomite.`,
						},
					],
				},
			},
			{
				id: "tileDPageG",
				order: 1,
				gridColumn: "2 / 3",
				size: "one-third",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Geography",
						},
						{
							type: textBlockType.P,
							content: `The mountain is located about 100 kilometres (62 mi) north-northwest of Venice, from which it can be seen on a clear day. It consists of a ridge running west to east. Towards the south it breaks suddenly into sheer cliffs, forming a rock face several kilometres long. On the north side there is a comparatively flat glacier, the only large glacier in the Dolomites (the Marmolada Glacier, Ghiacciaio della Marmolada).`,
						},
					],
				},
			},
			{
				id: "tileEPageG",
				order: 1,
				gridColumn: "3 / 4",
				size: "one-third",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "History",
						},
						{
							type: textBlockType.P,
							content: `Paul Grohmann made the first ascent in 1864, along the north route. The south face was climbed for the first time in 1901 by Beatrice Tomasson, Michele Bettega and Bartolo Zagonel.`,
						},
						{
							type: textBlockType.P,
							content: `Until the end of World War I the border between Austria-Hungary and Italy ran over Marmolada, so it formed part of the front line during that conflict. Austro-Hungarian soldiers were quartered in deep tunnels bored into the northern face's glacier, and Italian soldiers were quartered on the south face's rocky precipices. It was also the site of fierce mine warfare on the Italian Front. As glaciers retreat, soldiers' remains and belongings are occasionally discovered.`,
						},
					],
				},
			},
			{
				id: "tileFPageG",
				order: 1,
				gridColumn: "1 / 2",
				size: "one-third",
				type: tiles.IMAGE,
				resizeBottom: true,
				params: {
					image: "./images/ds-image-square-mountains-2.jpg",
					size: "contain",
				},
			},
			{
				id: "tileGPageG",
				order: 1,
				gridColumn: "2 / 3",
				size: "one-third",
				type: tiles.IMAGE,
				resizeBottom: true,
				params: {
					image: "./images/ds-image-square-mountains-3.jpg",
					size: "contain",
				},
			},
			{
				id: "tileHPageG",
				order: 1,
				gridColumn: "3 / 4",
				size: "one-third",
				type: tiles.IMAGE,
				resizeBottom: true,
				params: {
					image: "./images/ds-image-square-mountains-4.jpg",
					size: "contain",
				},
			},

			{
				id: "tileLPageG",
				order: 1,
				gridColumn: "1 / 2",
				size: "one-third",
				type: tiles.TEXT,
				
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Marmolada",
						},
						{
							type: textBlockType.P,
							content: `3,343m / 10,968ft`,
						},
					],
				},
			},
			{
				id: "tileMPageG",
				order: 1,
				gridColumn: "2 / 3",
				size: "one-third",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Antelao",
						},
						{
							type: textBlockType.P,
							content: `3,264m / 10,706ft`,
						},
					],
				},
			},
			{
				id: "tileNPageG",
				order: 1,
				gridColumn: "3 / 4",
				size: "one-third",
				type: tiles.TEXT,
				
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Tofana di Mezzo",
						},
						{
							type: textBlockType.P,
							content: `3,241m / 10,633ft`,
						},
					],
				},
			},
		],
	},
];
