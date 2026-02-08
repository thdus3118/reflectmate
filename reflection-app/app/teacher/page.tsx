"use client";

import { useState } from "react";
import TeacherDashboard from "../components/TeacherDashboard";
import { MOCK_REFLECTIONS, MOCK_STUDENTS } from "../services/mockData";
import Link from "next/link";
import { Reflection } from "../types";

export default function TeacherPage() {
    const [reflections, setReflections] = useState(MOCK_REFLECTIONS);

    // Mock teacher user
    const teacherUser = { id: 't1', name: 'Teacher Oh', role: 'teacher' as const };

    const handleUpdateReflection = (id: string, updates: Partial<Reflection>) => {
        setReflections(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-8">
                <header className="flex items-center justify-between pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                            <i className="fas fa-chevron-left"></i>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Class Dashboard</h1>
                            <p className="text-slate-500 text-sm">Welcome back, {teacherUser.name}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                            <i className="fas fa-calendar-alt mr-2"></i> Today
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 shadow-lg shadow-indigo-100 rounded-xl text-sm font-bold text-white hover:bg-indigo-700">
                            <i className="fas fa-download mr-2"></i> Export Report
                        </button>
                    </div>
                </header>

                <TeacherDashboard
                    user={teacherUser}
                    students={MOCK_STUDENTS}
                    reflections={reflections}
                    onUpdateReflection={handleUpdateReflection}
                />
            </div>
        </main>
    );
}
