export function clone<T>(obj: T): T {
  const type = Object.prototype.toString.call(obj);
  if (type === '[object Set]') {
    return new Set([...(obj as Set<unknown>)].map((value) => clone(value))) as unknown as T;
  }
  if (type === '[object Map]') {
    return new Map(
      [...(obj as Map<unknown, unknown>)].map((kv) => [clone(kv[0]), clone(kv[1])]),
    ) as unknown as T;
  }
  if (type === '[object Date]') {
    return new Date((obj as Date).getTime()) as T;
  }
  if (type === '[object RegExp]') {
    return RegExp((obj as RegExp).source, (obj as RegExp).flags) as T;
  }
  if (type === '[object Array]') {
    return (obj as unknown[]).map(clone) as unknown as T;
  }
  if (type === '[object Object]') {
    const result = {};
    for (const key in obj) {
      // @ts-expect-error TODO
      result[key] = clone(obj[key]);
    }
    return result as T;
  }

  return obj;
}
