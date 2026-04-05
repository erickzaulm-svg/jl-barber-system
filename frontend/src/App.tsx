import { AppShell, Group, Title, Button, Anchor } from '@mantine/core';
import { IconScissors, IconCalendarClock } from '@tabler/icons-react'; // La librería nativa

function App() {
  return (
    <AppShell header={{ height: 70 }} padding="md">
      
      {/* LA BARRA SUPERIOR (HEADER) */}
      <AppShell.Header style={{ backgroundColor: '#1A1B1E', borderBottom: '1px solid #333' }}>
        <Group justify="space-between" style={{ height: '100%', padding: '0 30px' }}>
          
          {/* Logo de JL Barber */}
          <Group gap="sm">
            <IconScissors color="#d4af37" size={28} /> {/* Ícono color dorado */}
            <Title order={3} style={{ color: 'white', letterSpacing: '2px' }}>
              JL BARBER
            </Title>
          </Group>

          {/* Menú de Navegación */}
          <Group gap="xl" visibleFrom="sm">
            <Anchor href="#" c="dimmed" underline="never" fw={500}>SERVICIOS</Anchor>
            <Anchor href="#" c="dimmed" underline="never" fw={500}>SUCURSALES</Anchor>
            <Anchor href="#" c="dimmed" underline="never" fw={500}>TIENDA</Anchor>
          </Group>

          {/* Botón de Acción Principal */}
          <Button 
            leftSection={<IconCalendarClock size={18} />} 
            color="yellow.7" 
            variant="outline"
            radius="md"
          >
            Haz una cita
          </Button>

        </Group>
      </AppShell.Header>

      {/* EL CUERPO DE LA PÁGINA */}
      <AppShell.Main style={{ backgroundColor: '#141517', minHeight: '100vh' }}>
        {/* Aquí irá el contenido principal más adelante */}
      </AppShell.Main>

    </AppShell>
  );
}

export default App;