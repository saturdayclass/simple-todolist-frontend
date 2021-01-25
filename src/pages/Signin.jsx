import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const hendleLogin = async (e) => {
    try {
      if (username !== '' && password !== '') {
        e.preventDefault();
        const req = await fetch('/api/v1/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const res = await req.json();
        localStorage.setItem('isAuth', 1);
        localStorage.setItem('userData', JSON.stringify(res.data));
        history.push('/');
      } else {
        alert('Masukan username & password terlebih dahulu!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Sign In</h5>
            <form onSubmit={hendleLogin}>
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
                  Belum memiliki akun? <Link to="/signup">sign up</Link>
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

export default Signin;
