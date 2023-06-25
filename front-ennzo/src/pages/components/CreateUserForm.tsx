import { useState } from "react";
import axios from "axios";
import styles from "../../styles/CreateUserForm.module.css";

interface User {
  name: string;
  email: string;
  password: string;
  profession: string;
  teacher_Id?: string;
  disciplines?: string[];
}

const CreateUserForm = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    profession: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user", user);
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar usuário!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <div className={styles["form-header"]}>
        <h2>Criar Usuário</h2>
      </div>
      <div className={styles["form-label"]}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          id="name"
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles["form-label"]}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles["form-label"]}>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          name="password"
          id="password"
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles["form-label"]}>
        <label htmlFor="profession">Profissão:</label>
        <select
          name="profession"
          id="profession"
          className={styles.input}
          onChange={handleChange}
        >
          <option value="" hidden>Selecione uma profissão</option>
          <option value="Teacher">Professor</option>
          <option value="Director">Diretor</option>
          <option value="Secretary">Secretário</option>
          <option value="Student">Estudante</option>
          <option value="Parent">Pai/Mãe</option>
        </select>
      </div>
      {user.profession === "Teacher" && (
        <>
          <div className={styles["form-label"]}>
            <label htmlFor="teacher_Id">ID do Professor:</label>
            <input
              type="text"
              name="teacher_Id"
              id="teacher_Id"
              className={styles.input}
              onChange={handleChange}
            />
          </div>
          <div className={styles["form-label"]}>
            <label htmlFor="disciplines">Disciplinas:</label>
            <input
              type="text"
              name="disciplines"
              id="disciplines"
              className={styles.input}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <button type="submit" className={styles.button}>
        Criar Usuário
      </button>
    </form>
  );
};

export default CreateUserForm

