import { Button } from "@/components/ui/button"
import { BookOpen, Home, LogOut, User, Plus, FileText, Menu, X } from "lucide-react"
import { logoutAction } from "@/lib/actions";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default async function Navbar() {
    const session = await auth();
    const isMe = isAdmin(session);

    return (
        <div className="w-full flex justify-center px-2 sm:px-4 py-4 sm:py-6 mb-4 sm:mb-6">
            <nav className="bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 backdrop-blur-lg bg-opacity-90 border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-8 py-3 sm:py-4 shadow-2xl max-w-6xl w-full transition-all duration-300 hover:shadow-purple-500/25 hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 sm:space-x-3 group">
                        <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:rotate-12">
                            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg transition-all duration-300 hover:text-yellow-200">
                            BookLog
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                        >
                            <Link href="/" className="flex items-center space-x-2">
                                <Home className="h-4 w-4 transition-transform duration-300 hover:bounce" />
                                <span>Anasayfa</span>
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                        >
                            <Link href="/about" className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 transition-transform duration-300 hover:bounce" />
                                <span>Hakkımda</span>
                            </Link>
                        </Button>

                        {isMe && (
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                            >
                                <Link href="/books/new" className="flex items-center space-x-2">
                                    <Plus className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
                                    <span>Add Book</span>
                                </Link>
                            </Button>
                        )}

                        {!session?.user ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:scale-105"
                            >
                                <Link href="/register" className="flex items-center space-x-2">
                                    <User className="h-4 w-4 transition-transform duration-300 hover:scale-125" />
                                    <span>Giriş yap</span>
                                </Link>
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
                                        <span className="hidden lg:inline ml-2">Çıkış yap</span>
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Mobile Navigation - Only icons */}
                    <div className="flex md:hidden items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 p-2"
                        >
                            <Link href="/">
                                <Home className="h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 p-2"
                        >
                            <Link href="/about">
                                <FileText className="h-4 w-4" />
                            </Link>
                        </Button>

                        {isMe && (
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 p-2"
                            >
                                <Link href="/books/new">
                                    <Plus className="h-4 w-4" />
                                </Link>
                            </Button>
                        )}

                        {!session?.user ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 p-2"
                            >
                                <Link href="/register">
                                    <User className="h-4 w-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-white/20">
                                    <div className="relative">
                                        {session.user.image ? (
                                            <img
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                className="w-6 h-6 rounded-full border border-white/30"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border border-white/30">
                                                <span className="text-white font-semibold text-xs">
                                                    {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <form action={logoutAction}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="submit"
                                        className="text-white border-white/30 hover:bg-red-500/20 hover:border-red-300 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-lg p-2"
                                    >
                                        <LogOut className="h-4 w-4" />
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