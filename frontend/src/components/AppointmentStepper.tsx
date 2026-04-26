import { useState, useEffect } from 'react';
import { Stepper, Button, Group, Select, Container, Title, Paper, Text, SimpleGrid, Divider } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axios from 'axios';

export function AppointmentStepper({ onCancel }: { onCancel: () => void }) {
  const [active, setActive] = useState(0);
  const [serviciosReales, setServiciosReales] = useState<string[]>([]);
  
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<string | null>('Río Balsas, Pueblo Nuevo, Apodaca');
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string | null>(null);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<string | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  
  // --- NUEVO ESTADO: Memoria de horas ocupadas ---
  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);

  const horarios = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  // Cargar servicios al abrir
  useEffect(() => {
    axios.get('http://localhost:3000/api/services')
      .then((respuesta) => setServiciosReales(respuesta.data.map((s: any) => s.name)))
      .catch((error) => console.error(error));
  }, []);

 // --- EFECTO DE INTELIGENCIA (Actualizado para Zonas Horarias) ---
  useEffect(() => {
    if (fechaSeleccionada && barberoSeleccionado) {
      
      const fechaReal = new Date(fechaSeleccionada);
      
      // La forma a prueba de balas para obtener YYYY-MM-DD sin que la zona horaria nos reste un día
      const fechaFormateada = fechaReal.toISOString().split('T')[0];

      axios.get(`http://localhost:3000/api/appointments/check?fecha=${fechaFormateada}&barbero=${barberoSeleccionado}`)
        .then((respuesta) => {
          setHorasOcupadas(respuesta.data); 
          setHoraSeleccionada(null); 
        })
        .catch((error) => console.error("Error buscando horas:", error));
    } else {
      setHorasOcupadas([]);
    }
  }, [fechaSeleccionada, barberoSeleccionado]);

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const confirmarCita = async () => {
    try {
      const datosDeCita = {
        sucursal: sucursalSeleccionada,
        servicio: servicioSeleccionado,
        barbero: barberoSeleccionado,
        fecha: fechaSeleccionada, 
        hora: horaSeleccionada
      };
      const respuesta = await axios.post('http://localhost:3000/api/appointments', datosDeCita);
      alert(respuesta.data.mensaje);
      onCancel();
    } catch (error) {
      alert("Hubo un problema al agendar la cita.");
    }
  };

  return (
    <Container size="md" py="xl" w="100%">
      <Paper shadow="xl" p="xl" radius="md" style={{ backgroundColor: '#1A1B1E', border: '1px solid #333' }}>
        
        <Title order={2} mb="xl" style={{ textAlign: 'center', color: '#d4af37', letterSpacing: '1px' }}>
          RESERVA TU CITA
        </Title>

        <Stepper active={active} onStepClick={setActive} color="yellow.7" size="sm">
          
          <Stepper.Step label="Sucursal" description="Elige tu barbería">
            <Select mt="xl" label="Selecciona una sucursal" data={['Río Balsas, Pueblo Nuevo, Apodaca']} value={sucursalSeleccionada} onChange={setSucursalSeleccionada} styles={{ label: { color: 'white' } }} />
          </Stepper.Step>

          <Stepper.Step label="Servicio" description="¿Qué te haremos?">
            <Select mt="xl" label="Selecciona tu servicio" placeholder="Elige un servicio" data={serviciosReales} value={servicioSeleccionado} onChange={setServicioSeleccionado} styles={{ label: { color: 'white' } }} />
          </Stepper.Step>

          <Stepper.Step label="Barbero" description="¿Con quién te cortas?">
            <Select mt="xl" label="Selecciona a tu barbero" placeholder="Elige un profesional" data={['Erick (Master Barber)', 'Carlos (Especialista en Barba)']} value={barberoSeleccionado} onChange={setBarberoSeleccionado} styles={{ label: { color: 'white' } }} />
          </Stepper.Step>

          <Stepper.Step label="Fecha y Hora" description="Tu disponibilidad">
            <Group align="flex-start" mt="xl" grow>
              <div>
                <Text c="white" mb="sm" fw={500}>1. Selecciona el día</Text>
                <DatePicker value={fechaSeleccionada} onChange={(date: any) => setFechaSeleccionada(date)} minDate={new Date()} styles={{ calendarHeader: { color: 'white' }, day: { color: 'white' } }} />
              </div>
              <div>
                <Text c="white" mb="sm" fw={500}>2. Horarios disponibles</Text>
                {fechaSeleccionada && barberoSeleccionado ? (
                  <SimpleGrid cols={2}>
                    {horarios.map((hora) => {
                      // --- LÓGICA DE BLOQUEO VISUAL ---
                      const estaOcupada = horasOcupadas.includes(hora);
                      
                      return (
                        <Button 
                          key={hora} 
                          variant={horaSeleccionada === hora ? 'filled' : 'outline'} 
                          color={estaOcupada ? 'gray' : 'yellow.7'}
                          disabled={estaOcupada} // Apagamos el botón si está ocupada
                          onClick={() => setHoraSeleccionada(hora)}
                          style={{ textDecoration: estaOcupada ? 'line-through' : 'none' }} // Tachamos el texto
                        >
                          {estaOcupada ? 'Ocupado' : hora}
                        </Button>
                      );
                    })}
                  </SimpleGrid>
                ) : (
                  <Text c="dimmed" size="sm" style={{ fontStyle: 'italic' }}>
                    Selecciona un barbero y un día para ver sus horarios.
                  </Text>
                )}
              </div>
            </Group>
          </Stepper.Step>

          <Stepper.Completed>
            <Paper p="xl" radius="md" mt="xl" style={{ backgroundColor: '#25262B', border: '1px dashed #d4af37' }}>
              <Title order={3} ta="center" c="yellow.7" mb="lg">Verifica tus datos</Title>
              <Divider my="sm" color="#333" />
              <Group justify="space-between" mb="xs"><Text c="dimmed">Sucursal:</Text><Text c="white" fw={500}>{sucursalSeleccionada}</Text></Group>
              <Group justify="space-between" mb="xs"><Text c="dimmed">Servicio:</Text><Text c="white" fw={500}>{servicioSeleccionado || 'No seleccionado'}</Text></Group>
              <Group justify="space-between" mb="xs"><Text c="dimmed">Barbero:</Text><Text c="white" fw={500}>{barberoSeleccionado || 'No seleccionado'}</Text></Group>
              <Group justify="space-between" mb="xs">
                <Text c="dimmed">Fecha:</Text>
                <Text c="white" fw={500}>{fechaSeleccionada ? new Date(fechaSeleccionada).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'No seleccionada'}</Text>
              </Group>
              <Group justify="space-between"><Text c="dimmed">Hora:</Text><Text c="white" fw={500}>{horaSeleccionada || 'No seleccionada'}</Text></Group>
            </Paper>
          </Stepper.Completed>

        </Stepper>

        <Group justify="center" mt="xl" pt="md">
          <Button variant="default" color="gray" onClick={active === 0 ? onCancel : prevStep}>{active === 0 ? 'Cancelar' : 'Atrás'}</Button>
          <Button color="yellow.7" onClick={active === 4 ? confirmarCita : nextStep}>{active === 4 ? 'Confirmar y Agendar' : 'Siguiente'}</Button>
        </Group>

      </Paper>
    </Container>
  );
}