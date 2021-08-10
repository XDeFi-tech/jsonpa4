export default class JSONPatch {
  constructor(operation: PartialOperation[]) {}
  public apply(obj: any, initialContext: Context, returnContext: string): any;
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

export const urlTransformator = (template: string, isMulti: boolean) => ({
  addresses,
}: {
  addresses: string[];
}) => string;
