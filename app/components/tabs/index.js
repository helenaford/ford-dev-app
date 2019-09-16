import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import style from './style';
import emoji from 'emojilib';

export class Tabs extends PureComponent {
  static propTypes = {
    routes: PropTypes.array,
    handleIndexChange: PropTypes.func,
    renderScene: PropTypes.func.isRequired,
  };

  static defaultProps = {
    handleIndexChange: () => {},
    routes: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: emoji.ordered,
    };
  }

  renderLabel = ({ route }) => {
    const { index } = this.state;
    const { routes } = this.props;
    const focused = routes.indexOf(route) === index;

    return (
      <Text
        key={route}
        style={[style.label, focused ? style.activeLabel : null]}
      >
        {emoji.lib[route]}
      </Text>
    );
  };

  renderScene = ({ route }) => {
    const { index } = this.state;
    const { routes, renderScene } = this.props;

    if (Math.abs(index - routes.indexOf(route)) > 1) {
      return <View key={route} />;
    }

    return renderScene({ route });
  };

  renderTabBar = (props = {}) => (
    <TabBar
      // style={style.tabbar}
      // indicatorStyle={style.indicator}
      // tabStyle={style.tab}
      renderLabel={this.renderLabel}
      scrollEnabled
      lazy
    />
  );

  handleIndexChange = i => {
    this.setState({
      index: i,
    });
  };

  render() {
    const { routes } = this.props;
    const { index } = this.state;
    const navigationState = {
      index,
      routes,
    };
    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width,
    };

    return (
      <TabView
        style={style.container}
        navigationState={navigationState}
        renderScene={this.renderScene}
        onIndexChange={this.handleIndexChange}
        renderTabBar={this.renderTabBar}
        swipeEnabled={false}
        initialLayout={initialLayout}
        useNativeDriver
      />
    );
  }
}

export default { Tabs };
