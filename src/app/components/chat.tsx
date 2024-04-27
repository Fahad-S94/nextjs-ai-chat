'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

import { ArrowUpIcon } from '@heroicons/react/24/solid';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const chatParent = useRef<HTMLLinkElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <div className="max-w-lg mx-auto flex flex-col p-6 bg-gray-900 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="w-full mb-4 justify-between">
        <label className="mb-2 w-full">Say something...</label>
        <div className="w-full flex items-center justify-between">
          <input
            value={input}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-10 h-10 bg-blue-600 text-white rounded-full ml-2 hover:bg-blue-300 focus:outline-none focus:bg-blue-600"
          >
            <ArrowUpIcon className=" w-10 h-6" />
          </button>
        </div>
      </form>

      <ul>
        {messages.map((m, index) => (
          <>
            {m.role === 'user' ? (
              <li key={index} className="mb-4">
                <div className="bg-blue-100 rounded-lg p-3 shadow-md">
                  <p className="text-blue-900">
                    <span>You: </span>
                    {m.content}
                  </p>
                </div>
              </li>
            ) : (
              <li key={index} className="mb-4">
                <div className="bg-green-100 rounded-lg p-3 shadow-md">
                  <p className="text-green-900">
                    <span className="font-bold">Answer: </span>
                    {m.content}
                  </p>
                </div>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
