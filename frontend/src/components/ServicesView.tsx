import { Container, Title, Text, SimpleGrid, Card, Image, Group, Badge, Paper, AspectRatio } from '@mantine/core';

export function ServicesView() {
  
  const cortes = [
    {
      nombre: 'Corte',
      descripcion: 'El estilo que te define, desde lo clásico hasta el fade más moderno.',
      precio: '$150',
      imagen: '/img/corte-clasico.jpg', 
    },
    {
      nombre: 'Barba',
      descripcion: 'Perfilado, recorte y alineación a la medida para lucir impecable.',
      precio: '$70',
      imagen: '/img/barba.jpg', 
    },
    {
      nombre: 'Ceja',
      descripcion: 'Limpieza y delineado perfecto a navaja para resaltar tu mirada.',
      precio: '$30',
      imagen: '/img/ceja.jpg', 
    },
    {
      nombre: 'Figuras',
      descripcion: 'Diseños personalizados a navaja. El límite es tu imaginación.',
      precio: 'Desde $40',
      imagen: '/img/figuras.jpg', 
    },
  ];

  const productos = [
    {
      nombre: 'Polvo Texturizador',
      descripcion: 'Aporta volumen y textura mate al instante. Ideal para un peinado natural en el día a día.',
      precio: '$345', 
      imagen: '/img/polvos.jpg', 
    },
    {
      nombre: 'Cera Moldeadora',
      descripcion: 'Fijación exacta para mantener tu estilo intacto sin dejar residuos.',
      precio: '$120', 
      imagen: '/img/cera.jpg', 
    },
  ];

  return (
    <Container size="lg" py="xl" w="100%">
      
      <Title order={2} mb="xl" style={{ color: '#d4af37', letterSpacing: '1px', textAlign: 'center' }}>NUESTROS SERVICIOS</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {cortes.map((corte) => (
          <Card key={corte.nombre} shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1A1B1E', borderColor: '#333' }}>
            <Card.Section>
              <AspectRatio ratio={1}>
                <Image src={corte.imagen} alt={corte.nombre} fallbackSrc="https://placehold.co/400" />
              </AspectRatio>
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={700} c="white" size="lg">{corte.nombre}</Text>
              <Badge color="yellow.7" variant="filled" size="lg">{corte.precio}</Badge>
            </Group>
            <Text size="sm" c="dimmed">{corte.descripcion}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <Title order={2} mt="100px" mb="xl" style={{ color: '#d4af37', letterSpacing: '1px', textAlign: 'center' }}>PRODUCTOS A LA VENTA</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        {productos.map((prod) => (
          <Paper key={prod.nombre} shadow="xs" p="xl" radius="md" withBorder style={{ backgroundColor: '#1A1B1E', borderColor: '#333' }}>
            <Group wrap="nowrap" align="flex-start">
              
              <div style={{ width: '120px', height: '120px', flexShrink: 0 }}>
                <Image 
                  src={prod.imagen} 
                  h={120} 
                  w={120} 
                  radius="md" 
                  alt={prod.nombre} 
                  fit="cover" 
                  fallbackSrc="https://placehold.co/120" 
                />
              </div>

              <div style={{ flex: 1 }}>
                <Text fw={700} c="white" size="lg" mb={5}>{prod.nombre}</Text>
                <Text size="sm" c="dimmed" mb="md" lh={1.4}>{prod.descripcion}</Text>
                <Text fw={900} c="yellow.5" size="xl">{prod.precio}</Text>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

    </Container>
  );
}