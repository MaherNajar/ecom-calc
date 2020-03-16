import { fs } from './firebase';
import { Product } from './product';
function saveProduct(product) {
  if(product.id) return;
  const collectionRef = fs.collection('products');
  product.cost = 0;
  product.sell = 0;
  collectionRef.add(product).then(
    () => console.log('product saved !'),
    err => console.log('an error occured :' + err)
  );
}

async function getProducts() {
  const products = [];
  await fs
    .collection('products')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let product = new Product({ id: doc.id, ...doc.data() });
        products.push(product);
      });
    });

  return products;
}

async function updateProduct(product) {}

export { saveProduct, getProducts, updateProduct };
