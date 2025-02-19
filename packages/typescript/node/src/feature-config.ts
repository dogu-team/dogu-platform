import { Printable } from '@dogu-tech/common';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const ConfigFileName = 'feature.config.json';

function getRootConfigPath(configDirPath: string): string {
  return path.resolve(configDirPath, ConfigFileName);
}

function getRunTypeConfigPath(configDirPath: string, runType: string): string {
  return path.resolve(configDirPath, 'features', `${runType}.${ConfigFileName}`);
}

function createFeatureConfigFileNotFoundError(...paths: string[]): Error {
  return new Error(`Feature config file not found. paths: ${paths.join(', ')}`);
}

function parseConfig<T>(filePath: string, content: string, printable: Printable): FeatureConfig<T> {
  try {
    const data = JSON.parse(content) as T;
    printable.info(`Feature config load complete. path: ${filePath}`, {
      data,
    });
    return new FeatureConfig<T>(filePath, data);
  } catch (error) {
    printable.error(`Feature config load failed. path: ${filePath}`);
    throw error;
  }
}

export function loadFeatureConfigSync<T>(doguRunType: string, printable: Printable, configDirPath: string = process.cwd()): FeatureConfig<T> {
  const rootConfigPath = getRootConfigPath(configDirPath);
  if (fs.existsSync(rootConfigPath)) {
    const content = fs.readFileSync(rootConfigPath, 'utf8');
    return parseConfig<T>(rootConfigPath, content, printable);
  } else {
    const runTypeConfigPath = getRunTypeConfigPath(configDirPath, doguRunType);
    if (!fs.existsSync(runTypeConfigPath)) {
      throw createFeatureConfigFileNotFoundError(rootConfigPath, runTypeConfigPath);
    }
    const content = fs.readFileSync(runTypeConfigPath, 'utf8');
    return parseConfig<T>(runTypeConfigPath, content, printable);
  }
}

export async function loadFeatureConfig<T>(doguRunType: string, printable: Printable, configDirPath: string = process.cwd()): Promise<FeatureConfig<T>> {
  const isExist = async (path: string): Promise<boolean> => {
    return fs.promises
      .stat(path)
      .then((stat) => {
        return stat.isFile();
      })
      .catch(() => false);
  };

  const rootConfigPath = getRootConfigPath(configDirPath);
  if (await isExist(rootConfigPath)) {
    const content = await fs.promises.readFile(rootConfigPath, 'utf8');
    return parseConfig<T>(rootConfigPath, content, printable);
  } else {
    const runTypeConfigPath = getRunTypeConfigPath(configDirPath, doguRunType);
    if (!(await isExist(runTypeConfigPath))) {
      throw createFeatureConfigFileNotFoundError(rootConfigPath, runTypeConfigPath);
    }
    const content = await fs.promises.readFile(runTypeConfigPath, 'utf8');
    return parseConfig<T>(runTypeConfigPath, content, printable);
  }
}

export function validateEveryRunTypePropertyEqualitySync(configDirPath: string = process.cwd()): void {
  const fileNames = fs.readdirSync(path.resolve(configDirPath, 'features'));
  const datas = fileNames
    .map((fileName) => path.resolve(configDirPath, 'features', fileName))
    .map((filePath) => ({ filePath, content: fs.readFileSync(filePath, 'utf8') }))
    .map(({ filePath, content }) => ({ filePath, config: JSON.parse(content) as object }));
  if (datas.length < 2) {
    return;
  }
  const left = datas[0];
  const rights = datas.slice(1);
  for (const right of rights) {
    if (_.keys(left.config).length !== _.keys(right.config).length) {
      throw new Error(`Feature config keys length not equal. left: ${left.filePath}, right: ${right.filePath}`);
    }

    for (const key of _.keys(left.config)) {
      if (typeof _.get(left.config, key) !== typeof _.get(right.config, key)) {
        throw new Error(`Feature config property type not equal. left: ${left.filePath}, right: ${right.filePath}, key: ${key}`);
      }
    }
  }
}

export class FeatureConfig<T> {
  constructor(
    readonly filePath: string,
    private readonly data: T,
  ) {}

  get(key: keyof T): T[keyof T] {
    return this.data[key];
  }

  getAll(): T {
    return this.data;
  }
}
