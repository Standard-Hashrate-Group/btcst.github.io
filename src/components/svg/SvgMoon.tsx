import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { Image } from "react-native";

function SvgMoon(props: SvgProps) {
    return (
        <Image
            source={require("../../../assets/moon.png")}
            style={{ width: 24, height: 24 }}
        />
    );
}

export default SvgMoon;