import './css/ProductComponent.css';
function removeBrackets(str) {
  return str.replace(/\[.*?\]/g, '');
}
const ProductPage = ({products}) =>{
  return(
    <div className='product-page'>
    <div className="products-wrapper">
      {products.map((product, index) => (
        <ProductComponent key={index} product={product} />
      ))}
    </div>
  </div>
  )
}
const ProductComponent = ({ product }) => {
    return (
      <div className="product-container">
        <img className="product-image" src={product.img_url} alt={product.title} />
        <div className="product-details">
          <p className="product-model">{removeBrackets(product.title)}</p>
            <p className="product-fee">{product.fee.split(' : ')[1]}</p>
            <p className="product-place">{product.place.split(' : ')[1]}</p>
        </div>
      </div>
    );
}

export default ProductPage;
