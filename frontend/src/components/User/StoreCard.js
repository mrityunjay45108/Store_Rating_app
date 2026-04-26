import React from 'react';
import { Card, Image, Text, Group, Badge, Button, Stack } from '@mantine/core';
import { IconStar, IconMapPin } from '@tabler/icons-react';

const StoreCard = ({ store, onRateAction }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
      <Card.Section>
        <Image 
          src={store.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"} 
          height={160} 
          alt={store.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
        <Text fw={700} size="lg" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {store.name}
        </Text>
        <Badge 
          color="yellow" 
          variant="light"
          leftSection={<IconStar size={12} fill="currentColor" />}
        >
          {store.avg_rating || 'N/A'}
        </Badge>
      </Group>

      <Group gap={4} mb="md">
        <IconMapPin size={14} color="gray" />
        <Text size="sm" c="dimmed" truncate="end">
          {store.address || "No address provided"}
        </Text>
      </Group>

      
      <Stack mt="auto">
        <Button 
          fullWidth 
          variant="light" 
          color="blue"
          onClick={() => onRateAction(store)}
        >
          {store.my_rating ? 'Edit Your Rating' : 'Rate this Store'}
        </Button>
      </Stack>
    </Card>
  );
};

export default StoreCard;