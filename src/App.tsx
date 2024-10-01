import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/store/hooks.ts';
import { selectUsers } from './store/users/usersSlice.ts';
import { getUsers } from './store/users/usersThunk.ts';
import Users from './components/Users/Users.tsx';
import Modal from './components/Modal/Modal.tsx';
import { ToastContainer } from 'react-toastify';
import Search from './components/Search/Search.tsx';

const App = () => {
  const users = useAppSelector(selectUsers);
  const [search, setSearch] = useState<string>('');
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const changeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  const sortedByName = () => {
    setIsSorted(!isSorted);
  };

  const openModalWithUser = (id: number) => {
    setUserId(id);
    setShowModal(true);
  };

  const usersToDisplay = isSorted
    ? [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name))
    : filteredUsers;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto max-w-[1200px]">
        <div className="my-5">
          <Search
            sortUsers={sortedByName}
            searchValue={search}
            searchChange={(event: ChangeEvent<HTMLInputElement>) => changeSearch(event)}
            setShowModal={() => setShowModal(false)}
          />
        </div>
        <div className="flex gap-5 flex-wrap my-3">
          {
            usersToDisplay.length !== 0
              ? usersToDisplay.map((user) =>
                <Users setUserId={(id: number) => openModalWithUser(id)} user={user} key={user.id}/>)
              : <p>No users found.</p>
          }
        </div>
        {
          showModal ? <Modal idUser={userId} setShowModal={() => setShowModal(false)}/> : null
        }
      </div>
    </>
  );
};

export default App;