import React from "react";
import { Image, TouchableHighlight, View } from "react-native";
import { useHistory, useLocation } from "react-router-dom";

import Constants from "expo-constants";

import { Spacing } from "../../constants/dimension";
import useLinker from "../../hooks/useLinker";
import Column from "../Column";
import FlexView from "../FlexView";
import SocialIcons from "../SocialIcons";
import Text from "../Text";

const flags = {
    us: require("../../../assets/flags/us.png"),
    uk: require("../../../assets/flags/uk.png"),
    cn: require("../../../assets/flags/cn.png"),
    kr: require("../../../assets/flags/kr.png")
};

const WebFooter = () => {
    const onPressAlchemy = useLinker(
        "https://certik.foundation/",
        "",
        "_blank"
    );
    return (
        <Column noTopMargin={true}>
            <View style={{ width: "100%", padding: Spacing.normal, alignItems: "center" }}>
                <TouchableHighlight onPress={onPressAlchemy}>
                    <Image
                        source={require("../../../assets/certik-logo-w.png")}
                        style={{ width: 168, height: 40, marginTop: Spacing.tiny }}
                    />
                </TouchableHighlight>
                <SocialIcons />
                <Text note={true} style={{ marginTop: Spacing.tiny }}>
                    Built with ❤️ by Standard Hashrate (v{Constants.manifest.version})
                </Text>
                <FlexView style={{ marginTop: Spacing.small }}>
                    <Flag name={"uk"} locale={"en"} />
                    <Flag name={"cn"} locale={"zh"} />
                    {/* <Flag name={"kr"} locale={"ko"} /> */}
                </FlexView>
            </View>
        </Column>
    );
};

const Flag = ({ name, locale }) => {
    const history = useHistory();
    const location = useLocation();
    const onPress = () => {
        history.push(location.pathname + "?locale=" + locale);
    };
    return (
        <TouchableHighlight onPress={onPress} style={{ marginHorizontal: 4 }}>
            <Image source={flags[name]} style={{ width: 30, height: 20 }} />
        </TouchableHighlight>
    );
};

export default WebFooter;
