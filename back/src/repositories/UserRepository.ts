import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import { DBEntityManager } from "../singletons/DbEntityManager";
import { FastifyHolder } from "../singletons/FastifyHolder";

export interface UserRepository {
    createUser(email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    verifyJWTToken(token: string): Promise<{ userId: number; email: string }>
}

export class UserRepositoryImpl implements UserRepository {
    SALT_ROUNDS = 10;
    dbManager = DBEntityManager.getInstance()
    userRepo = this.dbManager.getRepository(User)
    fastify = FastifyHolder.getInstance()


    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async createUser(email: string, password: string): Promise<string> {
        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) {
            throw Error("User already exists");
        }

        const hashedPassword = await this.hashPassword(password);

        // TODO: check email
        if (!email.includes("@")) {
            throw Error("Email Invalid")
        }
        const user = new User(email, hashedPassword);
        const savedUser = await this.userRepo.save(user);

        const token = this.fastify.jwt.sign({ userId: savedUser.id, userEmail: savedUser.email })

        return token
    }
    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw Error("Invalid credentials");
        }

        const isValid = await this.verifyPassword(password, user.password);
        if (!isValid) {
            throw Error("Invalid credentials");
        }

        const token = this.fastify.jwt.sign({ userId: user.id, email: user.email });

        return token;
    }

    async verifyJWTToken(token: string): Promise<{ userId: number; email: string }> {
        try {
            const decoded = await this.fastify.jwt.verify<{ userId: number; email: string }>(token);
            return decoded;
        } catch (err) {
            throw new Error("Invalid or expired token");
        }
    }


}