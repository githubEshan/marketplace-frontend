export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category{
    id: string;
    name: string;
    billboard: Billboard;
};

export interface Product{
    category: any;
    id: string;
    name: string;
    description: string;
    price: string;
    location: string;
    condition: string;
    images: Image[]
}

export interface Image{
    id: string;
    url: string
}