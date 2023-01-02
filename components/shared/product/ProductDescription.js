const ProductDescription = ({ product: { description } }) => {
  return (
    <div className="product-description rounded-xl bg-gray-100 px-5 py-3 md:px-10 md:py-4">
      <p className="text-sm md:text-xl font-medium">{description}</p>
    </div>
  );
};

export default ProductDescription;
