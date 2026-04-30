import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (input.trim() === "" || loading) return;

    const userText = input;

    const userMessage = { text: userText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
              ...messages.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
              })),
              { role: "user", content: userText },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API Error");
      }

      const botReply =
        data?.choices?.[0]?.message?.content || "No response";

      const botMessage = { text: botReply, sender: "bot" };

      setMessages((prev) => [...prev, botMessage]);

      setHistory((prev) => [
        {
          title: userText.slice(0, 20),
          chat: [...messages, userMessage, botMessage],
        },
        ...prev,
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error ❌", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => setMessages([]);
  const loadChat = (chat) => setMessages(chat);

  return (
    <div className="h-screen w-screen bg-gray-900 flex">

      <Sidebar
        history={history}
        startNewChat={startNewChat}
        loadChat={loadChat}
      />

      <div className="flex-1 flex justify-center">
        <div className="w-[80%] max-w-[1200px] flex flex-col">

          <div className="p-4 border-b border-gray-700 text-white text-xl font-semibold">
            🤖 AI Chatbot
          </div>

          <ChatWindow
            messages={messages}
            loading={loading}
            chatEndRef={chatEndRef}
          />

          <InputBox
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            loading={loading}
          />

        </div>
      </div>
    </div>
  );
}

export default App;