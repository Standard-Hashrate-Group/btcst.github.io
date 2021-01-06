import * as React from "react";
import { Image } from "react-native";

// tslint:disable-next-line:max-func-body-length
function SvgLogoDark(props) {
    return (
        <Image
            source={require("../../../assets/logo-h-dark.svg")}
            style={{ width: 260, height: 64 }}
        />
    );
}

export default SvgLogoDark;
