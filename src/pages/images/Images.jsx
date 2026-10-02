import { useState } from "react";
import "./Images.css";

function Images() {
    const [imageId, setImageId] = useState(1);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(300);
    const [bg, setBg] = useState("#dce8ee");
    const [fontColor, setFontColor] = useState("#78283b");
    const [text, setText] = useState("Soft light");
    const palette = ["#dce8ee", "#e7dfe1", "#e8e5d9", "#dfe8df", "#d8e1e9", "#efdfd6"];
    const safeWidth = Math.max(240, Math.min(1200, Number(width) || 400));
    const safeHeight = Math.max(180, Math.min(900, Number(height) || 300));
    const safeText = text.slice(0, 10);
    const imageUrl = `https://fooapi.com/img/${imageId}`;
    const customImageUrl = `https://fooapi.com/imgmaker/${safeWidth}/${safeHeight}/${bg.replace(/^#/, "")}/${fontColor.replace(/^#/, "")}/${encodeURIComponent(safeText || "Image")}`;

    return (
        <section className="images page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Studio / Image tools</p><h1 className="page-title">Image maker</h1><p className="page-description">A simple canvas for color, proportion, and a few words.</p></div>
                <span className="page-count">FooAPI images</span>
            </header>
            <section className="images-section data-card">
                <div className="card-topline"><div><p className="eyebrow">01 / Composition</p><h2>Set your canvas</h2></div><span className="pill">{safeWidth} × {safeHeight}</span></div>
                <div className="form-grid">
                    <label className="form-label">Width<input className="form-field" type="number" min="240" max="1200" value={width} onChange={(event) => setWidth(event.target.value)} /></label>
                    <label className="form-label">Height<input className="form-field" type="number" min="180" max="900" value={height} onChange={(event) => setHeight(event.target.value)} /></label>
                    <label className="form-label">Your text<input className="form-field" type="text" maxLength="10" value={text} onChange={(event) => setText(event.target.value)} /></label>
                    <label className="form-label">Text color<input className="form-field" type="color" value={fontColor} onChange={(event) => setFontColor(event.target.value)} style={{ padding: 4, height: 42 }} /></label>
                </div>
                <div className="card-footer" style={{ justifyContent: "flex-start", flexWrap: "wrap" }}><span className="meta-text">Background</span>{palette.map((color) => <button key={color} type="button" aria-label={`Set background ${color}`} onClick={() => setBg(color)} style={{ width: 26, height: 26, border: color === bg ? "2px solid var(--wine)" : "1px solid #b9cbd5", borderRadius: "50%", background: color, cursor: "pointer" }} />)}</div>
                <div className="image-preview" style={{ aspectRatio: `${safeWidth} / ${safeHeight}`, minHeight: 180, background: bg, color: fontColor, fontSize: `${Math.max(22, Math.min(46, safeWidth / 10))}px` }}>{safeText || "Your words here"}</div>
                <a className="action-button" style={{ marginTop: 14, textDecoration: "none" }} href={customImageUrl} target="_blank" rel="noopener noreferrer">Open generated image</a>
            </section>
            <section className="images-section data-card" style={{ marginTop: 14 }}>
                <div className="card-topline"><div><p className="eyebrow">02 / Color study</p><h2>Palette study</h2></div><span className="pill">Study {String(imageId).padStart(2, "0")}</span></div>
                <label className="form-label" style={{ maxWidth: 240 }}>Choose a study<input className="form-field" type="range" min="1" max="6" value={imageId} onChange={(event) => setImageId(Number(event.target.value))} /></label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, height: 126, marginTop: 18, overflow: "hidden", borderRadius: 4 }} aria-label="Abstract color study">
                    <img src={imageUrl} alt={`FooAPI image ${imageId}`} style={{ gridColumn: "1 / -1", width: "100%", height: "100%", objectFit: "cover", margin: 0 }} />
                </div>
            </section>
        </section>
    );
}

export default Images;