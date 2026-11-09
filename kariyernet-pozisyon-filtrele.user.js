// ==UserScript==
// @name         Kariyer.net Pozisyon Filtresi
// @namespace    kariyernet-pozisyon-filtrele
// @version      1.0
// @description  İlgilenmediğin pozisyon adlarını listeye ekle, kariyer.net otomatik gizlesin. Toplu (satır satır) ekleme destekler.
// @author       t4r1k255
// @match        https://www.kariyer.net/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'kn_pozisyon_blacklist_v1';

  // ---- Depolama yardımcıları ----
  function loadList() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function normalize(str) {
    // Türkçe karakter duyarsız, küçük harfe çevirip karşılaştırmayı kolaylaştırıyoruz
    return (str || '')
      .toLocaleLowerCase('tr')
      .replace(/İ/g, 'i')
      .trim();
  }

  // ---- İlan kartlarını gizleme mantığı ----
  function getJobLinks() {
    // Kariyer.net'te ilan kartları /is-ilani/ içeren linklerdir.
    return Array.from(document.querySelectorAll('a[href*="/is-ilani/"]'));
  }

  function findCardRoot(anchor) {
    // Kartın tamamını gizlemek için, anchor'ın kendisi genelde tüm kartı kapsar.
    // Güvenlik için üstte makul büyüklükte bir kapsayıcı varsa onu kullan.
    let el = anchor;
    let hops = 0;
    while (el.parentElement && hops < 3) {
      const parent = el.parentElement;
      // Eğer parent başka ilan linkleri de içeriyorsa (liste kapsayıcısı), dur.
      const siblingJobLinks = parent.querySelectorAll('a[href*="/is-ilani/"]');
      if (siblingJobLinks.length > 1) break;
      el = parent;
      hops++;
    }
    return el;
  }

  function applyFilter() {
    const blacklist = loadList().map(normalize).filter(Boolean);
    if (blacklist.length === 0) return;

    const links = getJobLinks();
    links.forEach((a) => {
      const text = normalize(a.textContent);
      const isBlocked = blacklist.some((kw) => text.includes(kw));
      const root = findCardRoot(a);
      if (isBlocked) {
        root.style.display = 'none';
        root.setAttribute('data-kn-filtered', '1');
      } else if (root.getAttribute('data-kn-filtered') === '1') {
        root.style.display = '';
        root.removeAttribute('data-kn-filtered');
      }
    });
  }

  // ---- Basit yönetim paneli ----
  function injectUI() {
    const btn = document.createElement('button');
    btn.textContent = '🚫 Pozisyon Filtresi';
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 999999,
      background: '#6c2eb5',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '13px',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      position: 'fixed',
      bottom: '65px',
      right: '20px',
      zIndex: 999999,
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '14px',
      width: '320px',
      maxHeight: '70vh',
      overflowY: 'auto',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      display: 'none',
      fontFamily: 'sans-serif',
      fontSize: '13px',
    });

    panel.innerHTML = `
      <div style="font-weight:600;margin-bottom:8px;">İlgilenmediğim Pozisyonlar</div>
      <div style="color:#666;margin-bottom:8px;">Başlığında bu kelimelerden biri geçen ilanlar otomatik gizlenir. Her satıra bir tane, ya da virgülle ayırarak toplu ekleyebilirsin.</div>
      <textarea id="kn-bulk-input" placeholder="örn:&#10;Tıbbi Mümessil&#10;Muhasebe Elemanı&#10;Call Center" style="width:100%;height:70px;box-sizing:border-box;margin-bottom:6px;"></textarea>
      <button id="kn-bulk-add" style="width:100%;margin-bottom:10px;padding:6px;background:#6c2eb5;color:#fff;border:none;border-radius:6px;cursor:pointer;">Listeye Ekle</button>
      <div id="kn-list" style="border-top:1px solid #eee;padding-top:8px;"></div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    function renderList() {
      const list = loadList();
      const container = panel.querySelector('#kn-list');
      if (list.length === 0) {
        container.innerHTML = '<div style="color:#999;">Henüz kelime eklenmedi.</div>';
        return;
      }
      container.innerHTML = list
        .map(
          (kw, i) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #f2f2f2;">
          <span>${kw}</span>
          <button data-idx="${i}" class="kn-remove" style="background:#eee;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;">Sil</button>
        </div>`
        )
        .join('');

      container.querySelectorAll('.kn-remove').forEach((el) => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-idx'), 10);
          const list = loadList();
          list.splice(idx, 1);
          saveList(list);
          renderList();
          applyFilter();
        });
      });
    }

    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      renderList();
    });

    panel.querySelector('#kn-bulk-add').addEventListener('click', () => {
      const raw = panel.querySelector('#kn-bulk-input').value;
      const parts = raw
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (parts.length === 0) return;

      const list = loadList();
      parts.forEach((p) => {
        if (!list.some((existing) => normalize(existing) === normalize(p))) {
          list.push(p);
        }
      });
      saveList(list);
      panel.querySelector('#kn-bulk-input').value = '';
      renderList();
      applyFilter();
    });

    renderList();
  }

  // ---- Başlat ----
  injectUI();
  applyFilter();

  // Sayfa AJAX ile içerik güncellerse (filtre değişimi, sayfalama vb.) tekrar uygula.
  // Debounce: art arda gelen çok sayıda DOM değişikliğini tek bir taramada birleştirir,
  // böylece observer her mutasyonda değil, değişiklikler durulduktan ~250ms sonra çalışır.
  let debounceTimer = null;
  const observer = new MutationObserver((mutations) => {
    // Kendi ekleyip kaldırdığımız değişiklikleri (style.display, data-kn-filtered) yok say,
    // sonsuz döngüyü ve gereksiz tetiklenmeyi önler.
    const relevant = mutations.some(
      (m) => !(m.type === 'attributes' && (m.attributeName === 'style' || m.attributeName === 'data-kn-filtered'))
    );
    if (!relevant) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyFilter, 250);
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
})();
