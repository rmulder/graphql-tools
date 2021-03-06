import { GraphQLSchema } from 'graphql';

import {
  SubschemaConfig,
  Transform,
  MergedTypeConfig,
  CreateProxyingResolverFn,
  Subscriber,
  Executor,
  BatchingOptions,
} from './types';

import { applySchemaTransforms } from './applySchemaTransforms';

export function isSubschema(value: any): value is Subschema {
  return Boolean(value.transformedSchema);
}

interface ISubschema extends SubschemaConfig {
  transformedSchema: GraphQLSchema;
}

export class Subschema<K = any, V = any, C = K> implements ISubschema {
  public schema: GraphQLSchema;

  public rootValue?: Record<string, any>;
  public executor?: Executor;
  public subscriber?: Subscriber;
  public batch?: boolean;
  public batchingOptions?: BatchingOptions<K, V, C>;

  public createProxyingResolver?: CreateProxyingResolverFn;
  public transforms: Array<Transform>;
  public transformedSchema: GraphQLSchema;

  public merge?: Record<string, MergedTypeConfig>;

  constructor(config: SubschemaConfig) {
    this.schema = config.schema;

    this.rootValue = config.rootValue;
    this.executor = config.executor;
    this.subscriber = config.subscriber;
    this.batch = config.batch;
    this.batchingOptions = config.batchingOptions;

    this.createProxyingResolver = config.createProxyingResolver;
    this.transforms = config.transforms ?? [];
    this.transformedSchema = applySchemaTransforms(this.schema, config);

    this.merge = config.merge;
  }
}
