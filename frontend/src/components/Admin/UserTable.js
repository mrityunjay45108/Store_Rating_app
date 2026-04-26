import React, { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  Badge,
  Text,
  Group,
  Avatar,
  ActionIcon,
  Tooltip,
  Menu,
  TextInput,
  Select,
  Stack,
  Loader,
  Center
} from '@mantine/core';

import {
  IconPencil,
  IconTrash,
  IconDotsVertical,
  IconMail,
  IconMapPin,
  IconSearch
} from '@tabler/icons-react';

import api from '../../services/api';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/admin/users?search=${search}&role=${roleFilter || ''}`
        );

        setUsers(res.data);
      }
      catch(error){
        console.error('Error fetching users:', error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, roleFilter]);


  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap='sm'>
          <Avatar color='blue' radius='xl' size='sm'>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>

          <div>
            <Text fw={500} size='sm'>
              {user.name}
            </Text>
            <Text size='xs' c='dimmed'>
              ID: #{user.id}
            </Text>
          </div>
        </Group>
      </Table.Td>


      <Table.Td>
        <Group gap={4}>
          <IconMail size={14} />
          <Text size='sm'>
            {user.email}
          </Text>
        </Group>
      </Table.Td>


      <Table.Td>
        <Group gap={4}>
          <IconMapPin size={14} />
          <Text size='sm' c='dimmed'>
            {user.address || 'Not Provided'}
          </Text>
        </Group>
      </Table.Td>


      <Table.Td>
        <Badge
          variant='light'
          fullWidth
          color={
            user.role === 'system_administrator'
              ? 'red'
              : user.role === 'store_owner'
              ? 'teal'
              : 'blue'
          }
        >
          {user.role}
        </Badge>
      </Table.Td>


      <Table.Td>
        <Group gap={0} justify='flex-end'>

          <Tooltip label='Edit User'>
            <ActionIcon variant='subtle'>
              <IconPencil size={16} />
            </ActionIcon>
          </Tooltip>


          <Menu shadow='md' width={150}>
            <Menu.Target>
              <ActionIcon variant='subtle'>
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                Actions
              </Menu.Label>

              <Menu.Item
                color='red'
                leftSection={<IconTrash size={14} />}
              >
                Delete User
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </Group>
      </Table.Td>

    </Table.Tr>
  ));


  return (
    <Stack>

      {/* Search aur Filter */}
      <Group mb='md'>
        <TextInput
          flex={1}
          leftSection={<IconSearch size={16} />}
          placeholder='Search by name, email, address'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <Select
          placeholder='Filter by role'
          data={[
            { value:'system_administrator', label:'System Administrator' },
            { value:'user', label:'User' },
            { value:'store_owner', label:'Store Owner' }
          ]}
          clearable
          value={roleFilter}
          onChange={setRoleFilter}
        />
      </Group>


      <ScrollArea>
        <Table
          verticalSpacing='md'
          highlightOnHover
          borderless
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User Info</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th style={{width:120}}>
                Role
              </Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>


          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Center py='xl'>
                    <Loader />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text ta='center' py='xl' c='dimmed'>
                    No users found matching your search.
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

    </Stack>
  );
}