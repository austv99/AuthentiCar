import React from 'react';
// import logo from './logo.svg';
import Main from './containers/MainContainer';
import Search from './containers/SearchContainer';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={Search} />
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
