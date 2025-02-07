"use client";

import * as z from "zod";
import axios from "axios";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { useUser } from "@clerk/nextjs";
import { Product, Image, Category } from "@/types";
import { Button } from "@/components/ui/bt";
import { createProduct } from "@/actions/create-product";
import { updateProduct } from "@/actions/update-product";

const formSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  condition: z.enum(["new", "used"]),
  userId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const currentUser = useUser();
  const userId = currentUser.user?.id;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Your Product" : "List A Product";
  const toastMessage = initialData ? "Product updated" : "Product Listed.";
  const action = initialData ? "Save changes" : "List Product";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
          condition:
            initialData.condition === "new" || initialData.condition === "used"
              ? initialData.condition
              : "new",
          userId: userId || "",
        }
      : {
          name: "",
          images: [],
          description: "",
          price: 0,
          categoryId: "",
          location: "",
          condition: "new",
          userId: userId || "",
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`;
      const payload = { ...data, userId };
      setLoading(true);
      if (initialData) {
        await updateProduct(URL, payload);
        toast.success(toastMessage);
      } else {
        await createProduct(payload);
        toast.success(toastMessage);
      }
      router.push("/sell");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push("/");
      toast.success("product deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="ml-6 flex first-letter:items-center justify-between">
        <Heading title={title} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Form {...form}>
        <div className="max-w-6xl mx-auto ml-8 mr-8 p-8   bg-white shadow-lg rounded-xl border border-gray-200">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) => {
                        const currentImages = form.getValues("images");
                        const newImage = { url: url };
                        const updatedImages = [...currentImages, newImage];
                        form.setValue("images", updatedImages, {
                          shouldValidate: true,
                        });
                      }}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>$Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="Add Product Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="space-y-3 space-x-3">
                    <FormLabel>Product Condition</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0  ">
                          <FormControl>
                            <RadioGroupItem value="new" />
                          </FormControl>
                          <FormLabel className="flex items-centerfont-normal">
                            New
                          </FormLabel>
                        </FormItem>
                        <FormItem className=" flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="used" />
                          </FormControl>
                          <FormLabel className="font-normal">Used</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add location for product pick up"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={loading}
              className="mt-4 ml-auto px-6 py-3 text-lg font-semibold hover:bg-blue-700 text-white rounded-lg shadow-md"
              type="submit"
            >
              {action}
            </Button>
          </form>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
