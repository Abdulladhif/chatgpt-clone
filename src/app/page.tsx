"use client"
import GPTLogo from "./components/GPTLogo";
import { useChat } from "ai/react";


export default function Home() {
  
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  return (
    <div className="pt-4 pb-32">
      {messages.map((message) => (
        <div key={message.id} className={`border-t border-black/10 ${
          message.role === "assistant" && "bg-gray-50"
        }`}>
          <div className="max-w-3xl mx-auto py-6 flex">
            {/* <span className="ml-3">  {message.role === "user" ? "👤" : "🤖"} {message.content}</span> */}
            {message.role === "assistant" && <GPTLogo />}
            <span className="ml-3">{message.content}</span>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="fixed inset-x-0 bottom-10">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="max-w-3xl shadow-xl w-full mx-auto py-4 flex h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:border-blue-500"
        />
      </form>
    </div>
  );
}
