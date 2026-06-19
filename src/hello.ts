console.log("====自動販売機シミュレータ====");

//////////////
// 商品の管理 //
//////////////

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
  /* メソッドの定義順は基本的に実行に影響しないが
  可読性を踏まえて順番を考えて書くと良い */

  /* isSoldOut()->商品が売切かを判断する
    在庫が0以下ならtrue, 在庫が1以上ならfalseを返す */
  isSoldOut(): boolean {
    return this.stock <= 0;
  }

  /* decreaseStock()->stockを1個減らす */
  decreaseStock(): void {
    /* 条件分岐で在庫が1以上の時は
    在庫を1個減らす処理を実行する */
    if (!this.isSoldOut()) {
      this.stock--;
    }
  }
  
  /* showInfo()->商品情報を表示する */
  showInfo(): void {
    console.log(
      `No.${this.id}: ${this.name}/${this.price}円(在庫:${this.stock})`
    );
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
// // 商品一覧表示
// console.log(""); // 文字なしの行の追加
// console.log("---商品一覧---");
// /* 配列productsの要素を順番に1つずつ取り出して
//   showInfo()メソッドを実行する */
// products.forEach(product => {
//   product.showInfo();
// });->vendingMachine.showProducts()に置き換える

//////////////////////////////
// 自動販売機の管理          　//
// ->自販機が商品全体を管理する //
/////////////////////////////

// 自動販売機クラスの宣言
class VendingMachine {
  /* 合計投入金額の初期値 */
  money: number;
  /* 商品を自販機で管理させる */
  products: Product[];

  // コンストラクタの定義
  /* インスタンス生成直後に自動実行される */
  /* 別のクラスのインスタンス(Productインスタンスの配列products)を
  このクラス(VendingMachine)に渡す
  ->VendingMachineがproductsを知っている状態にするため
  ∵{・商品の一覧を表示する
    ・商品を探す
    ・在庫を管理する
    ・購入処理をする} */
  constructor(products: Product[]) {
    this.money = 0;
    this.products = products;
  }

  // メソッドの定義
  /* このクラスが持つデータに関する処理を書く */
  /* insertMoney()->入金機能 */
  insertMoney(amount: number): void {
    /* 合計投入金額に追加された金額(amount)を足して、
    その金額を新たな合計投入金額とする */
    this.money += amount;
  }

  /* showProducts()->商品一覧表示をする */
  showProducts(): void {
    console.log("\n---商品一覧---");
    /* このクラスに渡された配列productsの要素を
    順番に1つずつ取り出してshowInfo()メソッドを実行する */
    this.products.forEach(product => {
      product.showInfo();
    });
  }

}

// VendingMachineクラスのインスタンスの生成
const vendingMachine = new VendingMachine(products);
// console.log(vendingMachine.money); // 確認用

// vendingMachine.insertMoney(100); // メソッド確認用
// console.log(vendingMachine.money); // メソッド確認用
vendingMachine.showProducts(); // メソッド確認用