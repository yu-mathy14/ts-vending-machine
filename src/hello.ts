import * as readline from "readline";

console.log("====自動販売機シミュレータ====");

//////////////
// 商品の管理 //
//////////////

// 商品クラスの宣言
class Product {
  readonly id: number;
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
      `No.${this.id}: ${this.name}/${this.price}円(在庫: ${this.stock})`
    );
  }

}

// Productクラスのインスタンスの生成
const water = new Product(
  0,
  "ぬる〜い水",
  100,
  5
);
// console.log(water); // 確認用
const tea = new Product(
  1,
  "あつ〜いお茶",
  120,
  5
);
// console.log(tea); // 確認用
const coffee = new Product(
  2,
  "ちょうどい〜いコーヒー",
  150,
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
  /* 残高の初期値 */
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
    /* 条件分岐で投入金額の上限を設定 */
    if (this.money + amount > 1000) {
      console.log("1000円以上は投入できません");
      return; // ここで処理終了
    }
    /* 残高に投入金額(amount)を足して、
    その金額を新たな残高とする */
    this.money += amount;
  }

  /* showBalance()->残高を表示する */
  showBalance(): void {
    console.log(`残高：${this.money}円`);
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

  /* buyProduct()->商品を購入する */
  buyProduct(id: number): void {
    /* 配列productsの中から条件◇に合う商品を1つ探す */
    const product = this.products.find(
      /* ◇ products配列の中から取り出した商品のidと
      buyProduct()の引数で受け取ったidが一致する*/
      (product) => {
        return product.id === id;
      }
    );

    // /* 商品が見つかった時だけshowInfo()を実行する
    // ∵ 存在しない商品idが実行されてもエラーが起きないように */
    // if (product) {
    //   product.showInfo();
    // } else {
    // /* id=undefinedの時の処理 */
    //   console.log("該当する商品が見つかりません");
    // }

    /* 商品が存在しない時の処理 */
    if (!product) {
      console.log("該当する商品が見つかりません");
      return; // ここで処理終了
    }
    
    /* 在庫不足時の処理 */
    if (product.isSoldOut()) {
      console.log(`${product.name}は売切です`);
      return; // ここで処理終了
    }

    /* 残高不足時の処理 */
    if (this.money < product.price){
      console.log(
        `購入失敗：${product.name}の購入には${
         product.price - this.money}円不足しています`
      );
      return; // ここで処理終了
    }

    // 問題がなければ購入処理へ
    /* 選択商品の在庫を1つ減らす処理 */
    product.decreaseStock();
    /* 残高から選択商品の代金を引いて、
    その値を最新の残高とする */
    this.money -= product.price;
    /* 購入完了メッセージの表示 */
    console.log(`購入成功：${product.name}を購入しました`);
    console.log(`現在の残高：${this.money}円`);
    product.showInfo();
  }

  /* refund()->現在の残高を返金する */
  refund(): void {
    /* 残高が0円の時の処理 */
    if (this.money === 0) {
      console.log("返金するお金がありません");
    return; // ここで処理終了
    }
    /* 現在の残高を定数refundAmountに格納する */
    const refundAmount = this.money;
    /* 残高の金額を0円に更新する */
    this.money = 0;
    /* 返金完了メッセージの表示 */
    console.log(`${refundAmount}円返金しました`);
  }

}

// VendingMachineクラスのインスタンスの生成
const vendingMachine = new VendingMachine(products);
// console.log(vendingMachine.money); // 確認用

// vendingMachine.insertMoney(100); // メソッド確認用
// console.log(vendingMachine.money); // メソッド確認用
// vendingMachine.showProducts(); // メソッド確認用
// vendingMachine.insertMoney(100); // メソッド確認用
// vendingMachine.showBalance(); // メソッド確認用
// vendingMachine.buyProduct(0); // メソッド確認用

//////////////
// readline
//////////////

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* 最初のアクション
   1. 投入金額投入
   2. 商品一覧表示
   3. 商品選択
   を実行するための関数 */
function startVendingMachine(): void {
  // 投入金額を入力
  rl.question(
    "投入金額を入力してください > ", (money: string) => {

      /* 入力された金額を数値型に変換 */
      vendingMachine.insertMoney(Number(money));
      console.log(""); // 文字なしの行の追加

      /* 残高表示のメソッドの実行 */
      vendingMachine.showBalance();
      console.log(""); // 文字なしの行の追加

      /* 商品一覧表示のメソッドを実行 */
      vendingMachine.showProducts();
      console.log(""); // 文字なしの行の追加

      /* 商品選択の関数を実行 */
      selectProduct();
    }
  );
}

/* 商品選択の関数 */
function selectProduct(): void {
  rl.question(
    "\n商品番号を入力してください > ",
    (id: string) => {
      /* 入力されたidを数値型に変換 */
      vendingMachine.buyProduct(Number(id));
      console.log(""); // 文字なしの行の追加

      // 次のアクションを選択する関数の実行
      nextAction();
    }
  );
}

/* 次のアクションを選択する関数 */
function nextAction(): void {
  /* アクションの選択肢を表示 */
  console.log("\nA : 続けて購入");
  console.log("B : 残高返却");

  rl.question(
    "\n選択してください > ",
    (answer: string) => {
      /* 入力内容を定数に格納 */
      /* .toUpperCase()->入力された文字を大文字に変換する */
      const action = answer.toUpperCase();
      /* swith(action)->actionの値によって処理を分岐する */
      switch (action) {
        /* ユーザーがAを入力した場合の処理 */
        case "A":
          /* 残高表示のメソッドを実行 */
          vendingMachine.showBalance();
          console.log("");
          /* 商品一覧表示のメソッドを実行 */
          vendingMachine.showProducts();
          /* 商品選択の関数を実行 */
          selectProduct();
          break; // switch文の終了

        /* ユーザーがBを入力した場合の処理 */
        case "B":
          /* 返金処理のメソッド */
          vendingMachine.refund();
          /* 終了時のメッセージの出力 */
          console.log("\nご利用ありがとうございました");

          /* readlineを閉じる */
          rl.close();
          break;
        
        /* ユーザーがAでもBでもないものを入力した場合 */
        default:
          /* メッセージの出力 */
          console.log("A または B を入力してください");
          /* もう一度次のアクションを選択する関数を呼び出す */
          nextAction();
      }
    }
  );
}

/* 最初のアクションの関数の実行 */
startVendingMachine();

