import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }
  create(fighter) {
    return fighterRepository.create(fighter);
  }

  update(id, updates) {
    return fighterRepository.update(id, updates);
  }

  delete(id) {
    return fighterRepository.delete(id);
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
