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

import { SquarePlus, ArrowUpWideNarrow, X, Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import columns from './ColumnsTable';
import debounce from '../../../lib/debounce.ts';
import type Product from '@/types/productsTypes';

const LazyAddProduct = React.memo(React.lazy(() => import('./AddProduct')));

interface Props {
  data: Product[];
  loadingState: {
    isLoading: boolean;
    loadProducts: () => void;
  };
}

const DataTable: React.FC<Props> = ({ data, loadingState }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterInput, setFilterInput] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  console.log('data table render');

  const debounceFilterChange = debounce((value: string) => {
    setFilterInput(value);
    table.getColumn("name")?.setFilterValue(value);
    table.getColumn("description")?.setFilterValue(value);
  }, 300);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFilterChange(e.target.value);
  };

  const handleAddProductClick = () => {
    setCurrentProduct(null);
    setShowAddProduct(true);
    setIsVisible(true);
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
            onChange={handleFilterChange}
            className="products-search pl-9"
            defaultValue={filterInput}
          />
          {filterInput && (
            <button
              onClick={() => {
                document.querySelector<HTMLInputElement>('.products-search')!.value = '';
                setFilterInput("");
                table.getColumn("name")?.setFilterValue("");
                table.getColumn("description")?.setFilterValue("");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 outline-none hover:bg-muted focus-visible:bg-muted rounded-full p-1"
            >
              <X className="text-muted-foreground size-5" />
            </button>
          )}
        </div>
        <Button
          className="max-[450px]:w-[min(384px,100%)] flex items-center"
          onClick={handleAddProductClick}
        >
          <SquarePlus className="mr-2 size-5" />
          Add new product
        </Button>
        {/* ADD PRODUCTS */}
        {showAddProduct &&
          <LazyAddProduct
            isVisible={isVisible}
            currentProduct={currentProduct}
            onClose={() => setIsVisible(false)} />}
      </div>
      {/* PRODUCTS TABLE */}
      <div className="rounded-md border bg-background h-[484.8px] relative">
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
            {!loadingState.isLoading && (table.getRowModel().rows.map((row) => (
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
            )))}
          </TableBody>
        </Table>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {!table.getRowModel().rows?.length && !loadingState.isLoading && (
            <div className='text-center grid gap-2 font-semibold'>
              No Products
              {data.length === 0 && (
                <Button size='sm' onClick={loadingState.loadProducts}>Refresh Products</Button>
              )}
            </div>
          )}
          {loadingState.isLoading && (<Loader2 className="animate-spin text-primary size-20" />)}
        </div>
      </div>
      <div className="flex items-center justify-end mt-8">
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
    </div >
  );
};

export default React.memo(DataTable);