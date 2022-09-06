import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [userLogin, setUserLogin] = useState({ username: '', password: ''})
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

    const register = async (e) => {
        e.preventDefault();
        // Write your register code here

        const stringifyBody = JSON.stringify({ username: user.username, password: user.password})
        console.log(stringifyBody)


        const res = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifyBody
        })
        
        const registeredUser = await res.json()

        setRegisterResponse(registeredUser.user.username)
    };

    const login = async (e) => {
        e.preventDefault();
        // Write your login code here

        const stringifyBody = JSON.stringify( { username: userLogin.username, password: userLogin.password})
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifyBody
        })

        const existingUser = await res.json()

        localStorage.setItem('token', existingUser.token)

        setLoginResponse(existingUser.token)
        
    };






    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });

    }

    const handleLoginChange = (e) => {
        const { value, name } = e.target;

        setUserLogin({
            ...userLogin,
            [name]: value
        })

    }

    return (
        <div className="App">

            <h1>Register</h1>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {registerResponse && <p>{registerResponse}</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={userLogin.username}
                        handleChange={handleLoginChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={userLogin.password}
                        handleChange={handleLoginChange}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
