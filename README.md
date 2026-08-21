# Kariyer.net Pozisyon Filtresi

İlgilenmediğin pozisyon adlarını listeye ekle, başlığında bu kelimeler geçen ilanlar kariyer.net'te otomatik olarak gizlensin. Tek tek "İlanla İlgilenmiyorum" tıklamana gerek kalmaz.

## Kurulum

1. Tarayıcına **[Tampermonkey](https://www.tampermonkey.net/)** eklentisini kur (Chrome, Edge, Firefox hepsinde var, ücretsiz).
2. Tampermonkey ikonuna tıkla → **"Yeni script oluştur"**.
3. Açılan editördeki her şeyi sil, `kariyernet-pozisyon-filtrele.user.js` dosyasının içeriğini yapıştır.
4. `Ctrl+S` ile kaydet.
5. [kariyer.net](https://www.kariyer.net) sayfasını aç (veya yenile).

## Kullanımı

1. Sayfanın sağ altında **"🚫 Pozisyon Filtresi"** butonu görünecek.
2. Butona tıkla, açılan kutuya ilgilenmediğin pozisyon adlarını yaz:
   - Her satıra bir tane, **ya da**
   - Virgülle ayırarak toplu halde
   ```
   Tıbbi Mümessil
   Muhasebe Elemanı, Call Center, Kasiyer
   ```
3. **"Listeye Ekle"** butonuna bas.
4. O andan itibaren başlığında (pozisyon + şirket + konum metninde) bu ifadelerden biri geçen her ilan otomatik gizlenir — sayfa yenilense, filtre değiştirilse de kalıcıdır.
5. Bir kelimeyi listeden çıkarmak için panelde yanındaki **"Sil"** butonuna tıkla.

## Nasıl eşleştiriyor?

- **Büyük/küçük harf önemli değil** — "SATIŞ", "Satış", "satış" hepsi aynı sayılır (Türkçe karakterler dahil, örn. İ/i doğru çevrilir).
- **Tam ifade aranır** (kelime kelime değil) — yazdığın metin ilan başlığında **birebir, o sırada** geçmeli.
  - `"Satış Danışmanı"` yazarsan → *"Kıdemli Satış Danışmanı"* eşleşir, ama *"Satış Temsilcisi"* eşleşmez.
- Çok genel tek kelimeler (`"satış"` gibi) beklenenden fazla ilanı gizleyebilir; mümkünse spesifik pozisyon adı kullan.

## Notlar

- Liste tarayıcında (`localStorage`) saklanır — sadece o tarayıcı/cihazda geçerlidir, kariyer.net hesabınla senkronize olmaz.
- Script, sayfadaki değişiklikleri izler ve gereksiz yeniden taramaları önlemek için 250ms **debounce** kullanır (performansı korumak için).
- Bu bir tarayıcı eklentisi çözümüdür; kariyer.net'in resmi bir toplu filtreleme özelliği değildir.
