import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProductCard from '@/components/products/ProductCard';
import { getProductBySlug, MOCK_PRODUCTS } from '@/lib/mockData';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) {
    return { title: 'Produit introuvable | FasoLocal' };
  }
  return {
    title: `${product.name} | FasoLocal`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) return notFound();

  const related = MOCK_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryLabels: Record<string, string> = {
    agroalimentaire: 'Agroalimentaire',
    cosmetiques: 'Cosmétiques & Karité',
    artisanat: 'Artisanat',
    textiles: 'Textiles',
    'sante-bien-etre': 'Santé & Bien-être',
    boissons: 'Boissons',
    'cereales-farines': 'Céréales & Farines',
    'epices-condiments': 'Épices & Condiments',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs
        items={[
          { label: 'Boutique', href: '/products' },
          { label: categoryLabels[product.category] || product.category, href: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6">
        <ProductDetail product={product} />
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Vous pourriez aussi aimer
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
