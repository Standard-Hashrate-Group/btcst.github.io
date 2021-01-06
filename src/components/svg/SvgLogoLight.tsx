import * as React from "react";
import { Image } from "react-native";

// tslint:disable-next-line:max-func-body-length
function SvgLogoLight(props) {
    return (
        <Image
            source={require("../../../assets/logo-h.svg")}
            style={{ width: 260, height: 64 ,marginTop:6}}
        />
    );
}

export default SvgLogoLight;
