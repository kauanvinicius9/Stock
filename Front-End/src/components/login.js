import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/scss/login.scss";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setErro("");

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),

                }
            );
            
            if (response.ok) {
                localStorage.setItem("user", email);
            }

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error("Usuário ou senha inválidos");
            }
            navigate("/produtos");
        } catch (error) {
            setErro(error.message);
        }
    }

    return (
        <div className={styles.container_login}>
            <h1 className={styles.title}>Login</h1>

            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.user}>
                    <label className={styles.username}>Usuário:</label>
                    <input className={styles.input_username} type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className={styles.password}>
                    <label className={styles.passworduser}>Senha:</label>
                    <input className={styles.password_input} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {erro && <p className={styles.error}>{erro}</p>}

                <button className={styles.submit_button} type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;