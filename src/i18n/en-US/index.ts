export default {
  layouts: {
    drawers: {
      LeftMainDrawer: {
        navigations: { home: 'Home' },
      },
    },
    headers: {
      MainHeader: {
        labels: {
          toggleDarkMode: 'Toggle Dark Mode',
        },
      },
    },
  },
  pages: {
    HomePage: {
      labels: {
        noPublicOrganizations: 'No public organizations',
        userNotFound: 'User "{username}" not found',
      },
    },
  },
};
