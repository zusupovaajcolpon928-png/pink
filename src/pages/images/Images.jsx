import { useState } from "react";
import "./Images.css";

function Images() {
    const [imageId, setImageId] = useState(1);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(300);
    const [bg, setBg] = useState("#dce8ee");
    const [fontColor, setFontColor] = useState("#78283b");
    const [text, setText] = useState("A little room to think");
    const palette = ["#dce8ee", "#e7dfe1", "#e8e5d9", "#dfe8df", "#d8e1e9", "#efdfd6"];
    const safeWidth = Math.max(240, Math.min(1200, Number(width) || 400));
    const safeHeight = Math.max(180, Math.min(900, Number(height) || 300));
    const safeText = text.replace(/[<>&"']/g, "").slice(0, 32);
    const customImageUrl = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}"><rect width="100%" height="100%" fill="${bg}"/><path d="M0 ${safeHeight * 0.76} Q${safeWidth * 0.28} ${safeHeight * 0.52} ${safeWidth * 0.56} ${safeHeight * 0.76} T${safeWidth} ${safeHeight * 0.7} V${safeHeight} H0Z" fill="${fontColor}" opacity=".11"/><circle cx="${safeWidth * 0.76}" cy="${safeHeight * 0.28}" r="${Math.min(safeWidth, safeHeight) * 0.1}" fill="${fontColor}" opacity=".14"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="${fontColor}" font-family="Georgia,serif" font-size="${Math.max(18, Math.min(42, safeWidth / 12))}">${safeText || "Your words here"}</text></svg>`)}`;

    return (
        <section className="images page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Studio / Image tools</p><h1 className="page-title">Image maker</h1><p className="page-description">A simple canvas for color, proportion, and a few words.</p></div>
                <span className="page-count">Local preview</span>
            </header>
            <section className="images-section data-card">
                <div className="card-topline"><div><p className="eyebrow">01 / Composition</p><h2>Set your canvas</h2></div><span className="pill">{safeWidth} × {safeHeight}</span></div>
                <div className="form-grid">
                    <label className="form-label">Width<input className="form-field" type="number" min="240" max="1200" value={width} onChange={(event) => setWidth(event.target.value)} /></label>
                    <label className="form-label">Height<input className="form-field" type="number" min="180" max="900" value={height} onChange={(event) => setHeight(event.target.value)} /></label>
                    <label className="form-label">Your text<input className="form-field" type="text" maxLength="32" value={text} onChange={(event) => setText(event.target.value)} /></label>
                    <label className="form-label">Text color<input className="form-field" type="color" value={fontColor} onChange={(event) => setFontColor(event.target.value)} style={{ padding: 4, height: 42 }} /></label>
                </div>
                <div className="card-footer" style={{ justifyContent: "flex-start", flexWrap: "wrap" }}><span className="meta-text">Background</span>{palette.map((color) => <button key={color} type="button" aria-label={`Set background ${color}`} onClick={() => setBg(color)} style={{ width: 26, height: 26, border: color === bg ? "2px solid var(--wine)" : "1px solid #b9cbd5", borderRadius: "50%", background: color, cursor: "pointer" }} />)}</div>
                <div className="image-preview" style={{ aspectRatio: `${safeWidth} / ${safeHeight}`, minHeight: 180, background: bg, color: fontColor, fontSize: `${Math.max(22, Math.min(46, safeWidth / 10))}px` }}>{safeText || "Your words here"}</div>
                <a className="action-button" style={{ marginTop: 14, textDecoration: "none" }} href={customImageUrl} download="studio-canvas.svg">Download canvas</a>
            </section>
            <section className="images-section data-card" style={{ marginTop: 14 }}>
                <div className="card-topline"><div><p className="eyebrow">02 / Color study</p><h2>Palette study</h2></div><span className="pill">Study {String(imageId).padStart(2, "0")}</span></div>
                <label className="form-label" style={{ maxWidth: 240 }}>Choose a study<input className="form-field" type="range" min="1" max="6" value={imageId} onChange={(event) => setImageId(Number(event.target.value))} /></label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, height: 126, marginTop: 18, overflow: "hidden", borderRadius: 4 }} aria-label="Abstract color study">
                    {palette.slice(0, 4).map((color, index) => <div key={color} style={{ background: color, transform: `translateY(${(index % 2) * 14}px)`, opacity: 0.62 + imageId * 0.05 }} />)}
                </div>
            </section>
        </section>
    );
}

export default Images;