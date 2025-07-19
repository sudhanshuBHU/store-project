export interface ISell {
    _id: string;
    category: string;
    packets: number;
    amount: number;
    day: number;
    month: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Idate {
    day: number;
    month: number;
    year: number;
}

export interface IBuy {
    _id: string;
    stock: number;
    amount: number;
    day: number;
    month: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}