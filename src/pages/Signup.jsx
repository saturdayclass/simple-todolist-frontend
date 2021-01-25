import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const hendleSignup = async (e) => {
    e.preventDefault();

    try {
      if (name !== '' && username !== '' && password !== '') {
        const req = await fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            username,
            password,
          }),
        });
        const res = await req.json();
        console.log(res);
        history.push('/signin');
      } else {
        alert('Masukan semua data!');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">Sign Up</h5>
            <form onSubmit={hendleSignup}>
              <div className="mb-3">
                <label for="inputNama" className="form-label">
                  Nama
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-describedby="inputNama"
                  placeholder="Masukan Nama"
                />
              </div>
              <div className="mb-3">
                <label for="inputUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  aria-describedby="inputUsername"
                  placeholder="Masukan Username"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Masukan Password"
                />
              </div>
              <div class="mb-3">
                <p>
                  Sudah memiliki akun? <Link to="/signin">sign in</Link>
                </p>
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
