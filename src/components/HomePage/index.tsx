import { TransactionHomeType } from "@/utils/APITypes";
import { APITransactionHome } from "@/utils/APIUrls";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { HiFilter, HiOutlinePlusCircle } from "react-icons/hi";
import { TfiPrinter } from "react-icons/tfi";

const HomePage: React.FC = () => {
  const [transactionList, setTransactionList] =
    React.useState<TransactionHomeType[]>();

  const getTransactionList = async () => {
    try {
      const response = await axios.get(APITransactionHome.GET_TRANSACTION_HOME);
      setTransactionList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTransactionList();
  }, []);
  console.log(transactionList);

  const router = useRouter();
  return (
    <main className="flex flex-col space-y-8 p-14 w-full h-screen">
      <section className="w-full">
        <h1 className="text-2xl font-bold uppercase">Transaksi Penjualan</h1>
      </section>
      <section className="w-full flex justify-between items-end">
        <aside>
          <h1 className="mb-2">Filter Tanggal Transaksi</h1>
          <section className="flex gap-x-3 items-center">
            <input
              type="date"
              name=""
              id=""
              className="border p-2 w-56 rounded-md"
            />
            <h1 className="font-bold mx-2">sd</h1>
            <input
              type="date"
              name=""
              id=""
              className="border p-2 w-56 rounded-md"
            />
            <button className="bg-indigo-600 p-3 rounded-md text-white">
              <HiFilter />
            </button>
          </section>
        </aside>
        <button
          className="bg-indigo-600 py-2 px-4 flex items-center gap-x-2 rounded-md text-white"
          onClick={() => router.push("/add-transaction")}
        >
          <HiOutlinePlusCircle />
          <h1>Tambah Transaksi</h1>
        </button>
      </section>
      <section className="flex flex-col gap-y-5">
        <aside className="flex items-center justify-between">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="border p-2 w-56 rounded-md"
          />
          <button className="bg-indigo-600 py-2 px-4 flex items-center gap-x-2 rounded-md text-white">
            <TfiPrinter />
            <h1>Export Excel</h1>
          </button>
        </aside>
        <aside className="w-full">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="py-2 border">No</th>
                <th className="py-2 border">Nomor Transaksi</th>
                <th className="py-2 border">Customer</th>
                <th className="py-2 border">Total Transaksi</th>
                <th className="py-2 border">Tanggal Transaksi</th>
                <th className="py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactionList?.map((item, index) => (
                <tr key={index}>
                  <td className="text-center py-2 border">{index + 1}</td>
                  <td className="text-center py-2 border">
                    {item.nomor_transaksi}
                  </td>
                  <td className="text-center py-2 border">
                    {item.id_customer}
                  </td>
                  <td className="text-center py-2 border">
                    {item.total_transaksi}
                  </td>
                  <td className="text-center py-2 border">
                    {item.tanggal_transaksi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </section>
    </main>
  );
};

export default HomePage;
