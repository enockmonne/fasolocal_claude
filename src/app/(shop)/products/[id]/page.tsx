import { Metadata } from 'next';
import ProductDetail from '@/components/products/ProductDetail';
import ProductReviews from '@/components/products/ProductReviews';
import Breadcrumbs from '@/components/common/Breadcrumbs';

interface Props {
  params: { id: string };
}

// TODO: Replace with real data fetching
async function getProduct(id: string) {
  // const product = await productService.getProduct(id);
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // const product = await getProduct(params.id);
  return {
    title: `Produit | FasoLocal`,
    description: `Découvrez ce produit local du Burkina Faso sur FasoLocal.`,
  };
}

export default async function ProductPage({ params }: Props) {
  // const product = await getProduct(params.id);
  // if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[
        { label: 'Boutique', href: '/products' },
        { label: 'Produit' },
      ]} />

      {/* TODO: Pass real product data */}
      {/* <ProductDetail product={product} /> */}
      {/* <ProductReviews productId={params.id} /> */}

      <div className="text-center py-20 text-gray-500">
        <p className="text-4xl mb-3">🏗️</p>
        <p className="font-semibold">Page produit en construction</p>
        <p className="text-sm mt-1">Connectez votre base de données pour afficher les produits.</p>
      </div>
    </div>
  );
}
