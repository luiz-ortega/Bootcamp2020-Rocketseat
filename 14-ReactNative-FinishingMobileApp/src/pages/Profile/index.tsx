import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Title, UserAvatarButton, UserAvatar, FormContainer,
  ButtonContainer, BackButton
} from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation();

  const { user, updateUser } = useAuth()

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});


        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'No mínimo 6 dígitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: val => !!val,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'No mínimo 6 dígitos'),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert(
          'Perfil atualizado com sucesso!'
        )

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.'
        )
      }
    },
    [navigation]
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={() => { }}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <Title>Meu perfil</Title>

            <Form initialData={{ name: user.name, email: user.email }} ref={formRef} onSubmit={handleSignUp}>

              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus()
                }}
              />


              <FormContainer>
                <Input
                  ref={oldPasswordInputRef}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus()
                  }}
                  textContentType="newPassword"
                  name="old_password"
                  icon="lock"
                  placeholder="Senha antiga"
                />
                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    confirmPasswordInputRef.current?.focus()
                  }}
                  textContentType="newPassword"
                  name="password"
                  icon="lock"
                  placeholder="Nova senha"
                />
                <Input
                  ref={confirmPasswordInputRef}
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                  textContentType="newPassword"
                  name="password_confirmation"
                  icon="lock"
                  placeholder="Confirmar nova senha"
                />
              </FormContainer>
            </Form>
            <ButtonContainer>
              <Button onPress={() => formRef.current?.submitForm()}>Confirmar mudanças</Button>
            </ButtonContainer>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
export default Profile
