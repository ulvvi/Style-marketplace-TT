import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Classe das coleções
export class collectionController {
  public static async createCollection(request: Request, response: Response) {
    try {
      const { type } = request.body;

      const createdCollection = await prisma.collection.create({
        data: {
          type: type
        }
      });

      response.status(201).json(createdCollection);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readAllCollections(request: Request, response: Response) {
    try {

      const foundAllCategories = await prisma.collection.findMany();

      response.status(200).json(foundAllCategories);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readCollection(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const foundCollection = await prisma.collection.findUnique({
        where: { id: parseInt(id as string) },
        include: { 
            products: true 
         },
      });

      if(!foundCollection) {
        return response.status(404).json({message: "Collection not found"})
      }

      response.status(200).json(foundCollection);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateCollection(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const { type } = request.body;

      const updatedCollection = await prisma.collection.update({
        where: { id: parseInt(id as string) },
        data: {
          type : type
        },
      });

      response.status(200).json(updatedCollection);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async deleteCollection(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedCollection = await prisma.collection.delete({
        where: { id: parseInt(id as string) },
      });

      response.status(200).json(deletedCollection);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async addToCollection(request: Request, response: Response) {
    try {
      const { collectionId, productId } = request.params

      const createdRelation = await prisma.product.update({
        where: { id: Number(productId) },
        data: {
          collectionId: Number(collectionId)
        }
      });

      response.status(201).json(createdRelation);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async delFromCollection(request: Request, response: Response) {
    try {
      const { productId } = request.params;

      const deletedRelation = await prisma.product.update({
        where: { id: Number(productId) },
        data: {
          collectionId: null
        },
      });
      response.status(200).json(deletedRelation);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}

