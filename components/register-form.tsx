"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";


export function RegisterForm() {
    return (
        <Card className="w-full shadow-md rounded-xl max-w-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Hesap Oluştur</CardTitle>
            </CardHeader>

            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="dostoyevski@örnek.com"
                            required
                            disabled
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Şifre</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            disabled
                        />
                    </div>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled>
                    Oluştur
                </Button>

                <div className="flex items-center w-full gap-x-2">
                    <Button
                        size="lg"
                        variant="outline"
                        className="flex-1"
                    >
                        <FcGoogle className="h-5 w-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="flex-1"
                        type="submit"
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                    >
                        <FaGithub className="h-5 w-5" />
                    </Button>
                </div>

                <Separator />
                <Button variant="link" size="sm" className="w-full font-normal" disabled>
                    Zaten hesabın var mı? Giriş Yap
                </Button>
            </CardFooter>
        </Card>
    )
}
