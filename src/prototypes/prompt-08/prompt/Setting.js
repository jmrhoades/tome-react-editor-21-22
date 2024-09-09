import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";

const SettingWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	position: relative;
`;

const Label = styled(motion.div)`
	font-family: "Inter";
	font-size: 11px;
	line-height: 14px;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.24px;
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
`;

const HoverBackground = styled(Background)``;

export const Setting = props => {
	const colors = props.theme.colors;
	const [isHovering, setIsHovering] = React.useState(false);

    const padding = props.iconName ? "2px" : "4px 4px 4px 6px";

	return (
		<SettingWrap
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			whileTap={{
				//scale: 0.975,
			}}
			transition={{ duration: 0.15, ease: "easeOut" }}
			style={{
				pointerEvents: "auto",
				//cursor: "pointer",
                padding: padding,
			}}
			//onTap={props.onTap}
            onMouseUp={
                e => {
                    //closeMenu();
                    e.stopPropagation();
                    e.preventDefault();
                    props.onTap()
                }
            }
			id={props.id}
		>
			<HoverBackground
				style={{
					backgroundColor: colors.t2,
					borderRadius: 6,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={{ duration: 0.15, ease: "easeOut" }}
				initial={false}
			/>
            
            {props.label && (
			<Label
				transition={{ duration: isHovering ? 0.2 : 0, ease: "easeOut" }}
				initial={false}
				animate={{
					color: props.active ? colors.t9 : isHovering ? colors.t8 : colors.t7,
				}}
			>
				{props.label}
			</Label>
        )}
			<Icon
				name={props.iconName ? props.iconName : "Dropdown"}
				size={props.iconName ? 20 : 12}
				opacity={1}
				color={props.active ? colors.t9 : isHovering ? colors.t8 : colors.t7}
                transition={{ duration: isHovering ? 0.2 : 0, ease: "easeOut" }}

			/>
		</SettingWrap>
	);
};
