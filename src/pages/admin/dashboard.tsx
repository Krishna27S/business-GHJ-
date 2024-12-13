/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { db, storage } from '../../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Compressor from 'compressorjs';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import product from '@/src/components/product';

interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  category: string;
  metalType: string;
  imageUrl: string;
  storageRef?: string;
  createdAt?: Date;
  createdBy?: string;
}

const categories = [
  'BANGLES', 'BRACELETS', 'EARRINGS', 'GOLD CHAINS',
  'PENDANTS', 'RINGS', 'NECKLACES', 'NOSE PINS'
];

const metalTypes = ['GOLD', 'SILVER', 'PLATINUM', 'ROSE GOLD'];

const Dashboard = () => {
  const router = useRouter();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '',
    category: 'NECKLACES',
    metalType: 'GOLD',
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    console.log('Fetching initial products...');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Starting to fetch products...');
      const querySnapshot = await getDocs(collection(db, 'products'));
      console.log('Query snapshot received:', querySnapshot.size, 'documents');
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      console.log('Processed products:', productsData);
      setProducts(productsData.sort((a, b) => b.price - a.price));
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5000000) {
        setError('Image size should be less than 5MB');
        return;
      }

      console.log('Compressing image...');
      new Compressor(file, {
        quality: 0.3,
        maxWidth: 800,
        maxHeight: 800,
        success: (compressedResult) => {
          console.log('Image compressed successfully');
          const compressedFile = compressedResult as File;
          setImage(compressedFile);
          setPreviewUrl(URL.createObjectURL(compressedFile));
        },
        error: (err) => {
          console.error('Image compression error:', err);
          toast.error('Failed to compress image');
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setUploadProgress(0);

    try {
      // Check authentication
      const user = auth.currentUser;
      if (!user) {
        throw new Error('You must be authenticated to add products');
      }

      if (!image) {
        throw new Error('Please select an image');
      }

      // Validate form data
      if (!formData.name.trim() || !formData.price || !formData.weight.trim()) {
        throw new Error('All fields are required');
      }
      console.log('Starting product upload...');
      const imageId = uuidv4();
      const storageRef = `products/${imageId}`;
      const storageRefFull = ref(storage, storageRef);
      const uploadTask = uploadBytesResumable(storageRefFull, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error('Upload error:', error);
          toast.error(`Upload failed: ${error.message}`);
          setLoading(false);
        },
        async () => {
          try {
            console.log('Upload complete, getting URL...');
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            console.log('Adding to Firestore...');
            const productData = {
              name: formData.name.trim(),
              price: parseFloat(formData.price),
              weight: formData.weight.trim(),
              category: formData.category,
              metalType: formData.metalType,
              imageUrl: downloadURL,
              storageRef: storageRef,
              createdAt: serverTimestamp(),
              createdBy: user.uid,
              updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'products'), productData);

            console.log('Product added with ID:', docRef.id);
            
            // Reset form
            setFormData({
              name: '',
              price: '',
              weight: '',
              category: 'NECKLACES',
              metalType: 'GOLD',
            });
            setImage(null);
            setPreviewUrl('');
            setUploadProgress(0);
            toast.success('Product added successfully!');
            await fetchProducts();
          } catch (error: any) {
            console.error('Error saving to Firestore:', error);
            // Clean up uploaded image if Firestore save fails
            try {
              await deleteObject(storageRefFull);
            } catch (deleteError) {
              console.error('Error deleting uploaded image:', deleteError);
            }
            toast.error(`Failed to save product: ${error.message}`);
          }
          setLoading(false);
        }
      );
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to add product');
      setLoading(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setDeleteLoading(product.id);
    try {
      // Check authentication
      const user = auth.currentUser;
      if (!user) {
        throw new Error('You must be authenticated to delete products');
      }

      console.log('Starting product deletion...');
      
      // First delete from Firestore
      await deleteDoc(doc(db, 'products', product.id));
      console.log('Document deleted from Firestore');

      // Then try to delete from Storage if storageRef exists
      if (product.storageRef) {
        try {
          const imageRef = ref(storage, product.storageRef);
          await deleteObject(imageRef);
          console.log('Image deleted from Storage');
        } catch (storageError) {
          console.log('Storage object already deleted or not found');
        }
      }

      toast.success('Product deleted successfully');
      setProducts(prev => prev.filter(p => p.id !== product.id));
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(`Failed to delete product: ${error.message}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Add Product Form */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-2 h-40 w-40 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metal Type
                  </label>
                  <select
                    value={formData.metalType}
                    onChange={(e) => setFormData({...formData, metalType: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {metalTypes.map((metal) => (
                      <option key={metal} value={metal}>
                        {metal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? `Adding Product (${uploadProgress}%)` : 'Add Product'}
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">All Products ({products.length})</h2>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products added yet.</p>
                <p className="text-gray-400 text-sm mt-2">Add your first product using the form above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-red-600 font-medium">₹{product.price.toLocaleString()}</p>
                    <p className="text-gray-600">Weight: {product.weight}</p>
                    <p className="text-gray-600">Category: {product.category}</p>
                    <p className="text-gray-600">Metal: {product.metalType}</p>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deleteLoading === product.id}
                      className="mt-2 w-full bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200 disabled:opacity-50"
                    >
                      {deleteLoading === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;