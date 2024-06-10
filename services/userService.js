import { userRepository } from "../repositories/userRepository.js";

class UserService {
  create(user) {
    return userRepository.create(user);
  }

  getAll() {
    return userRepository.getAll();
  }

  get(id) {
    return userRepository.getOne(id);
  }

  update(id, updates) {
    return userRepository.update(id, updates);
  }

  delete(id) {
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
