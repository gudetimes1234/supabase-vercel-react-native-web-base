# Quick Start Guide

Get your app running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Settings > API
3. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

4. Add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Run the App

### Web
```bash
npm run web
```

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## 4. Start Building!

### Generate a new screen
```bash
npm run generate:screen
```

### Generate a new component
```bash
npm run generate:component
```

### Generate a new hook
```bash
npm run generate:hook
```

### Generate a multi-screen flow
```bash
npm run generate:flow
```

## Project Structure

```
src/
├── components/    # UI components
│   └── ui/        # Button, Input, Card, etc.
├── screens/       # App screens
│   ├── auth/      # Login, Register, ForgotPassword
│   └── main/      # Home, Profile, Settings
├── hooks/         # Custom hooks (useForm, etc.)
├── contexts/      # React contexts (AuthContext)
├── services/      # API services (auth, supabase)
├── constants/     # Theme, config
├── types/         # TypeScript types
├── utils/         # Helper functions
└── navigation/    # Navigation config
```

## Using Components

```tsx
import { Button, Input, Card, Text } from 'src/components/ui';

<Card padding="lg">
  <Text variant="h2">Hello!</Text>
  <Input label="Email" value={email} onChangeText={setEmail} />
  <Button title="Submit" onPress={handleSubmit} />
</Card>
```

## Using Auth

```tsx
import { useAuth } from 'src/contexts/AuthContext';

const { user, signIn, signOut, loading } = useAuth();

// Sign in
await signIn({ email, password });

// Sign out
await signOut();
```

## Using Forms

```tsx
import { useForm } from 'src/hooks';

const form = useForm({
  email: {
    initialValue: '',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
});

<Input {...form.getFieldProps('email')} />
<Button onPress={() => form.validateForm() && submit(form.values)} />
```

## Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Review existing screens for examples
- Use the code generators to scaffold new features
