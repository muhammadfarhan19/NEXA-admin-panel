/* eslint-disable react-hooks/exhaustive-deps */
import {
  ItemType,
  TransactionDetailType,
  TransactionHomeType,
} from "@/utils/APITypes";
import {
  APIBarang,
  APICounter,
  APICustomer,
  APITransactionDetail,
} from "@/utils/APIUrls";
import {
  BarangType,
  CustomerResponseType,
  CustomerType,
} from "@/utils/common.type";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { IoSaveSharp } from "react-icons/io5";

const AddPage: React.FC = () => {
  const [isNewCustomer, setIsNewCustomer] = React.useState<boolean>(false);
  const [customerList, setCustomerList] = React.useState<CustomerType[]>();
  const [barangList, setBarangList] = React.useState<BarangType[]>();
  const [dateTransaction, setDateTransaction] = React.useState<string>("");
  const [transactionCode, setTransactionCode] = React.useState("");
  const [transactionHomeRes, setTransactionHomeRes] = React.useState<
    TransactionHomeType | undefined
  >();
  const [transactionDetailRes, setTransactionDetailRes] = React.useState<
    TransactionDetailType | undefined
  >();
  const [selectedCustomer, setSelectedCustomer] = React.useState<CustomerType>({
    id: 0,
    name: "",
    address: "",
    phone: "",
  });
  const [selectedBarang, setSelectedBarang] = React.useState<ItemType>({
    nama_barang: "",
    kd_barang: "",
    price: 0,
  });

  const {
    control: controlBarang,
    register: registerBarang,
    handleSubmit: handleSubmitBarang,
    formState: { errors: errorBarang },
    setValue: setValueBarang,
  } = useForm<BarangType>();

  const {
    control: controlCustomer,
    register: registerCustomer,
    handleSubmit: handleSubmitCustomer,
    formState: { errors: errorCustomer },
    setValue: setValueCustomer,
  } = useForm<CustomerType>();

  const {
    control: controlTransactionDetail,
    register: registerTransactionDetail,
    handleSubmit: handleSubmitTransactionDetail,
    formState: { errors: errorTransactionDetail },
    setValue: setValueTransactionDetail,
  } = useForm<TransactionDetailType>();

  const {
    control: controlTransactionHome,
    register: registerTransactionHome,
    handleSubmit: handleSubmitTransactionHome,
    formState: { errors: errorTransactionHome },
    setValue: setValueTransactionHome,
  } = useForm<TransactionHomeType>();

  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const customerHandler = async (formData: CustomerType) => {
    try {
      // const response = await axios.post(APICustomer.POST_CUSTOMER, formData);
      setSelectedCustomer(formData);
      alert("berhasil");
    } catch (error: any) {
      console.log(error);
    }
  };

  // id: number
  // id_customer: number
  // nomor_transaksi: string
  // tanggal_transaksi: string
  // total_transaksi: number

  const transactionHomeHandler = async () => {
    setTransactionHomeRes({
      nomor_transaksi: transactionCode,
      id_customer: 10,
      total_transaksi: 100000,
      tanggal_transaksi: dateTransaction,
    });
  };

  const transactionDetailHandler = async (val: TransactionDetailType) => {
    try {
      const result = {
        ...val,
        ...selectedBarang,
      };
      const response = await axios.post(
        APITransactionDetail.POST_TRANSACTION_DETAIL,
        result
      );
      console.log("val", val);
    } catch (error) {
      console.log(error);
    }
  };

  const getCounter = async (date: string | Date) => {
    try {
      const response = await axios.get(APICounter.GET_COUNTER + date);
      setDateTransaction(response.data.data.counter);
      setTransactionCode(response.data.data.counter);
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const getCustomerList = async () => {
    try {
      const response = await axios.get(APICustomer.GET_ALL_CUSTOMERS);
      setCustomerList(response.data.data);
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const getBarangList = async () => {
    try {
      const response = await axios.get(APIBarang.GET_ALL_BARANG);
      setBarangList(response.data.data);
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    getCustomerList();
    getBarangList();
  }, []);

  React.useEffect(() => {
    if (dateTransaction) {
      getCounter(dateTransaction);
    }
  }, [dateTransaction]);

  return (
    <main className="flex flex-col space-y-8 p-14 w-full h-screen">
      <section className="w-full">
        <h1 className="text-2xl font-bold uppercase">Form Penjualan</h1>
      </section>
      <section className="flex flex-col">
        <h1 className="font-bold">Nomor Transaksi</h1>
        <h1 className="text-lg">{transactionCode}</h1>
      </section>
      <section className="flex flex-col gap-y-1">
        <label htmlFor="transaction-date" className="font-bold">
          Tanggal Transaksi
        </label>
        <input
          type="date"
          name="transaction-date"
          id="transaction-date"
          className="border border-black p-2 w-56 rounded-md"
          onChange={(e) => setDateTransaction(e.target.value)}
        />
      </section>
      <section className="w-full border-2" />
      <section className="flex gap-x-5 max-w-fit items-end">
        <div className="max-w-56">
          <label htmlFor="customer" className="font-bold">
            Pilih Customer
          </label>
          <select
            name="customer"
            id="customer"
            value={
              selectedCustomer.id ? selectedCustomer.name : "Pilih Customer"
            }
            className="border border-black p-2 w-56 rounded-md"
            onChange={(e) =>
              setSelectedCustomer(
                customerList?.find((item) => item.name === e.target.value) ?? {
                  id: 0,
                  name: "",
                  address: "",
                  phone: "",
                }
              )
            }
          >
            <option value="Pilih Customer" disabled>
              Pilih Customer
            </option>
            {customerList?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsNewCustomer(!isNewCustomer)}
          className="bg-indigo-600 py-2 px-4 flex items-center gap-x-2 rounded-md text-white w-full justify-center"
        >
          {!isNewCustomer && <BiPlus />}
          <h1>{!isNewCustomer ? "Customer Baru" : "Batal"}</h1>
        </button>
      </section>
      {isNewCustomer ? (
        <section className="flex gap-x-5">
          <form
            className="grid grid-cols-4 gap-x-5 max-w-fit"
            onSubmit={handleSubmitCustomer(customerHandler)}
          >
            <input
              className="border border-black p-2 w-56 rounded-md"
              type="text"
              placeholder="name"
              id="name"
              {...registerCustomer("name")}
              onChange={handleNewCustomerChange}
            />
            <input
              className="border border-black p-2 w-56 rounded-md"
              type="text"
              placeholder="address"
              id="address"
              {...registerCustomer("address")}
              onChange={handleNewCustomerChange}
            />
            <input
              className="border border-black p-2 w-56 rounded-md"
              type="text"
              placeholder="phone"
              id="phone"
              {...registerCustomer("phone")}
              onChange={handleNewCustomerChange}
            />
            <button
              type="submit"
              className="bg-indigo-600 py-2 rounded-md text-white"
            >
              Tambah Customer
            </button>
          </form>
        </section>
      ) : null}
      <section className="w-full border-2" />
      <section className="gap-x-5 max-w-full">
        <h1 className="font-bold mb-2">Pilih Barang</h1>
        <form
          className="grid grid-cols-4 gap-x-5 max-w-fit"
          onSubmit={handleSubmitTransactionDetail(transactionDetailHandler)}
        >
          <select
            name="nama_barang"
            id="nama_barang"
            value={
              selectedBarang.nama_barang
                ? selectedBarang.nama_barang
                : "Pilih Barang"
            }
            // {...registerTransactionDetail("nama_barang")}
            className="border border-black p-2 w-56 rounded-md"
            onChange={(e) =>
              setSelectedBarang(
                barangList?.find(
                  (item) => item.nama_barang === e.target.value
                ) ?? {
                  nama_barang: "",
                  kd_barang: "",
                  price: 0,
                }
              )
            }
          >
            <option value="Pilih Barang">Pilih Barang</option>
            {barangList?.map((item) => (
              <option value={item.nama_barang} key={item.kd_barang}>
                {item.nama_barang}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="qty"
            placeholder="qty"
            className="border border-black p-2 w-56 rounded-md"
            {...registerTransactionDetail("qty", {
              required: "Mohon Masukkan Jumlah",
            })}
          />
          <input
            type="text"
            id="subtotal"
            placeholder="Subtotal"
            className="border border-black p-2 w-56 rounded-md"
            {...registerTransactionDetail("subtotal")}
          />
          <button
            type="submit"
            className="bg-indigo-600 py-2 rounded-md text-white"
          >
            Tambah Barang
          </button>
        </form>
      </section>
      <section className="flex flex-col gap-y-1">
        <h1 className="font-bold">Data Barang</h1>
        <aside className="w-full">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="py-2 border">No</th>
                <th className="py-2 border">Nama Barang</th>
                <th className="py-2 border">Qty</th>
                <th className="py-2 border">Subotal</th>
                <th className="py-2 border">Action</th>
              </tr>
            </thead>
          </table>
        </aside>
      </section>
      <section className="flex flex-col gap-y-1">
        <h1 className="font-bold">Total Transaksi : Rp 300.000</h1>
      </section>
      <section className="flex flex-col gap-y-1 max-w-56">
        <button
          className="bg-indigo-600 py-2 flex items-center gap-x-2 rounded-md text-white w-full justify-center"
          onClick={transactionHomeHandler}
        >
          <IoSaveSharp />
          <h1>Simpan Transaksi</h1>
        </button>
      </section>
    </main>
  );
};

export default AddPage;
