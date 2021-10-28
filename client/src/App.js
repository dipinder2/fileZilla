import './App.css';
import LoginRegForm from './components/LoginRegForm'
import Dashboard from './components/Dashboard'
import {Router} from '@reach/router'
import {useState,createContext} from 'react'

export var FilesContext = createContext();

function App() {
  const [myfiles,setMyFiles] = useState();
  const [newUpload,setNewUpload] = useState(false)
  return (
    <div className="App">
      <FilesContext.Provider value={{myfiles,newUpload,setNewUpload }}>
        <Router>
          <LoginRegForm path="/"/>
          <Dashboard setMyFiles={setMyFiles} path="/dashboard"></Dashboard>
        </Router>
      </FilesContext.Provider>
    </div>
  );
}

export default App;
