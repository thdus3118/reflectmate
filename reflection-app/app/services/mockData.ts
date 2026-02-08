import { User, Reflection } from "../types";

export const MOCK_STUDENTS: User[] = [
    { id: 's1', name: "Kim Min-ji", role: "student", studentId: "2401", resolution: "Speak English confidently!" },
    { id: 's2', name: "Lee Jun-ho", role: "student", studentId: "2402", resolution: "Make 5 friends." },
    { id: 's3', name: "Park Soo-bin", role: "student", studentId: "2403", resolution: "Don't be shy." },
    { id: 's4', name: "Choi Woo-jin", role: "student", studentId: "2404", resolution: "Learn 10 new words daily." },
    { id: 's5', name: "Jung Ha-eun", role: "student", studentId: "2405", resolution: "Participate in group activities actively." },
];

export const MOCK_REFLECTIONS: Reflection[] = [
    {
        id: 'r1',
        studentId: 's1',
        date: new Date().toISOString(),
        satisfaction: 5,
        selfEval: "I helped my group members understand the topic.",
        achievementEval: "I understood the key expressions.",
        futurePlans: "I will use these expressions at home.",
        sentiment: "positive"
    },
    {
        id: 'r2',
        studentId: 's2',
        date: new Date().toISOString(),
        satisfaction: 2,
        selfEval: "I was too quiet today.",
        achievementEval: "I was confused about the grammar.",
        futurePlans: "I will study more tonight.",
        sentiment: "negative"
    },
    {
        id: 'r3',
        studentId: 's2',
        date: new Date(Date.now() - 86400000).toISOString(),
        satisfaction: 3,
        selfEval: "Better than yesterday.",
        achievementEval: "Understood half.",
        futurePlans: "Keep trying.",
        sentiment: "neutral"
    }
];
