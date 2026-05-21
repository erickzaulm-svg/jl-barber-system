import { useState, useEffect } from 'react';
import { Stepper, Button, Group, Select, MultiSelect, Container, Title, Paper, Text, SimpleGrid, Divider } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axios from 'axios';

export function AppointmentStepper({ onCancel }: { onCancel: () => void }) {
  const [active, setActive] = useState(0);
  
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<string | null>('Río Balsas, Pueblo Nuevo, Apodaca');
  
  // Arreglo para guardar múltiples servicios
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  
  const [barberoSeleccionado, setBarberoSeleccionado] = useState<string | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  
  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);

  const horarios = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  // Buscador de horarios
  useEffect(() => {
    if (fechaSeleccionada && barberoSeleccionado) {
      const fechaReal = new Date(fechaSeleccionada);
      const fechaFormateada = fechaReal.toISOString().split('T')[0];

      axios.get(`https://jl-barber-system.onrender.com/api/appointments/check?fecha=${fechaFormateada}&barbero=${barberoSeleccionado}`)
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

  // Función matemática para calcular el total
  const calcularTotal = () => {
    let total = 0;
    if (serviciosSeleccionados.includes('Corte - $150')) total += 150;
    if (serviciosSeleccionados.includes('Barba - $70')) total += 70;
    if (serviciosSeleccionados.includes('Ceja - $30')) total += 30;
    if (serviciosSeleccionados.includes('Figuras - Desde $40')) total += 40;
    return total;
  };

  const confirmarCita = async () => {
    // --- GUARDIA DE SEGURIDAD ---
    if (!sucursalSeleccionada || serviciosSeleccionados.length === 0 || !barberoSeleccionado || !fechaSeleccionada || !horaSeleccionada) {
      alert("¡Alto ahí! Te faltó seleccionar algún dato (revisa que hayas elegido la hora). Regresa y completa todos los pasos.");
      return; 
    }

    try {
      const datosDeCita = {
        sucursal: sucursalSeleccionada,
        // Unimos los servicios con una coma para guardarlos en la base de datos
        servicio: serviciosSeleccionados.join(', '),
        barbero: barberoSeleccionado,
        fecha: fechaSeleccionada, 
        hora: horaSeleccionada
      };
      const respuesta = await axios.post('https://jl-barber-system.onrender.com/api/appointments', datosDeCita);
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

          <Stepper.Step label="Servicios" description="¿Qué te haremos?">
            <MultiSelect 
              mt="xl" 
              label="Selecciona tus servicios (Puedes elegir varios)" 
              placeholder="Haz clic para agregar servicios" 
              data={['Corte - $150', 'Barba - $70', 'Ceja - $30', 'Figuras - Desde $40']} 
              value={serviciosSeleccionados} 
              onChange={setServiciosSeleccionados} 
              clearable
              styles={{ label: { color: 'white' } }} 
            />
          </Stepper.Step>

          <Stepper.Step label="Barbero" description="¿Con quién te cortas?">
            <Select mt="xl" label="Selecciona a tu barbero" placeholder="Elige un profesional" data={['Ricardo Gonzalez', 'Roberto Gómez ', 'Carlos Ruiz']} value={barberoSeleccionado} onChange={setBarberoSeleccionado} styles={{ label: { color: 'white' } }} />
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
                      const estaOcupada = horasOcupadas.includes(hora);
                      return (
                        <Button 
                          key={hora} variant={horaSeleccionada === hora ? 'filled' : 'outline'} color={estaOcupada ? 'gray' : 'yellow.7'}
                          disabled={estaOcupada} onClick={() => setHoraSeleccionada(hora)} style={{ textDecoration: estaOcupada ? 'line-through' : 'none' }} 
                        >
                          {estaOcupada ? 'Ocupado' : hora}
                        </Button>
                      );
                    })}
                  </SimpleGrid>
                ) : (
                  <Text c="dimmed" size="sm" style={{ fontStyle: 'italic' }}>Selecciona un barbero y un día para ver sus horarios.</Text>
                )}
              </div>
            </Group>
          </Stepper.Step>

          <Stepper.Completed>
            <Paper p="xl" radius="md" mt="xl" style={{ backgroundColor: '#25262B', border: '1px dashed #d4af37' }}>
              <Title order={3} ta="center" c="yellow.7" mb="lg">Verifica tus datos</Title>
              <Divider my="sm" color="#333" />
              <Group justify="space-between" mb="xs"><Text c="dimmed">Sucursal:</Text><Text c="white" fw={500}>{sucursalSeleccionada}</Text></Group>
              
              <Group justify="space-between" mb="xs" align="flex-start">
                <Text c="dimmed">Servicios:</Text>
                <Text c="white" fw={500} ta="right" maw={200}>
                  {serviciosSeleccionados.length > 0 ? serviciosSeleccionados.join(', ') : 'Ninguno'}
                </Text>
              </Group>
              
              <Group justify="space-between" mb="xs"><Text c="dimmed">Barbero:</Text><Text c="white" fw={500}>{barberoSeleccionado || 'No seleccionado'}</Text></Group>
              <Group justify="space-between" mb="xs"><Text c="dimmed">Fecha:</Text><Text c="white" fw={500}>{fechaSeleccionada ? new Date(fechaSeleccionada).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'No seleccionada'}</Text></Group>
              <Group justify="space-between"><Text c="dimmed">Hora:</Text><Text c="white" fw={500}>{horaSeleccionada || 'No seleccionada'}</Text></Group>
              
              <Divider my="md" color="#333" />
              <Group justify="space-between">
                <Text c="yellow.5" fw={700} size="lg">Total Estimado:</Text>
                <Text c="yellow.5" fw={900} size="xl">${calcularTotal()}</Text>
              </Group>
              <Text size="xs" c="dimmed" ta="right" mt={5}>*El precio final puede variar según las figuras o extras.</Text>
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