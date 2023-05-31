export function toRepoEntities<T>(clase: { new (): T }, objects: object[]): T {
  const instance = new clase();

  for (let object of objects) {
    for (let key in object) {
      if (instance.hasOwnProperty(key)) {
        instance[key] = object[key];
      }
    }
  }

  return instance;
}
