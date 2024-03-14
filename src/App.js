import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
import './App.css'; // Ensure you have this CSS file for styling

function App() {
    // Corrected the initial state keys
    const [inputs, setInputs] = useState({
      hotIn: '', 
      hotOut: '', 
      coldOut: '', 
      coldIn: '', 
      hot_massFlow: '',
      hot_pressure: '',
      cold_massFlow: '',
      cold_pressure: '',
      heat_load: '',
    });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const getPyAutoGUICommands = () => {
    return [
      `pyautogui.moveTo(153, 167), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.hotIn}')`,
      `pyautogui.moveTo(339, 168), pyautogui.click(),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.hotOut}')`,
      `pyautogui.moveTo(159, 353), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.coldOut}')`,
      `pyautogui.moveTo(336, 352), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.coldIn}')`,
      `pyautogui.moveTo(492, 169), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.hot_volume}')`,
      'pyautogui.moveTo(400, 443),pyautogui.click(),pyautogui.moveTo(230,287),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click()'
    ];
  // 230,287
	// 280,339
	// 333,392
	// 385 443
	// 444,496
  };

  const generateXmlModificationScript = () => {
    const xmlModifications = [
      { line: 90, oldValue: '-1', newValue: inputs.hotIn },
      { line: 91, oldValue: '-1', newValue: inputs.hotOut },
      { line: 101, oldValue: '-1', newValue: inputs.coldIn },
      { line: 102, oldValue: '-1', newValue: inputs.coldOut },
      { line: 93, oldValue: '-1', newValue: inputs.hot_pressure },
      { line: 104, oldValue: '-1', newValue: inputs.cold_pressure },
      { line: 92, oldValue: '-1', newValue: inputs.hot_massFlow },
      { line: 103, oldValue: '-1', newValue: inputs.cold_massFlow },
      { line: 79, oldValue: '-1', newValue: inputs.heat_load},
    ];
  
    return xmlModifications.map(mod => `modify_xml_line('1.xml', ${mod.line}, '${mod.oldValue}', '${mod.newValue}')`).join('\n');
  };
  

  const sendCommand = async () => {
    const userId = "user1"; // Replace with actual user ID if available
    const dateTime = new Date().toISOString();
    const docId = `${userId}_${dateTime}`;
    const commands = getPyAutoGUICommands();
    const xmlModificationScript = generateXmlModificationScript(); // Call the function to generate the script

    try {
      await setDoc(doc(db, "commands", docId), {
        hotIn: inputs.hotIn,
        hotOut: inputs.hotOut,
        coldOut: inputs.coldOut,
        coldIn: inputs.coldIn,
        hot_volume: inputs.hot_massFlow,
        cold_volume:inputs.cold_massFlow,
        hot_pressure:inputs.hot_pressure,
        cold_pressure:inputs.cold_pressure,
        pyAutoGUICommands: commands,
        xmlModificationScript: xmlModificationScript,
        executed: false
      });
      console.log(`Commands stored in Firestore with document ID: ${docId}`);


      setInputs({
        hotIn: '', 
        hotOut: '', 
        coldOut: '', 
        coldIn: '', 
        hot_massFlow: '',
        hot_pressure: '',
        cold_massFlow: '',
        cold_pressure: '',
        heat_load: '',
      });

      
    } catch (error) {
      console.error('Error storing command:', error);
    }
  };

  const handleDesignClick = () => {
    // Add your animation logic here
    console.log("Design button clicked");
  };

  return (
    <div className="container">
      
      <div className="column">
        <label>Hot In</label>
        <input name="hotIn" value={inputs.hotIn} onChange={handleInputChange} />
        <label>Cold Out</label>
        <input name="coldOut" value={inputs.coldOut} onChange={handleInputChange} />
      </div>
      
      <div className="column">
        <label>Hot Out</label>
        <input name="hotOut" value={inputs.hotOut} onChange={handleInputChange} />
        <label>Cold In</label>
        <input name="coldIn" value={inputs.coldIn} onChange={handleInputChange} />
      </div>
      
      <div className='column'>
        <label>Hot Volume</label>
        <input name="hot_massFlow" value={inputs.hot_massFlow} onChange={handleInputChange} />
        
        <label>Cold Volume</label>
        <input name="cold_massFlow" value={inputs.cold_massFlow} onChange={handleInputChange} />
      </div>

      <div className='column'>
        <label>Hot Pressure</label>
        <input name="hot_pressure" value={inputs.hot_pressure} onChange={handleInputChange} />
        
        <label>Cold Pressure</label>
        <input name="cold_pressure" value={inputs.cold_pressure} onChange={handleInputChange} />
      </div>

      
      <div className="row">
        <button onClick={sendCommand}>Send Command</button>
        {/* <button onClick={handleDesignClick}>Design</button> */}
      </div>
    </div>
  );
}

export default App;
