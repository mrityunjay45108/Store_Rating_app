import { SimpleGrid, Paper, Group, Text, ThemeIcon } from '@mantine/core';

export default function StatsGrid({ stats }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl">
      {stats.map((stat) => (
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
  );
}