$git = "C:\Program Files\Git\cmd\git.exe"

& $git reset HEAD~1

# Fase 1
& $git add backend/prisma backend/src/config/prisma.js backend/.env backend/package.json backend/package-lock.json backend/.gitignore
& $git commit -m "feat: database modeling and prisma setup"

# Fase 2
& $git add backend/src/middlewares/authMiddleware.js backend/src/middlewares/roleMiddleware.js backend/src/modules/auth frontend/src/context frontend/src/pages/Login.jsx frontend/src/pages/Register.jsx frontend/src/services/api.js
& $git commit -m "feat: add jwt authentication and role based access"

# Fase 3
& $git add backend/src/modules/sitterProfiles frontend/src/pages/SitterProfileForm.jsx
& $git commit -m "feat: public sitter profile viewing and editing"

# Fase 4
& $git add frontend/src/pages/SitterSearch.jsx
& $git commit -m "feat: sitter search functionality"

# Fase 5
& $git add backend/src/modules/bookings frontend/src/pages/ReceivedBookings.jsx frontend/src/pages/SentBookings.jsx
& $git commit -m "feat: booking requests flow"

# Fase 6
& $git add frontend/src/components/ProtectedRoute.jsx frontend/src/pages/Dashboard.jsx
& $git commit -m "feat: separate dashboards for owner and sitter"

# Fase 7
& $git add .
& $git commit -m "feat: error handling, validation and ui polish"
