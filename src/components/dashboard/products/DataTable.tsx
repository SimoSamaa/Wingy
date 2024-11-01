import React, { useState } from 'react';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SquarePlus, ArrowUpWideNarrow, Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import columns from './ColumnsTable';
import type Product from '@/types/productsTypes';

const LazyAddProduct = React.memo(React.lazy(() => import('./AddProduct')));

interface Props {
  data: Product[];
}

const DataTable: React.FC<Props> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterInput, setFilterInput] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  console.log('data table render');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setFilterInput(value);
    table.getColumn("name")?.setFilterValue(value);
    table.getColumn("description")?.setFilterValue(value);
  };

  const handleAddProductClick = () => {
    setLoading(true);
    setCurrentProduct(null);
    setTimeout(() => {
      setShowAddProduct(true);
      setIsVisible(true);
      setLoading(false);
    }, 500);
  };

  const handelEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsVisible(true);
    setShowAddProduct(true);
  };

  const table = useReactTable({
    data,
    columns: columns(handelEditProduct),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 6, // Set initial page size to 6
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 gap-4 max-[450px]:flex-col">
        <div className="relative w-[min(384px,100%)]">
          <ArrowUpWideNarrow className="size-5 absolute top-1/2 left-2 -translate-y-1/2 stroke-[1.5] text-muted-foreground " />
          <Input
            placeholder="Filter by name or description"
            value={filterInput}
            onChange={handleFilterChange}
            className="pl-9"
          />
        </div>
        <Button
          className="max-[450px]:w-[min(384px,100%)]"
          onClick={handleAddProductClick}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            <div className="flex items-center">
              <SquarePlus className="mr-2 size-5" />
              Add new product
            </div>
          )}
        </Button>
        {/* ADD PRODUCTS */}
        {showAddProduct &&
          <LazyAddProduct
            isVisible={isVisible}
            currentProduct={currentProduct}
            onClose={() => setIsVisible(false)} />}
      </div>
      {/* PRODUCTS TABLE */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Products.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DataTable);