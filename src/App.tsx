import React from 'react';
import Header from './components/header/Header';
import UserTable from './components/table/UserTable';
import SearchedUser from './components/popup/SearchedUser';

function App() {
  
  return (
    <div>
      <Header/>
      <SearchedUser/>
      <UserTable/>
    </div>
  );
}

export default App;
