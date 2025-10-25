import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { generateResponse } from '../services/geminiService';
import { SendIcon } from '../components/icons/SendIcon';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
  </div>
);

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const renderLine = (line: string) => {
    const processedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-600 dark:text-emerald-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    if (processedLine.startsWith('### ')) {
      return `<h3 class="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">${processedLine.substring(4)}</h3>`;
    }
    if (processedLine.startsWith('## ')) {
      return `<h2 class="text-xl font-bold mt-6 mb-3 border-b border-slate-300 dark:border-slate-700 pb-2">${processedLine.substring(3)}</h2>`;
    }
    if (processedLine.startsWith('# ')) {
      return `<h1 class="text-2xl font-bold mt-8 mb-4 border-b-2 border-slate-400 dark:border-slate-600 pb-3">${processedLine.substring(2)}</h1>`;
    }
    if (processedLine.startsWith('* ') || processedLine.startsWith('- ')) {
       return `<li class="ml-6 list-disc marker:text-emerald-500">${processedLine.substring(2)}</li>`;
    }
    return `<p class="mb-2 leading-relaxed">${processedLine}</p>`;
  };
  
  const blocks = text.split('\n\n');
  
  const htmlContent = blocks.map(block => {
    const lines = block.split('\n');
    if (lines.some(line => line.startsWith('* ') || line.startsWith('- '))) {
      return `<ul class="mb-4">${lines.map(renderLine).join('')}</ul>`;
    }
    return lines.map(renderLine).join('<br/>');
  }).join('');
  
  return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export const ChatPage: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const responseContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (responseContainerRef.current) {
            responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
        }
    }, [response, isLoading, error]);

    const handleAsk = async (e: FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const result = await generateResponse(prompt);
            setResponse(result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleExampleClick = (question: string) => {
        setPrompt(question);
    };

    return (
        <div className="flex flex-col h-full">
            <main ref={responseContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    {!response && !isLoading && !error && (
                        <div className="text-center">
                           <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-8 border border-slate-200 dark:border-slate-700">
                             <h2 className="text-2xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Welcome to the AI Chat!</h2>
                             <p className="text-slate-600 dark:text-slate-400 mb-6">Ask me anything about sustainable architecture, green building practices, and eco-friendly design. My knowledge is based on the sources listed on the "About AI" page.</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                <button onClick={() => handleExampleClick("What is LEED certification?")} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors text-sm">
                                  <p className="font-semibold text-slate-700 dark:text-slate-300">What is LEED certification?</p>
                                </button>
                                <button onClick={() => handleExampleClick("Explain the concept of a Passive House.")} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors text-sm">
                                  <p className="font-semibold text-slate-700 dark:text-slate-300">Explain the concept of a Passive House.</p>
                                </button>
                                <button onClick={() => handleExampleClick("Summarize the Living Building Challenge.")} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors text-sm">
                                  <p className="font-semibold text-slate-700 dark:text-slate-300">Summarize the Living Building Challenge.</p>
                                </button>
                                <button onClick={() => handleExampleClick("What are key principles of sustainable design according to the GSA?")} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors text-sm">
                                  <p className="font-semibold text-slate-700 dark:text-slate-300">What are key principles of sustainable design according to the GSA?</p>
                                </button>
                              </div>
                           </div>
                        </div>
                    )}
                    {isLoading && <LoadingSpinner />}
                    {error && <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">{error}</div>}
                    {response && (
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                          <MarkdownRenderer text={response} />
                        </div>
                    )}
                </div>
            </main>
            <footer className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 shrink-0">
                <form onSubmit={handleAsk} className="max-w-4xl mx-auto">
                    <div className="relative flex items-center">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAsk(e);
                                }
                            }}
                            placeholder="Ask about sustainable architecture..."
                            className="w-full h-12 p-3 pr-14 resize-none rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-900 transition-colors disabled:cursor-not-allowed"
                            aria-label="Send prompt"
                        >
                            <SendIcon className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    );
}