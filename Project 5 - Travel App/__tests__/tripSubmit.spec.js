import { tripSubmit } from '../src/client/js/tripSubmit';

describe('Test if trip submit function is defined', ()=>{
  test('It should be defined', ()=>{
    expect(tripSubmit).toBeDefined;
  });
});