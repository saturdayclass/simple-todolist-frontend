import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const hendleLogout = async () => {
    window.localStorage.clear();
    window.location.reload();
    history.push('/signin');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link className="navbar-brand" style={{ color: '#fff' }} to="/">
                TodoList-App
              </Link>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 "></ul>
              <div className="d-flex pt-2">
                <p
                  className="text-white"
                  onClick={hendleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
