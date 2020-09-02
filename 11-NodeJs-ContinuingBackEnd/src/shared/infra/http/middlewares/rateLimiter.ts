import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = redis.createClient();

export default function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
) { }
