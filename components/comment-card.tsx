"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Comment } from "@/app/generated/prisma";
import { createComment } from "@/lib/actions";


export function CommentSection({
    comments,
    session,
    bookId
}: {
    comments: Comment[],
    session: any,
    bookId: string
}) {
    return (
        <div className="max-w-4xl mx-auto mt-20 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    💬 Yorumlar
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="space-y-6 mb-8">
                {comments && comments.length > 0 ? (
                    comments.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="group relative p-5 bg-gradient-to-r from-gray-800/40 to-gray-700/20 backdrop-blur-sm border border-gray-600/30 rounded-2xl hover:border-gray-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative flex items-start gap-4">
                                <div className="relative">
                                    <Avatar className="w-12 h-12 ring-2 ring-gray-600 ring-offset-2 ring-offset-gray-900 transition-all duration-300 group-hover:ring-blue-400">
                                        <AvatarImage src={comment.user.image || "/default-avatar.png"} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                            {comment.user.name?.[0] || "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-gray-100 text-lg">
                                            {comment.user.name || "Anonim Kullanıcı"}
                                        </span>
                                    </div>

                                    <p className="text-gray-200 leading-relaxed mb-3 text-base">
                                        {comment.comment}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            {new Date(comment.date).toLocaleDateString("tr-TR", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-lg font-medium mb-2">Henüz yorum yok</p>
                        <p className="text-gray-500 text-sm">İlk yorumu sen yap! 🤓</p>
                    </div>
                )}
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-100">Yorum Yap</h3>
                    </div>

                    {!session ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-300 font-medium">Yorum yapabilmek için giriş yapmalısın</p>
                                <p className="text-gray-500 text-sm">Düşüncelerini paylaşmak için hesabına giriş yap</p>
                            </div>
                            <div className="flex gap-3 justify-center">
                                <a href="/register">
                                    <Button

                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-0"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Giriş Yap
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <form
                            className="space-y-4"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                try {
                                    await createComment(formData, bookId);
                                } catch (error) {
                                    console.error("Yorum oluşturulurken hata:", error);
                                }
                            }}
                        >
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Avatar className="w-12 h-12 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-gray-900">
                                        <AvatarImage src={session?.user?.image || "/default-avatar.png"} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                            {session?.user?.name?.[0] || "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="relative">
                                        <Textarea
                                            className="w-full min-h-[100px] bg-gray-800/50 border-gray-600/50 rounded-xl text-gray-100 placeholder-gray-400 resize-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 pr-12"
                                            name="comment"
                                            id="comment"
                                            placeholder="Düşüncelerini paylaş..."
                                            minLength={1}
                                            maxLength={700}
                                            required
                                        />
                                        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                                            <span id="char-count">0</span>/700
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-0"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Paylaş
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
