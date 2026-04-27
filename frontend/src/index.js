// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import { MantineProvider } from '@mantine/core';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <MantineProvider defaultColorScheme="light">
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </MantineProvider>
//   </React.StrictMode>
// );



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import {
// MantineProvider,
// localStorageColorSchemeManager
// } from '@mantine/core';

// const colorSchemeManager = localStorageColorSchemeManager({
// key:'mantine-color-scheme'
// });

// ReactDOM.createRoot(document.getElementById('root')).render(
// <React.StrictMode>
// <MantineProvider
// defaultColorScheme="light"
// colorSchemeManager={colorSchemeManager}
// >
// <AuthProvider>
// <App/>
// </AuthProvider>
// </MantineProvider>
// </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
<MantineProvider defaultColorScheme="light">
<AuthProvider>
<App />
</AuthProvider>
</MantineProvider>
</React.StrictMode>
);