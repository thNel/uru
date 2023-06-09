import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import {router} from "./routes";
import {RecoilRoot} from "recoil";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  </React.StrictMode>,
)
