import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Link,
  Divider,
} from '@mui/material';
import { useDatabase } from '../contexts/DatabaseContext';

export default function Login() {
  const navigate = useNavigate();
  const { db } = useDatabase();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const { error } = await db.client.auth.signUp({
          email,
          password,
          options: {
            // Automatically create a profile for the user
            data: {
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString(),
            }
          }
        });
        
        if (error) throw error;
        
        // After successful signup, immediately sign in
        const signInResult = await db.signIn(email, password);
        if (signInResult.error) throw signInResult.error;
        
        // Redirect to dashboard after successful authentication
        navigate('/', { replace: true });
      } else {
        const { error } = await db.signIn(email, password);
        if (error) throw error;
        
        // Update last login timestamp
        await db.from('profiles', true).upsert({
          email,
          last_login: new Date().toISOString(),
        }, { onConflict: 'email' });
        
        // Redirect to dashboard after successful authentication
        navigate('/', { replace: true });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Solo.Studio - {isSignUp ? 'Sign up' : 'Sign in'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {isSignUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading
                ? (isSignUp ? 'Signing up...' : 'Signing in...')
                : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                sx={{ cursor: 'pointer' }}
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
