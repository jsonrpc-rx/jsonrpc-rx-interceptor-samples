// import {} from "socket";

import { useEffect, useState } from 'react';
import { useJsonrpcClient } from './jsonrpc-rx/hooks';
import { Session } from 'jsonrpc-rx/handlers.type';

function App() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [socketId, setSocketId] = useState<string>('');
  const client = useJsonrpcClient();

  useEffect(() => {
    (async () => {
      const socketId = await client.getSocketId();
      setSocketId(socketId);
    })();

    client.onsession({
      next: (session) => {
        setSessions((prev) => [...prev, session]);
      },
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const msg = formData.get('msg') as string;
    if (msg.trim().length > 0) {
      client.broadcast({
        message: msg.trim(),
      });
    }

    e.currentTarget.reset();
  };

  const status = 'online';

  return (
    <>
      <p>My statues: {status}</p>
      <p>My socket id: {socketId}</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="">
          <h4>Write this</h4>
          <input type="text" name="msg" />
        </label>
        <button type="submit">Send</button>
      </form>
      <div>
        <h3>Received</h3>
        {sessions.map((msg, idx) => (
          <p key={idx}>
            {msg.name}
            {': '}
            {msg.message}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
