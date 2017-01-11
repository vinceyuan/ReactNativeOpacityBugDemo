/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

export default class OpacityBugDemo extends Component {
  state = {items: []};

  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  addItem() {
    let count = this.state.items.length;
    this.setState({items: [count+1, ...this.state.items]});
  }

  removeItem() {
    let count = this.state.items.length;
    if (count > 0) {
      let items = [...this.state.items];
      items.shift();
      this.setState({items: items});
    }
  }

  render() {
    customAnimationConfig = {
      duration: 700,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
      },
    };

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is a demo to show the opacity issue on Android when LayoutAnimation is enabled.
        </Text>

        <Text>
          Opacity 0.2 on odd-numbered texts:
        </Text>
        <View style={[styles.row, {height: 40}]}>
          {
            this.state.items.map((item, index) => {
              return (
                <Text key={item}
                style={item%2==0?null:{opacity: 0.2}}>
                  {'Text ' + item.toString() + ' '}
                </Text>
              );
            })
          }
        </View>

        <Text>
          Opacity 0.2 on odd-numbered views:
        </Text>
        <View style={[styles.row, {height: 40}]}>
          {
            this.state.items.map((item, index) => {
              return (
                <View key={item}
                  style={[{backgroundColor: 'green'}, item%2==0?null:{opacity: 0.2}]}>
                  <Text>{'Text ' + item.toString() + ' '}</Text>
                </View>
              );
            })
          }
        </View>

        <Text>
          Transform scale 0.5 on odd-numbered views:
        </Text>
        <View style={[styles.row, {height: 40}]}>
          {
            this.state.items.map((item, index) => {
              return (
                <View key={item}
                  style={[{backgroundColor: 'green'}, item%2==0?null:{transform: [{scale: 0.5}]}]}>
                  <Text>{'Text ' + item.toString() + ' '}</Text>
                </View>
              );
            })
          }
        </View>

        <Text>
          Workaround opacity issue for texts by adding alpha to color:
        </Text>
        <View style={[styles.row, {height: 40}]}>
          {
            this.state.items.map((item, index) => {
              return (
                <Text key={item}
                style={{color: '#777777' + (item%2==0?'ff':'33')}}>
                  {'Text ' + item.toString() + ' '}
                </Text>
              );
            })
          }
        </View>

        <View style={[styles.row, styles.marginTop]}>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.addItem();
          }}>
            <Text>Add without animation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.removeItem();
          }}>
            <Text>Remove without animation</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.marginTop]}>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.addItem();
          }}>
            <Text>Add with opacity animation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.removeItem();
          }}>
            <Text>Remove with opacity animation</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.marginTop]}>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.configureNext(customAnimationConfig);
            this.addItem();
          }}>
            <Text>Add with scaleXY animation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.configureNext(customAnimationConfig);
            this.removeItem();
          }}>
            <Text>Remove with scaleXY animation</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.marginTop]}>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.setState({items: []});
          }}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
  marginTop: {
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
  },
});

AppRegistry.registerComponent('OpacityBugDemo', () => OpacityBugDemo);
