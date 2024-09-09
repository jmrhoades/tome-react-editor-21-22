const defaultSansStack = `system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif`;

const typeface = `Inter, ${defaultSansStack}`;

export const theme = {

    typography: {
        fonts: {
            light: typeface,
            regular: typeface,
            bold: typeface,
            body: typeface,
            h1: typeface,
            h2: typeface,
            h3: typeface,
            h4: typeface,
            p: typeface,
            small: typeface,
            controls: typeface,
        },
        sizes: {
            body: "1.25em",
            h1: "2.5rem",
            h2: "2rem",
            h3: "1.75rem",
            h4: "1rem",
            p: "1rem",
            small: "0.85rem",
            controls: "0.85rem",
        },
        lineHeights: {
            body: "calc(1ex / 0.32)",
            h1: "calc(1ex / 0.42)",
            h2: "calc(1ex / 0.42)",
            h3: "calc(1ex / 0.38)",
            h4: "calc(1ex / 0.32)",
            p: "calc(1ex / 0.32)",
            small: "1.3",
        },
    },
    controls: {
        size: 44,
        borderSize: 6,
        marginY: 64,
    }
  
  }

