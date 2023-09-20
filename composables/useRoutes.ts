export function useRoutes() {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  const dashboardRoutes = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'uil:create-dashboard',
    },
    {
      path: '/dashboard/users',
      label: 'Users',
      icon: 'uil:users-alt',
    },
    {
      path: '/dashboard/documents',
      label: 'Documents',
      icon: 'uil:document-info',
    },
    {
      path: '/dashboard/events',
      label: 'Events',
      icon: 'uil:caret-right',
    },
    {
      path: '/dashboard/classes',
      label: 'Classes',
      icon: 'uil:book-medical',
    },
    {
      path: '/dashboard/forms',
      label: 'Forms',
      icon: 'uil:file-edit-alt',
    },
  ]

  const devRoutes = [
    {
      path: `${apiBaseUrl}/api`,
      label: 'Docs API',
      icon: 'logos:swagger',
      target: '_blank',
    },
    {
      path: 'https://github.com/hit-haui/hithaui',
      label: 'Frontend Repository',
      icon: 'logos:nuxt-icon',
      target: '_blank',
    },
    {
      path: 'https://github.com/hit-haui/hithaui-api',
      label: 'Backend Repository',
      icon: 'logos:nestjs',
      target: '_blank',
    },
    {
      path: '/contributors',
      label: 'Contributors',
      icon: 'logos:dev-icon',
    },
  ]

  return { dashboardRoutes, devRoutes }
}
