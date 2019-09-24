
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateCategoryInput {
    name: string;
    description: string;
}

export class CreateProductInput {
    name: string;
    description: string;
    category: number[];
    quantity: number;
}

export class CreatePurchaseInput {
    userName: string;
    quantity: string;
    productId: number;
    purchaseDate: string;
}

export class CreateUserInput {
    userName: string;
    roles: string;
    password?: string;
    status: string;
    email: string;
}

export class GetProductInput {
    name?: string;
    description?: string;
    category?: number[];
    quantity?: number;
    pageNum?: number;
    perPage?: number;
}

export class GetPurchaseInput {
    userName: string;
    dateFrom: string;
    dateTo: string;
    productId: number;
    perPage: number;
    pageNum: number;
}

export class GetUsersInput {
    _id?: string;
    userName?: string;
    roles?: string;
    password?: string;
    status?: string;
    email?: string;
    perPage?: number;
    pageNum?: number;
}

export class LoginInput {
    userName: string;
    password: string;
}

export class UpdateProductInput {
    _id: number;
    name: string;
    description: string;
    quantity: number;
    category: number[];
}

export class UpdateUserInput {
    userName: string;
    roles?: string;
    email?: string;
    status?: string;
}

export class Category {
    _id: number;
    name: string;
    description: string;
}

export class CategoryLink {
    _id: number;
    name: string;
    description: string;
}

export class CreatedProductType {
    data: MessageReturnType;
    resource: Product[];
}

export class LoginOutput {
    token: string;
    message: string;
    code: number;
}

export class MessageReturnType {
    message: string;
}

export abstract class IMutation {
    abstract createCategory(data?: CreateCategoryInput): PayloadCreateCategoryOutput | Promise<PayloadCreateCategoryOutput>;

    abstract deleteCategory(_id: number): MessageReturnType | Promise<MessageReturnType>;

    abstract createProduct(data?: CreateProductInput): CreatedProductType | Promise<CreatedProductType>;

    abstract updateProduct(data: UpdateProductInput): MessageReturnType | Promise<MessageReturnType>;

    abstract deleteProduct(_id: number): MessageReturnType | Promise<MessageReturnType>;

    abstract createPurchase(data?: CreatePurchaseInput): MessageReturnType | Promise<MessageReturnType>;

    abstract createUser(data: CreateUserInput): MessageReturnType | Promise<MessageReturnType>;

    abstract updateUser(data: UpdateUserInput): MessageReturnType | Promise<MessageReturnType>;

    abstract deleteUser(id: string): MessageReturnType | Promise<MessageReturnType>;
}

export class PayloadCreateCategoryOutput {
    data: MessageReturnType;
    resource: Category[];
}

export class Product {
    _id: number;
    name: string;
    description: string;
    quantity: number;
    category: number[];
}

export class ProductWithCategory {
    _id: number;
    name: string;
    description: string;
    quantity: number;
    category: CategoryLink[];
}

export class Purchase {
    _id: string;
    quantity: string;
    productId: number;
    purchaseDate: string;
    userName: string;
}

export abstract class IQuery {
    abstract getCategories(): Category[] | Promise<Category[]>;

    abstract login(data?: LoginInput): LoginOutput | Promise<LoginOutput>;

    abstract getProducts(data?: GetProductInput): ProductWithCategory[] | Promise<ProductWithCategory[]>;

    abstract getPurchase(data: GetPurchaseInput): Purchase[] | Promise<Purchase[]>;

    abstract getUsers(data?: GetUsersInput): User[] | Promise<User[]>;
}

export class User {
    _id: string;
    userName: string;
    roles: string;
    password: string;
    status: string;
    email: string;
}
