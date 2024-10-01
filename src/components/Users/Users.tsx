import React from 'react';
import { User } from '../../@types/users';

interface Props {
  user: User;
  setUserId: (id: number) => void;
}

const Users: React.FC<Props>= ({user, setUserId}) => {
  return (
    <div
      className="max-w-[350px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}-{user.username}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.email}</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.phone}</p>
      <button
        onClick={() => setUserId(user.id)}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >Edit</button>
    </div>
  );
};

export default Users;