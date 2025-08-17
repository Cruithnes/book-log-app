"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";

import { Book } from "./generated/prisma";

import clsx from "clsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<Book, unknown>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onPaginationChange: setPagination,
    })

    return (
        <>

            <div className="hidden md:block">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Kitap ara..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => table.resetSorting()}
                    >
                        <RotateCcw />
                    </Button>
                </div>
                <div className="rounded-md border overflow-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="text-right  min-w-[120px]"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-right align-middle min-w-[100px]"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-between py-4 flex-wrap gap-4 border-t">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm">Satır sayısı:</label>
                            <Select
                                value={table.getState().pagination.pageSize.toString()}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="w-[80px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {[5, 10, 20, 50, 100].map((pageSize) => (
                                        <SelectItem key={pageSize} value={pageSize.toString()}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRight />
                            </Button>
                            <span className="text-sm ml-2">
                                Sayfa {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:hidden">
                <>
                    <div className="w-full px-2 sm:px-4 py-2">
                        <Input
                            placeholder="Kitap ara..."
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="w-full sm:max-w-sm"
                        />
                    </div>


                </>
                {table.getRowModel().rows.map((row) => {
                    const book = row.original;

                    return (

                        <div
                            key={row.id}
                            className="flex items-start gap-4 rounded-md border p-4 shadow-sm"
                        >
                            <Link
                            href={`/books/${book.id}`}
                            >
                                <img
                                    src={book.imageUrl || "https://res.cloudinary.com/dtf5irec3/image/upload/v1752585506/no-cover_dgoko5.png"}
                                    alt={`${book.title} cover`}
                                    className="w-20 h-28 object-cover rounded-md border"
                                />
                            </Link>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-base">{book.title}</h3>
                                    <p className="text-sm text-muted-foreground italic">{book.author}</p>
                                </div>

                                <div className="mt-2 space-y-1 text-sm">
                                    <Badge
                                        className={clsx("w-fit px-2 py-1 rounded-md", {
                                            "bg-green-200 text-green-700": book.status === "Read",
                                            "bg-blue-200 text-blue-700": book.status === "Reading",
                                            "bg-fuchsia-200 text-fuchsia-700": book.status === "Planing",
                                            "bg-red-200 text-red-700": book.status === "Dropped",
                                        })}
                                    >
                                        {(() => {
                                            switch (book.status) {
                                                case "Read": return "Okudum";
                                                case "Reading": return "Okuyorum";
                                                case "Planing": return "Kitaplığımda";
                                                case "Dropped": return "Bıraktım";
                                                default: return book.status;
                                            }
                                        })()}
                                    </Badge>

                                    {book.rating && (
                                        <div className="flex items-center gap-1">
                                            <span>⭐</span>
                                            <span>{book.rating}/10</span>
                                        </div>
                                    )}

                                    {(book.startDate || book.endDate) && (
                                        <div className="text-xs text-muted-foreground">
                                            {book.startDate} - {book.endDate}
                                        </div>
                                    )}

                                    {book.page && (
                                        <div className="text-xs text-muted-foreground">
                                            📖 {book.page} sayfa
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    );

                })}
                <div className="flex justify-between items-center w-full px-2 py-2 sm:px-4">
                    <Button
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <span className="text-sm">
                        Sayfa {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                    </span>

                    <Button
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </>
    )

}