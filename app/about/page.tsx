import React from "react";
import TechMarquee from "@/components/TechMarquee";

export default function AboutMe() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                <div className="relative max-w-4xl mx-auto px-6 py-20">
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent p-2">
                                Emre Mert Tokgöz
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Full Stack Developer <span className="font-semibold text-white">&</span> IT Security
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-600/40 rounded-3xl p-8 md:p-12 shadow-xl">

                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center justify-center gap-3">
                                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Hakkımda
                                </h2>
                            </div>

                            <div className="prose prose-lg prose-invert max-w-none">
                                <div className="text-gray-300 leading-relaxed space-y-6">
                                    <p className="text-lg">
                                        Merhaba! Ben <span className="font-semibold text-primary">Emre Mert Tokgöz</span>.
                                        Gazi Tusaş Meslek Yüksekokulu Bilişim Güvenliği Teknolojisi öğrencisiyim.
                                    </p>

                                    <p>
                                        Web geliştirme alanında kendimi sürekli geliştirmeye çalışıyor,
                                        <span className="text-foreground font-medium"> React</span>,
                                        <span className="text-foreground font-medium"> Next.js </span> gibi modern teknolojileri projelerle öğreniyorum.
                                        Bu projeyi hem kitaplarımı düzenli takip edebilmek hem de kullanıcı arayüzü tasarımı ve veri
                                        yönetimi konularında pratik kazanmak amacıyla hazırladım.
                                    </p>

                                    <p>
                                        Ayrıca <span className="text-foreground font-medium">siber güvenlik</span>,
                                        <span className="text-foreground font-medium"> veri tabanı sistemleri (postgreSQL ve mongodb) </span>
                                        <span className="text-foreground font-medium">veri tabanı sistemleri ORM&apos;leri (prisma ve mongoose) </span>
                                        ve <span className="text-foreground font-medium">Linux isletim sistemleriyle</span> ilgileniyor;
                                        <span className="text-foreground font-medium"> CLI ve sunucu yönetimi</span> konusunda kendimi geliştiriyorum.
                                    </p>

                                    <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center justify-center gap-3">
                                        Bu Websitesinde Kullandığım Teknolojiler
                                    </h2>

                                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                                        <TechMarquee />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-12 border-t border-gray-600/40">
                            <div className="text-center space-y-8">
                                <h3 className="text-2xl font-bold text-gray-100 flex items-center justify-center gap-3">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    Bağlantılarım
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <a
                                        href="https://github.com/Cruithnes"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative bg-gradient-to-br from-gray-700/50 to-gray-600/30 backdrop-blur-sm border border-gray-600/40 rounded-xl p-6 hover:border-gray-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 hover:-translate-y-1"
                                    >
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">GitHub</h4>
                                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Projelerimi keşfedin</p>
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href="https://linkedin.com/in/emremt4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative bg-gradient-to-br from-blue-700/50 to-blue-600/30 backdrop-blur-sm border border-blue-600/40 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                                    >
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">LinkedIn</h4>
                                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Profesyonel ağım</p>
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:emremert959@gmail.com"
                                        className="group relative bg-gradient-to-br from-purple-700/50 to-purple-600/30 backdrop-blur-sm border border-purple-600/40 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
                                    >
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">Email</h4>
                                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Benimle iletişime geçin</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                                    <p className="text-gray-300 text-center">
                                        Herhangi bir sorunuz varsa lütfen benimle iletişime geçmekten çekinmeyin!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

