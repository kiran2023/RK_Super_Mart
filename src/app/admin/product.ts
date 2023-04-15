export interface product {
    Stock: any;
    category: any;
    uniqueId: any;
    filterValue: any;
    classData: any;
    value: any;
    image: any;
    alt: any;
    title: any;
    productName: any;
    quantity: any;
    ratingCount: any;
    reviewCount: any;
    originalAmount: any;
    discounted: any;
    offerPercentage: any;
    rating: any;
    id: any;
    uid: any
}

export interface cart {
    image: any;
    productName: any;
    quantity: any;
    originalAmount: any;
    id: number|undefined;
    uid: any;
    productid:number;
}

export interface order {
    customerName: string;
    customerMail: string;
    customerMobile: number;
    customerState: string;
    customerCity: string;
    customerPincode: number;
    customerAddress: string;
    totalAmount: number;
    userId: string;
    id: number;
}