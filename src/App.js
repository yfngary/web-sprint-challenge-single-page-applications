import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import Pizza from "./Pizza";
import "./App.css";
import axios from "axios";

import formSchema from "./Validation/formSchema";
import * as yup from 'yup';

import styled from 'styled-components'

const StyledHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin: 20px 20px;
border-bottom-style: dotted; 
`


// }

const App = () => {
 
  return (
    <div>
      <StyledHeader>
        <h1>Lambda Pizza Shop!</h1>
        <nav>
          <Link id="order-pizza" to="/pizza">Order Pizza</Link>
          <Link to="/">Homepage</Link>
        </nav>
      </StyledHeader>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/pizza'>
          <Pizza />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
