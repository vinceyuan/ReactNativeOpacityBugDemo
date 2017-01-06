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
    //this.setState({items: [count+2, count+1, ...this.state.items]});
    this.setState({items: [count+1, ...this.state.items]});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is a demo to show the opacity issue on Android when LayoutAnimation is enabled.
        </Text>

        <Text>
          Opacity on texts:
        </Text>
        <View style={[styles.row, {width: 300, height: 40}]}>
          {
            this.state.items.map((item, index) => {
              let width = 100;
              let left = index * width;
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
          Opacity on views:
        </Text>
        <View style={[styles.row, {width: 300, height: 40}]}>
          {
            this.state.items.map((item, index) => {
              let width = 100;
              let left = index * width;
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
          Workaround opacity issue for texts by adding alpha to color:
        </Text>
        <View style={[styles.row, {width: 300, height: 40}]}>
          {
            this.state.items.map((item, index) => {
              let width = 100;
              let left = index * width;
              return (
                <Text key={item}
                style={{color: '#777777' + (item%2==0?'ff':'33')}}>
                  {'Text ' + item.toString() + ' '}
                </Text>
              );
            })
          }
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.setState({items: []});
          }}>
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.addItem();
          }}>
            <Text>Add without animation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.addItem();
          }}>
            <Text>Add with animation</Text>
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
