import { useEffect } from "react";
import { useState } from "react";

const Member = ({ member }) => (
  <li>{member.image} {member.username}</li>
)

const App = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://discord.com/api/guilds/817819793502502942/widget.json')
      const data = await res.json();
      const vivisChannel = data.members.find((m) => m.username === 'Marcel93')?.channel_id;
      setMembers(data.members.filter((m) => m.channel_id === vivisChannel));
    }
    fetchData();
  }, []);

  return (
    <div className="box">
      <h1>Mit Vivi im Chat:</h1>
      <ul>
        {members.map((member) => <Member key={member.id} member={member} />)}
      </ul>
    </div>
  );
}

export default App;
