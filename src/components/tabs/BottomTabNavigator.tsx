import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  FirstScreen,
  SecondScreen,
  ThirdScreen,
  FourthScreen,
} from '@src/screens';
import CustomBottomTab from '@src/components/tabs/CutomBottomTab';

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Setting: undefined;
  Profile: undefined;
};

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name='Home' component={FirstScreen} />
      <Tab.Screen name='Search' component={SecondScreen} />
      <Tab.Screen name='Setting' component={ThirdScreen} />
      <Tab.Screen name='Profile' component={FourthScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
