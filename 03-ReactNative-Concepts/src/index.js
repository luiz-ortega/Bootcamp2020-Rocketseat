import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects([]);
    loadProjects();
  }, []);

  async function loadProjects() {
    const response = await api.get('/projects');

    setProjects(response.data);
  }

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: 'Novo Projeto',
      owner: 'Eu!',
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={styles.container}
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.title}>
              {' '}
              {project.title} - by {project.owner}
            </Text>
          )}
        />
      </SafeAreaView>

      <TouchableOpacity
        onPress={handleAddProject}
        activeOpacity={0.5}
        style={styles.button}>
        <Text style={styles.buttonText}>Adicioncar Projeto</Text>
      </TouchableOpacity>

      {/* <ScrollView style={styles.container}>
        {projects.map((project) => (
          <Text key={project.id} style={styles.title}>
            {project.title} - by {project.owner}
          </Text>
        ))}
      </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
    // // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#fff',
    margin: 10,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
