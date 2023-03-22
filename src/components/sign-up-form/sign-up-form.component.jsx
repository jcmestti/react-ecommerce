import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import formInput from '../form-input/form-input.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('User creation encontered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event);
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div>
            <h1>Sign up with your email anda password</h1>
            <form onSubmit={handleSubmit}>
                <formInput
                    label='Name'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />
                
                <formInput
                    label='Email'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                
                <formInput
                    label='Password'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                
                <formInput
                    label='Confirm Password'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword}
                />
                
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )

}

export default SignUpForm;

