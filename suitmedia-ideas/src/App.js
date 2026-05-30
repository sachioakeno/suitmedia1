import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import IdeasSection from './components/IdeasSection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Banner />
        <IdeasSection />
      </main>
    </div>
  );
}

export default App;
