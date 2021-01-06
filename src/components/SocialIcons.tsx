import React, { useContext } from "react";
import { Icon, SocialIcon as NativeSocialIcon, SocialIconProps } from "react-native-elements";

import { GlobalContext } from "../context/GlobalContext";
import useColors from "../hooks/useColors";
import useLinker from "../hooks/useLinker";
import FlexView from "./FlexView";

const SocialIcons = () => {
    const { darkMode } = useContext(GlobalContext);
    const { background, textLight } = useColors();
    const onPressTwitter = useLinker("http://twitter.com/BTCST2020", "", "_blank");
    const onPressGithub = useLinker("https://github.com/Standard-Hashrate-Group", "", "_blank");
    
    const onMedium = useLinker("https://btcst.medium.com/", "", "_blank");
    // const onPressReddit = useLinker("https://www.reddit.com/user/BTCStandardHashrate", "", "_blank");
    const onTg = useLinker("https://t.me/BTCSTCommunity","","_blank");
    const onPressDiscord = useLinker("https://discord.com/channels/791170396316893255/791170396765945886", "", "_blank");
    return (
        <FlexView style={{ width: "100%", justifyContent: "center" }}>
            <SocialIcon type="github-alt" onPress={onPressGithub} />
            <SocialIcon type="twitter" onPress={onPressTwitter} />
            <SocialIcon type="medium" onPress={onMedium} />
            <SocialIcon type="telegram" onPress={onTg} />
            {/* <SocialIcon type="twitch" onPress={onPressReddit} /> */}
            <Icon
                type={"material-community"}
                name={"discord"}
                raised={true}
                reverse={true}
                color={background}
                reverseColor={darkMode ? "white" : "#7289da"}
                style={{ backgroundColor: background }}
                containerStyle={{
                    borderWidth: 1,
                    borderColor: darkMode ? "white" : textLight
                }}
                onPress={onPressDiscord}
            />
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
