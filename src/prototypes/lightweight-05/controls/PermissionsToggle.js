import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext, permissions } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	
`;

const Label = styled(motion.div)`
	color: rgba(255, 255, 255, 0.4);
	line-height: 16px;
	font-size: 12px;
	padding: 2px;
`;


export const PermissionsToggle = props => {
	const tome = useContext(TomeContext);
    const {permission, setPermission} = tome;

    const togglePermissions = () => {
        if (permission === permissions.COMMENT_ONLY) {
            setPermission(permissions.EDITOR)
        } else {
            setPermission(permissions.COMMENT_ONLY)
        }
    }

	return (
		<Wrap>
			<Label
            onClick={togglePermissions}>{permission}</Label>
		</Wrap>
	);
};
