// import React from 'react';
// import { 
//   Container, Text, Title, Button, Group, 
//   Badge, SimpleGrid, Paper, ThemeIcon, ActionIcon, useMantineColorScheme, useComputedColorScheme 
// } from '@mantine/core';
// import { IconShieldCheck, IconBuildingStore, IconStar, IconSun, IconMoon } from '@tabler/icons-react';
// import { useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const { setColorScheme } = useMantineColorScheme();
  
//   // Isse humein current active theme milta hai
//   const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
//   const isDark = computedColorScheme === 'dark';

//   return (
//     <div style={{ 
//       backgroundColor: isDark ? '#0a0a0a' : '#ffffff', 
//       minHeight: '100vh', 
//       color: isDark ? 'white' : '#111',
//       transition: 'all 0.3s ease'
//     }}>
//       {/* --- Navbar --- */}
//       <Container size="lg" py="md">
//         <Group justify="space-between">
//           <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
//             <Box
//               style={{
//                 backgroundColor: '#22c55e', 
//                 padding: '6px',
//                 borderRadius: '8px',
//                 display: 'flex'
//               }}
//             >
//               <IconStar size={20} color="black" fill="black" />
//             </Box>
//             <Text fw={900} size="xl" c={isDark ? 'white' : 'dark.9'}>
//               Rate.io
//             </Text>
//           </Group>

//           <Group>
//             <ActionIcon
//               onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
//               variant="subtle"
//               color={isDark ? 'yellow' : 'gray'}
//               size="lg"
//             >
//               {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
//             </ActionIcon>

//             <Button variant="subtle" color="gray" onClick={() => navigate('/login')}>Sign in</Button>
//             <Button color="green" radius="xl" px="xl" onClick={() => navigate('/signup')}>Get started</Button>
//           </Group>
//         </Group>
//       </Container>

//       {/* --- Hero Section --- */}
//       <Container size="md" py={100} style={{ textAlign: 'center' }}>
//         <Badge 
//           variant="dot" 
//           color="green" 
//           size="lg" 
//           mb="xl"
//           styles={{ root: { textTransform: 'none', padding: '15px' }}}
//         >
//           Built for System Administrators, store owners & Users
//         </Badge>

//         <Title order={1} style={{ 
//           fontSize: 'clamp(42px, 8vw, 68px)', 
//           lineHeight: '1.05', 
//           fontWeight: '900',
//           letterSpacing: '-2px',
//           color: isDark ? 'white' : '#000'
//         }}>
//           The ratings platform <br /> 
//           <span style={{ color: '#22c55e' }}>stores</span> actually <span style={{ color: '#8b5cf6' }}>trust.</span>
//         </Title>

//         <Text c="dimmed" size="xl" mt="xl" mx="auto" style={{ maxWidth: '600px', lineHeight: 1.6 }}>
//           Submit 1–5 star ratings, track performance, and manage your storefront from 
//           one beautiful, role-based dashboard.
//         </Text>

//         <Group justify="center" mt={45} gap="md">
//           <Button 
//             size="lg" radius="md" color="green" 
//             rightSection={<IconStar size={18} />} 
//             px={40}
//             onClick={() => navigate('/signup')}
//           >
//             Create free account
//           </Button>
//           <Button 
//             size="lg" radius="md" variant="outline" color="gray"
//             style={{ 
//               backgroundColor: isDark ? 'transparent' : '#f8f9fa',
//             }}
//           >
//             Try a demo login
//           </Button>
//         </Group>

//         <Text size="xs" c="dimmed" mt="xl">
//           Demo: <b style={{color: isDark ? '#eee' : '#444'}}>admin@rate.io</b> · <b style={{color: isDark ? '#eee' : '#444'}}>Admin@123</b>
//         </Text>
//       </Container>

//       {/* --- Features --- */}
//       <Container size="lg" pb={100}>
//         <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
//           <FeatureCard 
//             isDark={isDark}
//             icon={<IconShieldCheck size={26} color="#22c55e" />}
//             title="System Administrators Control"
//             desc="Manage every user and store with advanced filtering and role management."
//           />
//           <FeatureCard 
//             isDark={isDark}
//             icon={<IconBuildingStore size={26} color="#eab308" />}
//             title="Owner insights"
//             desc="See exactly who rated your store and monitor your average performance."
//           />
//           <FeatureCard 
//             isDark={isDark}
//             icon={<IconStar size={26} color="#8b5cf6" />}
//             title="Rate in one tap"
//             desc="Customers leave a 1–5 rating, edit anytime, and share real feedback."
//           />
//         </SimpleGrid>
//       </Container>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, desc, isDark }) {
//   return (
//     <Paper 
//       p="xl" 
//       radius="lg" 
//       withBorder
//       style={{ 
//         backgroundColor: isDark ? '#141414' : '#ffffff', 
//         borderColor: isDark ? '#222' : '#f1f3f5',
//         boxShadow: isDark ? 'none' : '0 10px 20px rgba(0,0,0,0.02)'
//       }}
//     >
//       <ThemeIcon size={48} radius="md" variant="light" color="gray" mb="md" bg={isDark ? '#1a1a1a' : '#f8f9fa'}>
//         {icon}
//       </ThemeIcon>
//       <Text fw={800} size="lg" mb="xs" c={isDark ? 'white' : 'dark.9'}>{title}</Text>
//       <Text size="sm" c="dimmed" style={{ lineHeight: '1.7' }}>{desc}</Text>
//     </Paper>
//   );
// }

