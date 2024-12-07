export interface Billboard {
    id: string;
    name: string;
    imageurl: string;
};

export interface Category{
    id: string;
    name: String;
    billboard: Billboard;
};