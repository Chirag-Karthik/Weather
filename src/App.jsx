import './App.css'
import './index.css'
import { useState, useEffect } from 'react';
import CustomLocation from './CustomLocation';
import YourLocation from './YourLocation';


function App() {
  const [enteredLocation, setEnteredLocation] = useState(false);


  return (
    <>
      {enteredLocation ?<CustomLocation/> : <YourLocation/>}
      <div className="button-container">
        <button className='custom-location' onClick={() => setEnteredLocation(!enteredLocation)}>
          {enteredLocation ? "Check Your Location" : "Different Location"}
        </button>
      </div>
    </>
  )
}

export default App
