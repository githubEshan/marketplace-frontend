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
    chats: Chat[];
}

export interface Image{
    id: string;
    url: string;
}

export interface Chat {
    chatName: string;
    id: string;
    fromUserId: string;
    toUserId: string;
    messages: Message[];
    productId: string;
}

export interface Message{
    id: string;
    userId: string;
    text: string;
    chatId: string;
}