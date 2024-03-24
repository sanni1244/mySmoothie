import React from 'react';
import {smoothieMenu2} from "./smoothies.js"
import {smoothieMenu1} from "./smoothies.js"

import logo from '/logo.png';

    
const MenuPage = () => {
  // Sample smoothie menu data
  
  return (
    <div className="menu-page">
      <header className='head-style'>
        <img src={logo} alt="Smoothie Business Logo" />
        <h1>Miss Mo Healthy Juice And Smoothie</h1>
        <p className='small-package'>You can customize your own fruit mix!</p>
        <p className='small-package'>phone number: <a className='' href="tel:07046267731">07046267731</a></p>
      </header>
      <h3 className='style-menu'>Menu 1</h3>
      <div className="smoothie-list">
        {smoothieMenu1.map((smoothie, index) => (
          <div className="smoothie-item" key={index}>
            <img className='img-style' src={smoothie.imageSrc} alt={smoothie.name} />
            <div className="smoothie-details">
              <h2>{smoothie.name}</h2>
              <p className='smoothie-details'>{smoothie.description}</p>
              <p className="price">{"₦" + smoothie.price}</p>
            </div>
          </div>
        ))}
      </div>
      <br /><br />
      <hr /> <br /><br />
      <h3 className='style-menu'>Menu 2</h3>
      <div className="smoothie-list">
        {smoothieMenu2.map((smoothie, index) => (
          <div className="smoothie-item" key={index}>
            <img className='img-style' src={smoothie.imageSrc} alt={smoothie.name} />
            <div className="smoothie-details">
              <h2>{smoothie.name}</h2>
              <p className='smoothie-details'>{smoothie.description}</p>
              <p className="price">{"₦" + smoothie.price}</p>
            </div>
          </div>
        ))}
      </div>
      <br /><br />
      <hr /> <br /><br />
    </div>
  );
};


export default MenuPage;
