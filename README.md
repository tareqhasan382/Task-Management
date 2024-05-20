# Project Management Dashboard

![Dashboard Preview](https://i.ibb.co/kSXqqZL/Screenshot-3232.png)

## Project Overview

This repository contains a project management dashboard developed using Next.js, Zustand for state management, and Tailwind CSS for styling. The dashboard provides features for authentication, project management, task management, and task filtering/search functionality.

### Features

1. **Authentication Page:**

   - Users can log in with validation for form elements and validation feedback.
   - Backend authentication and authorization are implemented, with mock responses for successful and unsuccessful logins.

2. **Projects Overview Page:**

   - Displays a list of projects with options to view, edit, or delete.

3. **Project Details Page:**

   - After selecting a project, detailed information including tasks and recent activities is shown.
   - Functionality to CURD Operation in project .

4. **Task Management:**

   - Tasks can be added, edited, or marked as completed.
   - Each task has a detailed view with descriptions, deadlines, and assigned members.
   - Implements a drag-and-drop feature to change the status of tasks (e.g., To Do, In Progress, Done) using Zustand for state management.

5. **Task Filters and Search Functionality:**

   - Users can filter tasks by status, due date, or assignee.
   - Provides a search bar to find tasks quickly.

6. **Interactive Dashboard:**
   - Uses dropdowns and tooltips to enhance interactivity.
   - All components are responsive with Tailwind CSS for a seamless user experience.

### Technical Details

- **Framework:** Next.js for routing and server-side rendering.
- **State Management:** Zustand for managing the global state.
- **Editor:** ReactTipTap for rich text editing.
- **Styling:** Implements Tailwind CSS for responsive design and custom styling needs.

### Delivery

The project is submitted through a GitHub repository. The README provides setup instructions and a brief overview of the architecture.
