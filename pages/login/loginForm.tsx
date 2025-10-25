import React, { useState } from "react";

interface Props {
  onLogin: (userId: string) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok && data.userId) {
        setMessage("Success! Redirecting...");
        setIsSuccess(true);
        localStorage.setItem("userId", data.userId);
        // Delay to show success message before calling onLogin
        setTimeout(() => {
            onLogin(data.userId);
        }, 1000);
      } else {
        setMessage(data.error || "Login failed. Please check your credentials.");
        setIsSuccess(false);
      }
    } catch (error) {
        console.error("Login request failed:", error);
        setMessage("Could not connect to the server. Please try again later.");
        setIsSuccess(false);
    }
  };

  const commonInputClasses = "w-full p-3 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2";

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/60">
        <div className="w-full max-w-md">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700 dark:text-emerald-400">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className={labelClasses}>Username</label>
                        <input 
                            id="username"
                            type="text" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={e => setUsername(e.target.value)} 
                            required 
                            className={commonInputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={labelClasses}>Password</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            className={commonInputClasses}
                        />
                    </div>
                    <div className="h-6 text-center text-sm">
                        {message && (
                            <div className={isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                {message}
                            </div>
                        )}
                    </div>
                    <button 
                        type="submit"
                        className="w-full mt-2 px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 dark:disabled:bg-slate-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    </main>
  );
};

export default LoginPage;