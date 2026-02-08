import { Reflection } from "../types";

export const generateTeacherGuidance = async (studentName: string, latestReflection: Reflection): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sentiment = latestReflection.sentiment || 'neutral';

    if (sentiment === 'negative') {
        return `Based on ${studentName}'s recent reflection, they seem to be struggling with group dynamics. 
     
     **Suggested Actions:**
     1. Schedule a deeper 1:1 consultation to discuss specific incidents.
     2. Encourage them to identify one small success from the day.
     3. Monitor their next group activity and provide immediate positive reinforcement.
     
     **Conversation Starter:** "I noticed you felt a bit down about the group work yesterday. Can you tell me more about what happened?"`;
    } else if (sentiment === 'positive') {
        return `${studentName} is doing well! 
      
      **Suggested Actions:**
      1. Acknowledge their effort in class publicly or privately.
      2. Challenge them to take on a leadership role in the next activity.
      
      **Conversation Starter:** "Great job on the reflection! I'm proud of your progress."`;
    }

    return `Here is a guidance plan for ${studentName}.
  
  **Observation:**
  The student is maintaining a steady pace.
  
  **Recommendation:**
  Check in to see if they need more challenges.`;
};
