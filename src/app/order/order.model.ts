export interface Order {
    _id?: string;
    amount: number;
    cashbackPercentage?: number;
    cashbackValue?: number;
    code: number;
    createdAt: string | Date;
    orderDate: string | Date;
    updatedAt: string | Date;
    user: any;
}