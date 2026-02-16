import { Request, Response, NextFunction } from "express"
import z from "zod"
export function validateRequestParams<T>(schema:z.ZodSchema<T>){
    return(req: Request, res: Response, next: NextFunction)=>{
        const validateParams = schema.safeParse(req.params)
        if(!validateParams.success){
            return res.status(400).json({errors: z.treeifyError(validateParams.error)});
        }

        next();
    }
}