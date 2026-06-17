import { Routes } from '@angular/router';
import { AdminSudo } from './components/admin-sudo/admin-sudo';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { UserLogin } from './components/user-login/user-login';
import { ChangePassword } from './components/change-password/change-password';
import { Layout } from './components/layout/layout';
import { PocDashboard } from './components/poc-dashboard/poc-dashboard';
import { CrDashboard } from './components/cr-dashboard/cr-dashboard';
import { InternDashboard } from './components/intern-dashboard/intern-dashboard';
import { RoleSelectionComponent } from './components/role-selection/role-selection';

// IMPORT THE GUARDS
import { adminGuard, userGuard } from './interceptors/auth.guard';

export const routes: Routes = [
  // 1. Root landing page - Needs no guards, but ensure its component (RoleSelectionComponent)
  // does NOT call auth.clearAllSessions() or auth.logout() in its ngOnInit!
  { path: '', component: RoleSelectionComponent, pathMatch: 'full' },

  // 2. Admin Login page
  { path: 'admin', component: AdminSudo },

  // 3. Protected Admin Dashboard
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [adminGuard] // Keeps non-admins out, redirects back to /admin instead of breaking
  },

  // 4. User Login page
  { path: 'login', component: UserLogin },

  // 5. Protected User Dashboard Layout & All Children
  {
    path: 'dashboard',
    component: Layout,
    canActivate: [userGuard], // Keeps non-users out, redirects back to /login
    children: [
      { path: '', component: PocDashboard },
      { path: 'cr', component: CrDashboard },
      { path: 'intern', component: InternDashboard }
    ]
  },

  { path: 'change-password', component: ChangePassword },

  // 6. Catch-all fallback
  { path: '**', redirectTo: '' }
];



