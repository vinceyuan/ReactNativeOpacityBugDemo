# ReactNativeOpacityBugDemo

This is a demo app to show react-native opacity bug on Android when LayoutAnimation is enabled.

From the following screenshot, you can see the opacity does not work when LayoutAnimation is enabled. I figured out a workaround for texts. Add alpha to text's color.

![Screenshot](https://github.com/vinceyuan/ReactNativeOpacityBugDemo/raw/master/ReactNativeOpacityBug.gif)

Reproducible with React Native 0.38.0 and 0.40.0 on Android 5.0.0

Author: Vince Yuan
