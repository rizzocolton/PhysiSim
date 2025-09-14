import React from 'react';
//Component imports
import Header from './Header/Header.tsx'
import Card from './Card/Card.tsx'
//Image imports
import physiSimLogo from './assets/physisimlogo.png'

function App() {
  return(
    <>
      <Header/>
      <Card img={physiSimLogo} title="Kinematics" desc="A simple single object simulation of projectile motion in a uniform gravitational field"/>

    </>
  );
}

export default App;
