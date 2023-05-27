import { PassportStrategy } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtStrategy } from '../modules/auth/strategies/JwtStrategy'
