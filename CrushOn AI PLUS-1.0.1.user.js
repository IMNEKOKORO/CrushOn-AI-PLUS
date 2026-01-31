// ==UserScript==
// @name         CrushOn AI PLUS
// @namespace    https://github.com/IMNEKOKORO/crushon-plus
// @version      1.0.1
// @description  As its name indicates, more utilities and options for crushOn AI
// @author       IMNEKOKORO
// @match        https://crushon.ai/*
// @icon         https://i.imgur.com/FFZr6Jc.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const professionalText = "CRUSHON AI PLUS ACTIVE | IF YOU ENJOY THIS SCRIPT AND WANT TO SUPPOR ME: ☕ https://ko-fi.com/imnekokoro ☕ | MODIFICATION OR SALE WITHOUT AUTHORIZATION IS PROHIBITED.";

    const Temas = {
        cyber:  { neon: "#ff4d94", wine: "#4a1030", border: "#721c47", dark: "#0a0105" },
        ocean:  { neon: "#00d4ff", wine: "#051937", border: "#004a7c", dark: "#020a1a" },
        forest: { neon: "#39ff14", wine: "#0b2b0b", border: "#145214", dark: "#041204" },
        gold:   { neon: "#ffcc00", wine: "#332200", border: "#664400", dark: "#1a1100" },
        grape:  { neon: "#bc13fe", wine: "#2e003e", border: "#5d007e", dark: "#14001b" }
    };

    const styleTemas = document.createElement('style');
    document.head.appendChild(styleTemas);

    function aplicarTema(id) {
        const t = Temas[id];
        styleTemas.innerHTML = `
            .music-playing { color: ${t.neon} !important; filter: drop-shadow(0 0 10px ${t.neon}) !important; }
            .icon-active { filter: drop-shadow(0 0 10px ${t.neon}) !important; }
            .glowing-btn { box-shadow: 0 0 25px 5px ${t.neon}cc !important; border-color: ${t.neon} !important; }
            .dynamic-modal-btn { background: ${t.dark} !important; color: ${t.neon} !important; border: 1px solid ${t.border} !important; transition: 0.3s; }
            .dynamic-modal-btn:hover { border-color: ${t.neon} !important; box-shadow: 0 0 10px ${t.neon}44; }
            .item-row { background: ${t.wine} !important; border: 1px solid ${t.border} !important; color: ${t.neon} !important; }
            .guia-section { border-left: 3px solid ${t.neon} !important; }
            div[class*="border"], div[class*="container"], div[class*="content"], textarea, input { border-color: ${t.neon}44 !important; }
            div[class*="ChatInput_container"], .border-primary, [class*="active"] { border-color: ${t.neon} !important; box-shadow: 0 0 5px ${t.neon}22 !important; }
        `;
        sidebar.style.background = "rgba(10, 1, 5, 0.9)";
        sidebar.style.borderColor = t.border;
        tab.style.background = t.dark;
        tab.style.color = t.neon;
        tab.style.borderColor = t.border;
        [musicBtn, soundBtn, visualBtn, coinBtn, diceBtn, noteBtn, themeBtn, configBtn, musicGear, soundGear, visualGear].forEach(el => { if(el) { el.style.background = t.dark; el.style.borderColor = t.border; el.style.color = t.neon; }});
        if(notePanel && txt) {
            notePanel.style.background = t.dark; notePanel.style.borderColor = t.neon;
            notePanel.querySelector('div').style.color = t.neon;
            txt.style.background = t.dark; txt.style.color = t.neon; txt.style.borderColor = t.border;
        }
        if(resultPopup) { resultPopup.style.background = t.dark; resultPopup.style.borderColor = t.neon; resultPopup.style.color = t.neon; }
        [modalConfig, modalEscenas, modalSounds, modalVisuals, modalTemas, modalGuia].forEach(m => {
            if(m) {
                m.style.background = t.dark; m.style.borderColor = t.neon;
                const titulo = m.querySelector('.modal-title');
                if(titulo) titulo.style.color = t.neon;
                m.querySelectorAll('b').forEach(b => b.style.color = t.neon);
            }
        });
        localStorage.setItem('rol_theme_save', id);
    }

    let sonidosActivos = false, visualesActivos = false, ambienteActivo = false, ultimotimeout = 0, actualUrl = "";
    let bibliotecaSonidos = JSON.parse(localStorage.getItem('rol_sounds')) || [];
    let efectosVisuales = JSON.parse(localStorage.getItem('rol_visuals')) || [];
    let bibliotecaEscenas = JSON.parse(localStorage.getItem('rol_escenas')) || [];

    const ytContainer = document.createElement('div'); document.body.appendChild(ytContainer);
    const audioPlayer = document.createElement('audio'); audioPlayer.loop = true; document.body.appendChild(audioPlayer);

    const style = document.createElement('style');
    style.innerHTML = `
        .v-emoji { position: fixed; z-index: 9999999; font-size: 60px; pointer-events: none; display: flex; align-items: center; justify-content: center; }
        @keyframes popImpact { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0; } 50% { transform: translate(-50%, -50%) scale(2.5); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; } }
        .anim-pop { top: 50%; left: 50%; animation: popImpact 1.2s forwards; }
        @keyframes rainDown { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
        .anim-rain { animation: rainDown 2.5s linear forwards; }
        @keyframes explosion { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0.5); opacity: 0; } }
        .anim-explode { top: 50%; left: 50%; animation: explosion 1s ease-out forwards; }
        @keyframes vortex { 0% { transform: translate(-50%, -50) rotate(0deg) scale(0); opacity: 0; } 100% { transform: translate(-50%, -50%) rotate(1080deg) scale(4); opacity: 0; } }
        .anim-vortex { top: 50%; left: 50%; animation: vortex 1.5s ease-in forwards; }
        @keyframes bounceIn { 0% { transform: translate(-50%, -100vh); } 60% { transform: translate(-50%, -40%); } 80% { transform: translate(-50%, -60%); } 100% { transform: translate(-50%, -50%); opacity:0; } }
        .anim-bounce { top: 50%; left: 50%; animation: bounceIn 1.5s ease-out forwards; }

        @keyframes ghostFlash { 0%, 100% { opacity: 0; } 50% { opacity: 0.5; background: #fff; } }
        .effect-ghost { animation: ghostFlash 0.2s 3; }
        @keyframes glitchAnim { 0% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); } 50% { clip: rect(12px, 9999px, 90px, 0); transform: skew(0.2deg); background: rgba(255,0,0,0.1); } 100% { clip: rect(67px, 9999px, 100px, 0); transform: skew(0.8deg); } }
        .effect-glitch { animation: glitchAnim 0.2s infinite; }

        .music-playing { animation: musicPulse 1.5s infinite ease-in-out !important; }
        @keyframes musicPulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
        .gear-anim { opacity: 1 !important; transform: scale(1) rotate(0deg) !important; pointer-events: auto !important; }
        .gear-hide { opacity: 0; transition: opacity 0.3s, transform 0.3s; transform: scale(0.5) rotate(-45deg); pointer-events: none; }
        .btn-icon { color: #ffffff; transition: 0.3s; filter: drop-shadow(0 0 2px rgba(255,255,255,0.5)); }
        .icon-active { color: #ffffff !important; }
        .icon-muted { color: #ffffff !important; filter: drop-shadow(0 0 2px rgba(255,255,255,0.3)); }
        .shake-active { animation: shakeHard 0.4s both; }
        @keyframes shakeHard { 0%, 100% { transform: translate(0,0); } 10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 10px); } 20%, 40%, 60%, 80% { transform: translate(10px, -10px); } }
        .item-row { display:flex; justify-content:space-between; padding:8px; margin-bottom:5px; border-radius:4px; font-size:12px; align-items:center; }
        #master-sidebar-container { position: fixed; left: -68px; bottom: 0; top: 0; width: 70px; border-right: 1px solid #721c47; z-index: 1000000; transition: left 0.4s cubic-bezier(0.1, 0.7, 0.1, 1); }
        #sidebar-tab { position: absolute; right: -15px; top: 35%; transform: translateY(-50%); width: 15px; height: 80px; border: 1px solid #721c47; border-left: none; border-radius: 0 8px 8px 0; font-size: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 2px 0 10px rgba(0,0,0,0.5); z-index: 1000005; }
        .swatch { width: 100%; height: 35px; margin-bottom: 5px; border-radius: 5px; cursor: pointer; border: 1px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; text-shadow: 1px 1px 2px black; }
    `;
    document.head.appendChild(style);

    function corregirEtiquetas() {
        const spans = document.querySelectorAll('span');
        for (let span of spans) {
            const contenido = span.textContent;
            if (contenido.includes("IA es inventado") || contenido === "example") {
                if (contenido !== professionalText) { span.textContent = professionalText; }
                span.style.color = "#FF1493"; span.style.fontWeight = "bold"; span.style.textShadow = "0 0 5px rgba(255, 20, 147, 0.5)"; span.contentEditable = "true";
                break;
            }
        }
    }

    const sidebar = document.createElement('div'); sidebar.id = "master-sidebar-container"; document.body.appendChild(sidebar);
    const tab = document.createElement('div'); tab.id = "sidebar-tab"; tab.innerText = "〉"; sidebar.appendChild(tab);

    let pestañaExtendida = false;
    tab.onclick = () => { pestañaExtendida = !pestañaExtendida; tab.innerText = pestañaExtendida ? "〈" : "〉"; sidebar.style.left = pestañaExtendida ? "0px" : "-68px"; };

    const overlay = document.createElement('div'); overlay.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:999998; transition:0.4s;"; document.body.appendChild(overlay);
    const resultPopup = document.createElement('div'); resultPopup.style = `position: fixed; background: #1a0510; padding: 10px 15px; border-radius: 8px; border: 2px solid #721c47; font-family: monospace; font-weight: bold; display: none; z-index: 1000005;`; document.body.appendChild(resultPopup);

    const showMsgAt = (msg, bottomPos) => {
        resultPopup.innerText = msg; resultPopup.style.left = (parseInt(sidebar.style.left || -68) + 85) + "px";
        resultPopup.style.bottom = bottomPos + "px"; resultPopup.style.display = "block";
        setTimeout(() => resultPopup.style.display = "none", 2500);
    };

    function createModal(titulo) {
        const m = document.createElement('div');
        m.style = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 340px; background: #0a0105; border: 2px solid #ff4d94; border-radius: 15px; z-index: 1000010; display: none; flex-direction: column; padding: 20px; color: white; font-family: sans-serif; box-shadow: 0 0 50px #000;`;
        m.innerHTML = `<div class="modal-title" style="font-weight:bold; margin-bottom:15px; text-align:center;">${titulo}</div>`;
        document.body.appendChild(m); return m;
    }

    const modalConfig = createModal("FILE SYSTEM 📂");
    const modalEscenas = createModal("SCENE AMBIENCE 🎬");
    const modalSounds = createModal("CONFIGURE SOUNDS 🔊");
    const modalVisuals = createModal("VISUAL EFFECTS ✨");
    const modalTemas = createModal("COLOR PALETTE 🎨");
    const modalGuia = createModal("USER GUIDE 📖");

    modalGuia.style.width = "480px"; modalGuia.style.maxHeight = "85vh";
    const guiaContent = document.createElement('div');
    guiaContent.style = "font-size:13px; line-height:1.5; max-height:400px; overflow-y:auto; padding-right:10px; color:#ddd;";
    guiaContent.innerHTML = `
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🎵 AUTOMATIC SCENES:</b><br>
            The music changes automatically based on the scene card. The name you give to the scene card must be placed in the "Keyword".
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🔊 SOUND EFFECTS (SFX):</b><br>
            Configure short sounds for actions. They will play when the "Keyword" is mentioned by {{user}} or {{char}}.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>✨ VISUALS AND FILTERS:</b><br>
            Assign animated emojis (Rain, Vortex, etc.) and screen effects (Flash, Shake, Blood, etc.) when the "Keyword" is mentioned.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🔗 AUDIO LINKS GUIDE:</b><br>
            • <b>YouTube:</b> Paste the end of the link starting from v= (e.g., v=DZJpqqkSce0).<br>
            • <b>Dropbox:</b> Change <code>www.dropbox.com</code> to <code>dl.dropboxusercontent.com</code> for direct audio.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🎲🟡 DICE AND COIN:</b><br>Useful for RPG roles or quick decisions.
        </div>
            <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>📝 NOTEBOOK:</b><br>
            Use the notepad to write down important things, such as keywords or lore details.
        </div>
           <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
           <b>🎨 THEMES:</b><br>
           Themes for your CrushOn Plus interface, ¡You can use the one you like the most!.
        </div>
        <div class="guia-section" style="margin-bottom:5px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>📤 BACKUP:</b><br>Use "Export" to download your .json configuration and "Import" to restore it or share it.
        </div>
    `;
    const closeGuia = document.createElement('button'); closeGuia.innerText = "GOT IT"; closeGuia.className = "dynamic-modal-btn"; closeGuia.style = "margin-top:15px; padding:12px; cursor:pointer; width:100%; font-weight:bold; border-radius:8px;";
    closeGuia.onclick = () => modalGuia.style.display = "none"; modalGuia.append(guiaContent, closeGuia);

    const btnOpenGuia = document.createElement('button'); btnOpenGuia.innerText = "📖 USER GUIDE"; btnOpenGuia.className = "dynamic-modal-btn"; btnOpenGuia.style = "padding:10px; margin-bottom:10px; border-radius:5px; width:100%; cursor:pointer; font-weight:bold;";
    btnOpenGuia.onclick = () => { modalGuia.style.display = "flex"; modalConfig.style.display = "none"; }; modalConfig.appendChild(btnOpenGuia);

    Object.keys(Temas).forEach(key => {
        const btnT = document.createElement('div'); btnT.className = "swatch"; btnT.style.background = Temas[key].wine; btnT.style.color = Temas[key].neon; btnT.innerText = key.toUpperCase();
        btnT.onclick = () => { aplicarTema(key); modalTemas.style.display = "none"; }; modalTemas.appendChild(btnT);
    });
    const closeT = document.createElement('button'); closeT.innerText = "CLOSE"; closeT.style = "margin-top:10px; cursor:pointer; background:transparent; color:gray; border:none;";
    closeT.onclick = () => modalTemas.style.display = "none"; modalTemas.appendChild(closeT);

    const renderList = (div, list, storageKey, type) => {
        div.innerHTML = ""; list.forEach((item, i) => { div.innerHTML += `<div class="item-row"><span>${type === 'v' ? item.emoji : ''} ${item.key}</span><span style="color:red; cursor:pointer;" onclick="window.delItem('${storageKey}', ${i})">✕</span></div>`; });
    };

    window.delItem = (key, i) => {
        if (key === 'rol_escenas') { bibliotecaEscenas.splice(i,1); localStorage.setItem(key, JSON.stringify(bibliotecaEscenas)); renderList(eList, bibliotecaEscenas, key, 'e'); }
        if (key === 'rol_sounds') { bibliotecaSonidos.splice(i,1); localStorage.setItem(key, JSON.stringify(bibliotecaSonidos)); renderList(sList, bibliotecaSonidos, key, 's'); }
        if (key === 'rol_visuals') { efectosVisuales.splice(i,1); localStorage.setItem(key, JSON.stringify(efectosVisuales)); renderList(vList, efectosVisuales, key, 'v'); }
    };

    const inputStyle = "padding:10px; margin-bottom:5px; border-radius:5px; width:100%; box-sizing:border-box;";
    const btnExp = document.createElement('button'); btnExp.innerText = "📤 EXPORT"; btnExp.className = "dynamic-modal-btn"; btnExp.style = inputStyle + "cursor:pointer;";
    btnExp.onclick = () => {
        const d = { s: bibliotecaSonidos, v: efectosVisuales, e: bibliotecaEscenas, n: localStorage.getItem('rol_notes') };
        const blob = new Blob([JSON.stringify(d)], {type: 'application/json'});
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'CrushOn_PLUS_config.json'; a.click();
    };
    const btnImp = document.createElement('button'); btnImp.innerText = "📥 IMPORT"; btnImp.className = "dynamic-modal-btn"; btnImp.style = inputStyle + "cursor:pointer;";
    const fileIn = document.createElement('input'); fileIn.type = 'file'; fileIn.style.display = 'none';
    btnImp.onclick = () => fileIn.click();
    fileIn.onchange = (e) => {
        const reader = new FileReader(); reader.onload = (re) => {
            const d = JSON.parse(re.target.result); if(d.s) {
                localStorage.setItem('rol_sounds', JSON.stringify(d.s)); localStorage.setItem('rol_visuals', JSON.stringify(d.v)); localStorage.setItem('rol_escenas', JSON.stringify(d.e));
                if(d.n) localStorage.setItem('rol_notes', d.n); location.reload();
            }
        }; reader.readAsText(e.target.files[0]);
    };
    modalConfig.append(btnExp, btnImp);
    const mCc = document.createElement('button'); mCc.innerText = "CLOSE"; mCc.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    mCc.onclick = () => modalConfig.style.display = "none"; modalConfig.appendChild(mCc);

    const eList = document.createElement('div'); eList.style = "margin-top:10px; max-height:100px; overflow-y:auto;";
    const ek = document.createElement('input'); ek.placeholder = "Scene Name..."; ek.className = "dynamic-modal-btn"; ek.style = inputStyle;
    const eu = document.createElement('input'); eu.placeholder = "Music Link/ID..."; eu.className = "dynamic-modal-btn"; eu.style = inputStyle;
    const eadd = document.createElement('button'); eadd.innerText = "ADD SCENE"; eadd.className = "dynamic-modal-btn"; eadd.style = inputStyle;
    eadd.onclick = () => { if(ek.value && eu.value) {
        let finalUrl = eu.value;
        if(finalUrl.includes("dropbox.com")) finalUrl = finalUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
        bibliotecaEscenas.push({key: ek.value.toLowerCase(), url: finalUrl});
        localStorage.setItem('rol_escenas', JSON.stringify(bibliotecaEscenas)); ek.value=""; eu.value=""; renderList(eList, bibliotecaEscenas, 'rol_escenas', 'e');
    }};
    modalEscenas.append(ek, eu, eadd, eList);
    const ec = document.createElement('button'); ec.innerText = "CLOSE"; ec.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    ec.onclick = () => modalEscenas.style.display = "none"; modalEscenas.appendChild(ec);

    const sList = document.createElement('div'); sList.style = "margin-top:10px; max-height:100px; overflow-y:auto;";
    const sk = document.createElement('input'); sk.placeholder = "Keyword..."; sk.className = "dynamic-modal-btn"; sk.style = inputStyle;
    const su = document.createElement('input'); su.placeholder = "Sound Link..."; su.className = "dynamic-modal-btn"; su.style = inputStyle;
    const sadd = document.createElement('button'); sadd.innerText = "ADD SOUND"; sadd.className = "dynamic-modal-btn"; sadd.style = inputStyle;
    sadd.onclick = () => { if(sk.value && su.value) {
        let finalUrl = su.value;
        if(finalUrl.includes("dropbox.com")) finalUrl = finalUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
        bibliotecaSonidos.push({key: sk.value.toLowerCase(), url: finalUrl});
        localStorage.setItem('rol_sounds', JSON.stringify(bibliotecaSonidos)); sk.value=""; su.value=""; renderList(sList, bibliotecaSonidos, 'rol_sounds', 's');
    }};
    modalSounds.append(sk, su, sadd, sList);
    const sc = document.createElement('button'); sc.innerText = "CLOSE"; sc.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    sc.onclick = () => modalSounds.style.display = "none"; modalSounds.appendChild(sc);

    const vList = document.createElement('div'); vList.style = "margin-top:10px; max-height:100px; overflow-y:auto;";
    const vk = document.createElement('input'); vk.placeholder = "Keyword..."; vk.className = "dynamic-modal-btn"; vk.style = inputStyle;
    const ve = document.createElement('input'); ve.placeholder = "Emoji..."; ve.className = "dynamic-modal-btn"; ve.style = inputStyle;
    const va = document.createElement('select'); va.innerHTML = `<option value="pop">Pop</option><option value="rain">Rain</option><option value="explode">Explosion</option><option value="vortex">Vortex</option><option value="bounce">Bounce</option>`; va.className = "dynamic-modal-btn"; va.style = inputStyle;

    const vs = document.createElement('select');
    vs.innerHTML = `
        <option value="none">No Screen Effect</option>
        <option value="flash">Flash </option>
        <option value="shake">Shake </option>
        <option value="blood">Love </option>
        <option value="ghost">Ghost </option>
        <option value="glitch">Glitch </option>
    `;
    vs.className = "dynamic-modal-btn"; vs.style = inputStyle;

    const vadd = document.createElement('button'); vadd.innerText = "ADD EFFECT"; vadd.className = "dynamic-modal-btn"; vadd.style = inputStyle;
    vadd.onclick = () => { if(vk.value && ve.value) { efectosVisuales.push({key: vk.value.toLowerCase(), emoji: ve.value, anim: va.value, screen: vs.value}); localStorage.setItem('rol_visuals', JSON.stringify(efectosVisuales)); vk.value=""; ve.value=""; renderList(vList, efectosVisuales, 'rol_visuals', 'v'); }};
    modalVisuals.append(vk, ve, va, vs, vadd, vList);
    const vc = document.createElement('button'); vc.innerText = "CLOSE"; vc.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    vc.onclick = () => modalVisuals.style.display = "none"; modalVisuals.appendChild(vc);

    renderList(eList, bibliotecaEscenas, 'rol_escenas', 'e');
    renderList(sList, bibliotecaSonidos, 'rol_sounds', 's');
    renderList(vList, efectosVisuales, 'rol_visuals', 'v');

    function createBtn(icon, bottom, initiallyActive) {
        const btn = document.createElement('button');
        const iconDiv = document.createElement('div'); iconDiv.className = "btn-icon " + (initiallyActive ? "icon-active" : "icon-muted"); iconDiv.innerHTML = icon; btn.appendChild(iconDiv);
        btn.style = `position:absolute; bottom:${bottom}px; left:10px; width:50px; height:50px; border:2px solid #721c47; border-radius:12px; cursor:pointer; z-index:1000002; font-size:24px; display:flex; align-items:center; justify-content:center; transition:0.3s;`;
        sidebar.appendChild(btn); return btn;
    }
    function createGear(bottom) {
        const g = document.createElement('button'); g.innerHTML = "⚙️"; g.className = "gear-hide";
        g.style = `position:absolute; bottom:${bottom + 5}px; left:65px; width:40px; height:40px; border:2px solid #721c47; border-radius:50%; color:white; cursor:pointer; font-size:20px; z-index:1000003; transition: 0.3s;`;
        sidebar.appendChild(g); return g;
    }

    const musicBtn = createBtn("🎵", 430, false), musicGear = createGear(430);
    const soundBtn = createBtn("🔇", 370, false), soundGear = createGear(370);
    const visualBtn = createBtn("🌑", 310, false), visualGear = createGear(310);
    const coinBtn = createBtn("🟡", 250, false), diceBtn = createBtn("🎲", 190, false), noteBtn = createBtn("📝", 130, false), themeBtn = createBtn("🎨", 70, false), configBtn = createBtn("⚙️", 10, false);

    const notePanel = document.createElement('div');
    notePanel.style = `position:fixed; top:0; left:-320px; width:320px; height:100vh; background:#0f0208; border-right:2px solid #ff4d94; z-index:999999; transition:left 0.4s; padding:20px; display:flex; flex-direction:column;`;
    notePanel.innerHTML = `<div style="font-weight:bold; margin-bottom:15px; text-align:center;">NOTEBOOK</div>`;
    const txt = document.createElement('textarea'); txt.style="flex-grow:1; background:#1e0712; color:#ffb3d9; border:1px solid #4a1030; padding:10px; resize:none; outline:none;";
    txt.value = localStorage.getItem('rol_notes')||""; txt.oninput = () => localStorage.setItem('rol_notes', txt.value);
    notePanel.appendChild(txt); document.body.appendChild(notePanel);

    function ejecutarCambioLimpio(escena) {
        musicBtn.querySelector('.btn-icon').classList.remove('music-playing');
        ytContainer.innerHTML = ""; audioPlayer.pause(); audioPlayer.src = ""; actualUrl = escena.url;
        setTimeout(() => {
            if (escena.url.includes("dropboxusercontent.com") || escena.url.includes(".mp3")) { audioPlayer.src = escena.url; audioPlayer.play().catch(() => {}); }
            else {
                let id = escena.url; if(id.includes("v=")) id = id.split("v=")[1].split("&")[0]; else if(id.includes("youtu.be/")) id = id.split("youtu.be/")[1];
                ytContainer.innerHTML = `<iframe width="1" height="1" src="https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}" frameborder="0" allow="autoplay"></iframe>`;
            } musicBtn.querySelector('.btn-icon').classList.add('music-playing');
        }, 600);
    }

    function escanearEscenaActual() { if (!ambienteActivo) return; const texto = document.body.innerText.toLowerCase(); for (let e of bibliotecaEscenas) { if (texto.includes(e.key.toLowerCase()) && actualUrl !== e.url) { ejecutarCambioLimpio(e); break; } } }

    configBtn.onclick = () => modalConfig.style.display = "flex";
    themeBtn.onclick = () => modalTemas.style.display = "flex";
    musicBtn.onclick = () => {
        ambienteActivo = !ambienteActivo; const icon = musicBtn.querySelector('.btn-icon'); icon.innerText = ambienteActivo ? "🎶" : "🎵";
        icon.className = "btn-icon " + (ambienteActivo ? "icon-active" : "icon-muted");
        if (!ambienteActivo) { ytContainer.innerHTML = ""; audioPlayer.pause(); actualUrl = ""; icon.classList.remove('music-playing'); musicBtn.classList.remove('glowing-btn'); }
        else { musicBtn.classList.add('glowing-btn'); escanearEscenaActual(); }
    };
    soundBtn.onclick = () => { sonidosActivos = !sonidosActivos; soundBtn.querySelector('.btn-icon').innerText = sonidosActivos ? "🔊" : "🔇"; soundBtn.querySelector('.btn-icon').className = "btn-icon " + (sonidosActivos ? "icon-active" : "icon-muted"); soundBtn.classList.toggle('glowing-btn', sonidosActivos); };
    visualBtn.onclick = () => { visualesActivos = !visualesActivos; visualBtn.querySelector('.btn-icon').innerText = visualesActivos ? "✨" : "🌑"; visualBtn.querySelector('.btn-icon').className = "btn-icon " + (visualesActivos ? "icon-active" : "icon-muted"); visualBtn.classList.toggle('glowing-btn', visualesActivos); };
    diceBtn.onclick = () => { const icon = diceBtn.querySelector('.btn-icon'); icon.style.transition = "0.4s"; icon.style.transform = "rotate(360deg)"; showMsgAt("🎲 DICE: " + (Math.floor(Math.random()*20)+1), 190); setTimeout(() => { icon.style.transition = "0s"; icon.style.transform = "rotate(0deg)"; }, 400); };
    coinBtn.onclick = () => { const icon = coinBtn.querySelector('.btn-icon'); icon.style.transition = "0.5s"; icon.style.transform = "rotateY(720deg)"; showMsgAt(Math.random() < 0.5 ? "◯ HEADS" : "✕ TAILS", 250); setTimeout(() => { icon.style.transition = "0s"; icon.style.transform = "rotateY(0deg)"; }, 500); };
    noteBtn.onclick = () => { let na = notePanel.style.left === "70px"; notePanel.style.left = na ? "-320px" : "70px"; };
    musicGear.onclick = () => modalEscenas.style.display = "flex"; soundGear.onclick = () => modalSounds.style.display = "flex"; visualGear.onclick = () => modalVisuals.style.display = "flex";

    function triggerSfx(text) {
        const lt = text.toLowerCase();
        if(sonidosActivos) { bibliotecaSonidos.forEach(s => { if(lt.includes(s.key.toLowerCase()) && (Date.now() - ultimotimeout > 3000)) { ultimotimeout = Date.now(); new Audio(s.url).play().catch(()=>{}); } }); }
        if(visualesActivos) {
            efectosVisuales.forEach(v => {
                if(lt.includes(v.key.toLowerCase())) {
                    if (v.anim === 'rain') { for(let i=0; i<15; i++) { const d = document.createElement('div'); d.innerText = v.emoji; d.className = 'v-emoji anim-rain'; d.style.left = Math.random() * 100 + "vw"; d.style.top = -50 + "px"; d.style.animationDelay = (Math.random() * 1.5) + "s"; document.body.appendChild(d); setTimeout(() => d.remove(), 4000); }
                    } else { const el = document.createElement('div'); el.innerText = v.emoji; el.className = `v-emoji anim-${v.anim}`; el.style.left = "50%"; document.body.appendChild(el); setTimeout(()=>el.remove(), 2500); }

                    if(v.screen === 'flash') { overlay.style.boxShadow = `inset 0 0 100px 50px rgba(255,255,255,0.6)`; setTimeout(()=>overlay.style.boxShadow="none", 1000); }
                    if(v.screen === 'blood') { overlay.style.boxShadow = `inset 0 0 100px 60px rgba(180,0,0,0.7)`; setTimeout(()=>overlay.style.boxShadow="none", 1200); }
                    if(v.screen === 'shake') { document.body.classList.add('shake-active'); setTimeout(()=>document.body.classList.remove('shake-active'), 400); }
                    if(v.screen === 'ghost') { overlay.classList.add('effect-ghost'); setTimeout(()=>overlay.classList.remove('effect-ghost'), 600); }
                    if(v.screen === 'glitch') { overlay.classList.add('effect-glitch'); setTimeout(()=>overlay.classList.remove('effect-glitch'), 1000); }
                }
            });
        }
    }

    let debounceMusic;
    const observer = new MutationObserver((mutations) => {
        corregirEtiquetas(); clearTimeout(debounceMusic); debounceMusic = setTimeout(() => { escanearEscenaActual(); }, 1000);
        mutations.forEach(m => {
            m.addedNodes.forEach(n => { if(n.nodeType === 1) { const t = n.innerText || ""; if(t && !t.includes("NOTEBOOK")) triggerSfx(t); } });
            if (m.type === "characterData") { const t = m.target.textContent; if(t && !t.includes("NOTEBOOK")) triggerSfx(t); }
        });
    });
    observer.observe(document.body, {childList: true, subtree: true, characterData: true});

    function setupHover(btn, gear) {
        let timer; const show = () => { if(pestañaExtendida){ clearTimeout(timer); gear.classList.add('gear-anim'); } };
        const hide = () => { timer = setTimeout(() => { gear.classList.remove('gear-anim'); }, 100); };
        btn.onmouseenter = show; btn.onmouseleave = hide; gear.onmouseenter = show; gear.onmouseleave = hide;
    }
    setupHover(musicBtn, musicGear); setupHover(soundBtn, soundGear); setupHover(visualBtn, visualGear);

    const savedT = localStorage.getItem('rol_theme_save'); aplicarTema(savedT || 'cyber');
})();