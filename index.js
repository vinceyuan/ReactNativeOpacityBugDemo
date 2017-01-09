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
  state = {items: [], scale: 1};

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

  scaleItem() {
    let scale = this.state.scale;
    if (scale == 1) {
      scale = 0.5;
    } else {
      scale = 1;
    }
    this.setState({scale: scale});
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
        <View style={[styles.row, {height: 40}]}>
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
        <View style={[styles.row, {height: 40}]}>
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
        <View style={[styles.row, {height: 40}]}>
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
            <Text>Add with animation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.removeItem();
          }}>
            <Text>Remove with animation</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.marginTop]}>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.setState({items: []});
          }}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.marginTop}>Scale by changing width and height</Text>
        <View style={{width: 100, height: 50, backgroundColor: 'gray'}}>
          <View key='1' style={[{width: 100*this.state.scale, height: 50*this.state.scale, backgroundColor: 'green'}]}>
            <Text>scale</Text>
          </View>
        </View>

        <Text style={styles.marginTop}>Scale by setting style transform (No animation at all)</Text>
        <View style={{width: 100, height: 50, backgroundColor: 'gray'}}>
          <View key='1' style={[{width: 100, height: 50, backgroundColor: 'green'}, {transform: [{scale: this.state.scale}]}]}>
            <Text>scale</Text>
          </View>
        </View>

        <View style={[styles.row, styles.marginTop]}>
          <TouchableOpacity style={styles.button} onPress={() => {
            this.scaleItem();
          }}>
            <Text>Scale without animation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.scaleItem();
          }}>
            <Text>Scale with animation</Text>
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
