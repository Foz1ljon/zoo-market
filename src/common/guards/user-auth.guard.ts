import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/schemas/user.schema";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException("User unauthorized");

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) throw new UnauthorizedException("User unauthorized");

    try {
      const user: Partial<User> = await this.jwtService.verify(token, {
        secret: process.env.JWTSKU,
      });
      if (!user) throw new UnauthorizedException("User unauthorized");

      if (!user.is_active) throw new UnauthorizedException("User is not active");
      return true;
    } catch (error) {
      throw new UnauthorizedException("User unauthorized");
    }
  }
}
