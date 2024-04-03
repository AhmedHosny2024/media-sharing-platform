import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/modules/user/dtos/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { comparePasswords } from 'src/shared/encryption.util';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}
    async validateUser(email: string, password: string): Promise<any> {
        const logininUser = await this.userService.findByEmail(email, true);
        if (!logininUser) {
            throw new UnauthorizedException('Invalid username or password');
        }
    
        const correct_password = await comparePasswords(
            password,
            logininUser.password,
        );
        if (!correct_password) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return logininUser;
    }

    async login(user: User) {
        const payload = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            phone: user.phone,
        };
        return {
            userData: payload,
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(user: CreateUserDTO) {
        const newUser = await this.userService.create(user);
        const payload = {
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            phone: newUser.phone,
        };
        return {
            userData:payload,
            access_token: this.jwtService.sign(payload)
        };
    }

    validateToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            return payload;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
