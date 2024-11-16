export default {
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
        fileInput: 'Select a manifest file',
        textInput: 'Provide manifest content here',
        urlInput: 'Provide manifest URL here',
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
      path: 'Path: {path}',
      reason: 'Reason: {message}',
    },
  },
};
