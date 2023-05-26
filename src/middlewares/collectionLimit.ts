import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as process from 'process'


@Injectable()
export class collectionLimitMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction): void {
        const max = process.env.MAX_COLLECTION_LIMIT || 100;
        const limit = req.query.limit

        if (limit && req.query.limit) {
            req.query.limit = ((limit) <= max ? Number(limit) : max).toString();
        }
        next();
    }
}
