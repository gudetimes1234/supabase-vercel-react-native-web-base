# React Native Web + Vercel + Supabase Starter

A production-ready starter template for building cross-platform applications with React Native Web, Expo, Supabase, and Vercel.

## Features

- **Cross-Platform**: Build for iOS, Android, and Web from a single codebase
- **Authentication**: Complete auth flow with Supabase (login, register, password reset)
- **UI Component Library**: 5 reusable, themed components
- **Code Generators**: 4 scripts to scaffold screens, components, hooks, and flows
- **TypeScript**: Full type safety throughout
- **Theming**: Centralized theme system for consistent styling
- **Form Handling**: Powerful useForm hook with validation

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Components](#components)
- [Hooks](#hooks)
- [Authentication](#authentication)
- [Code Generators](#code-generators)
- [Theming](#theming)
- [Navigation](#navigation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the App

```bash
# Web
npm run web

# iOS
npm run ios

# Android
npm run android
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Core UI components
│   │   ├── Button.tsx   # Button with 5 variants
│   │   ├── Input.tsx    # Input with validation
│   │   ├── Card.tsx     # Card container
│   │   ├── Container.tsx # Layout wrapper
│   │   └── Text.tsx     # Typography component
│   ├── layout/          # Layout components
│   └── forms/           # Form-specific components
│
├── screens/             # App screens
│   ├── auth/            # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   └── main/            # Main app screens
│       ├── HomeScreen.tsx
│       ├── ProfileScreen.tsx
│       └── SettingsScreen.tsx
│
├── hooks/               # Custom React hooks
│   └── useForm.ts       # Form handling hook
│
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
│
├── services/            # API & business logic
│   ├── supabase.ts      # Supabase client
│   └── auth.ts          # Auth service
│
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx # Main navigator
│
├── constants/           # App constants
│   ├── theme.ts         # Theme configuration
│   └── config.ts        # App configuration
│
├── types/               # TypeScript definitions
│   ├── auth.ts          # Auth types
│   ├── navigation.ts    # Navigation types
│   ├── components.ts    # Component types
│   └── forms.ts         # Form types
│
├── utils/               # Utility functions
│   ├── validators.ts    # Validation helpers
│   └── helpers.ts       # General helpers
│
└── styles/              # Global styles
    └── global.ts        # Reusable style patterns
```

## Components

### Button

A versatile button with 5 variants.

```tsx
import { Button } from 'src/components/ui';

// Primary (default)
<Button title="Submit" onPress={handleSubmit} />

// Secondary
<Button title="Save" variant="secondary" onPress={handleSave} />

// Outline
<Button title="Cancel" variant="outline" onPress={handleCancel} />

// Ghost
<Button title="Skip" variant="ghost" onPress={handleSkip} />

// Danger
<Button title="Delete" variant="danger" onPress={handleDelete} />

// With loading state
<Button title="Submit" loading={isLoading} onPress={handleSubmit} />

// Full width
<Button title="Continue" fullWidth onPress={handleContinue} />

// Different sizes
<Button title="Small" size="sm" onPress={handle} />
<Button title="Medium" size="md" onPress={handle} />
<Button title="Large" size="lg" onPress={handle} />
```

### Input

A text input with validation, labels, and icons.

```tsx
import { Input } from 'src/components/ui';

// Basic input
<Input
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
/>

// With label and error
<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>

// Password input
<Input
  label="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
/>

// With hint
<Input
  label="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  hint="Must be at least 8 characters"
/>

// Multiline
<Input
  label="Bio"
  value={bio}
  onChangeText={setBio}
  multiline
  numberOfLines={4}
/>
```

### Card

A flexible container with shadows.

```tsx
import { Card } from 'src/components/ui';

// Basic card
<Card>
  <Text>Content</Text>
</Card>

// With padding options
<Card padding="none">...</Card>
<Card padding="sm">...</Card>
<Card padding="md">...</Card>  {/* default */}
<Card padding="lg">...</Card>

// Pressable card
<Card onPress={handlePress}>
  <Text>Tap me!</Text>
</Card>
```

### Container

A layout wrapper with scrolling and safe area support.

```tsx
import { Container } from 'src/components/ui';

// Basic container
<Container>
  <Text>Content</Text>
</Container>

// Scrollable
<Container scrollable>
  <Text>Long content...</Text>
</Container>

// Centered content
<Container centered>
  <Text>Centered</Text>
</Container>

// Without padding
<Container padding={false}>
  <Text>Edge-to-edge</Text>
</Container>

// Keyboard avoiding (for forms)
<Container keyboardAvoiding>
  <Input ... />
</Container>
```

### Text

Typography component with predefined variants.

```tsx
import { Text } from 'src/components/ui';

// Headings
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>

// Body text
<Text variant="body">Regular text</Text>
<Text variant="bodySmall">Small text</Text>

// Other variants
<Text variant="caption">Caption</Text>
<Text variant="label">Label</Text>

// Custom color
<Text color="#666">Gray text</Text>

// Alignment
<Text align="center">Centered</Text>
<Text align="right">Right aligned</Text>
```

## Hooks

### useForm

A powerful form handling hook with validation.

```tsx
import { useForm } from 'src/hooks';

const form = useForm({
  email: {
    initialValue: '',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email',
    },
  },
  password: {
    initialValue: '',
    validation: {
      required: true,
      minLength: 8,
    },
  },
  bio: {
    initialValue: '',
    validation: {
      maxLength: 500,
    },
  },
});

// Use with Input components
<Input {...form.getFieldProps('email')} label="Email" />
<Input {...form.getFieldProps('password')} label="Password" secureTextEntry />

// Access values
console.log(form.values.email);

// Access errors
console.log(form.errors.email);

// Check if touched
console.log(form.touched.email);

// Validate single field
form.validateField('email');

// Validate entire form
if (form.validateForm()) {
  // Submit form
  submit(form.values);
}

// Reset form
form.resetForm();

// Check if form is valid
<Button disabled={!form.isValid} ... />

// Check if form has changes
<Button disabled={!form.isDirty} ... />
```

#### Validation Options

```tsx
validation: {
  required: true,              // Field is required
  minLength: 8,                // Minimum length
  maxLength: 100,              // Maximum length
  pattern: /regex/,            // Regex pattern
  message: 'Custom error',     // Custom error message
  custom: (value) => {         // Custom validator
    if (value !== 'expected') {
      return 'Custom error message';
    }
    return null;
  },
}
```

## Authentication

### Using AuthContext

```tsx
import { useAuth } from 'src/contexts/AuthContext';

const MyComponent = () => {
  const {
    user,          // Current user or null
    session,       // Supabase session
    loading,       // Loading state
    initialized,   // Auth initialized
    signIn,        // Sign in function
    signUp,        // Sign up function
    signOut,       // Sign out function
    resetPassword, // Password reset
    updateProfile, // Update user profile
  } = useAuth();

  // Check auth state
  if (!initialized) return <Loading />;
  if (!user) return <LoginScreen />;

  return <HomeScreen />;
};
```

### Sign In

```tsx
const handleSignIn = async () => {
  const { error } = await signIn({
    email: 'user@example.com',
    password: 'password123',
  });

  if (error) {
    setError(error.message);
  }
};
```

### Sign Up

```tsx
const handleSignUp = async () => {
  const { error } = await signUp({
    email: 'user@example.com',
    password: 'password123',
    fullName: 'John Doe',
  });

  if (error) {
    setError(error.message);
  }
};
```

### Password Reset

```tsx
const handleReset = async () => {
  const { error } = await resetPassword('user@example.com');

  if (error) {
    setError(error.message);
  } else {
    // Show success message
  }
};
```

## Code Generators

### Generate Screen

```bash
npm run generate:screen
```

Creates a new screen with:
- Screen component file
- TypeScript types
- Navigation integration
- Optional auth protection

### Generate Component

```bash
npm run generate:component
```

Creates a new component with:
- Component file with TypeScript
- Props interface
- Basic styles
- Auto-updates index exports

### Generate Hook

```bash
npm run generate:hook
```

Creates a new custom hook with:
- Hook file with TypeScript
- Return type interface
- Loading/error state pattern
- Auto-updates index exports

### Generate Flow

```bash
npm run generate:flow
```

Creates a multi-screen flow (wizard) with:
- Multiple connected screens
- Progress indicator
- Navigation between steps
- Completion handling

## Theming

### Theme Configuration

Edit `src/constants/theme.ts` to customize:

```tsx
export const colors = {
  primary: '#3B82F6',
  secondary: '#6366F1',
  // ... more colors
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  fontSize: {
    sm: 14,
    md: 16,
    lg: 18,
    // ...
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};
```

### Using Theme

```tsx
import { colors, spacing, typography } from 'src/constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.fontSize.xl,
    color: colors.text,
  },
});
```

## Navigation

### Adding a New Screen

1. Create the screen in `src/screens/`:

```tsx
// src/screens/main/NewScreen.tsx
export const NewScreen: React.FC<Props> = ({ navigation }) => {
  return <Container>...</Container>;
};
```

2. Add to navigation types in `src/types/navigation.ts`:

```tsx
export type RootStackParamList = {
  // ... existing screens
  NewScreen: undefined;
  // With params
  Details: { id: string };
};
```

3. Add to navigator in `src/navigation/AppNavigator.tsx`:

```tsx
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### Navigating

```tsx
// Navigate to screen
navigation.navigate('NewScreen');

// With params
navigation.navigate('Details', { id: '123' });

// Go back
navigation.goBack();

// Reset stack
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});
```

## Deployment

### Vercel (Web)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Expo (Mobile)

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Or use EAS Build
npx eas build
```

## Troubleshooting

### Common Issues

**"Cannot find module 'src/...'"**

Make sure TypeScript path aliases are configured in both:
- `tsconfig.json`
- `babel.config.js`

**"Supabase not configured"**

Check that your `.env` file exists and has valid credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

**"Navigation error"**

Ensure:
1. Screen is added to `RootStackParamList`
2. Screen is registered in `AppNavigator`
3. Screen name matches exactly

**Web build fails**

Try clearing the cache:
```bash
npx expo start --clear
```

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev)
- Check the [Supabase documentation](https://supabase.com/docs)
- Review existing screens for examples

## Scripts

```bash
# Development
npm start          # Start Expo dev server
npm run web        # Start web development
npm run ios        # Start iOS simulator
npm run android    # Start Android emulator

# Code Generation
npm run generate:screen     # Create new screen
npm run generate:component  # Create new component
npm run generate:hook       # Create new hook
npm run generate:flow       # Create multi-screen flow

# Quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run typecheck  # Run TypeScript check
```

## License

MIT
