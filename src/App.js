
import { useState } from 'react';
import PanTime from './PanTime';
import PanDialog from './PanDialog';
import './App.css';


function App() {
  const [dialogOpen, setDialogOpen] = useState(true)

  return (
    <div className="App">
      {
        dialogOpen === true ? <PanDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} /> : <PanTime/>
      }
       
    </div>
  );
}

export default App;
