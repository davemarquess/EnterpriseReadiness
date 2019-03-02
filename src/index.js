import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from "react-apollo";
import App from './components/App.jsx';

render((
  // <ApolloProvider>
  <App />
  // </ApolloProvider>
), document.getElementById('root'));
