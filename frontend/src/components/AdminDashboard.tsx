import { useState, useEffect } from 'react';
import { Container, Title, Table, Paper, Text, Center, Loader, ActionIcon, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';

export function AdminDashboard() {
  const [citas, setCitas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Leer citas al abrir
  useEffect(() => {
    axios.get('https://jl-barber-system.onrender.com/api/appointments')
      .then((respuesta) => {
        setCitas(respuesta.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar citas:", error);
        setCargando(false);
      });
  }, []);

  // --- FUNCIÓN PARA BORRAR ---
  const borrarCita = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de cancelar esta cita? El horario quedará libre nuevamente.");
    
    if (confirmar) {
      try {
        await axios.delete(`https://jl-barber-system.onrender.com/api/appointments/${id}`);
        
        setCitas(citas.filter(cita => cita.id !== id));
        alert("Cita cancelada con éxito.");
      } catch (error) {
        console.error("Error al borrar:", error);
        alert("Hubo un problema al borrar la cita.");
      }
    }
  };

  return (
    <Container size="xl" py="xl" w="100%">
      <Paper shadow="xl" p="xl" radius="md" style={{ backgroundColor: '#1A1B1E', border: '1px solid #333' }}>
        
        <Title order={2} mb="xl" style={{ color: '#d4af37', letterSpacing: '1px' }}>
          PANEL DE ADMINISTRACIÓN - CITAS
        </Title>

        {cargando ? (
          <Center p="xl"><Loader color="yellow.7" /></Center>
        ) : citas.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">No hay citas agendadas todavía.</Text>
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" highlightOnHover style={{ color: 'white' }}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ color: '#d4af37' }}>ID</Table.Th>
                  <Table.Th style={{ color: '#d4af37' }}>Fecha</Table.Th>
                  <Table.Th style={{ color: '#d4af37' }}>Hora</Table.Th>
                  <Table.Th style={{ color: '#d4af37' }}>Servicio</Table.Th>
                  <Table.Th style={{ color: '#d4af37' }}>Barbero</Table.Th>
                  <Table.Th style={{ color: '#d4af37', textAlign: 'center' }}>Acción</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {citas.map((cita) => (
                  <Table.Tr key={cita.id}>
                    <Table.Tr>{cita.id}</Table.Tr>
                    <Table.Td>
                      {new Date(cita.fecha).toLocaleDateString('es-MX', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' })}
                    </Table.Td>
                    <Table.Td fw={700} c="yellow.5">{cita.hora}</Table.Td>
                    <Table.Td>{cita.servicio}</Table.Td>
                    <Table.Td>{cita.barbero}</Table.Td>
                    <Table.Td>
                      <Group justify="center">
                        <ActionIcon color="red" variant="subtle" onClick={() => borrarCita(cita.id)} title="Cancelar Cita">
                          <IconTrash size={20} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Paper>
    </Container>
  );
}