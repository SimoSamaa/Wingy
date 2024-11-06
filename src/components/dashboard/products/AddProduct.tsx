import React, { useState, useRef, useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/index';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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
import type Product from '@/types/productsTypes';
import { Separator } from '@/components/ui/separator';
import { addProduct, editProduct } from '@/store/products/actions';

interface Props {
  isVisible: boolean;
  currentProduct: Product | null;
  onClose: () => void;
}

const AddProduct: React.FC<Props> = ({ isVisible, onClose, currentProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { useChangeInput, useValidation } = helpers();
  const { toast } = useToast();

  // console.log('add products render');

  const selectedStatusRef = useRef<HTMLButtonElement>(null);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [uploadedImg, setUploadedImg] = useState<string>('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    status: 'Available',
  });

  const [errorsProduct, setErrorsProduct] = useState<Record<string, string>>({});
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statuses = useMemo(() => ['Available', 'Unavailable'], []);
  const categories = [
    '🍝 Pastas', '🍟 Starters', '🥗 Salads',
    '🍖 Grilled Meat', '🍩 Deserts', '🍔 Burgers',
    '🍕 Pizzas', '🍗 Chicken', '🥤 Cold Drinks', '☕ Hot Drinks'
  ];
  const isButtonDisabled = !currentProduct ? false : !isModified;

  const productInfo = (text: string) => `Product ${text} is required`;
  const productSchema = z.object({
    image: z.string().nonempty({ message: productInfo('image') }),
    name: z.string().nonempty({ message: productInfo('name') }),
    description: z.string().nonempty({ message: productInfo('description') }),
    price: z.string().nonempty({ message: productInfo('price') }),
    category: z.string().nonempty({ message: productInfo('category') }),
  });

  useEffect(() => {
    if (currentProduct) {
      setProductData({
        name: currentProduct.name || '',
        description: currentProduct.description || '',
        price: currentProduct.price.toString() || '',
        category: currentProduct.category || '',
        status: currentProduct.status || 'Available',
      });
      setUploadedImg(currentProduct.image || '');
      setIsModified(false);
    } else {
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        status: 'Available',
      });
      setUploadedImg('');
      setIsModified(false);
    }
  }, [currentProduct]);

  useEffect(() => {
    setCurrentStatus(statuses.indexOf(productData.status));
    if (selectedStatusRef.current) {
      selectedStatusRef.current.style.left = productData.status === 'Available' ? '0%' : '50%';
    }
  }, [statuses, productData]);

  const handleClose = () => {
    setErrorsProduct({});
    onClose();
  };

  const selectProductStateHandler = (status: string) => {
    const selectedStatus = selectedStatusRef.current as HTMLElement;
    const index = statuses.indexOf(status);
    if (index !== -1) selectedStatus.style.left = `${(index * (100) / 2)}%`;
    setCurrentStatus(index);
    setProductData((prev) => ({ ...prev, status }));
    setIsModified(true);
  };

  const validate = useValidation(productSchema, { ...productData, image: uploadedImg }, setErrorsProduct);
  const submitProductData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationSuccess = validate();
    if (!validationSuccess) return;

    const productPayload = { ...productData, image: uploadedImg };

    try {
      setIsLoading(true);
      if (currentProduct) {
        await dispatch(editProduct({
          id: currentProduct.id,
          ...productPayload
        }));

        toast({
          title: "Product Updated",
          description: `Changes to ${productPayload.name} have been saved.`,
        });
      } else {
        await dispatch(addProduct(productPayload));

        toast({
          title: "Product Added",
          description: `${productPayload.name} has been added successfully.`,
        });
      }
      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error as string,
      });
    } finally {
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        status: 'Available',
      });
      setUploadedImg('');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0">
        <DialogHeader className='p-6'>
          <DialogTitle>{currentProduct ? 'Edit' : 'Add new'} product</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={submitProductData} className='space-y-4 h-[500px] overflow-auto p-6 add-product_form'>
          {/* UPLOAD PRODUCT IMAGE */}
          <UploadImgProduct payload={{
            uploadedImg,
            setUploadedImg,
            errorImg: errorsProduct.image,
            setErrorsProduct,
            setIsModified
          }} />
          {/* PRODUCT NAME */}
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              placeholder='Enter product name'
              inputStyle='inputProduct'
              id='name'
              maxLength={50}
              onChange={
                useChangeInput(
                  setProductData,
                  errorsProduct,
                  setErrorsProduct,
                  () => setIsModified(true))}
              value={productData.name}
              error={errorsProduct.name}
            />
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              placeholder='Enter product description'
              id='description'
              inputStyle='inputProduct'
              error={errorsProduct.description}
              onChange={
                useChangeInput(
                  setProductData,
                  errorsProduct,
                  setErrorsProduct,
                  () => setIsModified(true)
                )}
              value={productData.description}
            />
          </div>
          {/* PRODUCT PRICE */}
          <div>
            <Label htmlFor='price'>Price</Label>
            <div className='relative'>
              <span className='absolute left-4 top-[9px] font-medium pr-1 border-r border-gray-400'>DH</span>
              <Input
                type='number'
                className='pl-12'
                placeholder='Enter product price'
                inputStyle='inputProduct'
                id='price'
                step='0.01'
                min='0'
                error={errorsProduct.price}
                onChange={
                  useChangeInput(
                    setProductData,
                    errorsProduct,
                    setErrorsProduct,
                    () => setIsModified(true)
                  )}
                value={productData.price.toString()}
              />
            </div>
          </div>
          {/* PRODUCT CATEGORY */}
          <div>
            <Label htmlFor='category'>Category</Label>
            <Select
              value={productData.category}
              onValueChange={(value) => {
                setProductData((prev) => ({ ...prev, category: value }));
                setIsModified(true);
              }}>
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
                className='w-1/2 bg-primary absolute border-2 border-[#f8f8f8] left-0 h-full rounded-md duration-300 ease-out'></span>
              {statuses.map((status, ind) => (
                <button
                  key={ind}
                  type='button'
                  onClick={() => selectProductStateHandler(status)}
                  className={`flex-1 z-10 outline-primary ${ind === currentStatus ? 'text-white' : ''}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <Button className='w-full flex gap-2' disabled={isButtonDisabled || isLoading}>
            {isLoading && <Loader2 className="animate-spin size-5" />}
            {currentProduct ? 'Save' : 'Add'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AddProduct);