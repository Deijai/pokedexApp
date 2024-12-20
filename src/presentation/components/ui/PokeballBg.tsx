import React, { useContext } from 'react'
import { Image, ImageStyle, StyleProp, View, ViewStyle } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({ style }: Props) => {
    const { isDark } = useContext(ThemeContext);
    const pokeballmage = isDark 
    ? require('../../../assets/pokeball-light.png') 
    : require('../../../assets/pokeball-dark.png');



  return (
    <Image source={pokeballmage} style={[{width: 300, height: 300, opacity: 0.3}, style]}  />
  )
}
