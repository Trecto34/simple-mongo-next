import { useState } from 'react';
import style from '../../styles/ToggleDataButton.module.css';

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  profession: string;
  teacher_Id?: string;
  disciplines?: string[];
  __v: number;
};

export default function ToggleDataButton() {
  const [showData, setShowData] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const toggleData = async () => {
    if (showData) {
      setShowData(false);
    } else {
      try {
        const res = await fetch('http://localhost:3001/users');
        const data = await res.json();
        setUsers(data);
        setShowData(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <button className={style['toggle-button']} onClick={toggleData}>
        {showData ? 'Esconder Dados' : 'Receber Dados'}
      </button>
      {showData && (
        <div className={style['data-container']}>
          <ul className={style['data-list']}>
            {users.map((user) => (
              <li key={user._id} className={style['data-item']}>
                <span>Nome:</span> {user.name} <br />
                <span>Email:</span> {user.email} <br />
                <span>Profissão:</span> {user.profession} <br />
                {user.profession === 'Teacher' && (
                  <>
                    <span>ID do Professor:</span> {user.teacher_Id} <br />
                    <span>Disciplinas:</span> {user.disciplines?.join(', ')}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
