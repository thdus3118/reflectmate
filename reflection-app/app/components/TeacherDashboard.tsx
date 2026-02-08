"use client";

import React, { useState, useMemo } from 'react';
import { User, Reflection } from '../types';
import { generateTeacherGuidance } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TeacherDashboardProps {
    user: User;
    students: User[];
    reflections: Reflection[];
    onUpdateReflection: (id: string, updates: Partial<Reflection>) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ students, reflections, onUpdateReflection }) => {
    const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
    const [guidance, setGuidance] = useState<string | null>(null);
    const [isGeneratingGuidance, setIsGeneratingGuidance] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const stats = useMemo(() => {
        const totalReflections = reflections.length;
        const avgSatisfaction = totalReflections ? (reflections.reduce((acc, r) => acc + r.satisfaction, 0) / totalReflections) : 0;
        const negativeSentimentCount = reflections.filter(r => r.sentiment === 'negative').length;

        // Daily completion rate (rough estimate for demo)
        const studentsWithTodayRef = new Set(reflections.filter(r => {
            const today = new Date().toISOString().split('T')[0];
            return r.date.split('T')[0] === today;
        }).map(r => r.studentId)).size;

        return { totalReflections, avgSatisfaction: avgSatisfaction.toFixed(1), negativeSentimentCount, studentsWithTodayRef };
    }, [reflections]);

    const chartData = useMemo(() => {
        return [1, 2, 3, 4, 5].map(val => ({
            rating: `${val} Star`,
            count: reflections.filter(r => r.satisfaction === val).length,
            val
        }));
    }, [reflections]);

    const actionRequiredStudents = useMemo(() => {
        return students.filter(student => {
            const studentRefs = reflections.filter(r => r.studentId === student.id);
            const hasLimit = studentRefs.length === 0; // Simplified logic for demo
            const hasNegative = studentRefs.some(r => r.sentiment === 'negative' && new Date(r.date) > new Date(Date.now() - 86400000 * 3)); // Negative in last 3 days

            return hasNegative || hasLimit;
        });
    }, [students, reflections]);

    const studentReflections = useMemo(() => {
        if (!selectedStudent) return [];
        return reflections
            .filter(r => r.studentId === selectedStudent.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [selectedStudent, reflections]);

    const handleGetGuidance = async (student: User) => {
        const latestRef = reflections.filter(r => r.studentId === student.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        if (!latestRef) {
            setGuidance("This student hasn't submitted any reflections yet. Suggest reaching out via email to check if they need support with the platform.");
            return;
        }

        setIsGeneratingGuidance(true);
        const res = await generateTeacherGuidance(student.name, latestRef);
        setGuidance(res);
        setIsGeneratingGuidance(false);
    };

    const handleSendFeedback = (reflectionId: string) => {
        if (!reflectionId) return;
        onUpdateReflection(reflectionId, { teacherFeedback: feedbackText });
        setFeedbackText('');
        setGuidance(null);
        setSelectedStudent(null);
        alert("Feedback sent!");
    };

    return (
        <div className="space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Completion Today', value: `${stats.studentsWithTodayRef}/${students.length}`, icon: 'fa-check-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Avg. Satisfaction', value: stats.avgSatisfaction, icon: 'fa-star', color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Needs Attention', value: stats.negativeSentimentCount, icon: 'fa-exclamation-triangle', color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Total Reflections', value: stats.totalReflections, icon: 'fa-database', color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-xl`}>
                                <i className={`fas ${stat.icon}`}></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main List & Chart */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Learning Satisfaction Distribution</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="rating" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.val >= 4 ? '#10b981' : entry.val <= 2 ? '#f43f5e' : '#6366f1'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">Student Roster</h3>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full"><i className="fas fa-circle text-[6px]"></i> Active</span>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Recent Mood</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map(student => {
                                    const studentRefs = reflections.filter(r => r.studentId === student.id);
                                    const lastRef = studentRefs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                                    return (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                                                        <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">{student.name[0]}</div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                                        <p className="text-[10px] text-slate-400">{student.studentId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {lastRef ? (
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${lastRef.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-600' :
                                                            lastRef.sentiment === 'negative' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {lastRef.sentiment}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-300 text-xs">No data</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-full bg-slate-100 h-2 rounded-full max-w-[100px] overflow-hidden">
                                                    <div
                                                        className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                                                        style={{ width: `${Math.min(studentRefs.length * 10, 100)}%` }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedStudent(student)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all ml-auto"
                                                >
                                                    View Details <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* Action Required Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-rose-50/50">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <i className="fas fa-bell text-rose-500"></i> Action Required
                            </h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {actionRequiredStudents.length === 0 ? (
                                <p className="text-center py-8 text-sm text-slate-400">All students are on track! ✨</p>
                            ) : (
                                actionRequiredStudents.map(student => (
                                    <button
                                        key={student.id}
                                        onClick={() => setSelectedStudent(student)}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3 text-left hover:border-indigo-300 transition-all"
                                    >
                                        <div className="bg-rose-100 text-rose-600 w-10 h-10 rounded-xl flex items-center justify-center">
                                            <i className="fas fa-user-clock"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase font-black">
                                                {reflections.some(r => r.studentId === student.id && r.sentiment === 'negative') ? 'Negative Sentiment' : 'Pending Reflection'}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>

            {/* Guidance & History Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-100">
                                    {selectedStudent.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">{selectedStudent.name}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600 font-bold uppercase tracking-wider">{selectedStudent.studentId}</span>
                                        <p className="text-slate-500 text-sm italic">"{selectedStudent.resolution}"</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { setSelectedStudent(null); setGuidance(null); }} className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-600 transition-all hover:rotate-90">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Column: Reflection History */}
                            <div className="border-r border-slate-100 flex flex-col bg-slate-50/30">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-slate-50/50 backdrop-blur-sm z-10">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <i className="fas fa-history text-slate-400"></i> Reflection History
                                    </h4>
                                    <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                        {studentReflections.length} Entries
                                    </span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {studentReflections.length === 0 ? (
                                        <div className="text-center py-20 text-slate-400">
                                            <i className="fas fa-feather text-4xl mb-4 opacity-20"></i>
                                            <p>No reflection history found.</p>
                                        </div>
                                    ) : (
                                        studentReflections.map((ref) => (
                                            <div key={ref.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                                                        {new Date(ref.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest ${ref.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                                                                ref.sentiment === 'negative' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                                                            }`}>
                                                            {ref.sentiment || 'neutral'}
                                                        </span>
                                                        <div className="flex items-center gap-0.5 text-amber-400">
                                                            {[...Array(ref.satisfaction)].map((_, i) => <i key={i} className="fas fa-star text-[10px]"></i>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Self-Evaluation</p>
                                                        <p className="text-sm text-slate-700 leading-relaxed font-medium">"{ref.selfEval}"</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Plans</p>
                                                        <p className="text-sm text-slate-600 leading-relaxed">"{ref.futurePlans}"</p>
                                                    </div>
                                                    {ref.teacherFeedback && (
                                                        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 mt-2">
                                                            <p className="text-[9px] uppercase font-black text-indigo-500 mb-1">Your Previous Feedback</p>
                                                            <p className="text-xs text-indigo-700 italic">"{ref.teacherFeedback}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Right Column: AI Guidance & Feedback Tool */}
                            <div className="flex flex-col h-full bg-white">
                                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-[2rem] border border-indigo-100 relative overflow-hidden group">
                                        <div className="absolute top-[-20px] right-[-20px] text-indigo-100 text-9xl group-hover:rotate-12 transition-transform duration-700">
                                            <i className="fas fa-robot"></i>
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-4 flex items-center gap-2">
                                                <i className="fas fa-sparkles"></i> AI Guidance Plan
                                            </h4>
                                            {guidance ? (
                                                <div className="text-sm text-slate-700 whitespace-pre-wrap leading-loose font-medium">
                                                    {guidance}
                                                </div>
                                            ) : (
                                                <div className="text-center py-6">
                                                    <p className="text-slate-500 text-sm mb-4">Analyze recent reflections to generate a custom guidance plan.</p>
                                                    <button
                                                        onClick={() => handleGetGuidance(selectedStudent)}
                                                        disabled={isGeneratingGuidance || studentReflections.length === 0}
                                                        className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100 flex items-center gap-2 mx-auto"
                                                    >
                                                        {isGeneratingGuidance ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-bolt"></i>}
                                                        {isGeneratingGuidance ? 'Analyzing...' : 'Generate Plan'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {studentReflections.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Direct Feedback</h4>
                                                <span className="text-[10px] text-slate-400 italic">Appears on students dashboard</span>
                                            </div>
                                            <textarea
                                                value={feedbackText}
                                                onChange={(e) => setFeedbackText(e.target.value)}
                                                placeholder="Share your encouragement, advice, or observation with the student..."
                                                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl h-40 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-slate-700 placeholder:text-slate-400"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="p-8 border-t border-slate-100 bg-white">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleSendFeedback(studentReflections[0]?.id)}
                                            disabled={!feedbackText.trim() || studentReflections.length === 0}
                                            className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-xl shadow-indigo-100"
                                        >
                                            Publish Feedback
                                        </button>
                                        <button
                                            onClick={() => { setSelectedStudent(null); setGuidance(null); }}
                                            className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherDashboard;
