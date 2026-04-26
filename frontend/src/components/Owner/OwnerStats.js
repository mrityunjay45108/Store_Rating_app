import React from 'react';
import {Paper,Text,Group,SimpleGrid,RingProgress,Stack,Progress,ThemeIcon,Center} from '@mantine/core';
import {IconStarFilled,IconMessage2} from '@tabler/icons-react';

export default function OwnerStats({stats}){

if(!stats) return null;

const avg=parseFloat(stats.averageRating||0);
const total=stats.totalRatings||0;
const distribution=stats.distribution||{5:0,4:0,3:0,2:0,1:0};

return(
<SimpleGrid cols={{base:1,md:3}} spacing="lg" mb="xl">

<Paper withBorder p="md" radius="md" shadow="xs">
<Group justify="space-between">
<Stack gap={0}>
<Text c="dimmed" tt="uppercase" fw={700} size="xs">Average Rating</Text>
<Text size="xl" fw={700}>{avg.toFixed(1)}</Text>
</Stack>
<RingProgress size={80} roundCaps thickness={8} sections={[{value:(avg/5)*100,color:'yellow'}]} label={<Center><IconStarFilled size={20} color="orange"/></Center>}/>
</Group>
</Paper>

<Paper withBorder p="md" radius="md" shadow="xs">
<Group>
<ThemeIcon size="xl" radius="md" color="teal" variant="light"><IconMessage2 size={24}/></ThemeIcon>
<div>
<Text c="dimmed" tt="uppercase" fw={700} size="xs">Total Reviews</Text>
<Text size="xl" fw={700}>{total}</Text>
</div>
</Group>
</Paper>

<Paper withBorder p="md" radius="md" shadow="xs">
<Text c="dimmed" tt="uppercase" fw={700} size="xs" mb="sm">Rating Breakdown</Text>
<Stack gap={4}>
{[5,4,3,2,1].map(star=>(
<Group key={star} gap="xs">
<Text size="xs" w={10}>{star}</Text>
<Progress value={total>0?(distribution[star]/total)*100:0} color="yellow" size="sm" flex={1} radius="xl"/>
<Text size="xs" c="dimmed" w={20} ta="right">{distribution[star]}</Text>
</Group>
))}
</Stack>
</Paper>

</SimpleGrid>
);

}