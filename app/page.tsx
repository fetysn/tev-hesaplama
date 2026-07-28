"use client";

import { useEffect, useMemo, useState } from "react";

type TevRow = {
  id: number;
  beyannameNo: string;
  tarih: string;
  gtip: string;
  madde: string;
  miktar: string;
  cif: string;
  kur: string;
  oran: string;
  odenen: string;
};

const blankRow = (id: number): TevRow => ({
  id, beyannameNo: "", tarih: "", gtip: "", madde: "", miktar: "", cif: "", kur: "", oran: "", odenen: "",
});

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 2 });
const usd = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const n = (value: string) => Number(String(value).replace(",", ".")) || 0;

function calculate(row: TevRow) {
  const totalCifUsd = n(row.miktar) * n(row.cif);
  const totalCifTl = totalCifUsd * n(row.kur);
  const tev = totalCifTl * (n(row.oran) / 100);
  return { totalCifUsd, totalCifTl, tev, fark: n(row.odenen) - tev };
}

export default function Home() {
  const [firma, setFirma] = useState("");
  const [belgeNo, setBelgeNo] = useState("");
  const [belgeTarihi, setBelgeTarihi] = useState("");
  const [rows, setRows] = useState<TevRow[]>([blankRow(1)]);
  const [activeTab, setActiveTab] = useState<"hesap" | "ozet">("hesap");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tev-calculator-v1");
    if (!stored) return;
    try {
      const data = JSON.parse(stored);
      queueMicrotask(() => {
        setFirma(data.firma || ""); setBelgeNo(data.belgeNo || ""); setBelgeTarihi(data.belgeTarihi || "");
        if (Array.isArray(data.rows) && data.rows.length) setRows(data.rows);
      });
    } catch { /* bozuk yerel kayıt yok sayılır */ }
  }, []);

  const results = useMemo(() => rows.map((row) => ({ row, ...calculate(row) })), [rows]);
  const totals = useMemo(() => results.reduce((a, r) => ({
    cifUsd: a.cifUsd + r.totalCifUsd, cifTl: a.cifTl + r.totalCifTl, tev: a.tev + r.tev, odenen: a.odenen + n(r.row.odenen), fark: a.fark + r.fark,
  }), { cifUsd: 0, cifTl: 0, tev: 0, odenen: 0, fark: 0 }), [results]);
  const incomplete = rows.filter((r) => Object.values(r).slice(1, 9).some((v) => !v)).length;

  const update = (id: number, key: keyof TevRow, value: string) => setRows((old) => old.map((r) => r.id === id ? { ...r, [key]: value } : r));
  const save = () => {
    localStorage.setItem("tev-calculator-v1", JSON.stringify({ firma, belgeNo, belgeTarihi, rows }));
    setSaved(true); setTimeout(() => setSaved(false), 1800);
  };
  const exportCsv = () => {
    const header = ["Beyanname No", "Tarih", "GTİP", "Madde", "TEV Miktarı", "CIF Birim Fiyat ($)", "Kur", "TEV Oranı (%)", "Toplam CIF ($)", "Toplam CIF (TL)", "Ödenecek TEV (TL)", "Ödenen TEV (TL)", "Fark (TL)"];
    const body = results.map((r) => [r.row.beyannameNo, r.row.tarih, r.row.gtip, r.row.madde, r.row.miktar, r.row.cif, r.row.kur, r.row.oran, r.totalCifUsd, r.totalCifTl, r.tev, n(r.row.odenen), r.fark]);
    const csv = [header, ...body].map((line) => line.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(";")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" })); a.download = `TEV-${belgeNo || "hesaplama"}.csv`; a.click(); URL.revokeObjectURL(a.href);
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="TEV Ana Sayfa"><span>TEV</span><b>Hesap</b></a>
        <nav aria-label="Ana menü"><a href="#hesaplama">Hesaplama</a><a href="#kilavuz">Kılavuz</a></nav>
        <button className="ghost" onClick={() => window.print()}>Yazdır</button>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Telafi Edici Vergi · 61</p>
          <h1>TEV hesabını<br/><em>hatasız</em> tamamlayın.</h1>
          <p className="heroCopy">İthal girdi bilgilerinizi girin; CIF tutarını, ödenecek TEV’i ve ödeme farkını anında görün.</p>
        </div>
        <div className="formulaCard" aria-label="Hesaplama formülü">
          <span>HESAPLAMA AKIŞI</span>
          <div><b>TEV’e tabi miktar</b><i>×</i><b>CIF birim fiyat</b><i>×</i><b>İhraç kuru</b><i>×</i><b>Vergi oranı</b></div>
          <small>Oran yüzde olarak girilir. Örnek: %7,5 için 7,5.</small>
        </div>
      </section>

      <section className="workspace" id="hesaplama">
        <div className="tabs" role="tablist">
          <button className={activeTab === "hesap" ? "active" : ""} onClick={() => setActiveTab("hesap")}>01 · Hesaplama</button>
          <button className={activeTab === "ozet" ? "active" : ""} onClick={() => setActiveTab("ozet")}>02 · Kontrol özeti</button>
        </div>

        {activeTab === "hesap" ? <>
          <div className="sectionHead"><div><span>01</span><h2>Belge bilgileri</h2></div><p>Raporunuzda görünecek temel bilgiler</p></div>
          <div className="documentGrid">
            <label>Firma adı<input value={firma} onChange={(e) => setFirma(e.target.value)} placeholder="Firma unvanını yazın" /></label>
            <label>Belge no<input value={belgeNo} onChange={(e) => setBelgeNo(e.target.value)} placeholder="Örn. 25341200EX001234" /></label>
            <label>Belge tarihi<input type="date" value={belgeTarihi} onChange={(e) => setBelgeTarihi(e.target.value)} /></label>
          </div>

          <div className="sectionHead rowHead"><div><span>02</span><h2>İthal girdiler</h2></div><button className="add" onClick={() => setRows((r) => [...r, blankRow(Math.max(...r.map(x => x.id), 0) + 1)])}>+ Yeni satır</button></div>
          <div className="rows">
            {results.map((result, index) => <article className="rowCard" key={result.row.id}>
              <div className="rowTitle"><b>{String(index + 1).padStart(2, "0")}</b><span>İthal girdi</span>{rows.length > 1 && <button onClick={() => setRows((r) => r.filter((x) => x.id !== result.row.id))} aria-label={`${index + 1}. satırı sil`}>Sil</button>}</div>
              <div className="inputGrid">
                <label>Beyanname no<input value={result.row.beyannameNo} onChange={(e) => update(result.row.id, "beyannameNo", e.target.value)} /></label>
                <label>Tarih<input type="date" value={result.row.tarih} onChange={(e) => update(result.row.id, "tarih", e.target.value)} /></label>
                <label>G.T.İ.P.<input value={result.row.gtip} onChange={(e) => update(result.row.id, "gtip", e.target.value)} placeholder="12 haneli tarife" /></label>
                <label className="wide">Madde adı<input value={result.row.madde} onChange={(e) => update(result.row.id, "madde", e.target.value)} /></label>
                <label>TEV’e tabi miktar<input inputMode="decimal" value={result.row.miktar} onChange={(e) => update(result.row.id, "miktar", e.target.value)} placeholder="kg / adet" /></label>
                <label>CIF birim fiyat ($)<input inputMode="decimal" value={result.row.cif} onChange={(e) => update(result.row.id, "cif", e.target.value)} /></label>
                <label>İhraç tarihindeki kur<input inputMode="decimal" value={result.row.kur} onChange={(e) => update(result.row.id, "kur", e.target.value)} /></label>
                <label>TEV oranı (%)<input inputMode="decimal" value={result.row.oran} onChange={(e) => update(result.row.id, "oran", e.target.value)} /></label>
                <label>Ödenen TEV (TL)<input inputMode="decimal" value={result.row.odenen} onChange={(e) => update(result.row.id, "odenen", e.target.value)} /></label>
              </div>
              <div className="resultStrip">
                <div><span>Toplam CIF ($)</span><b>{usd.format(result.totalCifUsd)}</b></div>
                <div><span>Toplam CIF (TL)</span><b>{money.format(result.totalCifTl)}</b></div>
                <div className="primary"><span>Ödenecek TEV</span><b>{money.format(result.tev)}</b></div>
                <div className={result.fark < 0 ? "negative" : "positive"}><span>Ödeme farkı</span><b>{money.format(result.fark)}</b></div>
              </div>
            </article>)}
          </div>
        </> : <div className="summaryPage">
          <div className="sectionHead"><div><span>02</span><h2>Kontrol özeti</h2></div><p>{rows.length} ithal girdi satırı</p></div>
          <div className="summaryCards">
            <div><span>Toplam CIF ($)</span><b>{usd.format(totals.cifUsd)}</b></div><div><span>Toplam CIF (TL)</span><b>{money.format(totals.cifTl)}</b></div><div className="dark"><span>Ödenecek toplam TEV</span><b>{money.format(totals.tev)}</b></div><div><span>Toplam ödeme farkı</span><b>{money.format(totals.fark)}</b></div>
          </div>
          <div className="checkList"><h3>Hazırlık kontrolü</h3><p className={incomplete ? "warn" : "ok"}>{incomplete ? `${incomplete} satırda eksik zorunlu bilgi var.` : "Tüm hesaplama alanları tamamlandı."}</p><p className={belgeNo && firma ? "ok" : "warn"}>{belgeNo && firma ? "Belge bilgileri hazır." : "Firma adı veya belge numarası eksik."}</p><p className={totals.fark < 0 ? "warn" : "ok"}>{totals.fark < 0 ? `${money.format(Math.abs(totals.fark))} eksik ödeme görünüyor.` : "Eksik ödeme görünmüyor."}</p></div>
        </div>}

        <div className="actionbar"><div><strong>{rows.length} satır</strong><span>Toplam TEV: {money.format(totals.tev)}</span></div><button className="secondary" onClick={exportCsv}>CSV indir</button><button className="primaryBtn" onClick={save}>{saved ? "Kaydedildi ✓" : "Taslağı kaydet"}</button></div>
      </section>

      <section className="guide" id="kilavuz">
        <div><p className="eyebrow">Kısa kılavuz</p><h2>Hangi değer nereden gelir?</h2></div>
        <ol><li><b>CIF birim fiyat</b><span>İthalat kaleminin istatistik kıymeti ÷ kalem miktarı.</span></li><li><b>TEV’e tabi miktar</b><span>İhraç ürününde kullanılan ithal hammadde miktarı; manuel girilir.</span></li><li><b>İhraç kuru</b><span>İhracat beyannamesinin döviz kuru.</span></li><li><b>TEV oranı</b><span>İlgili GTİP için ithalat beyannamesindeki gümrük vergisi oranı.</span></li></ol>
      </section>
      <footer><b>TEV Hesap</b><span>Kontrol ve ön hesaplama aracıdır. Beyan öncesi mevzuat ve sistem kayıtlarıyla doğrulayın.</span><a href="https://destek.evrim.com/portal/tr/kb/articles/tev-otomatik-hesaplama" target="_blank" rel="noreferrer">Evrim kılavuzu ↗</a></footer>
    </main>
  );
}
