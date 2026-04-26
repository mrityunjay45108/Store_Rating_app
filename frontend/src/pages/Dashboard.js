import React, { useState, useEffect } from 'react';
import { 
  Container, Title, Text, Paper, Group, 
  SimpleGrid, ThemeIcon, Badge, TextInput, 
  Stack, Button, Modal, Textarea, Loader, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSearch, IconMessageCircle, IconTrophy, IconEye 
} from '@tabler/icons-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import RatingStars from '../components/User/RatingStars';
import StoreCard from '../components/User/StoreCard';

export default function Dashboard() {
  const { user } = useAuth();
  
  // States
  const [opened, { open, close }] = useDisclosure(false);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userRating, setUserRating] = useState(0); 
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch stores from API
  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stores');
      setStores(response.data);
    } catch (err) {
      console.error("Stores fetch karne mein error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // 2. Open Modal and Set Context
  const handleRatingAction = (store) => {
    setSelectedStore(store);
    setUserRating(store.my_rating || 0);
    setComment(store.my_comment || '');
    open();
  };

  // 3. UPDATED: Submit Rating Logic with Debugging
  const handleSubmitRating = async () => {
    console.log("Submitting for Store ID:", selectedStore?.id);

    if (userRating === 0) {
      alert("Please select a rating!");
      return;
    }
    
    setSubmitLoading(true);
    try {                 // user
      const response = await api.post('/reviews/submit', {
        storeId: selectedStore.id, // Payload structure
        rating: userRating,
        comment: comment
      });

      if (response.status === 200 || response.status === 201) {
        alert('Review successfully saved! ');
        fetchStores(); // Re-fetch to show updated rating in the UI
        close();
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.message || 'Submit karne mein dikkat aayi');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Filter stores based on search input
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userStats = [
    { title: 'Your Total Reviews', value: user?.reviews_count || '12', icon: IconMessageCircle, color: 'blue' },
    { title: 'Stores Visited', value: '45', icon: IconEye, color: 'teal' },
    { title: 'Active Points', value: user?.points || '250', icon: IconTrophy, color: 'orange' },
  ];

  return (
    <Container size="xl" py="xl">
      {/* Top Stats */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl">
        {userStats.map((stat) => (
          <Paper key={stat.title} withBorder p="md" radius="md" shadow="xs">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{stat.title}</Text>
                <Text size="xl" fw={700}>{stat.value}</Text>
              </div>
              <ThemeIcon size="xl" radius="md" color={stat.color} variant="light">
                <stat.icon size={24} />
              </ThemeIcon>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Banner */}
      <Paper withBorder p="xl" radius="lg" mb="xl" bg="gray.0">
        <Group justify="space-between">
          <div>
            <Title order={2}>Welcome back, {user?.name}!</Title>
            <Text c="dimmed">Find stores near <b>{user?.address || "Patna"}</b> and share feedback.</Text>
          </div>
          <Badge size="lg" color="blue" variant="light">Role: {user?.role}</Badge>
        </Group>
      </Paper>

      {/* Search Header */}
      <Group justify="space-between" mb="lg">
        <Title order={3}>Registered Stores</Title>
        <TextInput 
          placeholder="Search stores..." 
          leftSection={<IconSearch size={16} />} 
          w={{ base: '100%', sm: 350 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </Group>

      {/* Dynamic Store Grid */}
      {loading ? (
        <Center py="xl"><Loader size="lg" /></Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {filteredStores.map((store) => (
            <StoreCard 
              key={store.id} 
              store={store} 
              onRateAction={handleRatingAction} 
            />
          ))}
        </SimpleGrid>
      )}

      {/* RATING MODAL */}
      <Modal 
        opened={opened} 
        onClose={close} 
        title={<Text fw={700}>Rate {selectedStore?.name}</Text>}
        centered
        radius="md"
      >
        <Stack>
          <Text size="sm" c="dimmed">How was your experience? Your feedback helps others.</Text>
          
          <Group justify="center" py="md">
            <RatingStars 
              rating={userRating} 
              setRating={setUserRating} 
            />
          </Group>

          <Textarea
            label="Write a Comment"
            placeholder="Share your experience (Optional)"
            minRows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button 
            fullWidth 
            onClick={handleSubmitRating} 
            loading={submitLoading}
            disabled={userRating === 0}
            color="blue"
            size="md"
            radius="md"
          >
            Confirm Rating
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}
