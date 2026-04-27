import React from 'react';
import {
  Paper,
  Group,
  Button,
  Text,
  Container,
  Anchor,
  Box,
  Avatar,
  Menu,
  rem
} from '@mantine/core';
import {
  IconLogout,
  IconUser,
  IconChevronDown
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Paper
      shadow="sm"
      h={70}
      radius={0}
      withBorder
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#fff'
      }}
    >
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <Group 
            gap="xs" 
            style={{ cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          >
            <Box
              style={{
                backgroundColor: '#2ecc71', 
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <IconUser size={20} color="black" stroke={2.5} />
            </Box>
            <Text fw={900} size="xl" style={{ letterSpacing: '-0.5px', color: '#1A1B1E' }}>
              Rate<span style={{ color: '#2ecc71' }}>.io</span>
            </Text>
          </Group>

          <Group gap={30}>
           
            {user?.role === 'system_administrator' && (
              <Anchor component={Link} to="/admin-dashboard" fw={600} c="green.8" underline="never">
                Admin Panel
              </Anchor>
            )}
          </Group>
          <Group>
            {user ? (
              <Menu 
                shadow="md" 
                width={160} 
                trigger="hover" 
                openDelay={100} 
                closeDelay={400} 
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
              >
                <Menu.Target>
                  <Group gap={7} style={{ cursor: 'pointer' }}>
                    <Avatar color="green" radius="xl" size="sm" variant="light">
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box style={{ flex: 1 }}>
                      <Text size="xs" c="dimmed" fw={500} style={{ lineHeight: 1 }}>
                        Logged in as
                      </Text>
                      <Text size="sm" fw={700}>
                        {user.name}
                      </Text>
                    </Box>
                    <IconChevronDown size={14} stroke={1.5} />
                  </Group>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item 
                    color="red" 
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
                    onClick={handleLogout}
                    fw={600}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="filled" 
                color="green" 
                radius="md"
              >
                Login
              </Button>
            )}
          </Group>
        </Group>
      </Container>
    </Paper>
  );
}