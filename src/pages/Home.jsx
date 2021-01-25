import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const [dataTodo, setDataTodo] = useState([]);
  const [todo, setTodo] = useState('');
  const history = useHistory();
  const isAuth = JSON.parse(localStorage.getItem('isAuth'));
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (isAuth !== 1) {
    history.push('/signin');
  }

  const getTodo = async () => {
    try {
      const req = await fetch('/api/v1/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_user: userData[0].id_user,
        }),
      });
      const res = await req.json();
      console.log(res.data);
      setDataTodo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async () => {
    try {
      if (todo !== '') {
        await fetch('/api/v1/todo/tambah', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_user: userData[0].id_user,
            todo,
          }),
        });
        getTodo();
        setTodo('');
      } else {
        alert('Masukan todo dulu!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/v1/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getTodo();
  };

  useEffect(() => {
    getTodo();

    //eslint-disable-next-line
  }, []);

  return (
    <>
      {dataTodo !== undefined ? (
        <>
          <Navbar />
          <h3 className="text-center mt-4">
            Selamat datang, {userData && userData[0].nama_user}
          </h3>
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tambah todo"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button
                className="btn btn-sm btn-primary mb-2"
                onClick={() => addTodo()}
              >
                Tambah Todo
              </button>
              {dataTodo.length > 0 ? (
                <div className="mt-4">
                  {dataTodo.map((data) => {
                    return (
                      <div className="card d-flex p-2 mb-2" key={data.id}>
                        <p>{data.todo}</p>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => deleteTodo(data.id_todo)}
                        >
                          Done
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="card p-2 text-center">Belum ada todo</div>
              )}
            </div>
          </div>
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Home;
