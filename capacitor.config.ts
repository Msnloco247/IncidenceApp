import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'police',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    Media: {
      // Configuración específica del plugin (si es necesario)
    }
  }
};

export default config;
