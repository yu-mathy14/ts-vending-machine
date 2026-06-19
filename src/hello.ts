console.log("====自動販売機シミュレータ====");

/////////////////
// 商品一覧の管理
/////////////////


// 商品クラスの宣言
class Product{
  id: number;
  name: string;
  price: number;
  stock: number;

  // コンストラクタの定義
  /* インスタンス生成直後に自動実行される */
  constructor(
    id: number,
    name: string,
    price: number,
    stock: number
  ){
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

// Productクラスのインスタンスの生成
const water = new Product(
  0,
  "水",
  100,
  5
);
console.log(water); // 確認用
const tea = new Product(
  1,
  "お茶",
  120,
  5
);
console.log(tea); // 確認用
const coffee = new Product(
  2,
  "コーヒー",
  130,
  5
);
console.log(coffee); // 確認用