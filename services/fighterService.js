import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    // return all fighters
    return fighterRepository.getAll();
  }
  create(fighter) {
    // create and return a new fighter
    return fighterRepository.create(fighter);
  }

  update(id, updates) {
    // update and return the fighter with the specified id
    return fighterRepository.update(id, updates);
  }

  delete(id) {
    // delete the fighter with the specified id
    return fighterRepository.delete(id);
  }

  search(search) {
    // search and return fighters that match the specified query
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
