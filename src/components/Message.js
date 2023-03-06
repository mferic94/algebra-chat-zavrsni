const Message = ({ message, clientId }) => {
  const messageFromMe = clientId === message.clientId;

  return (
    <li
      className="message"
      style={{
        alignItems: messageFromMe ? "flex-end" : "flex-start",
      }}
    >
      <span className="user-name">{message.member.clientData.username}</span>
      <div
        className="pill"
        style={{
          backgroundColor: message.member.clientData.color,
        }}
      >
        <span>{message.data}</span>
      </div>
    </li>
  );
};

export default Message;
