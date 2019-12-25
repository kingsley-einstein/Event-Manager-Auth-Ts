export default class Key {
  static async hasKeys(body: object, keys: string[]): Promise<boolean> {
    return Object.keys(body).every((firstEntry) => {
      return keys.some((secondEntry) => {
        return firstEntry === secondEntry;
      });
    });
  }
}
