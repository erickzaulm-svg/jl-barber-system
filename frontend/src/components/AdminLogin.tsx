import { useState } from 'react';
import { Paper, TextInput, PasswordInput, Button, Title, Container, Text } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import axios from 'axios';

export function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const intentarLogin = async () => {
    try {
      // Hacemos la llamada al cadenero del backend
      const respuesta = await axios.post('https://jl-barber-system.onrender.com', { usuario, password });
      
      if (respuesta.data.success) {
        onLoginSuccess(); // Si nos da acceso, abrimos la bóveda
      }
    } catch (err) {
      setError('Usuario o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <Container size="xs" py="xl" mt="xl">
      <Paper shadow="xl" p="xl" radius="md" style={{ backgroundColor: '#1A1B1E', border: '1px solid #d4af37' }}>
        <Title order={3} ta="center" c="yellow.7" mb="md">
          <IconLock size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          ACCESO PRIVADO
        </Title>
        
        <Text c="dimmed" size="sm" ta="center" mb="xl">
          Ingresa tus credenciales para administrar las citas.
        </Text>

        <TextInput
          label="Usuario"
          placeholder="Tu usuario de administrador"
          value={usuario}
          onChange={(e) => setUsuario(e.currentTarget.value)}
          styles={{ label: { color: 'white' }, input: { backgroundColor: '#25262B', color: 'white', border: '1px solid #333' } }}
          mb="md"
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña secreta"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          styles={{ label: { color: 'white' }, input: { backgroundColor: '#25262B', color: 'white', border: '1px solid #333' } }}
          mb="xl"
        />

        {error && (
          <Text c="red" size="sm" ta="center" mb="md" fw={500}>{error}</Text>
        )}

        <Button fullWidth color="yellow.7" onClick={intentarLogin}>
          Entrar al Panel
        </Button>
      </Paper>
    </Container>
  );
}