#!/usr/bin/env node

/**
 * Hook Generator
 * Creates a new custom React hook
 *
 * Usage: npm run generate:hook
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

const camelCase = (str) => {
  const pascal = str
    .split(/[-_\s]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const hookTemplate = (name) => `/**
 * ${name} Hook
 * TODO: Add description
 *
 * @example
 * const { data, loading, error } = ${name}();
 */

import { useState, useEffect, useCallback } from 'react';

export interface ${name.charAt(0).toUpperCase() + name.slice(1)}Return {
  // TODO: Define your return type
  data: unknown;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function ${name}(): ${name.charAt(0).toUpperCase() + name.slice(1)}Return {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement your logic here
      setData(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export default ${name};
`;

async function generateHook() {
  console.log('\n🪝 Hook Generator\n');

  let name = await question('Hook name (e.g., useUser or user): ');
  if (!name) {
    console.log('❌ Hook name is required');
    rl.close();
    return;
  }

  // Ensure hook name starts with 'use'
  if (!name.startsWith('use')) {
    name = 'use' + name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    name = camelCase(name);
    if (!name.startsWith('use')) {
      name = 'use' + name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  const fileName = `${name}.ts`;
  const hooksDir = path.join(__dirname, '..', 'src', 'hooks');
  const filePath = path.join(hooksDir, fileName);

  // Create directory if it doesn't exist
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`❌ Hook ${fileName} already exists`);
    rl.close();
    return;
  }

  // Write hook file
  fs.writeFileSync(filePath, hookTemplate(name));
  console.log(`✅ Created ${filePath}`);

  // Update index.ts
  const indexPath = path.join(hooksDir, 'index.ts');
  const exportLine = `export { ${name} } from './${name}';\n`;

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
2. Define your return type interface
3. Implement the hook logic
4. Add any dependencies to useCallback/useEffect

Usage:
  import { ${name} } from 'src/hooks';

  const { data, loading, error, refetch } = ${name}();
`);

  rl.close();
}

generateHook().catch(console.error);
