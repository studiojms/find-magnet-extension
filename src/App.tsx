import { FC } from 'react';

import { MagnetContent } from './components/MagnetContent';

import logo from './assets/logo.svg';
import './assets/styles.css';

const App: FC = () => {
  return (
    <div className="container">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <MagnetContent />
    </div>
  );
};

export default App;
