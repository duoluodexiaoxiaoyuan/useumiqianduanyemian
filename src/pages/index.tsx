import styles from './index.less';
import  { useState, useEffect } from "react";
import request from 'umi-request';
interface Goods {
  id: number;
  name: string;
  price: string;
  imgurl: string;
}

export default function IndexPage() {
  const [goods, setGoods] = useState<Goods[]>([
    {id:1,name:"苹果",price:"4000",imgurl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.n4tmwAsvh9DlJoZUwEAvTAHaE8?pid=ImgDet&rs=1"}
  ]);

  useEffect(() => {
    fetchGoodsList();
  },[])

  const fetchGoodsList = async (keyword: string = "") => {
    const result = await request("/api/products", {
      params: { keyword } 
    })
    setGoods(result);
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <input type="text" className={styles.searchInput} />
        <button className={styles.searchButton}>搜索</button>
      </div>
      <div className={styles.goodsList}>
        {goods.map((item, index) => {
          return (
            <div className={styles.goodsItem} key={index}>
              <img className={styles.goodsImage} src={item.imgurl} alt="" />
              <div className={styles.goodsInfo}>
                <div className={styles.goodsTitle}>{ item.name }</div>
                <div className={styles.goodsPrice}>{ item.price }</div>
              </div>
            </div>
          )
        })}
        
      </div>
    </div>
  );
}
