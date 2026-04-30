import Message from "./Message";

function ChatWindow({ messages, loading, chatEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}

      {loading && <div className="text-gray-400">Typing...</div>}

      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;