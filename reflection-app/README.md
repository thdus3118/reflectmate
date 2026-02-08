# Reflection Note App Setup Guide

I have generated the full source code for your Reflection Note App in `C:\Users\pc\Desktop\starter\starter\001. school\reflection-app`.

## Prerequisites

Since Node.js was not detected on your system, you **MUST** install it to run this application.

1.  **Download Node.js**: Go to [nodejs.org](https://nodejs.org/) and download the **LTS** version.
2.  **Install**: Run the installer and click Next/Finish until done.
3.  **Verify**: Open a new terminal (Command Prompt or PowerPoint/VSCode terminal) and run `node -v`. It should print a version number (e.g., `v20.x.x`).

## How to Run

Once Node.js is installed:

1.  **Open Terminal** in the project folder:
    ```bash
    cd "C:\Users\pc\Desktop\starter\starter\001. school\reflection-app"
    ```

2.  **Install Dependencies** (only needed once):
    ```bash
    npm install
    ```

3.  **Start the Server**:
    ```bash
    npm run dev
    ```

4.  **Open Browser**: Go to [http://localhost:3000](http://localhost:3000).

## Features Implemented

-   **Teacher Dashboard**:
    -   Class overview stats.
    -   Student roster with sentiment tracking.
    -   **AI Guidance**: Generate guidance plans for students (Mocked).
    -   **Action alerts**: Highlights students needing attention.
-   **Student Dashboard**:
    -   **Greeting & Cheer-up**: Personalized message.
    -   **Resolution Display**: Shows the student's yearly goal.
    -   **Reflection Form**: 5-star satisfaction, Self-eval, Achievement, Future Plans.
-   **Login/Signup**:
    -   Role-based login.
    -   Signup flow to set name and yearly resolution.

## Project Structure

-   `app/page.tsx`: Landing page.
-   `app/student/page.tsx`: Student interface.
-   `app/teacher/page.tsx`: Teacher interface.
-   `app/components/TeacherDashboard.tsx`: The main teacher logic.
-   `app/services/mockData.ts`: Demo data.
