import bcrypt from "bcrypt";

/**
 * this class creates a password hash
 */
export class BcryptProvider {
  public static generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
