import React, { useEffect, useState } from "react";
import Product from "../utility/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Navbar from "../components/Navbar";
type Props = {};

const DetailPage: React.FC<Props> = () => {
  const firebase = useFirebase();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const productsDataFetcher = async () => {
    try {
      const snapshot: any = await firebase?.listAllProducts(); // Assuming listProducts() returns a snapshot
      const productsData: any = [];
      if (snapshot) {
        snapshot.forEach((doc: any) => {
          const productData: Product = {
            id: doc.id,
            product: doc.data().product,
            code: doc.data().code,
            price: doc.data().price,
            description: doc.data().description,
            stock: doc.data().stock,
            category: doc.data().category,
          };
          productsData.push(productData);
        });

        const itemFound = productsData.find((item: Product) => {
          return item.id == id;
        });
        if (itemFound) {
          setCurrentProduct({ ...itemFound });
        }
      }

      setProducts([...productsData]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    productsDataFetcher();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (!firebase?.currentUser) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" bg-gradient-to-r from-blue-300 to-indigo-300 h-screen w-screen flex items-center justify-center ">
        <div className="bg-white h-3/4  w-[60%] flex items-center justify-between gap-2 rounded-xl shadow-2xl ">
          <div className="w-[1/3] p-4 h-full flex items-center">
            <div className="text-center">
              <h3 className="text-2xl font-semibold">Product name:</h3>
              <h3 className="text-3xl ">{currentProduct?.product}</h3>
            </div>
          </div>
          <div className="hover:shadow-inner rounded-2xl w-1/3 h-2/3 items-center flex justify-center">
            <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
          </div>
          <div className="text-center w-1/3 p-4 ">
            <h3 className="text-2xl font-semibold">Description: </h3>
            <h3 className="text-md break-all">
              {currentProduct?.description}
              fhgafgakjfbaljfbaljfblablafbladfblafbalfa
              fhgafgakjfbaljfbaljfblablafbladfblafbalfa
              fhgafgakjfbaljfbaljfblablafbladfblafbalfa
              fhgafgakjfbaljfbaljfblablafbladfblafbalfa
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
