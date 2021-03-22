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
      const vivisChannel = data.members.find((m) => m.username === 'littleMinerva')?.channel_id || false;
      setMembers(data.members.filter((m) => m.channel_id === vivisChannel));
    }
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="box">
      <h1>Mit Vivi im Chat:</h1>
      {members.length > 0 ?
        <ul>
          {members.map((member) => <Member key={member.id} member={member} />)}
        </ul>
        : <p>Vivi ist nicht im Chat :(</p>
      }
    </div>
  );
}

export default App;
