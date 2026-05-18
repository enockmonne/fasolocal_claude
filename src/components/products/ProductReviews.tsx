'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews] = useState<Review[]>([]);
  // TODO: fetch reviews from API

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Avis Clients</h2>

      {reviews.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-3">Aucun avis pour le moment.</p>
          <Button variant="outline" size="sm">Écrire le premier avis</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-white border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{review.author}</span>
                  <div className="flex text-amber-500 text-sm mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
