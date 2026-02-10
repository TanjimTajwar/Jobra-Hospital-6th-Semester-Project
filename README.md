# Jobra Hospital Management System

Jobra Hospital Management System is a full‑stack DBMS project built to digitalize core hospital workflows for a small/medium clinic. It supports separate experiences for **admin**, **doctor**, and **patient** users, covering authentication, appointments, reports, and complaints.

---

## 1. Features

- **Authentication & Authorization**
  - JWT‑based login for admins, doctors, and patients.
  - Role‑based access control via backend middleware.

- **Admin Portal**
  - Manage doctors, patients, and admins.
  - View hospital‑wide appointments and complaints.

- **Doctor Portal**
  - View assigned patients and appointments.
  - Create and update medical reports (diagnosis, prescription, tests, advice).

- **Patient Portal**
  - Register and log in as a patient.
  - Browse doctors and book appointments.
  - Submit complaints/feedback about services or doctors.

- **Complaints & Feedback**
  - Patients can submit complaints with type and message.
  - Admin can view and manage complaint status.

- **Responsive UI**
  - React single‑page application with role‑specific dashboards.

---

## 2. Tech Stack

- **Frontend**
  - React (Create React App, `react-scripts`)
  - React Router (`react-router-dom`)
  - Context API for auth state (`AuthContext`)
  - Axios for API calls
  - Custom CSS styles in `styles/` (admin, patient, auth, navbar, etc.)

- **Backend**
  - Node.js, Express
  - MySQL (`mysql2`)
  - JWT (`jsonwebtoken`) for authentication
  - `bcrypt` for password hashing
  - `cors`, `dotenv`

- **Database**
  - MySQL database `jobra_hospital` (schema included in `database.sql`)

---

## 3. Project Structure (High Level)

```text
Jobra-Hospital-6th-Semester-Project/
├─ backend/
│  ├─ controllers/      # Business logic (auth, admin, doctor, patient, appointment, reports, complaints, profile)
│  ├─ middleware/       # Auth & role‑check middlewares
│  ├─ routes/           # Express routes (mounted under /api)
│  ├─ utils/            # JWT utilities
│  ├─ config/, models/  # DB connection & query helpers
│  └─ server.js         # Express app entry point
├─ frontend/
│  ├─ public/           # CRA public assets
│  ├─ src/
│  │  ├─ pages/         # React pages for admin/doctor/patient/auth
│  │  ├─ context/       # Auth context
│  │  ├─ services/      # API service modules
│  │  └─ styles/        # CSS files
│  └─ package.json
└─ database.sql         # Full MySQL schema for jobra_hospital
```

---

## 4. Database Design (Summary)

The MySQL schema is defined in `database.sql` and creates the `jobra_hospital` database with the following main tables:

- **`jh_admins`**
  - Stores admin users (`admin_id`, `admin_name`, `admin_email`, `admin_password`, `admin_phone`, `role`, `created_at`).

- **`jh_doctors`**
  - Stores doctors (`doctor_id`, `doctor_name`, `doctor_email`, `doctor_password`, `doctor_phone`, `department`, `qualification`, `experience`, `chamber_time`, `role`).

- **`jh_patients`**
  - Stores patients (`patient_id`, `patient_name`, `patient_email`, `patient_password`, `patient_phone`, `age`, `gender`, `blood_group`, `address`, `role`).

- **`jh_appointments`**
  - Stores appointments between doctors and patients (`appointment_id`, `doctor_id`, `patient_id`, `appointment_date`, `appointment_time`, `status`) with foreign keys to `jh_doctors` and `jh_patients`.

- **`jh_reports`**
  - Stores medical reports (`report_id`, `doctor_id`, `patient_id`, `diagnosis`, `prescription`, `medical_test`, `advice`, `report_date`) with foreign keys to `jh_doctors` and `jh_patients`.

- **`jh_complaints`**
  - Stores patient complaints (`complaint_id`, `patient_id`, `doctor_id`, `message`, `complaint_type`, `complaint_date`, `status`) with foreign keys to patients and optional doctors.

- **`jh_logins`**
  - Generic login table (`login_id`, `email`, `password`, `role`, `ref_id`) for mapping credentials to a referenced user.

Refer to `database.sql` for exact column types and constraints.

---

## 5. Getting Started

### 5.1 Prerequisites

- Node.js and npm installed
- MySQL server running locally (or accessible remotely)

### 5.2 Clone the Repository

```bash
git clone <your-repo-url>
cd Jobra-Hospital-6th-Semester-Project
```

### 5.3 Set Up the Database

1. Open your MySQL client (CLI, phpMyAdmin, Workbench, etc.).
2. Run the SQL script:

```sql
SOURCE path/to/database.sql;
```

This creates the `jobra_hospital` database and all required tables.

---

## 6. Backend Setup (Node + Express)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (if you don’t already have one) with your database configuration, for example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jobra_hospital
```

> Note: In the current code, the JWT secret is hard‑coded as `"jobra_secret_key"` in `utils/jwt.js` and `middleware/auth.js`. For production, you should move this to an environment variable (e.g. `JWT_SECRET`) and update the code accordingly.

Start the backend server:

```bash
npm run dev    # with nodemon
# or
npm start
```

The backend will run on `http://localhost:5000` by default and exposes APIs under `/api/...` (e.g. `/api/auth/login`, `/api/appointment`, `/api/report`, `/api/complaint`, etc.).

---

## 7. Frontend Setup (React)

In a new terminal:

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`.

Make sure the frontend API base URL (in the service files under `src/services/`) points to your backend server, typically `http://localhost:5000/api`.

---

## 8. User Flows (High Level)

- **Patient**
  - Register as a new patient.
  - Log in and receive a JWT.
  - View doctor list and book appointments.
  - View own appointments and submit complaints.

- **Doctor**
  - Log in with doctor credentials.
  - View assigned appointments.
  - Create and manage reports for patients.

- **Admin**
  - Log in as admin.
  - Manage users (patients, doctors, admins).
  - Monitor appointments and complaints across the system.

---

## 9. Future Improvements

- Move JWT secret and DB credentials fully to environment variables.
- Add more validations and error handling on both frontend and backend.
- Add pagination/search for large lists of doctors, patients, and appointments.
- Implement richer analytics for admins (e.g., appointment statistics, complaint trends).

---

## 10. License

This project is created as an academic/semester DBMS project. You may reuse and modify it for learning and educational purposes.
