import React from 'react';
import './app.css';
import { useAppSelector } from './hooks/hooks';
import Header from './components/header/Header';
import UserTable from './components/table/UserTable';
import SearchForm from './components/popup/SearchForm';

function App() {
  const popupVisibility = useAppSelector(state => state.ui.popup);
  
  return (
    <div>
      <Header/>
      <div className={popupVisibility? `app_main`: ``}>
        <UserTable/>
        <SearchForm/>
      </div>
    </div>
  );
}

export default App;
