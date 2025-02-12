export class Food {
    // id: number = 0;//default value
    //id?: number;//optional when creating food object
    id!: number;//non-null assertion operator
    name!: string;
    price!: number;
    tags!: string[];
    favorite: boolean = false;
    stars: number = 0;
    imageUrl!: string;
    origin!: string[];
    cookTime!: string;
    constructor() {


    }
}