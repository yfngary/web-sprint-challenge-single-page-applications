import * as yup from 'yup';

const formSchema = yup.object().shape({
    nameInput: yup.string().trim().required('Name is required').min(2, 'name must be at least 2 characters'),
    pizzaSize: yup.string(),
    specialText: yup.string(),
    topping1: yup.string(),
    topping2: yup.string(),
    topping3: yup.string(),
    topping4: yup.string()
})

export default formSchema;