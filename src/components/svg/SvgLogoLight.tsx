import * as React from "react";
import { Image } from "react-native";

// tslint:disable-next-line:max-func-body-length
function SvgLogoLight(props) {
    return (
        <Image
            source={require("../../../assets/logo-h.png")}
            style={{ width: 232, height: 40 }}
        />
    );
}

export default SvgLogoLight;
