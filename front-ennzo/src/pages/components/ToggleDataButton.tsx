import { useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  __v: number;
};

export default function ToggleDataButton() {
  const [showData, setShowData] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      setUsers(data);
      setShowData(true);
    } catch (error) {
      console.error(error);
    }
  };

  const hideData = () => {
    setShowData(false);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {showData && (
        <div>
          <button onClick={hideData}>Hide Data</button>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                Nome: {user.name} - Email: {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
