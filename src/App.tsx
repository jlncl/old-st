import React, { Suspense } from 'react';
import './App.css';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { TitleBar } from './common/TitleBar/TitleBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './view/Home';

let theme = createMuiTheme({
  typography: {
    fontFamily: `'Space Mono', 'monospace'`,
    body1: {
      fontSize: 12,
    }
  },
});
theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="scrollableDiv container" style={{height: '100%', overflowY: 'auto' }}>
          <TitleBar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
