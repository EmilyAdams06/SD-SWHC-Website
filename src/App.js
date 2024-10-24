/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
// App.js
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase'; // Import your Firebase configuration

const App = () => {
  const [controllers, setControllers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const controllersRef = ref(database, 'controllers');
  console.log('Setting up listener for Controllers');
  onValue(controllersRef, (snapshot) => {
    console.log('Listener triggered');
    const data = snapshot.val();
    console.log('Fetched Controllers Data:', data);
    if (data) {
      const controllersList = Object.entries(data).map(([id, details]) => ({
        id,
        ...details,
      }));
      console.log('Parsed Controllers List:', controllersList);
      setControllers(controllersList);
    } else {
      console.log('No data available');
      setControllers([]);
    }
    setLoading(false);
  });
}, []);

  
  
  
  return (
    <div>
      <h1>Controllers</h1>
      {loading ? (
        <p>Loading controllers...</p>
      ) : controllers.length === 0 ? (
        <p>No controllers available</p>
      ) : (
        <ul>
          {controllers.map((controller, index) => (
            <li key={index}>
              <p><strong>ID:</strong> {controller.id}</p>
              <p><strong>Frequency:</strong> {controller.frequency}</p>
              <p><strong>Temperature:</strong> {controller.temperature}</p>
              <p><strong>Timestamp:</strong> {controller.timestamp}</p>
              <p><strong>User ID:</strong> {controller.user_id}</p>
              <p><strong>Voltage 1:</strong> {controller.voltage_1}</p>
              <p><strong>Voltage 2:</strong> {controller.voltage_2}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  
}

export default App;
