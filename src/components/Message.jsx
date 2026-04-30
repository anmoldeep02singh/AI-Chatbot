function Message({ msg }) {
  return (
    <div
      className={`flex ${
        msg.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[60%] px-5 py-3 rounded-2xl text-sm ${
          msg.sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-200"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export default Message;