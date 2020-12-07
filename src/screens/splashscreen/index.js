import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  StatusBar
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
// import {Colors, Fonts} from '../../constants/theme';


export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.7);
  }
  componentWillMount() {
    this.spring();
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'socialLogin'}],
        }),
      );
    }, 3200);
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="gold" />
          <Animated.View
            style={{
              transform: [{scale: this.springValue}],
            }}>
                <Text style={{fontSize:30}}>POURBOIR'</Text>
                <Text>More than tips</Text>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
