import React from "react";
import {
  ColumnDef,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SquarePlus, MoreHorizontal, FilePenLine, Trash, CircleX, CircleCheck, ArrowUpWideNarrow } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

const data = [
  {
    id: 'c1',
    category: '🍝 Pastas',
    description: 'A lean, seasoned turkey patty with avocado, lettuce, tomato, and onion. A lighter, yet flavorful choice.',
    image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-2-thumbnail.jpg',
    price: 12.99,
    name: 'Spaghetti Marinara',
    status: 'Available',
  },
  {
    id: 'c2',
    category: '🍟 Starters',
    description: 'Crispy tofu bites served with sweet chili sauce.',
    image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/tofu-thumbnail.jpg',
    price: 8.99,
    name: 'Crispy Tofu Bites',
    status: 'Unavailable',
  },
  {
    id: 'c3',
    category: '🥗 Salads',
    description: 'Fresh garden salad with a variety of seasonal vegetables.',
    image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salad-2-thumbnail.jpg',
    price: 9.49,
    name: 'Garden Salad',
    status: 'Available',
  },
  {
    id: 'c4',
    category: '🍖 Grilled Meat',
    description: 'Grilled salmon fillet with lemon and herbs.',
    image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salmon-thumbnail.jpg',
    price: 18.99,
    name: 'Grilled Salmon',
    status: 'Available',
  },
  {
    id: 'c5',
    category: '🍝 Pastas',
    description: 'Penne pasta tossed in a creamy Alfredo sauce.',
    image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-9-thumbnail.jpg',
    price: 13.49,
    name: 'Penne Alfredo',
    status: 'Unavailable',
  },
  {
    id: 'c6',
    category: '🍩 Deserts',
    description: 'A rich chocolate cupcake topped with buttercream frosting.',
    image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cupcake-thumbnail.jpg',
    price: 4.99,
    name: 'Chocolate Cupcake',
    status: 'Available',
  },
];

// const customFilter = (rows, id, filterValue) => {
//   return rows.filter(row => {
//     const name = row.original.name.toLowerCase();
//     const description = row.original.description.toLowerCase();
//     const value = filterValue.toLowerCase();
//     return name.includes(value) || description.includes(value);
//   });
// };

interface Row { getValue: (value: string) => void; original: { description: string; }; };
const customFilter = (row: Row, columnId: string, filterValue: string) => {
  const name = ((row.getValue(columnId) as unknown) as string || "").toLowerCase();
  const description = row.original.description.toLowerCase();
  const value = filterValue.toLowerCase();
  return name.includes(value) || description.includes(value);
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID#",
    cell: ({ row }) => <div>#{row.index + 1}</div>
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => <img
      src={row.getValue("image")}
      alt="product"
      className="size-[40px] object-cover rounded-lg"
    ></img>,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => <div className="text-nowrap">{row.getValue("name")}</div>,
    filterFn: customFilter,
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: ({ row }) => {
      const productDescription: string = row.getValue("description");
      const productsChar: number = productDescription.length;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className="text-nowrap w-[300px] overflow-hidden text-ellipsis">
                {productDescription}
              </p>
            </TooltipTrigger>
            {productsChar >= 50 &&
              <TooltipContent className="bg-slate-950 text-white">
                <p className="w-[300px]">{row.getValue("description")}</p>
              </TooltipContent>
            }
          </Tooltip>
        </TooltipProvider>
      );
    },
    filterFn: customFilter,
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => <div>{row.getValue("price")}DH</div>,
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => <div className="text-nowrap">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const productStatus: string = row.getValue("status");

      return (
        <div className={`flex gap-1 items-center border rounded py-1 px-2 w-fit 
          ${productStatus === 'Available'
            ? 'border-green-500 bg-green-100 text-green-500'
            : 'border-red-500 bg-red-100 text-red-500'}`
        }>
          {productStatus === "Available" ? (
            <CircleCheck className="size-4 text-inherit" />
          ) : (
            <CircleX className="size-4 text-inherit" />
          )}
          <p>{productStatus}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // Dropdown menu for actions edit, delete
      const productId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log(productId)}>
              <FilePenLine className="size-4 stroke-[1.7] mr-1" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(productId)}>
              <Trash className="size-4 stroke-[1.7] mr-1" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ProductsPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterInput, setFilterInput] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilterInput(value);
    table.getColumn("name")?.setFilterValue(value);
    table.getColumn("description")?.setFilterValue(value);
  };

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
        <Button className="max-[450px]:w-[min(384px,100%)]">
          <SquarePlus className="mr-2 size-5" /> Add new products
        </Button>
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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

export default ProductsPage;