import { clone } from '~/clone.js';

describe('clone', () => {
  test('clones primitives', () => {
    expect(clone(42)).toBe(42);
    expect(clone(42n)).toBe(42n);
    expect(clone('hello')).toBe('hello');
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBeNull();
    expect(clone(undefined)).toBeUndefined();
  });

  test('clones arrays', () => {
    const original = [1, 2, { a: 3 }];
    const copied = clone(original);
    expect(copied).toEqual(original);
    expect(copied).not.toBe(original);
    expect(copied[2]).not.toBe(original[2]);
  });

  test('clones objects', () => {
    const original = { x: 1, y: { z: 2 } };
    const copied = clone(original);
    expect(copied).toEqual(original);
    expect(copied).not.toBe(original);
    expect(copied.y).not.toBe(original.y);
  });

  test('clones Map and Set', () => {
    const map = new Map([[{ a: 1 }, { b: 2 }]]);
    const copiedMap = clone(map);
    expect(copiedMap).toEqual(map);
    for (const [k] of map) {
      expect(copiedMap.has(k)).toBe(false); // deep clone: keys are different
    }

    const set = new Set([{ x: 1 }]);
    const copiedSet = clone(set);
    expect(copiedSet).toEqual(set);
    expect([...copiedSet][0]).not.toBe([...set][0]);
  });

  test('clones Date and RegExp', () => {
    const date = new Date();
    const copiedDate = clone(date);
    expect(copiedDate).toEqual(date);
    expect(copiedDate).not.toBe(date);

    const regex = /abc/gi;
    const copiedRegex = clone(regex);
    expect(copiedRegex).toEqual(regex);
    expect(copiedRegex).not.toBe(regex);
  });

  test('returns same WeakMap / WeakSet', () => {
    const wm = new WeakMap();
    const ws = new WeakSet();
    expect(clone(wm)).toBe(wm);
    expect(clone(ws)).toBe(ws);
  });
  test('returns same Function', () => {
    const fn = function () {
      console.log('fn');
    };
    const arrowFn = () => {
      console.log('arrowFn');
    };
    expect(clone(fn)).toBe(fn);
    expect(clone(arrowFn)).toBe(arrowFn);
  });
});
