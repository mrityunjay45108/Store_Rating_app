import React, { useEffect, useState } from 'react';
import { 
  Container, Paper, Text, Title, Group, 
  TextInput, Select, Loader, SimpleGrid, ThemeIcon, Button, Box 
} from '@mantine/core';
import { 
  IconSearch, IconUsers, IconUserShield, IconBuildingStore, 
  IconChartBar, IconUserPlus, IconShieldPlus 
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import api from '../../services/api';
import UserTable from './UserTable'; 
import AddUserModal from './AddUserModal';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [opened, { open, close }] = useDisclosure(false);
  const [activeRole, setActiveRole] = useState('user');

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = (role) => {
    setActiveRole(role);
    open();
  };

  // Filter Logic for Table
  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase().includes(search.toLowerCase()) || 
     u.email?.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'all' || u.role === roleFilter)
  );

  // Dynamic Stats based on fetched users
  const stats = [
    { title: 'Total Users', value: users.length, icon: IconUsers, color: 'blue' },
    { title: 'Admins', value: users.filter(u => u.role === 'system_administrator').length, icon: IconUserShield, color: 'red' },
    { title: 'Store Owners', value: users.filter(u => u.role === 'store_owner').length, icon: IconBuildingStore, color: 'teal' },
    { title: 'Platform Users', value: users.filter(u => u.role === 'user').length, icon: IconChartBar, color: 'orange' },
  ];

  if (loading) return (
    <Box h="80vh" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Loader size="xl" variant="dots" />
    </Box>
  );

  return (
    <Container size="xl" py="xl">
      {/* Modal Integration */}
      <AddUserModal opened={opened} close={close} roleType={activeRole} refreshData={fetchData} />

      {/* Action Header */}
      <Group justify="space-between" mb="xl">
        <Box>
          <Title order={2} fw={900} style={{ letterSpacing: '-1px' }}>
            System Administrator Control Panel
          </Title>
          <Text c="dimmed">Manage your platform ecosystem and roles.</Text>
        </Box>

        <Group gap="xs">
          <Button variant="filled" color="blue" leftSection={<IconUserPlus size={18}/>} onClick={() => handleOpenModal('user')}>
            Add User
          </Button>
          <Button variant="filled" color="teal" leftSection={<IconBuildingStore size={18}/>} onClick={() => handleOpenModal('store_owner')}>
            Add Store
          </Button>
          <Button variant="filled" color="red" leftSection={<IconShieldPlus size={18}/>} onClick={() => handleOpenModal('system_administrator')}>
            Add Admin
          </Button>
        </Group>
      </Group>

      {/* Stats Section */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
        {stats.map((stat) => (
          <Paper key={stat.title} withBorder p="md" radius="md" shadow="xs">
            <Group>
              <ThemeIcon size="xl" radius="md" color={stat.color} variant="light">
                <stat.icon size={24} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed" fw={700} tt="uppercase">{stat.title}</Text>
                <Text fw={700} size="xl">{stat.value}</Text>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      {/* User Management Table Section */}
      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Group justify="space-between" mb="lg">
          <Title order={4}>Active Accounts</Title>
          <Group>
            <TextInput 
              placeholder="Search by name/email..." 
              leftSection={<IconSearch size={16} />} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select 
              placeholder="Role Filter"
              data={[
                { value: 'all', label: 'All Roles' },
                { value: 'system_administrator', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'store_owner', label: 'Store Owner' }
              ]}
              value={roleFilter}
              onChange={setRoleFilter}
            />
          </Group>
        </Group>

        <UserTable users={filteredUsers} />
      </Paper>
    </Container>
  );
}