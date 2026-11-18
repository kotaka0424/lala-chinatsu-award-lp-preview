
/* ===============================================
   受賞アーティスト Chinatsu LP 2026-11-18
   js/main.js の末尾に追記する。.lpa が無いページでは何もしない
   =============================================== */
(function () {
  'use strict';

  if (!document.querySelector('.lpa')) return;

  // 症例カルーセルのドットインジケータ
  document.querySelectorAll('[data-lpa-carousel]').forEach(function (carousel) {
    var dots = carousel.nextElementSibling;
    var items = carousel.querySelectorAll('.lpa-carousel__item');
    if (!dots || !dots.hasAttribute('data-lpa-dots') || items.length < 2) return;

    items.forEach(function (_, i) {
      var dot = document.createElement('span');
      if (i === 0) dot.classList.add('is-active');
      dots.appendChild(dot);
    });

    carousel.addEventListener('scroll', function () {
      var step = items[1].offsetLeft - items[0].offsetLeft;
      var index = Math.round(carousel.scrollLeft / step);
      index = Math.max(0, Math.min(items.length - 1, index));
      dots.querySelectorAll('span').forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }, { passive: true });
  });

  // 追従CTA（テーマ標準の「LINEで予約する」）をLP用の文言に差し替える
  var cta = document.getElementById('mobileFixedCTA');
  if (cta) {
    cta.classList.add('lpa-fixed-cta');
    var label = cta.querySelector('.mobile-cta-button span');
    if (label) label.textContent = 'LINEで予約・相談する';
    if (!cta.querySelector('.lpa-fixed-cta__note')) {
      var note = document.createElement('p');
      note.className = 'lpa-fixed-cta__note';
      note.textContent = '国際大会 受賞アーティスト Chinatsu が担当';
      cta.insertBefore(note, cta.firstChild);
    }
  }
})();
