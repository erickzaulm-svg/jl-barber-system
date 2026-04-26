import { useState } from 'react';
import { AppShell, Group, Title, Text, Button, Anchor, Container, Center } from '@mantine/core';
import { IconScissors, IconCalendarClock, IconLock } from '@tabler/icons-react';
import { AppointmentStepper } from './components/AppointmentStepper';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin'; // <-- Importamos la nueva pantalla

function App() {
  // Estados para controlar qué pantalla estamos viendo
  const [showBooking, setShowBooking] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  // NUEVO ESTADO: Memoria para saber si el jefe ya puso su contraseña
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <AppShell header={{ height: 70 }} padding="md">
      
      {/* --- BARRA SUPERIOR (HEADER) --- */}
      <AppShell.Header style={{ backgroundColor: '#1A1B1E', borderBottom: '1px solid #333' }}>
        <Group justify="space-between" style={{ height: '100%', padding: '0 30px' }}>
          
          {/* Logo (Al darle clic regresamos al inicio) */}
          <Group gap="sm">
            <IconScissors color="#d4af37" size={28} />
            <Title 
              order={3} 
              style={{ color: 'white', letterSpacing: '2px', cursor: 'pointer' }} 
              onClick={() => { setShowBooking(false); setShowAdmin(false); }}
            >
              JL BARBER
            </Title>
          </Group>

          {/* Menú de navegación */}
          <Group gap="xl" visibleFrom="sm">
            <Anchor href="#" c="dimmed" underline="never" fw={500} onClick={() => {setShowBooking(false); setShowAdmin(false);}}>INICIO</Anchor>
            <Anchor href="#" c="dimmed" underline="never" fw={500}>SERVICIOS</Anchor>
            <Anchor href="#" c="dimmed" underline="never" fw={500}>SUCURSALES</Anchor>
            
            {/* Botón secreto de Admin */}
            <Button variant="subtle" color="gray" size="sm" onClick={() => {setShowAdmin(true); setShowBooking(false);}}>
              <IconLock size={16} style={{ marginRight: '5px' }}/> Admin
            </Button>
          </Group>

          {/* Botón Header: Haz una cita */}
          <Button 
            leftSection={<IconCalendarClock size={18} />} 
            color="yellow.7" 
            variant="outline" 
            radius="md"
            onClick={() => { setShowBooking(true); setShowAdmin(false); }}
          >
            Haz una cita
          </Button>

        </Group>
      </AppShell.Header>

      {/* --- CUERPO DE LA PÁGINA (MAIN) --- */}
      <AppShell.Main style={{ backgroundColor: '#141517', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        
        {/* Lógica de pantallas: ¿Qué mostramos? */}
        {showAdmin ? (
          // Si quiere ver Admin: Revisamos si ya puso la contraseña
          isLoggedIn ? (
            <AdminDashboard />
          ) : (
            <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
          )
        ) : showBooking ? (
          // Si quiere agendar cita
          <AppointmentStepper onCancel={() => setShowBooking(false)} />
        ) : (
          // Si no es ninguna de las anteriores, mostramos el Inicio
          <Container size="lg" style={{ marginTop: '-100px' }}>
            <Center style={{ flexDirection: 'column', textAlign: 'center' }}>
              
              <Title order={1} style={{ color: 'white', fontSize: '4rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '20px' }}>
                EL ESTILO QUE TE <span style={{ color: '#d4af37' }}>DEFINE</span>
              </Title>
              
              <Text c="dimmed" size="xl" maw={600} mx="auto" mb="xl">
                Agenda tu cita en JL Barber y vive la experiencia de un corte clásico con técnicas modernas. Los mejores barberos a tu disposición.
              </Text>
              
              <Button 
                size="xl" 
                color="yellow.7" 
                radius="md" 
                style={{ fontSize: '1.2rem', padding: '0 40px' }}
                onClick={() => { setShowBooking(true); setShowAdmin(false); }}
              >
                Agendar Cita Ahora
              </Button>

            </Center>
          </Container>
        )}

      </AppShell.Main>
    </AppShell>
  );
}

export default App;