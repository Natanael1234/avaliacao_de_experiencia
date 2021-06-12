import { HttpExceptionHandlerFilter } from './http-exception-handler.filter';

describe('ExceptionHandlerFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionHandlerFilter()).toBeDefined();
  });
});
