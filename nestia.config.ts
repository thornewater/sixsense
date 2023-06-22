// import { INestiaConfig } from '@nestia/sdk';

// const config: INestiaConfig = {
//   input: 'src/**/*.controller.ts',
//   swagger: {
//     output: 'dist/swagger.json',
//     security: {
//       bearer: {
//         type: 'apiKey',
//         name: 'Wonjong',
//         in: 'header',
//       },
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//         description: 'Local Server',
//       },
//     ],
//   },
// };
// export default config;

// nestia configuration file
import type sdk from '@nestia/sdk';

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/api',
  swagger: {
    output: 'dist/swagger.json',
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
  primitive: false,
  simulate: true,
};
export default NESTIA_CONFIG;
