import { useState } from 'react';
import { AppShell, Group, Title, Text, Button, Anchor, Container, Center, Image, Stack } from '@mantine/core';
import { IconCalendarClock, IconLock } from '@tabler/icons-react';
import { AppointmentStepper } from './components/AppointmentStepper';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { ServicesView } from './components/ServicesView'; 
import { BranchesView } from './components/BranchesView'; 
import { AppointmentLookup } from './components/AppointmentLookup';

function App() {
  
  // NAVEGACIÓN CENTRALIZADA: 'inicio', 'servicios', 'sucursales', 'consultar', 'agendar', 'admin'
  const [activeView, setActiveView] = useState('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const renderMainContent = () => {
    switch (activeView) {
      case 'servicios':
        return <ServicesView />;
      case 'sucursales':
        return <BranchesView />;
      case 'consultar':
        return <AppointmentLookup />;
      case 'agendar':
        return <AppointmentStepper onCancel={() => setActiveView('inicio')} />;
      case 'admin':
        return isLoggedIn ? (
          <AdminDashboard />
        ) : (
          <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
        );
      case 'inicio':
      default:
        return (
          // Hemos ajustado el contenedor para que con el logo grande el contenido quede perfecto
          <Container size="lg">
            <Center>
              {/* Stack alinea todo verticalmente y gap="lg" da espacio entre elementos */}
              <Stack align="center" gap="lg" style={{ textAlign: 'center' }}>
                
                {/* --- LOGO GRANDE EN LA INICIO --- */}
                <Image 
                  src="/img/logotransparente.png" 
                  h={220} // Tamaño grande e impactante
                  w="auto" // Mantiene proporción
                  fit="contain" 
                  alt="JL Barber Big Logo"
                  style={{ marginBottom: '20px' }} // Espacio extra antes del título
                />

                <Title order={1} style={{ color: 'white', fontSize: '4rem', fontWeight: 900, letterSpacing: '2px', lineHeight: 1.1 }}>
                  EL ESTILO QUE TE <span style={{ color: '#d4af37' }}>DEFINE</span>
                </Title>

                <Text c="dimmed" size="xl" maw={600} mx="auto">
                  Agenda tu cita en JL Barber y vive la experiencia de un corte clásico con técnicas modernas. Los mejores barberos a tu disposición.
                </Text>

                <Button size="xl" color="yellow.7" radius="md" mt="xl" style={{ fontSize: '1.2rem', padding: '0 40px' }} onClick={() => setActiveView('agendar')}>Agendar Cita Ahora</Button>
              </Stack>
            </Center>
          </Container>
        );
    }
  };

  return (
    <AppShell header={{ height: 70 }} padding="md">
      
      {/* --- BARRA SUPERIOR (HEADER) --- */}
      <AppShell.Header style={{ backgroundColor: '#1A1B1E', borderBottom: '1px solid #333' }}>
        <Group justify="space-between" style={{ height: '100%', padding: '0 30px' }}>
          
          {/* Logo en el Header (se mantiene pequeño) */}
          <Group gap="md" style={{ cursor: 'pointer' }} onClick={() => setActiveView('inicio')}>
            <Image 
              src="/img/logotransparente.png" 
              h="45px" 
              w="auto" 
              alt="JL Barber Logo" 
              fit="contain"
            />
            <Title order={3} style={{ color: 'white', letterSpacing: '2px', whiteSpace: 'nowrap' }}>JL BARBER</Title>
          </Group>

          {/* Menú de navegación */}
          <Group gap="xl" visibleFrom="sm">
            <Anchor href="#" c={activeView === 'inicio' ? "yellow.4" : "dimmed"} underline="never" fw={500} onClick={() => setActiveView('inicio')}>INICIO</Anchor>
            <Anchor href="#" c={activeView === 'servicios' ? "yellow.4" : "dimmed"} underline="never" fw={500} onClick={() => setActiveView('servicios')}>SERVICIOS</Anchor>
            <Anchor href="#" c={activeView === 'sucursales' ? "yellow.4" : "dimmed"} underline="never" fw={500} onClick={() => setActiveView('sucursales')}>SUCURSALES</Anchor>
            <Anchor href="#" c={activeView === 'consultar' ? "yellow.4" : "dimmed"} underline="never" fw={500} onClick={() => setActiveView('consultar')}>MIS CITAS</Anchor>
            
            {/* Botón Admin */}
            <Button variant="subtle" color={activeView === 'admin' ? 'yellow.5' : 'gray'} size="sm" onClick={() => setActiveView('admin')}>
              <IconLock size={16} style={{ marginRight: '5px' }}/> Admin
            </Button>
          </Group>

          {/* Botón Header: Haz una cita */}
          <Button 
            leftSection={<IconCalendarClock size={18} />} 
            color="yellow.7" 
            variant={activeView === 'agendar' ? 'filled' : 'outline'}
            radius="md"
            onClick={() => setActiveView('agendar')}
          >Haz una cita</Button>

        </Group>
      </AppShell.Header>

      {/* --- CUERPO DE LA PÁGINA (MAIN) --- */}
      {/* display flex and center asegura que el contenido de inicio quede verticalmente centrado */}
      <AppShell.Main style={{ backgroundColor: '#141517', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {renderMainContent()}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;