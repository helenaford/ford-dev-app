import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import FontAwesome5 from '../../../node_modules/react-native-vector-icons/FontAwesome5';

import style from './style';

@withNavigation
class _BackButton extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.didFocusSubscription = navigation.addListener('didFocus', () =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.willBlurSubscription = undefined;
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.willBlurSubscription = navigation.addListener('willBlur', () =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.didFocusSubscription && this.didFocusSubscription.remove) {
      this.didFocusSubscription.remove();
    }
    if (this.willBlurSubscription && this.willBlurSubscription.remove) {
      this.willBlurSubscription.remove();
    }
  }

  onBackButtonPressAndroid = () => {
    if (this.onBack()) {
      return true;
    }
    return false;
  };

  onBack = () => {
    const { navigation } = this.props;
    return navigation.goBack ? navigation.goBack() : navigation.navigate('Home');
  };

  render() {
    return (
      <TouchableOpacity transparent onPress={this.onBack} style={style.backButton}>
        <FontAwesome5 name="chevron-left" solid size={20} style={style.icon} />
      </TouchableOpacity>
    );
  }
}

function select() {
  return {};
}

export const NavBackButton = connect(select)(_BackButton);

export default { NavBackButton };
