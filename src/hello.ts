console.log("====自動販売機シミュレータ====");

//////////////////
// 商品一覧の管理 //
//////////////////


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

  // メソッドの定義
  /* このクラスが持つデータに関する処理を書く */
  /* decreaseStock()->stockを1個減らす */
  decreaseStock(): void {
    this.stock--;
  }
  
  /* showInfo()->商品情報を表示する */
  showInfo(): void {
    console.log(
      `No.${this.id}: ${this.name}/${this.price}円(在庫:${this.stock})`
    );
  }

  /* isSoldOut()->商品が売切かを判断する
    在庫が0以下ならtrue, 在庫が1以上ならfalseを返す */
  isSoldOut(): boolean {
    return this.stock <= 0;
  }
}

// Productクラスのインスタンスの生成
const water = new Product(
  0,
  "水",
  100,
  5
);
// console.log(water); // 確認用
const tea = new Product(
  1,
  "お茶",
  120,
  5
);
// console.log(tea); // 確認用
const coffee = new Product(
  2,
  "コーヒー",
  130,
  5
);
// console.log(coffee); // 確認用

// water.decreaseStock(); // メソッド確認用
// water.showInfo(); // メソッド確認用
// console.log(water.isSoldOut()); // メソッド確認用

// 配列化して商品をまとめて管理する
// インスタンス化した商品を格納する配列の定義
const products: Product[] = [
  water,
  tea,
  coffee
];
// 商品一覧表示
console.log(""); // 文字なしの行の追加
console.log("---商品一覧---");
/* 配列productsの要素を順番に1つずつ取り出して
  showInfo()メソッドを実行する */
products.forEach(product => {
  product.showInfo();
});