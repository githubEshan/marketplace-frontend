export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category{
    id: string;
    name: String;
    billboard: Billboard;
};

//export interface Product{
  //  id: string;
    //name: string;
    //description: string
    //images: Images[]
//}

export interface Images{

}