import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Vibration } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResetTimerButton = props => (
  <TouchableHighlight style={styles.reset_button} onPress={props.onPressAction}>
    <Text style={styles.reset_button_text}> {props.title} </Text>
  </TouchableHighlight>
);

class TimerCardComponent extends Component {
  render() {
    var total_seconds = this.props.count;
    var minutes = Math.floor(total_seconds / 60);
    var seconds = total_seconds - minutes * 60;

    var secondsString = seconds < 10 ? '0'.concat(seconds) : seconds.toString();
    var minutesString = minutes < 10 ? '0'.concat(minutes) : minutes.toString();
    var formattedTimeString = minutesString.concat(' : ', secondsString);
    return (
      <LinearGradient colors={['#5a5aeb', '#00d4ff']} style={styles.timer_card}>
        <Text style={styles.timer_header}> {this.props.title} </Text>
        <Text style={styles.timer}>{formattedTimeString}</Text>
      </LinearGradient>
    );
  }
}

class TimerComponent extends Component {
  state = {
    timer1: 0,
    timer2: 0,
    currentTimer: 1,
  };

  componentDidMount() {
    this.timer = setInterval(this.incrementTimer1, 1000);
  }

  componentDidUpdate() {
    if (this.state.timer1 > 72) {
      this.resetTimers();
      Vibration.vibrate([500, 500, 500]);
      clearInterval(this.timer);
      this.timer = setInterval(this.incrementTimer2, 1000);
    }

    if (this.state.timer2 > 5) {
      this.resetTimers();
      Vibration.vibrate([500, 500, 500]);
      clearInterval(this.timer);
      this.timer = setInterval(this.incrementTimer1, 1000);
    }
  }

  incrementTimer1 = () => {
    this.setState(prevState => ({ timer1: prevState.timer1 + 1 }));
  };

  incrementTimer2 = () => {
    this.setState(prevState => ({ timer2: prevState.timer2 + 1 }));
  };

  resetTimers = () => {
    this.setState({ timer1: 0, timer2: 0 });
  };
  resetTimer1 = () => {
    this.setState({ timer1: 0 });
  };

  resetTimer2 = () => {
    this.setState({ timer2: 0 });
  };

  render() {
    return (
      <View>
        <TimerCardComponent count={this.state.timer1} title={'Work Timer'} />
        <TimerCardComponent count={this.state.timer2} title={'Break Timer'} />
        <View style={styles.button_container}>
          <ResetTimerButton
            onPressAction={this.resetTimer1}
            title={'Reset Timer 1'}
          />
          <ResetTimerButton
            onPressAction={this.resetTimer2}
            title={'Reset Timer 2'}
          />
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <TimerComponent />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timer: {
    fontSize: 48,
    textAlign: 'center',
  },

  timer_header: {
    fontSize: 56,
    textAlign: 'center',
  },

  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  reset_button: {
    justifyContent: 'center',
    margin: 16,
    padding: 8,
    height: 48,
    backgroundColor: '#1877F2',
    borderRadius: 8,
  },

  reset_button_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  timer_card: {
    margin: 8,
    padding: 8,
    flex: 1,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 240,

    justifyContent: 'center',
  },
});
