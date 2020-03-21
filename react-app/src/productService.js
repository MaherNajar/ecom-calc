import { fs } from './firebase';
import { Product } from './product';

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

function saveProduct(product) {
  let id = this.fs.createId();
  const docRef = this.fs.doc(`products/${id}`);

  docRef.set({ ...product, id });
}

function updateProduct(product) {
  const docRef = this.fs.doc(`products/${product.id}`);
  docRef.update({ ...product });
}

function deleteProduct(product) {
  const docRef = this.fs.doc(`products/${product.id}`);
  docRef.delete();
}

export { getProducts, saveProduct, updateProduct, deleteProduct };
