import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from '@/store/products/actions.ts';
import { AppDispatch } from '@/store/index';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  MoreHorizontal,
  FilePenLine,
  Trash,
  CircleX,
  CircleCheck,
  ArrowUpDown,
  Loader2
} from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import type Product from "@/types/productsTypes";

interface Row {
  getValue: (value: string) => void;
  original: {
    description: string;
  };
};

const customFilter = (row: Row, columnId: string, filterValue: string) => {
  const name = ((row.getValue(columnId) as unknown) as string || "").toLowerCase();
  const description = row.original.description.toLowerCase();
  const value = filterValue.toLowerCase();
  return name.includes(value) || description.includes(value);
};

interface Props {
  product: Product;
  onEditProduct: (data: Product) => void;
}

const ActionMenu: React.FC<Props> = ({ product, onEditProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const [isDialogOpen, setDialogOpen] = useState(false); // Manage dialog state
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => onEditProduct(product);

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await dispatch(deleteProduct(product.id));
      toast({
        title: "Product Deleted",
        description: `${product.name} has been removed from your inventory.`,
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error as string,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          <DropdownMenuItem onClick={handleEdit}>
            <FilePenLine className="size-4 stroke-[1.7] mr-1" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <Trash className="size-4 stroke-[1.7] mr-1" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the product <span className="font-semibold text-nowrap text-foreground">"{product.name}"</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="max-md:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteProduct}
              className="flex gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin size-5" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ColumnsTable = (handelEditProduct: (product: Product) => void): ColumnDef<Product>[] => [
  {
    accessorKey: "id",
    header: ({ column }) =>
    (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID#
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-4">#{row.index + 1}</div>, // Display ID based on index
    enableSorting: true,
    sortingFn: (rowA, rowB) => (rowA.index - rowB.index),
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NAME
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-nowrap pl-4">{row.getValue("name")}</div>,
    filterFn: customFilter,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DESCRIPTION
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const productDescription: string = row.getValue("description");
      const productsChar: number = productDescription.length;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className="text-nowrap w-[316px] overflow-hidden text-ellipsis pl-4">
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PRICE
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-4">{row.getValue("price")}DH</div>,
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => <div className="text-nowrap">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STATUS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      const product = row.original;

      return (
        <ActionMenu
          product={product}
          onEditProduct={handelEditProduct}
        />);
    },
  },
];

export default ColumnsTable;