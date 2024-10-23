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
    const controllersRef = ref(database, 'Controllers');
    onValue(controllersRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Fetched Controllers Data:', data);
      if (data) {
        const controllersList = Object.entries(data).map(([id, details]) => ({
          id,
          ...details,
        }));
        setControllers(controllersList);
      } else {
        setControllers([]);
      }
      setLoading(false); // Stop loading once data is fetched
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
              <p><strong>User ID:</strong> {controller.userid}</p>
              <p><strong>Voltage 1:</strong> {controller.voltage1}</p>
              <p><strong>Voltage 2:</strong> {controller.voltage2}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  
}

export default App;
