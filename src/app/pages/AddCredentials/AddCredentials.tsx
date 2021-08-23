import React from 'react';
import { useState } from 'react';

export default function AddCredentials(): JSX.Element {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sendData = {
      service: serviceName,
      username: username,
      password: password,
      masterPassword: masterPassword,
    };

    await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        Authorization: masterPassword,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <p>
          <label htmlFor="service-name">Please enter service name</label>
          <input
            name="service-name"
            value={serviceName}
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setServiceName(e.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="username">Please enter user name</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Please enter your password</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="masterPassword">
            Please enter your master password
          </label>
          <input
            name="masterPassword"
            value={masterPassword}
            type="password"
            onChange={(e) => {
              setMasterPassword(e.target.value);
            }}
            required
          />
        </p>
        <button type="submit">Add credential</button>
      </form>
    </>
  );
}
