import { useState, useEffect } from 'react';
import { Container, Grid, Paper, Text, Tabs, TextInput, Select, Table, Group, Title } from '@mantine/core';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ search: '', role: '' });

  useEffect(() => {
    api.get('/admin/stats').then(res => setStats(res.data));
  }, []);

  useEffect(() => {
    api.get(`/admin/users?search=${filters.search}&role=${filters.role}`).then(res => setUsers(res.data));
  }, [filters]);

  return (
    <Container size="xl" py="md">
      <Title order={2} mb="lg">System Administrator Panel</Title>
      <Grid mb="xl">
        <Grid.Col span={4}><StatsBox label="Total Users" val={stats.totalUsers} /></Grid.Col>
        <Grid.Col span={4}><StatsBox label="Total Stores" val={stats.totalStores} /></Grid.Col>
        <Grid.Col span={4}><StatsBox label="Total Ratings" val={stats.totalRatings} /></Grid.Col>
      </Grid>

      {/* --- Requirement: Filters --- */}
      <Group mb="md">
        <TextInput 
          placeholder="Search Name, Email, Address..." 
          style={{ flex: 1 }} 
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        <Select 
          placeholder="Role" 
          data={['system_administrator', 'user', 'store_owner']} 
          clearable 
          onChange={(val) => setFilters({...filters, role: val})}
        />
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Role / Rating</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((u) => (
            <Table.Tr key={u.id}>
              <Table.Td>{u.name}</Table.Td>
              <Table.Td>{u.email}</Table.Td>
              <Table.Td>{u.address}</Table.Td>
              <Table.Td>
                <Text size="sm">{u.role}</Text>
                {u.role === 'store_owner' && u.store_rating && (
                  <Text size="xs" color="yellow.7">Rating: {Number(u.store_rating).toFixed(1)} ★</Text>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
function StatsBox({ label, val }) {
  return (
    <Paper withBorder p="md" radius="md">
      <Text size="xs" c="dimmed" fw={700}>{label}</Text>
      <Text size="xl" fw={700}>{val}</Text>
    </Paper>
  );
}