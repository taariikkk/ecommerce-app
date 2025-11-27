import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">Detalji Proizvoda</h1>
      <p className="mt-4 text-lg">
        Prikazuju se detalji za proizvod sa ID-jem: <strong>{id}</strong>
      </p>
      {/* Kasnije ćemo ovdje dodati API poziv da dohvatimo podatke za ovaj ID */}
    </div>
  );
};

export default ProductDetail;