import React, { useContext,useState } from "react";

import { IS_DESKTOP, Spacing } from "../../constants/dimension";
import Button from "../Button";
import useLinker from "../../hooks/useLinker";

export default function Option({
    link = null,
    clickable = true,
    size,
    onClick = null,
    color,
    header,
    subheader = null,
    icon,
    active = false,
    id
  }: {
    link?: string | null
    clickable?: boolean
    size?: number | null
    onClick?: null | (() => void)
    color: string
    header: string
    subheader: React.ReactNode | null
    icon: string
    active?: boolean
    id: string
  }){
    let onPressLink = ()=>{};
    if(link){
        onPressLink = useLinker(link, "", "_blank");
    }
    
    return (
        <Button
            size={"large"}
            // icon ={}
            color={color}
            onPress={onClick!=null? async()=>{onClick()}:link!=null?onPressLink:async()=>{}}
            title={header}
            containerStyle={{ width: IS_DESKTOP ? 440 : "100%" }}
            style={{ marginTop: Spacing.small, marginHorizontal: Spacing.normal }}
        />
    );
  }