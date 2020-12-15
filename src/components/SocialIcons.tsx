import React, { useContext } from "react";
import { Icon, SocialIcon as NativeSocialIcon, SocialIconProps } from "react-native-elements";

import { GlobalContext } from "../context/GlobalContext";
import useColors from "../hooks/useColors";
import useLinker from "../hooks/useLinker";
import FlexView from "./FlexView";

const SocialIcons = () => {
    return (
        <FlexView style={{ width: "100%", justifyContent: "center" }}>
        </FlexView>
    );
};

const SocialIcon = (props: SocialIconProps) => {
    const { darkMode } = useContext(GlobalContext);
    const { background, textLight } = useColors();
    return (
        <NativeSocialIcon
            {...props}
            light={!darkMode}
            iconColor={darkMode ? "white" : undefined}
            style={{
                backgroundColor: background,
                borderWidth: 1,
                borderColor: darkMode ? "white" : textLight
            }}
        />
    );
};

export default SocialIcons;
