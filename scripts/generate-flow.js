#!/usr/bin/env node

/**
 * Flow Generator
 * Creates a multi-screen flow (e.g., onboarding, checkout wizard)
 *
 * Usage: npm run generate:flow
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

const flowScreenTemplate = (flowName, stepName, stepNumber, totalSteps, nextScreen, isLast) => `/**
 * ${flowName} - ${stepName} Screen
 * Step ${stepNumber} of ${totalSteps}
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Card, Text, Button } from 'src/components/ui';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'${flowName}${stepName}'>;

export const ${flowName}${stepName}Screen: React.FC<Props> = ({ navigation }) => {
  const handleNext = () => {
    ${isLast ? '// TODO: Complete flow and navigate away\n    navigation.navigate(\'Home\');' : `navigation.navigate('${flowName}${nextScreen}');`}
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container scrollable>
      {/* Progress Indicator */}
      <View style={styles.progress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '${Math.round((stepNumber / totalSteps) * 100)}%' }]} />
        </View>
        <Text variant="caption" color={colors.textSecondary}>
          Step ${stepNumber} of ${totalSteps}
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="h1">${stepName}</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          TODO: Add description for this step
        </Text>

        <Card padding="lg" style={styles.card}>
          {/* TODO: Add your step content here */}
          <Text variant="body">
            Add your ${stepName.toLowerCase()} content here.
          </Text>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button
          title="${isLast ? 'Complete' : 'Continue'}"
          onPress={handleNext}
          fullWidth
        />
        ${stepNumber > 1 ? `<Button
          title="Back"
          onPress={handleBack}
          variant="ghost"
          fullWidth
        />` : ''}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  progress: {
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray[200],
    borderRadius: 2,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  actions: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
});

export default ${flowName}${stepName}Screen;
`;

async function generateFlow() {
  console.log('\n🔄 Flow Generator\n');
  console.log('This will create a multi-screen flow (e.g., onboarding wizard)\n');

  const flowName = await question('Flow name (e.g., Onboarding): ');
  if (!flowName) {
    console.log('❌ Flow name is required');
    rl.close();
    return;
  }

  const stepsInput = await question('Step names (comma-separated, e.g., Welcome,Profile,Preferences): ');
  if (!stepsInput) {
    console.log('❌ At least one step is required');
    rl.close();
    return;
  }

  const steps = stepsInput.split(',').map((s) => pascalCase(s.trim()));
  const flow = pascalCase(flowName);

  const folder = await question('Folder (auth/main) [main]: ') || 'main';

  const flowDir = path.join(__dirname, '..', 'src', 'screens', folder);

  // Create directory if it doesn't exist
  if (!fs.existsSync(flowDir)) {
    fs.mkdirSync(flowDir, { recursive: true });
  }

  const createdScreens = [];

  // Generate each step
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const nextStep = steps[i + 1] || null;
    const isLast = i === steps.length - 1;
    const fileName = `${flow}${step}Screen.tsx`;
    const filePath = path.join(flowDir, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${fileName} (already exists)`);
      continue;
    }

    const content = flowScreenTemplate(
      flow,
      step,
      i + 1,
      steps.length,
      nextStep,
      isLast
    );

    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${fileName}`);
    createdScreens.push(`${flow}${step}`);
  }

  // Update index.ts
  const indexPath = path.join(flowDir, 'index.ts');
  let indexContent = '';

  if (fs.existsSync(indexPath)) {
    indexContent = fs.readFileSync(indexPath, 'utf-8');
  }

  for (const screen of createdScreens) {
    const exportLine = `export { ${screen}Screen } from './${screen}Screen';\n`;
    if (!indexContent.includes(exportLine)) {
      indexContent += exportLine;
    }
  }

  fs.writeFileSync(indexPath, indexContent);
  console.log(`✅ Updated ${indexPath}`);

  // Generate navigation types
  const navTypes = createdScreens.map((s) => `  ${s}: undefined;`).join('\n');
  const navScreens = createdScreens
    .map((s) => `<Stack.Screen name="${s}" component={${s}Screen} />`)
    .join('\n        ');

  console.log(`
📝 Next steps:

1. Add to RootStackParamList in src/types/navigation.ts:
${navTypes}

2. Add to AppNavigator.tsx:
   // Import screens
   import { ${createdScreens.map((s) => `${s}Screen`).join(', ')} } from 'src/screens/${folder}';

   // Add to navigator (inside authenticated or unauthenticated section)
   ${navScreens}

3. Start the flow from another screen:
   navigation.navigate('${createdScreens[0]}');

4. Customize each step's content

Flow structure:
${steps.map((s, i) => `   ${i + 1}. ${flow}${s} ${i < steps.length - 1 ? '→' : '(complete)'}`).join('\n')}
`);

  rl.close();
}

generateFlow().catch(console.error);
