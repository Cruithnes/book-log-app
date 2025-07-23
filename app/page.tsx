import { fetchAllBooks } from "@/lib/data";

import { Suspense } from "react";

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { BookTableSkeleton } from "@/components/ui/table-skeleton";

import TechMarquee from "@/components/TechMarquee";


export default async function Home() {

  const books = await fetchAllBooks();

  return (
    <div>

      <section className="w-full py-10 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Merhaba! Ben <span className="font-semibold text-primary">Emre Mert Tokgöz</span>.
            Gazi Tusaş Meslek Yüksekokulu Bilişim Güvenliği Teknolojisi öğrencesiyim.
            Web geliştirme alanında kendimi sürekli geliştirmeye çalışıyor, 
             <span className="text-foreground font-medium"> React</span>,
             <span className="text-foreground font-medium"> Next.js </span> gibi modern teknolojileri projelerle öğreniyorum.
            Bu projeyi hem kitaplarımı düzenli takip edebilmek hem de kullanıcı arayüzü tasarımı ve veri
            yönetimi konularında pratik kazanmak amacıyla hazırladım.
            Ayrıca <span className="text-foreground font-medium">siber güvenlik</span>,
             <span className="text-foreground font-medium"> veri tabanı sistemleri (postgreSQL ve mongodb) </span>
             <span className="text-foreground font-medium">veri tabanı sistemleri ORM'leri (prisma ve mongoose) </span>
             ve <span className="text-foreground font-medium">Linux isletim sistemleriyle</span> ilgileniyor; <span className="text-foreground font-medium"> CLI ve sunucu yönetimi</span> konusunda kendimi geliştiriyorum.
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-2">Kullandığım Teknolojiler</h3>
          <TechMarquee />
        </div>
    </div>
      </section >

      <h1 className="text-3xl flex justify-center mt-6 font-semibold">BookLog</h1>


      <div className="container mx-auto py-10 overflow-x-auto">
        <Suspense fallback={<BookTableSkeleton />}>
          <DataTable columns={columns} data={books}></DataTable>
        </Suspense>
      </div>
    </div >
  );
}
