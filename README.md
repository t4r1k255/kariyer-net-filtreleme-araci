# Kariyer.net Position Filter · Pozisyon Filtresi

> [!WARNING]
> **Bu proje artık geliştirilmiyor.** Kariyer.net, Eleman.net ve Indeed filtreleri tek bir scriptte toplandı: **[İş Portalı Filtresi](https://github.com/t4r1k255/flink)**. Yeni özellikler (şirket ve konum filtresi, istisnalar, tüm sitelerde ortak liste) ve düzeltmeler orada.
> Geçmek için yeni scripti kur ve bunu kaldır; bu scriptteki listen, yeni script siteyi ilk açtığında kendiliğinden aktarılır.
>
> **This project is no longer maintained.** The Kariyer.net, Eleman.net and Indeed filters were merged into one script: **[İş Portalı Filtresi](https://github.com/t4r1k255/flink)**. Install it and remove this one; your list is imported automatically.

A userscript that hides Kariyer.net job listings whose titles contain positions you are not interested in, so you don't have to click "Not interested" one by one.

Kariyer.net'te ilgilenmediğin pozisyonları içeren ilanları otomatik gizleyen bir userscript. Tek tek "İlanla İlgilenmiyorum" tıklamana gerek kalmaz.

**[English](#english) · [Türkçe](#türkçe)**

---

## English

### Install

1. Install the [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) browser extension (Chrome, Edge, Firefox).
2. **[Click here to install the script](https://github.com/t4r1k255/kariyer-net-filtreleme-araci/raw/main/kariyernet-pozisyon-filtrele.user.js)** and confirm with **Install**.
3. Open or refresh [kariyer.net](https://www.kariyer.net).

### Usage

1. Click the **🚫 Pozisyon Filtresi** button at the bottom right of the page.
2. Enter the positions you want to hide, one per line or comma-separated:
   ```
   Tıbbi Mümessil
   Muhasebe Elemanı, Call Center, Kasiyer
   ```
3. Press **Listeye Ekle** (Add to list). Every listing whose title, company or location text contains one of these phrases is hidden, and stays hidden after page reloads or filter changes.
4. Remove an entry with the **Sil** (Delete) button next to it.

### How matching works

- **Case-insensitive**, with correct Turkish casing (İ/i, I/ı).
- **Exact phrase match**: `Satış Danışmanı` matches *Kıdemli Satış Danışmanı* but not *Satış Temsilcisi*.
- Very generic single words such as `satış` may hide more listings than expected.

### Notes

- Your list is stored in the browser's `localStorage`, so it only applies to that browser and device.
- The script watches the page with a `MutationObserver` and uses a 250 ms debounce to avoid unnecessary re-scans.
- Independent community tool. Not affiliated with Kariyer.net.

---

## Türkçe

### Kurulum

1. Tarayıcına [Tampermonkey](https://www.tampermonkey.net/) veya [Violentmonkey](https://violentmonkey.github.io/) eklentisini kur (Chrome, Edge, Firefox).
2. **[Scripti kurmak için buraya tıkla](https://github.com/t4r1k255/kariyer-net-filtreleme-araci/raw/main/kariyernet-pozisyon-filtrele.user.js)** ve açılan pencerede **Install / Yükle**'ye bas.
3. [kariyer.net](https://www.kariyer.net) sayfasını aç veya yenile.

### Kullanım

1. Sayfanın sağ altındaki **🚫 Pozisyon Filtresi** butonuna tıkla.
2. İlgilenmediğin pozisyonları her satıra bir tane ya da virgülle ayırarak yaz:
   ```
   Tıbbi Mümessil
   Muhasebe Elemanı, Call Center, Kasiyer
   ```
3. **Listeye Ekle**'ye bas. Başlığında (pozisyon, şirket ve konum metninde) bu ifadelerden biri geçen her ilan gizlenir. Sayfa yenilense veya filtre değişse de gizli kalır.
4. Bir ifadeyi listeden çıkarmak için yanındaki **Sil** butonuna tıkla.

### Nasıl eşleştiriyor?

- **Büyük/küçük harf fark etmez**, Türkçe karakterler dahil (İ/i, I/ı doğru çevrilir).
- **Tam ifade aranır:** `Satış Danışmanı` yazarsan *Kıdemli Satış Danışmanı* eşleşir, *Satış Temsilcisi* eşleşmez.
- `satış` gibi çok genel tek kelimeler beklenenden fazla ilanı gizleyebilir; mümkünse belirli pozisyon adları kullan.

### Notlar

- Liste tarayıcının `localStorage` alanında saklanır; sadece o tarayıcı ve cihazda geçerlidir, kariyer.net hesabınla senkronize olmaz.
- Script sayfayı `MutationObserver` ile izler ve gereksiz yeniden taramaları önlemek için 250 ms debounce kullanır.
- Bağımsız bir topluluk aracıdır, Kariyer.net ile bağlantısı yoktur.

## License · Lisans

[MIT](LICENSE)
