import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
        } catch (error) {
            console.log('User creation encontered an error', error);
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
                <label>Name</label>
                <input type='text' required onChange={handleChange} name='displayName' value={displayName}/>

                <label>Email</label>
                <input type='email' required onChange={handleChange} name='email' value={email}/>

                <label>Password</label>
                <input type='password' required onChange={handleChange} name='password' value={password}/>

                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )

}

export default SignUpForm;

