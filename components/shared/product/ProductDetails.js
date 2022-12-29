const ProductDetails = ({product: {name, description}}) => {
  return (
        <div className="w-1/5 py-1 space-y-4">
          <p className="font-medium">{name}</p>
          <hr></hr>
          <p>Description: {description}</p>
        </div>
  );
};

export default ProductDetails;
