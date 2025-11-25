#!/usr/bin/env node

/**
 * Screen Generator
 * Creates a new screen with optional auth protection
 *
 * Usage: npm run generate:screen
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

const screenTemplate = (name, folder) => `/**
 * ${name} Screen
 * TODO: Add description
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Button } from 'src/components/ui';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'${name}'>;

export const ${name}Screen: React.FC<Props> = ({ navigation }) => {
  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="h1">${name}</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          TODO: Add subtitle
        </Text>
      </View>

      {/* Add your content here */}

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        variant="ghost"
        fullWidth
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});

export default ${name}Screen;
`;

async function generateScreen() {
  console.log('\n📱 Screen Generator\n');

  const name = await question('Screen name (e.g., Dashboard): ');
  if (!name) {
    console.log('❌ Screen name is required');
    rl.close();
    return;
  }

  const folder = await question('Folder (auth/main) [main]: ') || 'main';
  const requiresAuth = folder === 'main';

  const screenName = pascalCase(name);
  const fileName = `${screenName}Screen.tsx`;
  const screenDir = path.join(__dirname, '..', 'src', 'screens', folder);
  const filePath = path.join(screenDir, fileName);

  // Create directory if it doesn't exist
  if (!fs.existsSync(screenDir)) {
    fs.mkdirSync(screenDir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`❌ Screen ${fileName} already exists`);
    rl.close();
    return;
  }

  // Write screen file
  fs.writeFileSync(filePath, screenTemplate(screenName, folder));
  console.log(`✅ Created ${filePath}`);

  // Update index.ts
  const indexPath = path.join(screenDir, 'index.ts');
  const exportLine = `export { ${screenName}Screen } from './${screenName}Screen';\n`;

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
1. Add '${screenName}' to RootStackParamList in src/types/navigation.ts
2. Add the screen to AppNavigator.tsx
3. Customize the screen content

Example navigation type update:
  export type RootStackParamList = {
    // ... existing screens
    ${screenName}: undefined;
  };

Example navigator update:
  <Stack.Screen name="${screenName}" component={${screenName}Screen} />
`);

  if (requiresAuth) {
    console.log(`ℹ️  This screen will require authentication (folder: ${folder})`);
  }

  rl.close();
}

generateScreen().catch(console.error);
