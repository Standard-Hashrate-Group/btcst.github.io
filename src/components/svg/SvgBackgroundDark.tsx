import * as React from "react";
import Svg, {
    Circle,
    ClipPath,
    Defs,
    Ellipse,
    G,
    LinearGradient,
    Path,
    RadialGradient,
    Stop,
    SvgProps
} from "react-native-svg";
import { Image, Dimensions } from "react-native";

// tslint:disable-next-line:max-func-body-length
const SvgBackgroundDark = (props: SvgProps)=> {
    return (
        <Image
            source={require("../../../assets/webbg.jpg")}
            style={{ marginLeft: 1000, marginTop: 400, width: Dimensions.get('window').width, height: Dimensions.get('window').height, opacity: 0.3 }}
        />
    );
}

export default SvgBackgroundDark;
