import { useState } from 'react'; // <-- Importamos useState
import { AppShell, Group, Title, Text, Button, Anchor, Container, Center } from '@mantine/core';
import { IconScissors, IconCalendarClock } from '@tabler/icons-react';
import { AppointmentStepper } from './components/AppointmentStepper'; // <-- Importamos nuestro componente

function App() {
  // Estado para saber si mostramos el inicio o el sistema de citas
  const [showBooking, setShowBooking] = useState(false);

  return (
    <AppShell header={{ height: 70 }} padding="md">
      
      {/* --- BARRA SUPERIOR (HEADER) --- */}
      <AppShell.Header style={{ backgroundColor: '#1A1B1E', borderBottom: '1px solid #333' }}>
        <Group justify="space-between" style={{ height: '100%', padding: '0 30px' }}>
          
          <Group gap="sm">
            <IconScissors color="#d4af37" size={28} />
            <Title order={3} style={{ color: 'white', letterSpacing: '2px', cursor: 'pointer' }} onClick={() => setShowBooking(false)}>
              JL BARBER
            </Title>
          </Group>

          <Group gap="xl" visibleFrom="sm">
            <Anchor href="#" c="dimmed" underline="never" fw={500}>SERVICIOS</Anchor>
            <Anchor href="#" c="dimmed" underline="never" fw={500}>SUCURSALES</Anchor>
            <Anchor href="#" c="dimmed" underline="never" fw={500}>TIENDA</Anchor>
          </Group>

          <Button 
            leftSection={<IconCalendarClock size={18} />} 
            color="yellow.7" 
            variant="outline" 
            radius="md"
            onClick={() => setShowBooking(true)}
          >
            Haz una cita
          </Button>

        </Group>
      </AppShell.Header>

      {/* --- CUERPO DE LA PÁGINA (MAIN) --- */}
      <AppShell.Main style={{ backgroundColor: '#141517', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        
        {/* Usamos un condicional: Si NO quiere agendar, mostramos el inicio. Si SÍ quiere, mostramos el Stepper */}
        {!showBooking ? (
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
                onClick={() => setShowBooking(true)}
              >
                Agendar Cita Ahora
              </Button>
            </Center>
          </Container>
        ) : (
          <AppointmentStepper onCancel={() => setShowBooking(false)} />
        )}

      </AppShell.Main>
    </AppShell>
  );
}

export default App;