export interface Metadata {
  status: number;
  message: string;
}

export interface ItemType {
  kd_barang: string;
  nama_barang: string;
  price: number
}

export interface TransactionHomeResponseType {
  status: string;
  message: string;
  data: TransactionHomeType[];
}

export interface TransactionHomeType {
  id_customer: number;
  nomor_transaksi: string;
  tanggal_transaksi: string;
  total_transaksi: number;
}

export interface TransactionDetailType {
  id_transaksi_h: number;
  kd_barang: string;
  nama_barang: string;
  qty: number;
  subtotal: number;
}
