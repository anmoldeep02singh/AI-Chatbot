function InputBox({ input, setInput, handleSend, loading }) {
  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex gap-3 bg-gray-800 p-2 rounded-lg">

        <input
          type="text"
          className="flex-1 bg-transparent text-white px-2 outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>
    </div>
  );
}

export default InputBox;