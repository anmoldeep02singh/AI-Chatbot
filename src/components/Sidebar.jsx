function Sidebar({ history, startNewChat, loadChat }) {
  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col p-4">

      <button
        onClick={startNewChat}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => loadChat(item.chat)}
            className="p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer text-sm text-gray-300"
          >
            {item.title}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Sidebar;