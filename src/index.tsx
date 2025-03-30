import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.scss";
import "./tailwind.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

import { ExpiredProvider } from './state/expired-context';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ExpiredProvider>

        <Suspense>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>

    </ExpiredProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
