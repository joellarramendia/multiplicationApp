import {createDefaultPreset} from 'ts-jest'

const tsJestTransformCfg = createDefaultPreset()

/** @type {import("jest").Config} **/
export default {
  preset: 'ts-jest/presets/default-esm', // Usa el preset específico para ESM
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg.transform,
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Esto ayuda a Jest a entender los imports que terminan en .js
  },
};