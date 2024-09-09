import React from "react";
import styled from "styled-components";

const Image = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

export const ImageTile = props => {
	return (
		
			<Image image={props.image} />
		
	);
};
