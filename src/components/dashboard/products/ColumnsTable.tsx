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
  MoreHorizontal,
  FilePenLine,
  Trash,
  CircleX,
  CircleCheck
} from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import type Product from "@/types/productsTypes";
import { useDispatch } from 'react-redux';
import { productsActions } from '@/store/products/productsSlice';

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
  const dispatch = useDispatch();

  const handleEdit = () => onEditProduct(product);

  const handleDelete = () => {
    dispatch(productsActions.deleteProduct(product.id));
    console.log("Delete product:", product.id);
  };

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
        <DropdownMenuItem onClick={handleEdit}>
          <FilePenLine className="size-4 stroke-[1.7] mr-1" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="size-4 stroke-[1.7] mr-1" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ColumnsTable = (handelEditProduct: (product: Product) => void): ColumnDef<Product>[] => [
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