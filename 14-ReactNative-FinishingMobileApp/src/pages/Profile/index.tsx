import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation();

  const { user } = useAuth()

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Senha obrigatória'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'Você já pode fazer login na aplicação.'
        )

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.'
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

            <Form ref={formRef} onSubmit={handleSignUp}>

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
                  name="oldPassword"
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
                  name="newPassword"
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
