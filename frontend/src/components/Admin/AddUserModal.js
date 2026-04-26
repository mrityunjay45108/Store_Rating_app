import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  TextInput, 
  PasswordInput, 
  Textarea, 
  Button, 
  Stack, 
  Group, 
  Text, 
  LoadingOverlay, 
  Box 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUserPlus, IconBuildingStore, IconShieldPlus } from '@tabler/icons-react';
import api from '../../services/api';

export default function AddUserModal({ opened, close, roleType, refreshData }) {
  const [loading, setLoading] = useState(false);

  // Form initialization
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      role: '' 
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      address: (value) => (value.length < 5 ? 'Please enter a valid address' : null),
    },
  });

  // Sync role field when the modal opens or roleType changes
  useEffect(() => {
    if (opened && roleType) {
      form.setFieldValue('role', roleType);
    }
  }, [roleType, opened]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Backend route for user creation
      await api.post('/admin/users', values);
      
      form.reset();
      refreshData(); // Refresh the dashboard table
      close(); // Close modal
    } catch (err) {
      console.error("User Creation Error:", err);
      alert(err.response?.data?.message || "Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UI Configuration based on active role
  const getRoleConfig = () => {
    switch (roleType) {
      case 'store_owner':
        return { label: 'Store Owner', color: 'teal', icon: <IconBuildingStore size={20} /> };
      case 'system_administrator':
        return { label: 'System Administrator', color: 'red', icon: <IconShieldPlus size={20} /> };
      default:
        return { label: 'Normal User', color: 'blue', icon: <IconUserPlus size={20} /> };
    }
  };

  const config = getRoleConfig();

  return (
    <Modal 
      opened={opened} 
      onClose={() => { form.reset(); close(); }} 
      title={
        <Group gap="xs">
          {config.icon}
          <Text fw={700}>Add New {config.label}</Text>
        </Group>
      }
      centered
      radius="md"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <Box pos="relative">
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput 
              label="Full Name" 
              placeholder="e.g. Abhishek Kumar" 
              required 
              {...form.getInputProps('name')} 
            />
            
            <TextInput 
              label="Email Address" 
              placeholder="user@example.com" 
              required 
              {...form.getInputProps('email')} 
            />

            <PasswordInput 
              label="Password" 
              placeholder="Create a strong password" 
              required 
              {...form.getInputProps('password')} 
            />

            <Textarea 
              label="Physical Address" 
              placeholder="H.No 123, Street Name, City, State - PIN" 
              minRows={3}
              required 
              {...form.getInputProps('address')} 
            />

            <Button 
              type="submit" 
              color={config.color} 
              fullWidth 
              mt="lg"
              radius="md"
            >
              Create {config.label}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}