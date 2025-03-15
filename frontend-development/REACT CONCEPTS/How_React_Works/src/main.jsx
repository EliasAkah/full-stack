import {scan} from "react-scan";
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

scan({
    enabled:true
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
