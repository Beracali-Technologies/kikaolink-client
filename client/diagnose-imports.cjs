const fs = require('fs');
const path = require('path');

// Files that contain problematic imports (from your error log)
const filesToCheck = [
  'src/App.tsx',
  'src/Features/Dashboard/Components/Sidebar/components/SidebarUserMenu.tsx',
  'src/Features/Dashboard/Events/EventList/components/EventListHeader.tsx',
  'src/Features/Dashboard/RegistrationFormEditor/RegistrationFormEditor.tsx',
  'src/Features/Landing/ContactPage/ContactPage.tsx',
  'src/Features/Landing/HeroPage/HeroPage.tsx',
  'src/Layouts/DashboardLayout/DashboardLayout.tsx',
  'src/Layouts/EventSettingsLayout/EventSettingsLayout.tsx',
  'src/Layouts/PublicLayout/PublicLayout.tsx',
  'src/Routes/ProtectedRoute.tsx',
  'src/main.tsx'
];

console.log('Checking import statements in files...\n');

filesToCheck.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`✗ File not found: ${filePath}`);
    return;
  }

  console.log(`\nChecking: ${filePath}`);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Look for import statements
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Check if this is a relative import
    if (importPath.startsWith('.')) {
      const resolvedPath = path.resolve(path.dirname(fullPath), importPath);

      // Check if it's a TypeScript file
      const possiblePaths = [
        resolvedPath + '.tsx',
        resolvedPath + '.ts',
        resolvedPath + '/index.tsx',
        resolvedPath + '/index.ts',
        resolvedPath
      ];

      const exists = possiblePaths.some(p => fs.existsSync(p));

      if (!exists) {
        console.log(`   ✗ Import not found: "${importPath}"`);
        console.log(`     Resolved to: ${resolvedPath}`);
      }
    }
  }
});
