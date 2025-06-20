# VetBoard

VetBoard is a veterinary clinic management dashboard built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides an interface for managing patients, appointments, and clinic settings.

## Features

- **Dashboard**: View summary cards and recent appointments.
- **Patients**: Add, edit, delete, and search for patients.
- **Appointments**: Schedule, edit, and manage appointments.
- **Settings**: Placeholder for clinic information and settings.
- **Responsive UI**: Built with Tailwind CSS for modern, responsive design.
- **Routing**: Uses React Router for navigation.
- **Component-based**: Modular React components for easy maintenance.

## Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppointmentForm.tsx
│   │   ├── Modal.tsx
│   │   ├── PatientForm.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Toolbar.tsx
│   │   └── Topbar.tsx
│   ├── hooks/
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── lib/
│   ├── pages/
│   │   ├── Appointments.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Patients.tsx
│   │   └── Settings.tsx
│   ├── types/
│   │   ├── appointment.ts
│   │   └── patient.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd vetboard
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
# or
yarn lint
```

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## License

This project is licensed under the MIT License.
