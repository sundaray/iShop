const ProductDescription = ({ product: { description } }) => {
  return (
    <div className="product-description rounded-xl bg-gray-100 mb-12 px-5 py-3 md:px-10 md:py-4">
      <p className="text-sm md:text-lg font-medium">{description}</p>
    </div>
  );
};

export default ProductDescription;
