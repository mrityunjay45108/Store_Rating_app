import React,{useEffect,useState} from 'react';
import {
Container,
Title,
Paper,
Table,
Badge,
Group,
Loader,
Text,
ScrollArea,
Stack
} from '@mantine/core';

import {
IconUsers,
IconBuildingStore
} from '@tabler/icons-react';

import OwnerStats from '../components/Owner/OwnerStats';
import api from '../services/api';

export default function OwnerDashboard(){

const [data,setData]=useState(null);
const [loading,setLoading]=useState(true);

useEffect(()=>{

const fetchOwnerData=async()=>{

try{

const res=await api.get(
'/stores/owner/dashboard'
);

console.log(res.data);

setData(res.data);

}
catch(err){
console.error(
"Owner data fetch error",
err
);
}
finally{
setLoading(false);
}

};

fetchOwnerData();

},[]);



if(loading){
return(
<Container p="xl">
<Group justify="center">
<Loader
size="xl"
variant="dots"
color="teal"
/>
</Group>
</Container>
);
}



return(

<Container size="xl" py="xl">

<Paper
withBorder
p="lg"
radius="md"
mb="xl"
bg="var(--mantine-color-teal-light)"
>

<Group justify="space-between">

<Stack gap={0}>

<Title
order={2}
style={{
display:'flex',
alignItems:'center',
gap:'10px'
}}
>
<IconBuildingStore size={28}/>
{data?.storeName || "Store Dashboard"}
</Title>

<Text c="dimmed">
Track your store ratings and customer feedback
</Text>

</Stack>

<Badge
size="lg"
color="teal"
variant="filled"
>
Store Owner
</Badge>

</Group>

</Paper>



{/* AVERAGE RATING FIXED */}
{data?.stats && (
<OwnerStats
stats={data.stats}
/>
)}



<Paper
withBorder
p="md"
radius="md"
shadow="sm"
mt="xl"
>

<Group
mb="md"
justify="space-between"
>

<Group>
<IconUsers size={20}/>
<Title order={4}>
Recent Reviewers
</Title>
</Group>

<Text
size="sm"
c="dimmed"
>
{data?.reviews?.length || 0}
Total Reviews
</Text>

</Group>



<ScrollArea>

<Table
verticalSpacing="sm"
highlightOnHover
striped
>

<Table.Thead>

<Table.Tr>
<Table.Th>User Name</Table.Th>
<Table.Th>Email</Table.Th>
<Table.Th>Rating</Table.Th>
<Table.Th>Comment</Table.Th>
<Table.Th>Date</Table.Th>
</Table.Tr>

</Table.Thead>



<Table.Tbody>

{data?.reviews?.length>0 ? (

data.reviews.map(
(rev,index)=>(

<Table.Tr key={index}>

<Table.Td fw={500}>
{rev.user_name}
</Table.Td>

<Table.Td>
{rev.email}
</Table.Td>

<Table.Td>

<Badge
color={
rev.rating>=4
? "green"
: "yellow"
}
variant="light"
>
{rev.rating} ★
</Badge>

</Table.Td>

<Table.Td>
{rev.comment || "No comment"}
</Table.Td>

<Table.Td>
<Text
size="xs"
c="dimmed"
>
{
new Date(
rev.date
).toLocaleDateString(
'en-IN'
)
}
</Text>
</Table.Td>

</Table.Tr>

)
)

):(


<Table.Tr>

<Table.Td
colSpan={5}
align="center"
py="xl"
>

<Text c="dimmed">
No ratings submitted yet.
</Text>

</Table.Td>

</Table.Tr>

)}

</Table.Tbody>

</Table>

</ScrollArea>

</Paper>

</Container>

);

}