import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../../features/userSlice";

import { db } from "../../../firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";

import Classes from "./PlanScreen.module.css";

const PlanScreen = () => {
  const user = useSelector(selectUser);
  const [allProducts, setAllProducts] = useState([]);
  // const [subscription, setSubscription] = useState(false);

  const getProductData = async () => {
    const productCollection = collection(db, "products");
    const products = [];
    const productSnapshot = await getDocs(productCollection);

    for (const productsDoc of productSnapshot.docs) {
      const priceSnap = collection(productsDoc.ref, "prices");
      const priceSnapShot = await getDocs(priceSnap);

      for (const priceDoc of priceSnapShot.docs) {
        products.push({
          productData: productsDoc.data(),
          productId: productsDoc.id,
          priceId: priceDoc.id,
          priceData: priceDoc.data(),
        });
      }
    }

    setAllProducts(products);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const subscribeHandler = async (priceId) => {
    try {
      const userId = doc(db, "coustomers", user.id);
      const addSession = collection(userId, "checkout_sessions");
      await addDoc(addSession, {
        priceId: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className={Classes.plans}>
      <ul>
        {allProducts.map((productsInfo) => {
          return (
            <li key={productsInfo.productId} className={Classes.subscription}>
              <div>
                <h5>{productsInfo.productData.name}</h5>
                <h6>{productsInfo.productData.description}</h6>
              </div>
              <div className={Classes.action}>
                <button
                  onClick={() => subscribeHandler(productsInfo.priceId)}
                  className={Classes.btn}
                >
                  Subscribe
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PlanScreen;
