"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_REFLECTIONS, MOCK_STUDENTS } from '../services/mockData';

export default function StudentDashboard() {
    // Mock logged-in student
    const student = MOCK_STUDENTS[0];
    const [satisfaction, setSatisfaction] = useState(0);
    const [selfEval, setSelfEval] = useState('');
    const [achievement, setAchievement] = useState('');
    const [plans, setPlans] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const cheerUpMessages = [
        "You're doing great!",
        "Keep up the good work!",
        "Believe in yourself!",
        "Every day is a new opportunity!"
    ];
    const randomCheer = cheerUpMessages[Math.floor(Math.random() * cheerUpMessages.length)];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (satisfaction === 0) {
            alert("Please rate your satisfaction!");
            return;
        }
        // Mock submission
        console.log({ satisfaction, selfEval, achievement, plans });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center max-w-lg w-full animate-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                        <i className="fas fa-check"></i>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Great Job!</h2>
                    <p className="text-slate-500 mb-8">Your reflection has been saved. See you tomorrow!</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setSubmitted(false)} className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all">
                            Write Another
                        </button>
                        <Link href="/" className="w-full py-4 text-indigo-600 font-bold hover:bg-indigo-50 rounded-2xl transition-all">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans pb-32">
            <div className="max-w-2xl mx-auto space-y-8">

                {/* Header Section */}
                <header className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                            <i className="fas fa-chevron-left"></i>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student</p>
                                <p className="text-sm font-black text-slate-900">{student.name}</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                {student.name[0]}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl transform rotate-12 translate-x-10 -translate-y-10">
                            <i className="fas fa-quote-right"></i>
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div>
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-50 border border-white/10">Daily Cheer</span>
                                <h1 className="text-3xl md:text-4xl font-black mt-4 leading-tight">"{randomCheer}"</h1>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                <p className="text-[10px] uppercase font-bold text-indigo-200 tracking-widest mb-2">My Resolution</p>
                                <p className="text-lg font-medium italic">"{student.resolution}"</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Reflection Form */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
                        Today's Reflection
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 mt-4">

                        {/* Satisfaction */}
                        <div className="space-y-4 text-center">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-wide">1. Group Activity Satisfaction</label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setSatisfaction(star)}
                                        className={`w-12 h-12 rounded-2xl text-xl flex items-center justify-center transition-all ${satisfaction >= star
                                                ? 'bg-amber-400 text-white shadow-lg shadow-amber-200 scale-110'
                                                : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                                            }`}
                                    >
                                        <i className="fas fa-star"></i>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Group Self Eval */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs"><i className="fas fa-users"></i></span>
                                2. Group Interaction Self-Eval
                            </label>
                            <textarea
                                required
                                value={selfEval}
                                onChange={(e) => setSelfEval(e.target.value)}
                                placeholder="How did you communicate and cooperate with your team?"
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all resize-none text-slate-700 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Achievement Self Eval */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs"><i className="fas fa-graduation-cap"></i></span>
                                3. Learning Achievement
                            </label>
                            <textarea
                                required
                                value={achievement}
                                onChange={(e) => setAchievement(e.target.value)}
                                placeholder="How well did you understand today's lesson?"
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all resize-none text-slate-700 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Future Plans */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center text-xs"><i className="fas fa-rocket"></i></span>
                                4. Future Plans / Resolutions
                            </label>
                            <textarea
                                required
                                value={plans}
                                onChange={(e) => setPlans(e.target.value)}
                                placeholder="What is your goal for the next class?"
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 focus:outline-none focus:ring-4 focus:ring-rose-50 focus:border-rose-500 transition-all resize-none text-slate-700 placeholder:text-slate-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-95"
                        >
                            Submit Reflection
                        </button>
                    </form>
                </div>

                {/* Bottom History Link */}
                <div className="text-center">
                    <Link href="#" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-600 transition-colors px-6 py-3 rounded-full hover:bg-white hover:shadow-sm">
                        <i className="fas fa-history"></i> View Cumulative History
                    </Link>
                </div>

            </div>
        </main>
    );
}
