import { userRepository } from "../repositories/userRepository.js";

class UserService {
  create(user) {
    const existingUser = userRepository.getOne({ email: user.email });
    if (existingUser) {
      throw new Error("Email already exists.");
    }
    return userRepository.create(user);
  }

  getAll() {
    return userRepository.getAll();
  }

  get(id) {
    return userRepository.getOne({ id });
  }

  update(id, updates) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found.");
    }
    if (updates.email && updates.email !== user.email) {
      const existingUser = userRepository.getOne({ email: updates.email });
      if (existingUser) {
        throw new Error("Email already exists.");
      }
    }
    return userRepository.update(id, updates);
  }

  delete(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found.");
    }
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
