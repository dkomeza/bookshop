// src/middleware/validate.ts
import type { NextFunction, Request, Response } from "express";
import { z, type ZodTypeAny, type ZodObject } from "zod";

function formatZodError(error: z.ZodError) {
  return error.issues
    .map((i) =>
      i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message
    )
    .join("; ");
}

export function validateParams<T extends ZodObject<any>>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, error: formatZodError(parsed.error) });
    }
    (res.locals as any).params = parsed.data as z.infer<T>;
    next();
  };
}

export function validateBody<T extends ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, error: formatZodError(parsed.error) });
    }
    (res.locals as any).body = parsed.data as z.infer<T>;
    next();
  };
}

export function validateQuery<T extends ZodObject<any>>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, error: formatZodError(parsed.error) });
    }
    (res.locals as any).query = parsed.data as z.infer<T>;
    next();
  };
}
