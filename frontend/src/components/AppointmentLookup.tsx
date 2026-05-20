import { useState } from 'react';
import { Container, Title, TextInput, Button, Paper, Text, Divider, Group, Center, Loader } from '@mantine/core';
import { IconSearch, IconCalendarCheck } from '@tabler/icons-react';
import axios from 'axios';

export function AppointmentLookup() {
  const [idBusqueda, setIdBusqueda] = useState('');
  const [cita, setCita] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const buscarCita = async () => {
    if (!idBusqueda.trim()) return;
    
    setCargando(true);
    setError('');
    setCita(null);

    try {
      const respuesta = await axios.get(`http://localhost:3000/api/appointments/${idBusqueda}`);
      setCita(respuesta.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError('No encontramos ninguna cita con ese ID. Verifica el número.');
      } else {
        setError('Hubo un problema al consultar el servidor.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container size="xs" py="xl" mt="xl">
      <Paper shadow="xl" p="xl" radius="md" style={{ backgroundColor: '#1A1B1E', border: '1px solid #333' }}>
        
        <Title order={3} ta="center" c="yellow.7" mb="md">
          CONSULTAR MI CITA
        </Title>
        
        <Text c="dimmed" size="sm" ta="center" mb="xl">
          Ingresa el número de ID/Folio que te dio el sistema al agendar.
        </Text>

        <Group align="flex-end" mb="xl">
          <TextInput
            placeholder="Ej. 1"
            label="ID de la Cita"
            value={idBusqueda}
            onChange={(e) => setIdBusqueda(e.currentTarget.value)}
            style={{ flex: 1 }}
            styles={{ label: { color: 'white' }, input: { backgroundColor: '#25262B', color: 'white' } }}
          />
          <Button color="yellow.7" onClick={buscarCita} loading={cargando}>
            <IconSearch size={18} />
          </Button>
        </Group>

        {error && (
          <Text c="red" size="sm" ta="center" fw={500}>{error}</Text>
        )}

        {/* --- COMPONENTE DE BOLETO DIGITAL --- */}
        {cita && (
          <Paper p="md" radius="md" mt="xl" style={{ backgroundColor: '#25262B', border: '1px dashed #d4af37' }}>
            <Group justify="center" gap="xs" mb="sm">
              <IconCalendarCheck color="#d4af37" size={24} />
              <Title order={4} c="yellow.7">¡Cita Confirmada!</Title>
            </Group>
            
            <Text size="xs" c="dimmed" ta="center" mb="md">Folio de sistema: #{cita.id}</Text>
            <Divider my="sm" color="#333" />
            
            <Group justify="space-between" mb="xs"><Text c="dimmed" size="sm">Sucursal:</Text><Text c="white" size="sm" fw={500}>{cita.sucursal}</Text></Group>
            <Group justify="space-between" mb="xs"><Text c="dimmed" size="sm">Servicios:</Text><Text c="white" size="sm" fw={500} ta="right" maw={180}>{cita.servicio}</Text></Group>
            <Group justify="space-between" mb="xs"><Text c="dimmed" size="sm">Barbero:</Text><Text c="white" size="sm" fw={500}>{cita.barbero}</Text></Group>
            <Group justify="space-between" mb="xs">
              <Text c="dimmed" size="sm">Fecha:</Text>
              <Text c="white" size="sm" fw={500}>
                {new Date(cita.fecha).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
              </Text>
            </Group>
            <Group justify="space-between"><Text c="dimmed" size="sm">Hora:</Text><Text c="yellow.5" size="md" fw={700}>{cita.hora}</Text></Group>
          </Paper>
        )}

      </Paper>
    </Container>
  );
}