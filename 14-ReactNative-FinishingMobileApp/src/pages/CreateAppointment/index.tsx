import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native'

import {
  Container, Header, BackButton, HeaderTitle,
  UserAvatar, ProvidersList, ProvidersListContainer,
  ProviderContainer, ProviderAvatar, ProviderName,
  Title, Calendar, OpenDatePickerButton, OpenDatePickerButtonText
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const avatarPlaceHolder = 'https://api.adorable.io/avatars/285/abott@adorable.png'

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const route = useRoute();
  const { goBack } = useNavigation()
  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    });
  }, []);

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      setAvailability(response.data)
    });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, [])

  const handleToogleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, [])

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date)
    }
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>



      <ProvidersListContainer  >
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) =>
            <ProviderContainer onPress={() => handleSelectProvider(provider.id)} selected={provider.id === selectedProvider}>
              <ProviderAvatar source={{ uri: provider.avatar_url !== 'null' ? provider.avatar_url : avatarPlaceHolder }} />
              <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
            </ProviderContainer>
          }
        />
      </ProvidersListContainer>
      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToogleDatePicker}>
          <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker &&
          <DateTimePicker
            mode="date"
            display="calendar"
            textColor="#f4ede8"
            value={selectedDate}
            onChange={handleDateChange}
          />}

      </Calendar>

    </Container>
  )

};

export default CreateAppointment;
