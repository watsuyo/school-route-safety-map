declare namespace Pwamap {
  type ShopData = {
    index: number;
    distance?: number;
    'タイムスタンプ': string;
    '緯度': string;
    '経度': string;
    'スポット名': string;
    'カテゴリリスト': string[];
    '紹介文': string;
    'いいね数': number;
  }

  type LngLat = [number, number]
}
