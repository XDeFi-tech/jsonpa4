export class JSONPatch {
  constructor(operation: PartialOperation[]);
  public apply(obj: any, initialContext?: Context, returnContext?: string): any;
}

interface Context {
  local?: any;
  result: any;
  global: any;
}

interface PartialOperation {
  op: string;
  [key: string]: any;
}

declare function getUrl(prams: {
  addresses: string[];
  [key: string]: any;
}): string;

export function urlTransformator(
  template: string,
  isMulti: boolean
): typeof getUrl;

export function jsonTransformator<T = any>(template: string, data: any): T;
