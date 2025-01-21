import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  // Recommended configuration from @eslint/js
  pluginJs.configs.recommended,

  // Language options
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Use browser globals as needed
        // Add other globals if necessary
      },
    },
  },

  // Main configuration
  {
    files: ['*'], // Apply to all files
    ignores: ['**/*.config.js', '/*.eslint-config-inspector'], // Ignore config files
    rules: {
      // 'no-unused-vars': 'warn', // Warn about unused variables
      semi: ['warn', 'always'], // Require semicolons
      quotes: ['warn', 'single'], // Enforce single quotes
      'no-undef': 'warn', // Warn on undefined variables
      'no-redeclare': 'error',
      'no-empty': 'warn',
    },
    linterOptions: {
      noInlineConfig: true, // Disallow inline configuration comments
      reportUnusedDisableDirectives: 'error', // Report unused disable directives
    },
  },
];
