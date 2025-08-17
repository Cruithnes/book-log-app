import { fetchAllBooks } from "@/lib/data";

import { Suspense } from "react";

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { BookTableSkeleton } from "@/components/ui/table-skeleton";


export default async function Home() {

  const books = await fetchAllBooks();

  return (
    <section>
      <h1 className="text-3xl flex justify-center mt-6 font-semibold">BookLog</h1>


      <div className="container mx-auto py-10 overflow-x-auto">
        <Suspense fallback={<BookTableSkeleton />}>
          <DataTable columns={columns} data={books}></DataTable>
        </Suspense>
      </div>
    </section>
  );
}
