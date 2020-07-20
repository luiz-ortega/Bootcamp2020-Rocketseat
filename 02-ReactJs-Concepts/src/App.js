import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import './App.css'
import background from './assets/background.jpg'

import api from './services/api'

function App() {
    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end' ])

    useEffect(() => {
        api.get('/projects').then(response => setProjects(response.data) )
    }, [])

    function addProject() {
        // setProjects([...projects, `Novo projeto ${Date.now()}`])
        api.post('/projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Luiz Ortega'
        }).then(response => setProjects([...projects, response.data]))

        setProjects([...projects, `Novo projeto ${Date.now()}`])
    }

    return (
        <>
            {/* <img src={background} /> */}
            <Header title="ReactJs">
                <ul >
                    {projects.map((project, index) => 
                        <li key={index}>
                            <span>{project.title} - by {project.owner}</span>
                        </li> 
                    )}
                </ul>
            </Header>
            <button type="button" onClick={addProject}>Adicionar Projeto</button>
        </>
    )
};

export default App;