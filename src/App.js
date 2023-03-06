import { useEffect, useState } from "react";

import { randomColor, randomName } from "./utils";
import Message from "./components/Message";

const member = {
  username: randomName(),
  color: randomColor(),
};

const channelId = "l9ZG0kS5GguOdJQG";
const roomId = "observable-room";

const drone = new window.Scaledrone(channelId, { data: member });
const room = drone.subscribe(roomId);

function App() {
  const [chat, setChat] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    room.on("message", (message) => {
      setChat((previous) => [...previous, message]);
    });
  }, []);

  const onInputChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (value) {
      drone.publish({
        room: roomId,
        message: value,
      });

      setValue("");
    }
  };

  return (
    <div className="app-container">
      <div className="chat">
        <ul className="chat-list">
          {chat.map((message) => (
            <Message
              message={message}
              key={message.id}
              clientId={drone.clientId}
            />
          ))}
        </ul>

        <form className="form" onSubmit={onSubmit}>
          <input
            placeholder="start chatting..."
            className="input"
            type="text"
            name="messageInput"
            value={value}
            onChange={onInputChange}
          />
          <button className="submit-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
