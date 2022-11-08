import React from "react";

import {
    Route,
    Link,
    Switch,
    useParams,
    useRouteMatch,
    useHistory
} from 'react-router-dom';

import styled from 'styled-components'
import Pizza from "./Pizza";

const StyledHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 20px 20px;
border-bottom-style: dotted; 
`

const StyledButton = styled.button`
width: 120px;
height: 70px;
font-size: 20px;
`

export default function Homepage(props) {
    const history = useHistory();
    const routeToPizza = () => {
        history.push("/pizza")
    }
    return (
        <div className="app">
            <div className="hero-image">
                <div className="hero-text">
                    <h2>Your favorite Pizza, delivered while coding</h2>
                    <StyledButton id="order-pizza" onClick={routeToPizza}>Order Pizza</StyledButton>
                </div>
                <Route exact path='/pizza'>
                    <Pizza />
                </Route>
            </div>
        </div>
    )
}

