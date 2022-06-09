import axios from "axios";
import React, { useState } from "react";

export default function SignupForm() {
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: login.name,
      email: login.email,
      password: login.password,
      password_confirmation: login.cPassword,
    };
    console.log(data);
        axios.post("http://127.0.0.1:8000/api/signup", data).then((res) => {
          console.log(res);
        });
  };

  return (
    <>
      <form method="post">
        <input
          type="text"
          name="name"
          value={login.name}
          onChange={handleInput}
        />
        <input
          type="text"
          name="email"
          value={login.email}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleInput}
        />
        <input
          type="password"
          name="cPassword"
          value={login.cPassword}
          onChange={handleInput}
        />

        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}
