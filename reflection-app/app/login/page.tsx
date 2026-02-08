"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    // Login Form State
    const [year, setYear] = useState('2024');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    // Signup specific
    const [name, setName] = useState('');
    const [resolution, setResolution] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            if (studentId === 'teacher') router.push('/teacher');
            else router.push('/student');
        } else {
            // Mock Signup
            alert("Account created! Please log in.");
            setIsLogin(true);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC]">
            <div className="bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 animate-in fade-in zoom-in duration-300">

                <div className="text-center mb-10">
                    <Link href="/" className="inline-block w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm">
                        <i className="fas fa-book-open"></i>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                        {isLogin ? 'Welcome Back!' : 'Join Class'}
                    </h1>
                    <p className="text-slate-500">
                        {isLogin ? 'Enter your details to access your notes.' : 'Set up your profile and yearly goal.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">Academic Year</label>
                        <select
                            value={year} onChange={(e) => setYear(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700"
                        >
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>

                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">Full Name</label>
                            <input
                                type="text"
                                value={name} onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-medium"
                                placeholder="e.g. Kim Min-ji"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">Student ID</label>
                        <input
                            type="text"
                            value={studentId} onChange={(e) => setStudentId(e.target.value)}
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-medium"
                            placeholder="e.g. 2401"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">Password</label>
                        <input
                            type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1 text-indigo-500">Yearly Resolution</label>
                            <textarea
                                value={resolution} onChange={(e) => setResolution(e.target.value)}
                                required
                                placeholder="What is your main goal for this year?"
                                className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-2xl outline-none focus:border-indigo-500 font-medium h-24 resize-none placeholder:text-indigo-300 text-indigo-900"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-95 mt-4"
                    >
                        {isLogin ? 'Log In' : 'Create Account'}
                    </button>

                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-400 text-sm font-bold hover:text-indigo-600 transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                    </button>
                </div>

            </div>
        </main>
    );
}
