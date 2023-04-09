import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import configureStore from './Redux/store'
import { BrowserRouter as Router } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';



const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
      <Router>
        <App />
      </Router>
  </Provider>,
);
