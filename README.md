# ReactNativeOpacityBugDemo

This is a demo app to show react-native opacity bug on Android when LayoutAnimation is enabled. You can run it directly at https://rnplay.org/apps/JbdOpQ

In the following screenshot, the odd numbered view/text's opacity should be 0.2. If we create them without LayoutAnimation, everything is good. But when we do with LayoutAnimation, the style opacity is not respected. (I figured out a workaround for texts. Add alpha to text's color.)

![Screenshot](https://github.com/vinceyuan/ReactNativeOpacityBugDemo/raw/master/ReactNativeOpacityBug.gif)

Reproducible with React Native 0.33+ on Android 5.0.0

I reported this bug https://github.com/facebook/react-native/issues/11769

Solution:

Set correct opacity value in OpacityAnimation. You can try my fix on branch fix-react-native-issue-11769 which compiles react-native from source code of my react native fork.

A pull request has been created. https://github.com/facebook/react-native/pull/11770


Author: Vince Yuan
