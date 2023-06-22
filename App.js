import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Main } from './src/components';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#5D53A4' }}>
      <StatusBar barStyle="light-content" />
      <Main />
    </SafeAreaProvider>

  );
}