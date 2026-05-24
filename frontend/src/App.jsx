import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import axios from "axios";

// =================== LOGIN ===================
function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email !== "" && mdp !== "") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Remplis tous les champs !");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1> Login</h1>
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Mot de passe"
          type="password"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>
          Se connecter
        </button>
      </div>
    </div>
  );
}

// =================== DASHBOARD ===================
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const chargerUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    chargerUsers();
  }, []);

  const ajouterUser = async () => {
    if (!nom || !email || !mdp) {
      alert("Remplis tous les champs !");
      return;
    }
    await axios.post("http://localhost:5000/api/users", {
      nom,
      email,
      motdepasse: mdp,
    });
    chargerUsers();
    setNom("");
    setEmail("");
    setMdp("");
  };

  const supprimerUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    chargerUsers();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1> Dashboard</h1>
        <h2>Ajouter un utilisateur</h2>
        <input
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Mot de passe"
          type="password"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />
        <button style={styles.button} onClick={ajouterUser}>
          Ajouter
        </button>
        <h2>Liste des utilisateurs</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li key={u._id} style={styles.userItem}>
              <span>
                 {u.nom} — {u.email}
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => supprimerUser(u._id)}
              >
                🗑️ Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =================== PROFILE ===================
function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1> Profile</h1>
        <p><strong>Nom :</strong> Fatima Ezzahra</p>
        <p><strong>Email :</strong> fatimaekaddouri@gmail.com</p>
        <p><strong>Rôle :</strong> Administrateur</p>
        <button style={styles.deleteButton} onClick={handleLogout}>
           Se déconnecter
        </button>
      </div>
    </div>
  );
}

// =================== NAVBAR ===================
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <span style={styles.logo}>🌐 FullStack App</span>
      <div>
        <Link to="/login" style={styles.navLink}>Login</Link>
        <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        <Link to="/profile" style={styles.navLink}>Profile</Link>
      </div>
    </nav>
  );
}

// =================== PROTECTED ROUTE ===================
function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth");
  return auth ? children : <Navigate to="/login" />;
}

// =================== APP ===================
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

// =================== STYLES ===================
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    background: "#333",
    color: "white",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  navLink: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontSize: "16px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    background: "#f5f5f5",
    borderRadius: "5px",
  },
};

export default App;