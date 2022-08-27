import { useState } from 'react';
import axios from 'axios';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post("/api/users/signup", {
            email,
            password
        })
        console.log(response);
    }

    return(
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
            </div>
            <div>
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};