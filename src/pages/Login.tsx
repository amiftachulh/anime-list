import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Logo from "../assets/logo_blue.png";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | AnimeList";
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setLoading(true);
      await login(username, password);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setErrorMsg("Username not found");
        }
      }
      if (error instanceof Error) {
        if (error.message === "wrong_password") {
          setErrorMsg("Password do not match");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid items-center h-screen">
      <form className="flex flex-col gap-4 m-auto w-64 p-4 border-2" onSubmit={handleLogin}>
        <img src={Logo} alt="AnimeList" className="aspect-[100/31]" />
        <input
          className="p-2 border-2"
          type="text"
          placeholder="Username"
          autoComplete="off"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
        <input
          className="p-2 border-2"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button
          className="bg-slate-500 text-slate-100 p-2 flex justify-center items-center"
          disabled={loading}
        >
          {loading ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path></svg> :
            "Login"
          }
        </button>
      </form>
      {errorMsg && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-400 p-4 w-64">
          <div className="font-bold">Error!</div>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
