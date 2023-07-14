export class InMemoryStorageGateway {
  store = new Map();

  getById(id) {
    return this.store.get(id);
  }

  save(itemId, item) {
    this.store.set(itemId, item);
  }

  remove(itemId) {
    this.store.delete(itemId);
  }
}
