import React from "react";
import { Image, View } from "react-native";

import { Spacing } from "../../constants/dimension";
import SocialIcons from "../SocialIcons";
import Text from "../Text";
import { Title } from "./WebHeader";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const MobileNotSupported = () => {
    const { darkMode } = useContext(GlobalContext);
    const source = darkMode
            ? require("../../../assets/standardHashrate-dark.png")
            : require("../../../assets/standardHashrate.png")
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "100%",
                padding: Spacing.normal
            }}>
            <Image
                source={source}
                style={{ width: 192, height: 192, marginBottom: Spacing.normal }}
            />
            <Title />
            <Text style={{ marginTop: Spacing.normal }}>Mobile devices not supported yet.</Text>
            <SocialIcons />
        </View>
    );
};

export default MobileNotSupported;
