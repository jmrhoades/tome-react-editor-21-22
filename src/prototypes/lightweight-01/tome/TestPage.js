const page = {
    id: "page" + Math.random(),
    order: order,
    tiles: [
        {
            id: "tileAPageA" + Math.random(),
            order: 1,
            size: "half",
            type: tiles.TEXT,
            params: {
                blocks: [
                    {
                        type: textBlockType.H1,
                        content: "My findings",
                    },
                    {
                        type: textBlockType.P,
                        content: "During my journey through the hills, I found a number of artifacts:",
                    },
                    {
                        type: textBlockType.LI,
                        content: [
                            "Fossilized copal amber",
                            "Dried marine moss",
                            "A chip of bone, lilkely from a elephant tusk",
                            "A fallen myrtle branch",
                        ],
                    },
                ],
            },
        },
        {
            id: "tileBPageA" + Math.random(),
            order: 2,
            size: "half",
            type: tiles.IMAGE,
            params: {
                image: "./images/ds-image-tile-bw-sand-square.jpg",
            },
        },
    ],
}