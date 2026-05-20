import { Container, Title, Text, Group, Paper, Image, SimpleGrid, AspectRatio } from '@mantine/core';
import { IconMapPinFilled, IconClockFilled } from '@tabler/icons-react';

export function BranchesView() {
  const direccion = "Río Orinoco 259, Pueblo Nuevo, 66646 Ciudad Apodaca, N.L., México";

  // URL del mapa de Google Maps para tu ubicación en Río Orinoco
  const mapaUrl = "https://www.google.com/maps?q=259+Río+Orinoco,+Pueblo+Nuevo,+Apodaca,+N.L.&output=embed";

  return (
    <Container size="lg" py="xl" w="100%">
      <Title order={2} mb="xl" style={{ color: '#d4af37', letterSpacing: '1px', textAlign: 'center' }}>NUESTRA UBICACIÓN</Title>
      
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {/* COLUMNA IZQUIERDA: INFORMACIÓN DE LA SUCURSAL */}
        <Paper shadow="xl" p="xl" radius="md" style={{ backgroundColor: '#1A1B1E', border: '1px solid #333' }}>
          <Title order={3} c="white" mb="md">Sucursal Apodaca (Río Orinoco)</Title>
          
          <AspectRatio ratio={16 / 9} mb="lg">
            <Image 
              src="/img/barber.jpg" // <-- Tu imagen real vinculada correctamente
              alt="JL Barber Río Orinoco" 
              radius="md" 
              fallbackSrc="https://placehold.co/800x450?text=Foto+de+tu+Local"
            />
          </AspectRatio>

          <Group align="flex-start" mb="sm" wrap="nowrap">
            <IconMapPinFilled size={24} color="#d4af37" style={{ marginTop: '3px' }} />
            <div>
              <Text fw={700} c="white">Dirección:</Text>
              <Text c="dimmed" size="sm">{direccion}</Text>
            </div>
          </Group>

          <Group align="flex-start" wrap="nowrap">
            <IconClockFilled size={24} color="#d4af37" style={{ marginTop: '3px' }} />
            <div>
              <Text fw={700} c="white">Horario de Atención:</Text>
              <Text c="dimmed" size="sm">Lunes a Sábado: 10:00 AM - 8:00 PM</Text>
              <Text c="dimmed" size="sm">Domingo: Cerrado</Text>
            </div>
          </Group>
        </Paper>

        {/* COLUMNA DERECHA: MAPA DE GOOGLE */}
        <Paper shadow="xl" p="xl" radius="md" style={{ backgroundColor: '#1A1B1E', border: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
          <Title order={4} c="white" mb="md">¿Cómo llegar?</Title>
          <div style={{ flex: 1, width: '100%', minHeight: '300px', backgroundColor: '#25262B', borderRadius: '8px', border: '1px dashed #333', position: 'relative', overflow: 'hidden' }}>
            
            <iframe 
              title="Mapa Río Orinoco"
              src={mapaUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
          </div>
        </Paper>
      </SimpleGrid>
    </Container>
  );
}