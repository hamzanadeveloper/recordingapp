import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginPage from "./LoginPage";
import HistoryPage from "./HistoryPage";
import RecordPage from "./RecordPage";
import ProfilePage from "./ProfilePage"

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    switch (routeName) {
        case "History":
            iconName = "md-menu";
            break;
        case "Record":
            iconName = "md-headset";
            break;
        case "Profile":
            iconName = "md-person";
            break;
    }

    return <Ionicons name={iconName} size={25} color={tintColor} />;
};

const HistoryStack = createStackNavigator({
    History: HistoryPage
});

const RecordStack = createStackNavigator({
    Record: RecordPage
});

const ProfileStack = createStackNavigator({
    Profile: ProfilePage
});

const MainStack = createBottomTabNavigator(
    {
        History: HistoryStack,
        Record: RecordStack,
        Profile: ProfileStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor)
        }),
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
        }
    }
);

const RootStack = createStackNavigator(
    {
        Login: {
            screen: LoginPage
        },
        Main: {
            screen: MainStack
        }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

export default createAppContainer(RootStack);