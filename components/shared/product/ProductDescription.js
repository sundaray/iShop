const ProductDescription = ({ product: { description } }) => {
  return (
    <div className="rounded-xl w-3/4 px-12 py-6 bg-gray-100 m-auto">
      <p className="text-2xl font-medium">{description}</p>
    </div>
  );
};

export default ProductDescription;
