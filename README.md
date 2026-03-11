# Project Management Tool (MERN Stack)

## Overview

This is a simple **Project Management Tool** built with the **MERN Stack (MongoDB, Express, React, Node.js)**.
It allows users to manage projects, boards, and tasks in a Kanban-style workflow.

---

## Features

* User **Register / Login**
* **Create Projects**
* **Create Boards** inside projects
* **Create Tasks** inside boards
* **Update Tasks**
* **Drag & Drop** tasks to change their status
* **Dark Mode Support**
* **Swagger API Documentation**

---

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB (running locally or via connection string)

---

## Running the Project

### 1. Start the Frontend

Open a terminal and run:

```powershell
cd frontend
npm run dev
```

### 2. Start the Backend

Open another terminal and run:

```powershell
cd backend
npm run dev
```

---

## Accessing the Application

Once both servers are running, open the frontend in your browser (usually shown in the terminal after running `npm run dev`).

You can then:

* Register a new account
* Login
* Create projects
* Create boards inside projects
* Create and manage tasks

---

## API Documentation (Swagger)

After starting the backend server, you can view the API documentation at:

http://localhost:5000/api-docs/

Swagger allows you to explore and test all backend APIs.

---

## Notes

* Make sure the backend server is running before using the frontend.
* The database connection should be configured in the backend environment variables.

---
