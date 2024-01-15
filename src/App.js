import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
import './App.css'; // Ensure you have this CSS file for styling

function App() {
  const [inputs, setInputs] = useState({ hotIn: '', hotOut: '', coldOut: '', coldIn: '', field5: '' });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const getPyAutoGUICommands = () => {
    return [
      `pyautogui.moveTo(153, 167), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.hotIn}')`,
      `pyautogui.moveTo(339, 168), pyautogui.click(),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.hotOut}')`,
      `pyautogui.moveTo(159, 353), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.coldOut}')`,
      `pyautogui.moveTo(336, 352), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.coldIn}')`,
      `pyautogui.moveTo(492, 169), pyautogui.click(), pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'),pyautogui.press('backspace'), pyautogui.typewrite('${inputs.field5}')`,
      'pyautogui.moveTo(400, 443),pyautogui.click(),pyautogui.moveTo(230,287),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click(),pyautogui.moveTo(387, 444),pyautogui.click()'
    ];
  // 230,287
	// 280,339
	// 333,392
	// 385 443
	// 444,496
  };

  const sendCommand = async () => {
    const userId = "user1"; // Replace with actual user ID if available
    const dateTime = new Date().toISOString();
    const docId = `${userId}_${dateTime}`;
    const commands = getPyAutoGUICommands();

    try {
      await setDoc(doc(db, "commands", docId), {
        hotIn: inputs.hotIn,
        hotOut: inputs.hotOut,
        coldOut: inputs.coldOut,
        coldIn: inputs.coldIn,
        field5: inputs.field5,
        pyAutoGUICommands: commands,
        executed: false
      });
      console.log(`Commands stored in Firestore with document ID: ${docId}`);
      setInputs({ hotIn: '', hotOut: '', coldOut: '', coldIn: '', field5: '' });
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
      <div className="row">
        <label>Volume</label>
        <input name="field5" value={inputs.field5} onChange={handleInputChange} />
        <button onClick={sendCommand}>Send Command</button>
        <button onClick={handleDesignClick}>Design</button>
      </div>
    </div>
  );
}

export default App;
