import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UploadImgProduct from './UploadImgProduct';
import helpers from '@/lib/helpers';
// import type Product from '@/types/productsTypes';
import { productsActions } from '@/store/products/productsSlice.ts';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

// type ProductWithoutId = Omit<Product, 'id'>;

const AddProduct: React.FC<Props> = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [useHandleChange] = helpers();

  const selectedStatusRef = useRef<HTMLButtonElement>(null);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [uploadedImg, setUploadedImg] = useState<string>('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    status: 'Available'
  });

  const [errorsProduct, setErrorsProduct] = useState<Record<string, string>>({});

  const statuses = ['Available', 'Unavailable'];
  const categories = [
    '🍝 Pastas', '🍟 Starters', '🥗 Salads',
    '🍖 Grilled Meat', '🍩 Deserts', '🍔 Burgers',
    '🍕 Pizzas', '🍗 Chicken', '🥤 Cold Drinks', '☕ Hot Drinks'
  ];

  const productInfo = (text: string) => `Product ${text} is required`;
  const productSchema = z.object({
    image: z.string().nonempty({ message: productInfo('image') }),
    name: z.string().nonempty({ message: productInfo('name') }),
    description: z.string().nonempty({ message: productInfo('description') }),
    price: z.string().nonempty({ message: productInfo('price') }),
    category: z.string().nonempty({ message: productInfo('category') }),
  });

  const selectProductStateHandler = (e: React.MouseEvent<HTMLButtonElement>, status: string) => {
    const selectedStatus = selectedStatusRef.current as HTMLElement;
    selectedStatus.style.left = e.currentTarget.offsetLeft + 'px';
    setCurrentStatus(statuses.indexOf(status));
    setProductData((prev) => ({ ...prev, status }));
  };

  // PRODUCT FORM VALIDATIONS
  const addProductValidation = () => {
    setErrorsProduct({});

    const validation = productSchema.safeParse({ ...productData, image: uploadedImg });

    if (!validation.success) {
      const errMess: { [key: string]: string; } = {};
      validation.error.errors.forEach((err) => {
        errMess[err.path[0]] = err.message;
      });

      setErrorsProduct(errMess);
      return false;
    }

    return true;
  };

  const submitProductData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationSuccess = addProductValidation();
    if (!validationSuccess) return;
    dispatch(productsActions.addProduct({ ...productData, image: uploadedImg }));
    onClose();
  };

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle>Add new product</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitProductData} className='space-y-4 h-[500px] overflow-auto p-6 add-product_form'>
          {/* UPLOAD PRODUCT IMAGE */}
          <UploadImgProduct payload={{ uploadedImg, setUploadedImg, errorImg: errorsProduct.image, setErrorsProduct }} />
          {/* PRODUCT NAME */}
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              placeholder='Enter product name'
              inputStyle='inputProduct'
              id='name'
              onChange={useHandleChange(setProductData, errorsProduct, setErrorsProduct)}
              error={!!errorsProduct.name}
            />
            {errorsProduct.name && <p className='text-red-500 text-xs mt-1'>{errorsProduct.name}</p>}
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              placeholder='Enter product description'
              id='description'
              inputStyle='inputProduct'
              error={!!errorsProduct.description}
              onChange={useHandleChange(setProductData, errorsProduct, setErrorsProduct)}
            />
            {errorsProduct.description && <p className='text-red-500 text-xs mt-1'>{errorsProduct.description}</p>}
          </div>
          {/* PRODUCT PRICE */}
          <div>
            <Label htmlFor='price'>Price</Label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 font-medium pr-1 border-r border-gray-400'>DH</span>
              <Input
                type='number'
                className='pl-12'
                placeholder='Enter product price'
                inputStyle='inputProduct'
                id='price'
                step='0.01'
                error={!!errorsProduct.price}
                onChange={useHandleChange(setProductData, errorsProduct, setErrorsProduct)}
              />
            </div>
            {errorsProduct.price && <p className='text-red-500 text-xs mt-1'>{errorsProduct.price}</p>}
          </div>
          {/* PRODUCT CATEGORY */}
          <div>
            <Label htmlFor='category'>Category</Label>
            <Select onValueChange={(value) => setProductData((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger
                id="category"
                inputStyle='inputProduct'
                error={!!errorsProduct.category}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, ind) => (
                  <SelectItem
                    key={ind}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errorsProduct.category && <p className='text-red-500 text-xs mt-1'>{errorsProduct.category}</p>}
          </div>
          {/* PRODUCT STATUS */}
          <div>
            <Label htmlFor='product-category'>Status</Label>
            <div className='mt-1 flex bg-muted/40 border rounded-md border-gray-400 h-[40px] relative'>
              <span
                ref={selectedStatusRef}
                className='bg-primary absolute border-2 border-[#f8f8f8] left-0 h-full w-1/2 rounded-md duration-300 ease-out'></span>
              {statuses.map((status, ind) => (
                <button
                  key={ind}
                  type='button'
                  onClick={(e) => selectProductStateHandler(e, status)}
                  className={`flex-1 z-10 outline-primary ${ind === currentStatus ? 'text-white' : ''}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <Button className='w-full block'>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AddProduct);