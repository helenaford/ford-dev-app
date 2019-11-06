import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import style from './style';

export const NavBar = ({
  headerStyle,
  leftStyle,
  rightStyle,
  centerStyle,
  leftContent,
  centerContent,
  rightContent,
  elevated,
}) => (
  <View elevation={3} style={style.base}>
    <View style={{ ...style.header, ...headerStyle }}>
      <View style={[style.left, !rightContent ? { flex: 0 } : null, leftStyle]}>{leftContent}</View>
      <View style={{ ...style.center, ...centerStyle }}>{centerContent}</View>
      {rightContent ? (
        <View style={{ ...style.right, ...rightStyle }}>{rightContent}</View>
      ) : (
        <View style={{ ...style.noRight }} />
      )}
    </View>
 </View>
);

NavBar.propTypes = {
  leftContent: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  centerContent: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  rightContent: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  headerStyle: PropTypes.object,
  leftStyle: PropTypes.object,
  centerStyle: PropTypes.object,
  rightStyle: PropTypes.object,
  elevated: PropTypes.bool,
};

NavBar.defaultProps = {
  leftContent: undefined,
  centerContent: undefined,
  rightContent: undefined,
  headerStyle: {},
  leftStyle: {},
  centerStyle: {},
  rightStyle: {},
  elevated: true,
};

export default { NavBar };
