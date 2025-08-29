import {AsyncLocalStorage} from 'node:async_hooks';
import type {Request as ExpressRequest} from 'express';

const storage = new AsyncLocalStorage<ExpressRequest>();

export const requestContext = {

  run: (req: ExpressRequest, fn: () => void) => {
    storage.enterWith(req);
    fn();
  },

  get: (): ExpressRequest | undefined => {
    return storage.getStore();
  },
};
