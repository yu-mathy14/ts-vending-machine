# 作ったもの / 調べたことの概要

## 1. 作ったもの

- TypeScriptで自販機シミュレータを作成
- Node.jsのコンソール上で動作

## 2. 実装した機能

- 商品一覧表示
- 入金機能
- 残高表示
- 商品購入機能
- 在庫管理
- 売切判定
- 返金機能
- 続けて購入するか選択する機能

## 3. 使用したクラス

### Productクラス

商品情報を管理

- id
- 商品名
- 価格
- 在庫数

メソッド

- isSoldOut()
- decreaseStock()
- showInfo()

### VendingMachineクラス

自動販売機全体を管理

- 残高管理
- 商品管理
- 購入処理
- 返金処理

メソッド

- insertMoney()
- showBalance()
- showProducts()
- buyProduct()
- refund()

## 4. 調べたこと

- クラス間のデータ受け渡し
- find()メソッドの使い方->最初に見つかったものを返す (cf:filter)
- readline利用までの環境構築
- 関数の定義の考え方

---

# つまづいた点・工夫した点・学んだこと

## 1.つまづいた点

### クラスに書く処理の判断

最初は「どの処理をどのクラスに書くべきか」がわからなかった。

Productクラス->商品自身のデータだけで完結する処理
- 在庫確認
- 在庫減少
- 商品情報表示

VendingMachineクラス->自販機全体の機能に関する処理
- 入金
- 残高表示
- 商品一覧表示
- 商品購入
- 返金

### ProductインスタンスをVendingMachineへ渡す意味
``` ts
new VendingMachine(products)
```
- 自販機が商品一覧を持つ
- 商品検索を行う
- 購入対象の商品を取得する
などVendingMachineが商品に関する情報を知らないと実行できない処理があるため

### readline利用までの環境構築
起こったエラー
- Cannot find name 'readline'
- Cannot find name 'process'

以下を実行し、
``` Bash
npm install --save-dev @types/node
```
package.jsonに以下を追加
``` json
"devDependencies": {
  "@types/node": "^..."
}
```

またtsconfig.jsonに以下を追記
``` json
{
  "compilerOptions":{
    "types": ["node"]
  }
}
```

## 2. 工夫した点
### クラス設計
- Product
- VendingMachine
処理を無理に1つのクラスにまとめず、役割を考慮して2つのクラスに分けた

### メソッドの順序
メソッドの定義順は基本的に実行に影響しないが、可読性を意識しながら順番を考えて書いた

### 関数をどうまとめるか
関数のまとめ方を複数通り考えたが、繰り返し行われる処理を1つの関数に切り離したことを中心に考えた


## 3. 学んだこと
- クラス、コンストラクタ、インスタンスの関係性
- クラス間でインスタンスを受け渡して協力させることができる
- find()を使うと条件に一致する要素を取得できる
- 型定義不足によるエラーが多発するが、その分安全に開発できる
