#!/usr/bin/env node

/**
 * Component Generator
 * Creates a new reusable component
 *
 * Usage: npm run generate:component
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) =>
  new Promise((resolve) => rl.question(prompt, resolve));

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const pascalCase = (str) =>
  str
    .split(/[-_\s]+/)
    .map(capitalize)
    .join('');

const componentTemplate = (name) => `/**
 * ${name} Component
 * TODO: Add description
 *
 * @example
 * <${name} />
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from 'src/constants/theme';

export interface ${name}Props {
  style?: StyleProp<ViewStyle>;
  // TODO: Add your props here
}

export const ${name}: React.FC<${name}Props> = ({
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* TODO: Add your component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // TODO: Add your styles
  },
});

export default ${name};
`;

async function generateComponent() {
  console.log('\n🧩 Component Generator\n');

  const name = await question('Component name (e.g., Avatar): ');
  if (!name) {
    console.log('❌ Component name is required');
    rl.close();
    return;
  }

  const folderOptions = ['ui', 'layout', 'forms'];
  const folder = await question(`Folder (${folderOptions.join('/')}) [ui]: `) || 'ui';

  if (!folderOptions.includes(folder)) {
    console.log(`❌ Invalid folder. Choose from: ${folderOptions.join(', ')}`);
    rl.close();
    return;
  }

  const componentName = pascalCase(name);
  const fileName = `${componentName}.tsx`;
  const componentDir = path.join(__dirname, '..', 'src', 'components', folder);
  const filePath = path.join(componentDir, fileName);

  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`❌ Component ${fileName} already exists`);
    rl.close();
    return;
  }

  // Write component file
  fs.writeFileSync(filePath, componentTemplate(componentName));
  console.log(`✅ Created ${filePath}`);

  // Update index.ts
  const indexPath = path.join(componentDir, 'index.ts');
  const exportLine = `export { ${componentName} } from './${componentName}';\n`;

  if (fs.existsSync(indexPath)) {
    const currentContent = fs.readFileSync(indexPath, 'utf-8');
    if (!currentContent.includes(exportLine)) {
      fs.appendFileSync(indexPath, exportLine);
      console.log(`✅ Updated ${indexPath}`);
    }
  } else {
    fs.writeFileSync(indexPath, exportLine);
    console.log(`✅ Created ${indexPath}`);
  }

  console.log(`
📝 Next steps:
1. Open ${filePath}
2. Add your props to the interface
3. Implement the component
4. Add styles as needed

Usage:
  import { ${componentName} } from 'src/components/${folder}';

  <${componentName} />
`);

  rl.close();
}

generateComponent().catch(console.error);
