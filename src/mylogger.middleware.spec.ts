import { MyloggerMiddleware } from './mylogger.middleware';

describe('MyloggerMiddleware', () => {
  it('should be defined', () => {
    expect(new MyloggerMiddleware()).toBeDefined();
  });
});
