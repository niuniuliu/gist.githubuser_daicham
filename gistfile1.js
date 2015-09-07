// 日付とカウンタが入ったドキュメントのうち 2012/10/21 のみを時間別に count を集計するクエリ
db.journal.group(
  {
    //集計対象のドキュメント条件
    cond: {
      created: {$gte: ISODate("2012-10-21 00:00:00"), $lt: ISODate("2012-10-22 00:00:00")}
    },
    //集合キーを生成するための関数
    keyf: function(doc) {
      var time = doc.created.getHours();
      return {'time': time};
    },
    //集計処理
    reduce: function(obj, prev) {
      prev.csum += obj.count;
    },
    //集計カウンタ ここで初期化した変数とキーが戻りオブジェクトに格納される
    initial: { csum : 0 }
  }
)
