import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Classe das variantes
export class variantController {

    public static async createVariant (request: Request, response: Response) {
        try {
            const {color, size, stock} = request.body;

            const createdVariant = await prisma.variant.create({
                data: {
                    color: color,
                    size: size,
                    stock: stock
                }
            });

            response.status(201).json(createdVariant);
        } catch (error: any) {
            response.status(500).json({message: error.message});
        }
    }

    public static async readAllVariant (request: Request, response: Response) {
        try {
            const {id} = request.params;
            const foundAllVariant = await prisma.variant.findMany();

            response.status(200).json(foundAllVariant);
        } catch (error: any) {
            response.status(500).json({message: error.message});
        }
    }

    public static async readVariant (request: Request, response: Response) {
        try {
            const {id} = request.params;

            const foundVariant = await prisma.variant.findUnique({
                where: {id: parseInt(id as string)}
            });

            response.status(200).json(foundVariant);
        } catch (error: any) {
            response.status(500).json({message: error.message});
        }
    }

    public static async updateVariant (request: Request, response: Response) {
        try {
            const {id} = request.params;

            const {color, size, stock} = request.body;

            const createdVariant = await prisma.variant.update({
                where: {id: parseInt(id as string)},
                data: {
                    color: color,
                    size: size,
                    stock: stock
                }
            });
        }
    }
}