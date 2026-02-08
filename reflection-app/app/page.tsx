import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
            <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-10">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                    School Reflection Note
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                    <Link href="/login" className="group">
                        <div className="border border-slate-200 bg-white p-8 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Student</h2>
                            <p className="text-slate-500">Log in to write your daily reflection and view your history.</p>
                        </div>
                    </Link>

                    <Link href="/teacher" className="group">
                        <div className="border border-slate-200 bg-white p-8 rounded-2xl hover:border-rose-500 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Teacher</h2>
                            <p className="text-slate-500">View class analytics and provide guidance to students.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
