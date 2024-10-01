import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { UserMutation } from '../../@types/users';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts';
import { createUser, getSingleUser, getUsers, updateSingleUser } from '../../store/users/usersThunk.ts';
import { toast } from 'react-toastify';
import { selectUser, selectUserLoading } from '../../store/users/usersSlice.ts';

interface Props {
  idUser: number | null;
  setShowModal: () => void;
}

const Modal: React.FC<Props> = ({setShowModal, idUser}) => {
  const [state, setState] = useState<UserMutation>({
    name: '',
    username: '',
    email: '',
    phone: '',
  });
  const user = useAppSelector(selectUser);
  const userLoading = useAppSelector(selectUserLoading)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idUser) {
      dispatch(getSingleUser(idUser));
    }
  }, [dispatch, idUser]);

  useEffect(() => {
    if (idUser && user) {
      setState(prevState => ({
        ...prevState,
        ...user,
      }));
    }
  }, [idUser, user]);

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (idUser) {
        dispatch(updateSingleUser({id: idUser, userMutation: state})).unwrap();
        dispatch(getUsers()).unwrap();
        toast.success('Успешно обновлено!');
      } else {
        dispatch(createUser(state)).unwrap();
        dispatch(getUsers()).unwrap();
        toast.success('Успешно создано!');
      }
      setShowModal();
    } catch (error) {
      toast.error('Что-то пошло не так!');
    }
  };

  const stopPropagation = (event: MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  if (userLoading) {
    return <p>loading...</p>
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" onClick={setShowModal}>
      <form onSubmit={sendFormHandler} onClick={stopPropagation}
            className="p-[25px] rounded-[8px] bg-white w-[55%] flex flex-col gap-y-4">
        <h2 className="text-center">New user!</h2>
        <div>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={changeFields}
            className="border-b border-black w-full px-[15px] py-[5px] outline-none"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={changeFields}
            className="border-b border-black w-full px-[15px] py-[5px] outline-none"
            placeholder="Surname"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={changeFields}
            className="border-b border-black w-full px-[15px] py-[5px] outline-none"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={state.phone}
            onChange={changeFields}
            className="border-b border-black w-full px-[15px] py-[5px] outline-none"
            placeholder="Phone"
            required
          />
        </div>
        <div className="flex justify-around">
          <button className="bg-green-400 px-[25px] py-[10px] rounded-[8px] text-white uppercase" type="submit">add
          </button>
          <button type="button" className="bg-red-400 px-[25px] py-[10px] rounded-[8px] text-white uppercase"
                  onClick={setShowModal}>cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;