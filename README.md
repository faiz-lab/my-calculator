# calculator-website

#### 紹介
シンプルな計算機（けいさんき）のデモです。

#### 学習メモ（がくしゅうメモ）

- 配列（はいれつ）の各要素（かくようそ）を文字列（もじれつ）型に変換（へんかん）する

```javascript
var array = [1,2,3]
array = array.map(String)
```

- '+' の前が 'e' ではない場合にのみ '+' をマッチさせる。これは否定の後読み（ひていのあとよみ、negative lookbehind）と呼ばれる。

```javascript
(?<!e)\+
```
