import { useState } from 'react';
import axios from 'axios';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post("/api/users/signup", {
                email,
                password
            })
            console.log(response);
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data.errors)
        }
        
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
            {errors.length > 0 && <div className='alert alert-danger'>
                <h4>Opss..</h4>
                <ul>
                    {errors.map(error => <li key={error.message}>{error.message}</li>)}
                </ul>
            </div>}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};