import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import './index.scss'
import {ThemeProvider} from './components/Theme/ThemeProvider';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

