import { create } from "domain";
import { PrismaClient, Prisma} from "../app/generated/prisma"

const prisma = new PrismaClient();

const bookData: Prisma.BookCreateInput[] = [
    {
        title: "Körlük",
        author: "Jose Saramago",
        description: "Toplumsal yaşamın nasıl vahşete dönüşebilec.eğini müthiş bir incelikle gözler önüne sererken, insana dair son umut kırıntısını da bir kadının tek başına örgütlediği dayanışma vr direniş örneğiyle sergiler.",
        status: "Read",
        review: "Körlük, ani bir salgınla görme yetisini kaybeden insanların ahlaki ve toplumsal çöküşünü çarpıcı bir şekilde anlatan etkileyici bir distopyadır. Saramago, insan doğasının karanlık yönlerini yalın ama sarsıcı bir üslupla gözler önüne serer.",
        rating: 5,
        page: 320,
        imageUrl: "https://upload.wikimedia.org/wikipedia/tr/5/55/Saramago_K%C3%B6rl%C3%BCk_%28kitap%29.jpg",
        startDate: "3.05.2025",
        endDate: "13.05.2025",
        quotes: {
            create: [
                {
                    quote: "Geçecek, göreceksiniz, geçecek.."
                },
                {
                    quote: "Asıl körlük umudunun tükendiği bu dünyada yaşamaktı."
                },
            ]
        },
    },
    {
        title: "Kaçak Protokol",
        author: "Martha Wells",
        description: "Alaşağı edilmesi mümkün olmayan GrayCris şirketine açılan dava zora girmişti ama daha da önemlisi yetkililer Dr. Mensah’ın GüvBirim’inin nerede olduğuna dair daha fazla soru sormaya başlamıştı.",
        status: "Read",
        rating: 4,
        page: 128,
        imageUrl: "https://i.dr.com.tr/cache/500x400-0/originals/0001843288001-1.jpg",
        startDate: "23.04.2025",
        endDate: "30.04.2025"
    },
    {
        title: "Dune",
        author: "Frank Hubert",
        status: "Planing",
        page: 712,
        imageUrl: "https://i.dr.com.tr/cache/500x400-0/originals/0000000662978-1.jpg",
    },
    {
        title: "1984",
        author: "George Orwell",
        description: "Politik ve dinî görüşlerini eserlerine yansıtan George Orwell'ın 1984 adlı romanı iktidar kavramını, diktatörlüğü ve halkın içinde bulunduğu durumu resmeder. Hikâye; halkının duygularına önem vermeyen, bilimden teknolojiye kadar çeşitli gelişmeleri engelleyen despot bir liderin yönettiği ülkede geçiyor. Büyük Birader adıyla anılan liderin siyasi kararları ve bu kararların halkın sosyal hayatı üzerindeki etkileri gözler önüne seriliyor.",
        status: "Read",
        rating: 5,
        page: 352,
        imageUrl: "https://i.dr.com.tr/cache/600x600-0/originals/0000000064038-1.jpg",
        quotes : {
            create: [
                {
                    quote: "Geçmişi denetim altında tutan, geleceği de denetim altında tutar, şimdiyi denetim altında tutan geçmişi de denetim altında tutar."
                },
                {
                    quote: "Bir hüznü anlatan en iyi şey sessizliktir."
                },
            ]
        },
    },
];

export async function main() {
  for (const b of bookData) {
    await prisma.book.create({ data: b });
  }
}

main();