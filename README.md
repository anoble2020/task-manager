# tasky
An open-source task manager app built with React.js and Tailwind.css

This README provides information on how to set up, use, and contribute to the project.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Task Creation:** Create new tasks with titles, descriptions, and due dates.
- **Task Editing:** Edit existing tasks to update their details.
- **Task Deletion:** Remove tasks that are no longer needed.
- **Task Completion:** Mark tasks as complete or incomplete.
- **Task Filtering:** Filter tasks based on their status (completed/incomplete).
- **User Authentication:** Secure user login and registration.
- **User Account Management:** Manage user details and preferences.

## Installation

To run Tasky locally, follow these steps:

1. **Clone the Repository:**
```
git clone https://github.com/anoble2020/tasky.git
cd tasky
```
2. **Install Dependencies:**

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then run:
   
```
npm install
```

5. **Start the Server:**
   
```
   npm start
```

The app will be available at `http://localhost:3000`.

## Usage

### User Registration

1. Navigate to the registration page.
2. Enter your details and submit the form to create an account.

### User Login

1. Navigate to the login page.
2. Enter your credentials and log in.

### Managing Tasks

1. **Creating a Task:**
   - Click on the "Add Task" button.
   - Fill in the task details and submit the form.

2. **Editing a Task:**
   - Click on the task you want to edit.
   - Update the details and save changes.

3. **Deleting a Task:**
   - Click on the delete icon next to the task.

4. **Marking a Task as Complete:**
   - Click on the checkbox next to the task to mark it as complete.

5. **Filtering Tasks:**
   - Use the filter options to view completed or incomplete tasks.

## API Documentation

### Endpoints

- **GET /tasks:** Retrieve all tasks.
- **POST /tasks:** Create a new task.
- **PUT /tasks/:id:** Update an existing task.
- **DELETE /tasks/:id:** Delete a task.

### Example Request

```
GET /tasks
```

### Example Response

```
json
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-06-01T00:00:00.000Z",
    "completed": false
  }
]
```

## Contributing

We welcome contributions!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please leave a comment.
