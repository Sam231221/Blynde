import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeSnippet({ code, language = "javascript" }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative rounded-lg bg-gray-200  p-4 overflow-hidden">
      <pre className="text-sm text-gray-900 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-0 right-0 p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors duration-200"
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check className="w-3 h-3 " />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </button>
      {isCopied && (
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-gray-800 text-white text-xs animate-fade-in-out">
          Copied!
        </div>
      )}
    </div>
  );
}
