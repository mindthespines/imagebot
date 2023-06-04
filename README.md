# imagebot

Rebeginning for an image-posting bot.

## Scripts

| Command              | Description                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`      | removes prior build from `/dist` folder, then runs the TypeScript compiler (`tsc`) on the `/src` directory and outputs JS files to the `/dist` folder                                                   |
| `npm run start`      | starts the app with an entry point of `dist/main.js` (it assumes the `/dist` folder has already been built)                                                                                             |
| `npm run dev`        | builds and starts the app - does not rebuild or reload with changes (see below for a script that will track changes)                                                                                    |
| `npm run dev:watch`  | builds and starts the app, then watches for changes, rebuilds as-needed, and restarts the app when changes are detected                                                                                 |
| `npm run test`       | runs the test files in the project                                                                                                                                                                      |
| `npm run test:watch` | runs the test files in the project and watches for changes; reruns tests on changes                                                                                                                     |
| `npm run lint`       | runs ESLint on the project, which will show a list of warnings and errors you may want or need to address; does not change any files                                                                    |
| `npm run lint:fix`   | runs ESLint on the project, correcting fixable errors when possible                                                                                                                                     |
| `npm run format:fix` | runs the Prettier formatter on the project, writes formatting changes to files                                                                                                                          |
| `npm run fix`        | runs the above `format:fix` command, followed by `lint:fix`; an all-in-one lint and format command that writes its changes. There may still be unfixable linting errors, so keep an eye on this output. |

## Extra Bits

Includes GitHub Actions workflows for testing and dependency updates
