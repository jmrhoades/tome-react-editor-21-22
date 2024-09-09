import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./theme/fonts/inter/inter.css";
import "./theme/reset.css";
import { App } from "./app";

const router = createBrowserRouter([
	{
		path: "*",
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
