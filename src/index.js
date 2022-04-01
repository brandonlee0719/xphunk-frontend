import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from "./App";
import Detail from "./Detail";

function getLibrary(provider) {
  return new Web3(provider)
}

const rootElement = document.getElementById("root");
render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/details/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </Web3ReactProvider>,
  rootElement
);