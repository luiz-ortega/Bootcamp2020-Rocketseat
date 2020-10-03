import styled from 'styled-components/native';
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  /* justify-content: center; */
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
  text-align: left;
`;

export const FormContainer = styled.View`
    margin-top: 16px;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  margin-top: 16px;
  align-self: center;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 20px;
`;

export const BackButton = styled.TouchableOpacity`
 margin-top: 40px
`;
