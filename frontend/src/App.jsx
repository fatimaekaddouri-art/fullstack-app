import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [nom, setNom]     = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp]     = useState("");

  const chargerUsers = () => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { chargerUsers(); }, []);

  const ajouterUser = async () => {
    await axios.post("http://localhost:5000/api/users", {
      nom, email, motdepasse: mdp
    });
    chargerUsers();
    setNom(""); setEmail(""); setMdp("");
  };

  const supprimerUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    chargerUsers();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>👥 Gestion des Utilisateurs</h1>

      <h2>Ajouter un utilisateur</h2>
      <input placeholder="Nom" value={nom}
        onChange={e => setNom(e.target.value)} /><br/><br/>
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} /><br/><br/>
      <input placeholder="Mot de passe" type="password" value={mdp}
        onChange={e => setMdp(e.target.value)} /><br/><br/>
      <button onClick={ajouterUser}>Ajouter</button>

      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.nom} — {u.email}
            <button onClick={() => supprimerUser(u._id)}> 🗑️ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;