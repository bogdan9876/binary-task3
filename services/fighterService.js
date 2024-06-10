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
    return fighterRepository.getOne(search);
  }
}

const fighterService = new FighterService();

export { fighterService };