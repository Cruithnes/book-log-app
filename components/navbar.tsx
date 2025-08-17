import { Button } from "@/components/ui/button"
import { BookOpen, Home, LogOut, User, Plus, FileText } from "lucide-react"
import { logoutAction } from "@/lib/actions";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/utils";

export default async function Navbar() {
    const session = await auth();
    const isMe = isAdmin(session);

    return (
        <div className="w-full flex justify-center px-4 py-6 mb-6">
            <nav className="bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 backdrop-blur-lg bg-opacity-90 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl max-w-6xl w-full transition-all duration-300 hover:shadow-purple-500/25 hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 group">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:rotate-12">
                            <BookOpen className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="text-2xl font-bold text-white drop-shadow-lg transition-all duration-300 hover:text-yellow-200">
                            BookLog
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                        >
                            <a href="/" className="flex items-center space-x-2">
                                <Home className="h-4 w-4 transition-transform duration-300 hover:bounce" />
                                <span className="hidden md:inline">Anasayfa</span>
                            </a>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                        >
                            <a href="/about" className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 transition-transform duration-300 hover:bounce" />
                                <span className="hidden md:inline">Hakkımda</span>
                            </a>
                        </Button>

                        {isMe && <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                        >
                            <a href="/books/new" className="flex items-center space-x-2">
                                <Plus className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
                                <span className="hidden md:inline">Add Book</span>
                            </a>
                        </Button>}

                        {!session?.user ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                            >
                                <a href="/register" className="flex items-center space-x-2">
                                    <User className="h-4 w-4 transition-transform duration-300 hover:scale-125" />
                                    <span className="hidden md:inline">Giriş yap</span>
                                </a>
                            </Button>
                        ) : (
                            <>
                                <div className="w-px h-6 bg-white/30 mx-2"></div>

                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                    <div className="relative">
                                        {session.user.image ? (
                                            <img
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                className="w-8 h-8 rounded-full border-2 border-white/30 transition-all duration-300 hover:border-white/60 hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-2 border-white/30 transition-all duration-300 hover:border-white/60 hover:scale-110">
                                                <span className="text-white font-semibold text-sm">
                                                    {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="hidden lg:block">
                                        <p className="text-white font-medium text-sm leading-none">
                                            {session.user.name || "User"}
                                        </p>
                                        <p className="text-white/70 text-xs leading-none mt-1">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </div>

                                <form action={logoutAction}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="submit"
                                        className="text-white border-white/30 hover:bg-red-500/20 hover:border-red-300 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl hover:scale-105 group"
                                    >
                                        <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                        <span className="hidden md:inline ml-2">Çıkış yap</span>
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}