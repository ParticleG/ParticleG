export default {
  components:{
    AuroraTabPanels: {
      FilePanel: {
        labels: {
          title: 'Select a manifest file (Json)',
        },
      },
      TextPanel: {
        labels: {
          title: 'Provide manifest content here',
        },
      },
      UrlPanel: {
        labels: {
          title: 'Provide manifest URL here',
        },
      }
    }
  },
  layouts: {
    drawers: {
      LeftMainDrawer: {
        navigations: { aurora: 'Aurora', home: 'Home', onebot: 'OneBot' },
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
    AuroraPage: {
      labels: {
        loadMethod: 'Load manifest with...',
        invalidFile: 'Invalid file "{name}" with type "{type}"',
      },
      tabs: {
        file: 'File',
        text: 'Text',
        url: 'URL',
      },
    },
  },
  common: {
    zod: {
      manifestParseError: 'Error parsing manifest: ',
      manifestRoot: 'Manifest Root',
      path: 'Path: {path}',
      reason: 'Reason: {message}',
    },
  },
};