// // Helper for Logo Box
// function Box({ children, style }) {
//   return <div style={style}>{children}</div>;
// }



import React from 'react';
import {
Container,Text,Title,Button,Group,Badge,SimpleGrid,Paper,
ThemeIcon,ActionIcon,useMantineColorScheme,useComputedColorScheme
} from '@mantine/core';

import {
IconShieldCheck,
IconBuildingStore,
IconStar,
IconSun,
IconMoon
} from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
const navigate=useNavigate();
const { setColorScheme }=useMantineColorScheme();

const computedColorScheme=useComputedColorScheme(
'light',
{ getInitialValueInEffect:true }
);

const isDark=computedColorScheme==='dark';

return (
<div style={{
backgroundColor:isDark?'#0a0a0a':'#ffffff',
minHeight:'100vh',
color:isDark?'white':'#111',
transition:'all .3s ease'
}}>

<Container size="lg" py="md">
<Group justify="space-between">

<Group gap="xs" style={{cursor:'pointer'}} onClick={()=>navigate('/')}>
<Box style={{
backgroundColor:'#22c55e',
padding:'6px',
borderRadius:'8px',
display:'flex'
}}>
<IconStar size={20} color="black" fill="black"/>
</Box>

<Text fw={900} size="xl" c={isDark?'white':'dark.9'}>
Rate.io
</Text>
</Group>

<Group>
<ActionIcon
onClick={()=>setColorScheme(isDark?'light':'dark')}
variant="subtle"
color={isDark?'yellow':'gray'}
size="lg"
>
{isDark ? <IconSun size={20}/> : <IconMoon size={20}/>}
</ActionIcon>

<Button
variant="subtle"
color="gray"
onClick={()=>navigate('/login')}
>
Sign in
</Button>

<Button
color="green"
radius="xl"
px="xl"
onClick={()=>navigate('/signup')}
>
Get started
</Button>
</Group>

</Group>
</Container>


<Container size="md" py={100} style={{textAlign:'center'}}>
<Badge
variant="dot"
color="green"
size="lg"
mb="xl"
styles={{root:{textTransform:'none',padding:'15px'}}}
>
Built for System Administrators, store owners & Users
</Badge>

<Title order={1}
style={{
fontSize:'clamp(42px,8vw,68px)',
lineHeight:'1.05',
fontWeight:'900',
letterSpacing:'-2px',
color:isDark?'white':'#000'
}}>
The ratings platform <br/>
<span style={{color:'#22c55e'}}>stores</span> actually
<span style={{color:'#8b5cf6'}}> trust.</span>
</Title>

<Text
c="dimmed"
size="xl"
mt="xl"
mx="auto"
style={{maxWidth:'600px',lineHeight:1.6}}
>
Submit 1–5 star ratings, track performance, and manage your storefront
from one beautiful, role-based dashboard.
</Text>

<Group justify="center" mt={45} gap="md">
<Button
size="lg"
radius="md"
color="green"
rightSection={<IconStar size={18}/>}
px={40}
onClick={()=>navigate('/signup')}
>
Create free account
</Button>

<Button
size="lg"
radius="md"
variant="outline"
color="gray"
style={{
backgroundColor:isDark?'transparent':'#f8f9fa'
}}
>
Try a demo login
</Button>
</Group>

<Text size="xs" c="dimmed" mt="xl">
Demo:
<b style={{color:isDark?'#eee':'#444'}}>
 admin@rate.io
</b>
·
<b style={{color:isDark?'#eee':'#444'}}>
 Admin@123
</b>
</Text>

</Container>


<Container size="lg" pb={100}>
<SimpleGrid cols={{base:1,sm:3}} spacing={30}>

<FeatureCard
isDark={isDark}
icon={<IconShieldCheck size={26} color="#22c55e"/>}
title="System Administrators Control"
desc="Manage every user and store with advanced filtering and role management."
/>

<FeatureCard
isDark={isDark}
icon={<IconBuildingStore size={26} color="#eab308"/>}
title="Owner insights"
desc="See exactly who rated your store and monitor your average performance."
/>

<FeatureCard
isDark={isDark}
icon={<IconStar size={26} color="#8b5cf6"/>}
title="Rate in one tap"
desc="Customers leave a 1–5 rating, edit anytime, and share real feedback."
/>

</SimpleGrid>
</Container>

</div>
);
}

function FeatureCard({icon,title,desc,isDark}){
return(
<Paper
p="xl"
radius="lg"
withBorder
style={{
backgroundColor:isDark?'#141414':'#fff',
borderColor:isDark?'#222':'#f1f3f5',
boxShadow:isDark?'none':'0 10px 20px rgba(0,0,0,.02)'
}}
>
<ThemeIcon
size={48}
radius="md"
variant="light"
color="gray"
mb="md"
bg={isDark?'#1a1a1a':'#f8f9fa'}
>
{icon}
</ThemeIcon>

<Text fw={800} size="lg" mb="xs" c={isDark?'white':'dark.9'}>
{title}
</Text>

<Text size="sm" c="dimmed" style={{lineHeight:'1.7'}}>
{desc}
</Text>

</Paper>
)
}

function Box({children,style}){
return <div style={style}>{children}</div>
}