const ProductDescription = ({product: {name, description}}) => {
  return (
        <div className="py-1 w-1/2 space-y-4">
          <p className="font-medium">{name}</p>
          <hr></hr>
          <p>{description}</p>
        </div>
  );
};

export default ProductDescription;
