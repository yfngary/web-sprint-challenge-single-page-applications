import formSchema from './Validation/formSchema';
import * as yup from 'yup';
import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';

const StyledH2 = styled.h2`
text-align: center;
`

const initialFormErrors = {
    nameInput: '',
    pizzaSize: '',
    specialText: '',
    topping1: '',
    topping2: '',
    topping3: '',
    topping4: ''
};


export default function Pizza(props) {
    const {
        submit,
        disabled,
    } = props

    const [form, setForm] = useState({ nameInput: "", pizzaSize: "", specialText: "", topping1: false, topping2: false, topping3: false, topping4: false });
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const validate = (evt) => {
        yup.reach(formSchema, evt.target.name)
            .validate(evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value)
            .then(() => setFormErrors({ ...formErrors, [evt.target.name]: "" }))
            .catch(err => {
                console.log(err);
                setFormErrors({ ...formErrors, [evt.target.name]: err.errors[0] })
            })
    }

    const onChange = (evt) => {
        evt.persist();
        validate(evt);
        setForm({
            ...form,
            [evt.target.name]: evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value
        })
    }

    const postNewOrder = newOrder => {
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => setForm(initialFormErrors))
    }

    const formSubmit = (evt) => {
        evt.preventDefault();
        const newOrder = {
            nameInput: form.nameInput,
            pizzaSize: form.pizzaSize,
            specialText: form.specialText,
            topping1: form.topping1,
            topping2: form.topping2,
            topping3: form.topping3,
            topping4: form.topping4
        }
        postNewOrder(newOrder);
    }

    return (
        <div>
            <StyledH2>Customize Your Pizza Here</StyledH2>
            <p>{formErrors.nameInput}</p>
            <form id='pizza-form' onSubmit={formSubmit}>
                <label>Customer Name:
                    <input
                        id='name-input'
                        name='nameInput'
                        type='text'
                        value={form.nameInput}
                        onChange={onChange}
                        placeholder="Who's pizza is this?"
                    />
                </label>
                <label>Pizza Size:
                    <select name='pizzaSize' id='size-dropdown' onChange={onChange} value={form.pizzaSize}>
                        <option value='smallPizza' id='small-pizza'>Small Pizza</option>
                        <option value='mediumPizza' id='medium-pizza'>Medium Pizza</option>
                        <option value='largePizza' id='large-pizza'>Large Pizza</option>
                    </select>
                </label>
                <label>Special instructions:
                    <input
                        id='special-text'
                        name='specialText'
                        type='text'
                        value={form.specialText}
                        onChange={onChange}
                        placeholder="Any specific instructions?"
                    /><br />
                </label>
                <input
                    type='checkbox'
                    id='topping1'
                    name='topping1'
                    value='pepperoni'
                    checked={form.pepperoni}
                    onChange={onChange}
                />
                <label htmlFor='topping1'>Pepperoni</label><br />
                <input
                    type='checkbox'
                    id='topping2'
                    name='topping2'
                    value='bacon'
                    checked={form.bacon}
                    onChange={onChange}
                />
                <label htmlFor='topping2'>Bacon</label><br />
                <input
                    type='checkbox'
                    id='topping3'
                    name='topping3'
                    value='pineapple'
                    checked={form.pineapple}
                    onChange={onChange}
                />
                <label htmlFor='topping3'>Pineapple</label><br />
                <input
                    type='checkbox'
                    id='topping4'
                    name='topping4'
                    value='peppers'
                    checked={form.peppers}
                    onChange={onChange}
                />
                <label htmlFor='topping4'>Peppers</label><br />
                <button id='order-button' onSubmit={formSubmit}>Submit order</button>
            </form>
        </div>
    )
}