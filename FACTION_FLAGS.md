# Faction Flags — canvas painter reference

Add a new entry every time a faction is built for the first time.
All emblems are simplified vector art. Neither resembles any real-world prohibited symbol.
All Gundam IP © Sotsu, Sunrise, Bandai Namco.

---

## U.C. 0079

### Principality of Zeon
```js
painters['zeon'] = (ctx, w, h) => {
	ctx.fillStyle = '#cc0000';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#ffd700';
	ctx.save(); ctx.translate(w/2, h/2);
	for (let i = 0; i < 12; i++) {
		ctx.rotate(Math.PI/6);
		ctx.fillRect(-w*0.04, -h*0.38, w*0.08, h*0.22);
	}
	ctx.restore();
	ctx.beginPath(); ctx.arc(w/2,h/2,w*0.15,0,Math.PI*2);
	ctx.fillStyle='#cc0000'; ctx.fill();
	ctx.beginPath(); ctx.arc(w/2,h/2,w*0.10,0,Math.PI*2);
	ctx.fillStyle='#ffd700'; ctx.fill();
};
```

### Earth Federation Forces (E.F.F.)
```js
painters['eff'] = (ctx, w, h) => {
	ctx.fillStyle = '#1a3a6b';
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle='#ffffff'; ctx.lineWidth=w*0.06;
	ctx.beginPath(); ctx.arc(w/2,h/2,w*0.32,0,Math.PI*2); ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(w*0.18,h/2); ctx.lineTo(w*0.82,h/2);
	ctx.moveTo(w/2,h*0.18); ctx.lineTo(w/2,h*0.82);
	ctx.stroke();
};
```

---

## Z Gundam

### AEUG
```js
painters['aeug'] = (ctx, w, h) => {
	ctx.fillStyle = '#1a237e';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#cc0000';
	const cx=w/2, cy=h/2, r=w*0.28;
	for (let i=0;i<6;i++) {
		const a=(i/6)*Math.PI*2;
		ctx.beginPath();
		ctx.ellipse(cx+Math.cos(a)*r*0.5, cy+Math.sin(a)*r*0.5,
			r*0.3, r*0.18, a, 0, Math.PI*2);
		ctx.fill();
	}
	ctx.beginPath(); ctx.arc(cx,cy,r*0.2,0,Math.PI*2);
	ctx.fillStyle='#cc0000'; ctx.fill();
};
```

### Titans
```js
painters['titans'] = (ctx, w, h) => {
	ctx.fillStyle = '#0d0d2b';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#ffd700';
	ctx.fillRect(w*0.25, h*0.22, w*0.5,  h*0.14);
	ctx.fillRect(w*0.42, h*0.22, w*0.16, h*0.58);
};
```

---

## SEED / Destiny — CE 71/73

### ZAFT
```js
painters['zaft'] = (ctx, w, h) => {
	ctx.fillStyle = '#8b0000';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#ffffff';
	[0.2,0.35,0.55,0.72].forEach(x => {
		ctx.fillRect(w*x, h*0.25, w*0.08, h*0.5);
	});
};
```

### Earth Alliance (EA)
```js
painters['ea'] = (ctx, w, h) => {
	ctx.fillStyle = '#003366';
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle='#ffd700'; ctx.lineWidth=w*0.07;
	ctx.beginPath();
	ctx.arc(w*0.35,h*0.55,w*0.25,Math.PI*1.1,Math.PI*1.9); ctx.stroke();
	ctx.beginPath();
	ctx.arc(w*0.65,h*0.55,w*0.25,Math.PI*1.1,Math.PI*1.9,true); ctx.stroke();
	ctx.beginPath(); ctx.arc(w/2,h/2,w*0.1,0,Math.PI*2);
	ctx.fillStyle='#ffd700'; ctx.fill();
};
```

---

> **Adding a new faction:** copy the pattern above, test at w=48 h=48 before committing.
