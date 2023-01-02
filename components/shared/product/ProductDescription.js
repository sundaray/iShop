const ProductDescription = ({ product: { description } }) => {
  return (
    <div className="product-description rounded-xl bg-gray-100">
      <p className="text-xl font-medium">{description}</p>
    </div>
  );
};

export default ProductDescription;
