import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
import { Image } from "react-native";

function SvgSun(props: SvgProps) {
    return (
        <Image
            source={require("../../../assets/sun.png")}
            style={{ width: 24, height: 24 }}
        />
    );
}

export default SvgSun;
