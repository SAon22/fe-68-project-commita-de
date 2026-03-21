interface MassageShopItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    openCloseTime: string,
  }
  
  interface MassageShopJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: MassageShopItem[]
  }

export interface ReservationItem {
    name: string;
    shopName: string;
    tel: string;
    date: string;
    duration: number;
}