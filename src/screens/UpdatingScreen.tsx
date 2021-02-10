import React from "react";
import { Platform } from "react-native";

import BackgroundImage from "../components/BackgroundImage";
import Border from "../components/Border";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import Text from "../components/Text";
import Title from "../components/Title";

import WebFooter from "../components/web/WebFooter";

import useLinker from "../hooks/useLinker";
import useTranslation from "../hooks/useTranslation";
import Screen from "./Screen";
import { Spacing } from "../constants/dimension";

const UpdatingScreen = () => {
    const t = useTranslation();
    const onPressHome = useLinker("https://www.1-b.tc", "", "_blank");
    return (
        <Screen>
            <Container>
                <BackgroundImage />
                <Content>
                    <Title text={t("upgrading")} />
                    <Text light={true} style={{ marginBottom: Spacing.large }}>
                        {t("upgrading-desc")}
                    </Text>

                    <Button title={t("home-page")} onPress={onPressHome} />
                    <Border />
                </Content>
                {Platform.OS === "web" && <WebFooter />}
            </Container>
        </Screen>
    );
};

export default UpdatingScreen;
