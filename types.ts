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
    categoryId: any;
    id: string;
    userId: string;
    name: string;
    description: string;
    price: string;
    location: string;
    condition: string;
    images: Image[];
}

export interface Image{
    id: string;
    url: string;
}

export interface Chat {
    chatName: String;
    id: String;
    fromUserId: String;
    toUserId: String;
    messages: Message[];
    productId: Product[]
}

export interface Message{
    id: String;
    text: String;
    chatId: Chat;
}