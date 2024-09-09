import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html,
body,
#root {
    margin: 0;
    padding: 0;
    height: 100%;
    background: transparent;
}

* {
    user-select: none;
}

body {
    font-family: ${props => props.theme.typography.fonts.body};
    font-size: ${props => props.theme.typography.sizes.body};
    line-height: ${props => props.theme.typography.lineHeights.body};
    /* -webkit-font-smoothing: subpixel-antialiased; */
    /* -webkit-backface-visibility: hidden; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: default;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li {
    font-weight: normal;
    margin: 0;
    padding: 0;
}


.frame {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
}


.nocursor {
    cursor: none;
    * {
    cursor: none !important;
    }
}

.no-cursor {
    cursor: none;
    * {
    cursor: none !important;
    }
}

.grab {
    cursor: grab;
    * {
    cursor: grab !important;
    }
}

.point {
    cursor: pointer;
    * {
    cursor: pointer !important;
    }
}

.grabbing {
    cursor: grabbing;
    * {
    cursor: grabbing !important;
    }
}

.ns-cursor {
    cursor: ns-resize;
    * {
    cursor: ns-resize !important;
    }
}

.ew-cursor {
    cursor: ew-resize;
    * {
    cursor: ew-resize !important;
    }
}


`;
