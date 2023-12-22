import assert from 'node:assert/strict';
import test from 'node:test';

import { MinPQueue } from './min-p-queue.mjs';

test('MinPQueue test', () => {
  const pq = new MinPQueue();
  pq.add(3); 
  pq.add(10); 
  pq.add(12); 
  pq.add(8); 
  pq.add(2); 
  pq.add(14);

  const result1 = [];
  while (!pq.isEmpty()) {
    const { value } = pq.extract();
    result1.push(value);
  }

  assert.deepEqual(
    result1,
    [ 2, 3, 8, 10, 12, 14 ],
  )

  pq.add(15);
  pq.add(5);
  const result2 = [];
  while (!pq.isEmpty()) {
    const { value } = pq.extract();
    result2.push(value);
  }

  assert.deepEqual(
    result2,
    [ 5, 15 ],
  )
});

test('MinPQueue test save order for equals', () => {
  const pq = new MinPQueue();

  pq.add(3); 
  pq.add(10, '10.1'); 
  pq.add(10, '10.2'); 
  pq.add(12); 
  pq.add(10, '10.3'); 
  pq.add(8); 
  pq.add(2); 
  pq.add(14);
  pq.add(10, '10.4'); 

  const result = [];
  while (!pq.isEmpty()) {
    const value = pq.extract();
    result.push(value);
  }

  assert.deepEqual(
    result,
    [
      { value: 2, data: undefined },
      { value: 3, data: undefined },
      { value: 8, data: undefined },
      { value: 10, data: '10.1' },
      { value: 10, data: '10.2' },
      { value: 10, data: '10.3' },
      { value: 10, data: '10.4' },
      { value: 12, data: undefined },
      { value: 14, data: undefined },
    ],
  )
});
