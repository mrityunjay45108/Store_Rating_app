import React, { useState } from 'react';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Paper, 
  Title, 
  Text, 
  Container, 
  Group, 
  Anchor, 
  Divider, 
  Stack 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import { 
  IconAt, 
  IconLock, 
  IconBrandGoogle, 
  IconArrowRight, 
  IconArrowLeft 
} from '@tabler/icons-react';

import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password should be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', values);
      login(res.data.token, res.data.user);
      
      const role = res.data.user.role;
      if (role === 'system_administrator') navigate('/admin-dashboard');
      else if (role === 'store_owner') navigate('/owner-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={460} my={60}>
      <Button 
  variant="light" 
  color="gray"
  leftSection={<IconArrowLeft size={16} stroke={2.5} />} 
  onClick={() => navigate('/')}
  mb="xl"
  radius="xl" 
  size="xs"
  px="md"
  styles={{
    root: {
      border: '1px solid transparent',
      '&:hover': {
        border: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
      }
    }
  }}
>
  Back to home
</Button>

      <Paper withBorder shadow="xl" p={30} radius="lg">
        <Title ta="center" fw={900}>
          Welcome back!
        </Title>
        
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component={Link} to="/signup" fw={700}>
            Create account
          </Anchor>
        </Text>

        <Group grow mb="md" mt="xl">
          <Button variant="default" color="gray" leftSection={<IconBrandGoogle size={18} />}>
            Google
          </Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="you@email.com"
              required
              leftSection={<IconAt size={16} />}
              {...form.getInputProps('email')}
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              leftSection={<IconLock size={16} />}
              {...form.getInputProps('password')}
              radius="md"
            />
          </Stack>

          <Group justify="flex-end" mt="sm">
            <Anchor 
              component={Link} 
              to="/forgot-password" 
              size="xs" 
              fw={500}
              c="dimmed"
            >
              Forgot password?
            </Anchor>
          </Group>

          <Button 
            fullWidth 
            mt="xl" 
            type="submit" 
            radius="md" 
            size="md"
            loading={loading}
            rightSection={<IconArrowRight size={18} />}
          >
            Log in
          </Button>
        </form>
      </Paper>
      
      <Text c="dimmed" size="xs" ta="center" mt="xl">
        By logging in, you agree to our terms of service and privacy policy.
      </Text>
    </Container>
  );
}