export interface CustomerResponseType {
  status: string;
  message: string;
  data: CustomerType[];
}

export interface CustomerType {
  id: number | null;
  name: string;
  address: string;
  phone: string;
}

export interface BarangType {
  kd_barang: string;
  nama_barang: string;
  price: number;
}

export interface TransactionType {
  customer: CustomerType;
  barang: BarangType[];
}

export interface ItemType {
  customer: CustomerType;
  nama_barang: BarangType[];
  subtotal: string;
}
