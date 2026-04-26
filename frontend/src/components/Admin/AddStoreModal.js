import React, { useState } from 'react';
import { Modal, TextInput, Select, Button, Stack, Group, Text, LoadingOverlay, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBuildingStore } from '@tabler/icons-react';
import api from '../../services/api';

export default function AddStoreModal({ opened, close, storeOwners, refreshData }) {
  const [loading, setLoading] = useState(false);

  const ownerOptions = storeOwners.map(owner => ({
    value: owner.id.toString(),
    label: `${owner.name} (${owner.email})`
  }));

  const form = useForm({
    initialValues: { name: '', email: '', address: '', owner_id: '' },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid store email'),
      name: (val) => (val.length < 3 ? 'Store name too short' : null),
      owner_id: (val) => (val ? null : 'Please assign an owner'),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/stores/create', {
        ...values,
        owner_id: parseInt(values.owner_id) 
      });
      form.reset();
      refreshData();
      close();
    } catch (err) {
      alert(err.response?.data?.message || "Store creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered radius="md" 
      title={<Group gap="xs"><IconBuildingStore size={20} color="teal" /><Text fw={700}>Register & Assign Store</Text></Group>}>
      <Box pos="relative">
        <LoadingOverlay visible={loading} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Store Name" required {...form.getInputProps('name')} />
            <TextInput label="Business Email" required {...form.getInputProps('email')} />
            <TextInput label="Location Address" required {...form.getInputProps('address')} />
            <Select label="Assign Store Owner" placeholder="Select a store owner" data={ownerOptions} searchable required {...form.getInputProps('owner_id')} />
            <Button type="submit" color="teal" fullWidth mt="md">Create Store</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}