import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class cartController {   

    public static async addVariantToCart (req: Request, res: Response) {
        const { userId } = req.params;
        const { variantId } = req.body;
        try {

            const variant = await prisma.variant.findUnique({ where: { id: variantId }, include: { product: true } });
            
            if (!variant) {
                return res.status(404).json({ error: "Variante não encontrada." });
            }
            
            const updatedCart = await prisma.$transaction(async (tx:any) => {

                //se a variant ja estiver, simplesmente atualiza a quantidade, caso nao esteja, ele adiciona a variant
                if(updatedCart.cartVariants.some((cv:any) => cv.variantId === variantId)) {
                    return tx.cart.update({
                        where: { userId: userId },
                        data: {
                            quantity: { increment: 1 }
                        },
                        include: { cartVariants: { include:  { variant: true } }}
                    });
                }

                await tx.cartVariant.create({
                    data: {
                        cart: { connect: { userId: userId } },
                        variant: { connect: { id: variantId } },
                    }
                });
                
                return tx.cart.update({
                    where: { userId: userId },
                    data: {
                        subtotal: { increment: variant.product.price },
                        totalCost: { increment: variant.product.price }
                    },
                    include: { cartVariants: { include:  { variant: true } }}
                });
            });
            res.status(200).json(updatedCart);
            
        } catch (error) {
            res.status(500).json({ error: "Internal server error.", message: error });
        }
    }


    public static async removeVariant (req: Request, res: Response) {
        
        const { userId } = req.params;
        const { variantId } = req.body;

        try {
            
            const variant = await prisma.variant.findUnique({ where: { id: variantId }, include: { product: true } });

            if (!variant) {    
                return res.status(404).json({ error: "Variante não encontrada." });
            }

            const updatedCart = await prisma.$transaction(async (tx:any) => {

                const removedVariantToCart = await tx.cartVariant.deleteMany({
                    where: {
                        cart: { userId: userId },
                        variant: { variantId: variantId }
                    }
                });

                if (removedVariantToCart.count === 0) {
                    throw new Error("Variante não encontrada no carrinho.");
                }
                
                return tx.cart.update({
                    where: { userId: userId },
                    data: {
                        subtotal: { decrement: variant.product.price },
                        totalCost: { decrement: variant.product.price }
                    },
                    include: { cartVariants: { include:  { variant: true } }}
                });
            });
            res.status(200).json(updatedCart);
            
        } catch (error) {
            res.status(500).json({ error: "Internal server error.", message: error });
        }
    }

    public static async getCart (req: Request, res: Response) {

        try {

            const { userId } = req.params;

            const cart = await prisma.cart.findUnique({
                where: { userId: Number(userId) },
                include: {
                    cartVariants: {
                        include: {
                            variant: true
                        }
                    }
                }
            });
            res.status(200).json(cart);
            
        } catch (error) {
            res.status(500).json({ error: "Internal server error.", message: error });
        }
    }

    
    
        


}