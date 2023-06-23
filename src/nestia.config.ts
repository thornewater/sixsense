import { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  swagger: {
    output: 'dist/swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'WonJong',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
};
export default config;
