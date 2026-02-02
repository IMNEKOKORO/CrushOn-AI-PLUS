// ==UserScript==
// @name         CrushOn AI PLUS
// @namespace    https://github.com/IMNEKOKORO/CrushOn-AI-PLUS
// @version      2.0.0
// @description  More immersion tools for CrushOn AI
// @author       IMNEKOKORO
// @match        https://crushon.ai/*
// @icon         https://i.imgur.com/FFZr6Jc.png
// @updateURL    https://raw.githubusercontent.com/IMNEKOKORO/CrushOn-AI-PLUS/main/crushon-ai-plus.user.js
// @downloadURL  https://raw.githubusercontent.com/IMNEKOKORO/CrushOn-AI-PLUS/main/crushon-ai-plus.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const professionalText = "CRUSHON AI PLUS ACTIVE | IF YOU ENJOY THIS SCRIPT AND WANT TO SUPPOR ME: ☕ https://ko-fi.com/imnekokoro ☕ | MODIFICATION OR SALE WITHOUT AUTHORIZATION IS PROHIBITED.";

    const Temas = {
        crimson: { neon: "#ff3333", wine: "#4d0000", border: "#cc0000", dark: "#0f0000" }, // MEJORADO: Rojo más brillante
        ocean:  { neon: "#00d4ff", wine: "#051937", border: "#004a7c", dark: "#020a1a" },
        forest: { neon: "#39ff14", wine: "#0b2b0b", border: "#145214", dark: "#041204" },
        gold:   { neon: "#ffcc00", wine: "#332200", border: "#664400", dark: "#1a1100" },
        grape:  { neon: "#bc13fe", wine: "#2e003e", border: "#5d007e", dark: "#14001b" },
        candy:  { neon: "#ff1493", wine: "#4d0026", border: "#cc0066", dark: "#1a000d" } // CAMBIADO: Más rosa intenso (#ff1493 = DeepPink)
    };

    const styleTemas = document.createElement('style');
    document.head.appendChild(styleTemas);

    function aplicarTema(id) {
        const t = Temas[id];
        window.currentTheme = t; // Guardar referencia global al tema actual
        styleTemas.innerHTML = `
            /* Estilos del script original */
            .music-playing { color: ${t.neon} !important; filter: drop-shadow(0 0 10px ${t.neon}) !important; }
            .icon-active { filter: drop-shadow(0 0 10px ${t.neon}) !important; }
            .glowing-btn { box-shadow: 0 0 15px 3px ${t.neon}99 !important; border-color: ${t.neon} !important; }

            /* NUEVO: Iconos que cambian de color con filtros CSS mejorados */
            .btn-icon {
                filter:
                    brightness(0) saturate(100%)
                    invert(100%)
                    sepia(100%)
                    saturate(500%)
                    hue-rotate(var(--theme-hue, 0deg))
                    brightness(1.0)
                    drop-shadow(0 0 4px ${t.neon}aa) !important;
            }
            .icon-active {
                filter:
                    brightness(0) saturate(100%)
                    invert(100%)
                    sepia(100%)
                    saturate(500%)
                    hue-rotate(var(--theme-hue, 0deg))
                    brightness(1.1)
                    drop-shadow(0 0 6px ${t.neon})
                    drop-shadow(0 0 10px ${t.neon}88) !important;
            }
            .icon-muted {
                filter:
                    brightness(0) saturate(100%)
                    invert(100%)
                    sepia(100%)
                    saturate(500%)
                    hue-rotate(var(--theme-hue, 0deg))
                    brightness(1.0)
                    drop-shadow(0 0 4px ${t.neon}aa) !important;
            }

            /* Engranajes con color del tema (solo el emoji) */
            .gear-icon {
                filter:
                    brightness(0) saturate(100%)
                    invert(100%)
                    sepia(100%)
                    saturate(500%)
                    hue-rotate(var(--theme-hue, 0deg))
                    brightness(1.0)
                    drop-shadow(0 0 4px ${t.neon}aa) !important;
            }

            .dynamic-modal-btn { background: ${t.dark} !important; color: ${t.neon} !important; border: 1px solid ${t.border} !important; transition: 0.3s; }
            .dynamic-modal-btn:hover { border-color: ${t.neon} !important; box-shadow: 0 0 10px ${t.neon}44; }
            .item-row { background: ${t.wine} !important; border: 1px solid ${t.border} !important; color: ${t.neon} !important; }
            .guia-section { border-left: 3px solid ${t.neon} !important; }
            div[class*="ChatInput_container"], .border-primary, [class*="active"] { border-color: ${t.neon} !important; box-shadow: 0 0 5px ${t.neon}22 !important; }

            /* IMPORTANTE: Eliminar efectos de blur que puedan causar borrosidad */
            .group.relative.flex.w-full.items-start.gap-4.pr-11 .bg-white-5,
            .group.relative.flex.w-full.items-start.gap-4.pr-11 .bg-white-5 *,
            .relative.flex.w-full.items-start.justify-between.gap-4 .bg-blue-5,
            .relative.flex.w-full.items-start.justify-between.gap-4 .bg-blue-5 *,
            .relative.flex.w-full.items-start.justify-between.gap-4 .dark\\:bg-black-5,
            .relative.flex.w-full.items-start.justify-between.gap-4 .dark\\:bg-black-5 *,
            .group.relative.flex.w-full.items-start.gap-4.pr-11,
            .relative.flex.w-full.items-start.justify-between.gap-4 {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                filter: none !important;
                -webkit-filter: none !important;
            }

            /* NUEVO: Globos de mensaje del personaje */
            .group.relative.flex.w-full.items-start.gap-4.pr-11 .bg-white-5 {
                background: ${t.wine} !important;
                border: 1px solid ${t.border} !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            /* NUEVO: Globos de mensaje del usuario */
            .relative.flex.w-full.items-start.justify-between.gap-4 .bg-blue-5,
            .relative.flex.w-full.items-start.justify-between.gap-4 .dark\\:bg-black-5 {
                background: ${t.dark} !important;
                border: 1px solid ${t.border} !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            /* NUEVO: Avatares con borde neón */
            img[alt][class*="size-full"],
            img[class*="size-full"][class*="object-cover"],
            .group.relative.flex.w-full.items-start.gap-4.pr-11 img,
            .relative.flex.w-full.items-start.justify-between.gap-4 img {
                border: 2px solid ${t.neon} !important;
                box-shadow: 0 0 10px ${t.neon}66,
                           0 0 20px ${t.neon}44,
                           inset 0 0 10px ${t.neon}22 !important;
                border-radius: 50% !important;
            }

            /* Evitar que el borde afecte a imágenes dentro de mensajes (solo avatares) */
            .group.relative.flex.w-full.items-start.gap-4.pr-11 > a > img,
            .relative.flex.w-full.items-start.justify-between.gap-4 > div > a > img {
                border: 2px solid ${t.neon} !important;
                box-shadow: 0 0 10px ${t.neon}66,
                           0 0 20px ${t.neon}44 !important;
                border-radius: 50% !important;
            }

            /* MODIFICADO: Barras laterales y fondos principales con líneas diagonales gruesas y abundantes */
            .bg-light3-bg, .dark\\:bg-dark3-bg,
            .bg-black-3, .dark\\:bg-black-3,
            .bg-black-2, .dark\\:bg-black-2 {
                background-color: ${t.dark} !important;
                background-image:
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 8px,
                        ${t.border}30 8px,
                        ${t.border}30 11px
                    ),
                    repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 8px,
                        ${t.border}20 8px,
                        ${t.border}20 11px
                    ) !important;
            }

            /* NUEVO: Bordes de la interfaz */
            .border-gray-5, .dark\\:border-black-2,
            .border-black-2, .dark\\:border-gray-3 {
                border-color: ${t.border} !important;
            }

            /* NUEVO: Botones y elementos activos */
            .bg-purple-3, .dark\\:bg-white-4,
            .bg-purple-2, .sm\\:dark\\:bg-white\\/10 {
                background: ${t.wine} !important;
                border-color: ${t.border} !important;
            }

            /* NUEVO: Texto primario en elementos destacados - SELECTORES FUERTES */
            .text-light3-primary,
            .dark\\:text-dark3-primary,
            [class*="text-light3-primary"],
            [class*="text-dark3-primary"],
            span.text-light3-primary,
            span.dark\\:text-dark3-primary {
                color: ${t.neon} !important;
            }

            /* NUEVO: Fondos de elementos seleccionados */
            .bg-black\\/5, .dark\\:bg-white\\/5,
            .bg-black-4, .dark\\:bg-white-4 {
                background: ${t.wine}80 !important;
            }

            /* NUEVO: Modales de tarjetas de perfil y escenas */
            .rc-dialog-content {
                background: ${t.dark} !important;
                border: 2px solid ${t.border} !important;
            }

            /* Header de los modales */
            .rc-dialog-header {
                color: ${t.neon} !important;
            }

            /* Texto del cuerpo de los modales */
            .rc-dialog-body {
                color: ${t.neon} !important;
            }

            /* Tarjetas de perfil y escenas individuales */
            .relative.flex.rounded-lg.bg-black-4.dark\\:bg-white-4,
            .relative.flex.w-full.rounded-lg.h-32.border.bg-purple-3.dark\\:bg-black-2 {
                background: ${t.wine} !important;
                border: 1px solid ${t.border} !important;
            }

            /* Texto dentro de las tarjetas */
            .relative.flex.rounded-lg.bg-black-4.dark\\:bg-white-4 span,
            .relative.flex.w-full.rounded-lg.h-32.border.bg-purple-3.dark\\:bg-black-2 span {
                color: ${t.neon} !important;
            }

            /* Botón de "Agregar" en los modales */
            .flex.h-32.w-full.cursor-pointer.items-center.justify-center.gap-4.rounded-lg.border {
                background: ${t.wine}60 !important;
                border: 2px dashed ${t.border} !important;
            }

            /* Iconos y texto del botón agregar */
            .flex.h-32.w-full.cursor-pointer.items-center.justify-center.gap-4.rounded-lg.border svg,
            .flex.h-32.w-full.cursor-pointer.items-center.justify-center.gap-4.rounded-lg.border span {
                color: ${t.neon} !important;
            }

            /* Etiquetas "Personaje", "Predeterminado" */
            .absolute.-left-6.top-2.w-24.-rotate-\\[30deg\\] {
                background: ${t.neon} !important;
                color: ${t.dark} !important;
            }

            /* Botones de guardar en los modales - SELECTOR MÁS FUERTE */
            button.bg-light3-primary,
            button.dark\\:bg-dark3-primary,
            button[class*="bg-light3-primary"],
            button[class*="dark:bg-dark3-primary"] {
                background: ${t.neon} !important;
                color: ${t.dark} !important;
                font-weight: bold !important;
            }

            /* También para divs que actúan como botones */
            div.bg-light3-primary,
            div.dark\\:bg-dark3-primary {
                background: ${t.neon} !important;
            }

            /* Botón de cerrar (X) en modales */
            .rc-dialog-close svg {
                color: ${t.neon} !important;
            }

            /* NUEVO: Hover effects */
            .hover\\:bg-black-4:hover, .hover\\:dark\\:bg-white-4:hover,
            .hover\\:bg-purple-2:hover, .dark\\:hover\\:bg-dark3-primary\\/30:hover {
                background: ${t.wine} !important;
                box-shadow: 0 0 10px ${t.neon}33 !important;
            }

            /* NUEVO: Efectos hover con ZOOM en botones */
            button,
            [role="button"],
            .cursor-pointer,
            div[class*="cursor-pointer"],
            .dynamic-modal-btn {
                transition: all 0.2s ease-in-out !important;
            }

            button:hover,
            [role="button"]:hover,
            .cursor-pointer:hover,
            div[class*="cursor-pointer"]:hover,
            .dynamic-modal-btn:hover {
                transform: scale(1.08) !important;
                box-shadow: 0 4px 12px ${t.neon}44 !important;
            }

            /* Botones específicos del script con zoom más pronunciado */
            #music-btn:hover,
            #sound-btn:hover,
            #visual-btn:hover,
            #cutscene-btn:hover,
            #coin-btn:hover,
            #dice-btn:hover,
            #note-btn:hover,
            #theme-btn:hover,
            #config-btn:hover {
                transform: scale(1.15) !important;
                box-shadow: 0 0 20px ${t.neon}66 !important;
            }

            /* IMPORTANTE: Desactivar hover en botones de CrushOn (tres puntitos, etc) */
            button:not([id*="-btn"]):not([class*="dynamic-modal-btn"]):hover {
                transform: none !important;
            }

            /* NUEVO: Notebook cuando está ABIERTO - solo brillo como los otros botones */
            #note-btn.notebook-open {
                color: ${t.neon} !important;
                filter: drop-shadow(0 0 10px ${t.neon}) drop-shadow(0 0 15px ${t.neon}) !important;
                background: ${t.dark} !important;
                border-color: ${t.neon} !important;
            }

            /* NUEVO: Imagen del personaje GRANDE con efecto neón POR FUERA (excluir la pequeña del chat) */
            div[class*="relative size-full overflow-hidden"]:not([class*="rounded-full"]) img:not([class*="rounded-full"]),
            img[alt*="❤"][width="260"],
            img[alt*="❤"][width="352"] {
                border-radius: 8px !important;
                box-shadow:
                    0 0 0 3px ${t.neon},
                    0 0 20px ${t.neon}aa,
                    0 0 40px ${t.neon}66,
                    0 0 60px ${t.neon}33 !important;
                transition: all 0.3s ease-in-out !important;
            }

            /* Efecto hover en la imagen GRANDE del personaje */
            div[class*="relative size-full overflow-hidden"]:not([class*="rounded-full"]) img:not([class*="rounded-full"]):hover,
            img[alt*="❤"][width="260"]:hover,
            img[alt*="❤"][width="352"]:hover {
                box-shadow:
                    0 0 0 4px ${t.neon},
                    0 0 30px ${t.neon}dd,
                    0 0 60px ${t.neon}88,
                    0 0 90px ${t.neon}44 !important;
                transform: scale(1.02) !important;
            }

            /* Botones de guardar en modales - zoom suave */
            button.bg-light3-primary:hover,
            button.dark\\:bg-dark3-primary:hover,
            button[class*="bg-light3-primary"]:hover,
            button[class*="dark:bg-dark3-primary"]:hover {
                transform: scale(1.08) !important;
                box-shadow: 0 8px 20px ${t.neon}88 !important;
                filter: brightness(1.1) !important;
            }

            /* Botones del input de chat */
            .mr-2.flex.h-6.w-full.gap-2 > span > .relative.flex.size-6.cursor-pointer:hover {
                transform: scale(1.2) !important;
                box-shadow: 0 0 15px ${t.neon}66 !important;
            }

            /* Asegurar que los iconos SVG se muevan con el botón */
            button svg,
            [role="button"] svg,
            .cursor-pointer svg {
                transition: inherit !important;
            }

            /* NUEVO: Inputs y áreas de texto GENERALES (NO el input de chat principal) */
            input:not([class*="min-h-8"]),
            textarea:not([class*="min-h-8"]),
            select {
                background: ${t.dark} !important;
                border-color: ${t.border} !important;
                color: ${t.neon} !important;
            }

            /* Texto del input principal (solo color, no fondo) */
            textarea[class*="min-h-8"] {
                color: ${t.neon} !important;
            }

            /* Placeholder del textarea del input principal */
            textarea[class*="min-h-8"]::placeholder {
                color: ${t.neon}66 !important;
            }

            /* IMPORTANTE: Forzar que el contenedor del input tenga z-index positivo para que aparezca sobre el overlay */
            div[class*="relative flex w-full flex-col items-center gap-2 rounded"] {
                position: relative !important;
                z-index: 1 !important;
                isolation: isolate !important;
            }

            /* Asegurar que todos los hijos del input también sean interactivos */
            div[class*="relative flex w-full flex-col items-center gap-2 rounded"] * {
                pointer-events: auto !important;
            }



            /* Botones de ARRIBA - con fondo completo */
            .flex.h-10.items-end.gap-2\\.5 .bg-gray-5\\/40,
            .flex.h-10.items-end.gap-2\\.5 .bg-white-1\\/60,
            .flex.h-10.items-end.gap-2\\.5 .sm\\:bg-white-1\\/60 {
                background: ${t.wine} !important;
                border: 1px solid ${t.border} !important;
                color: ${t.neon} !important;
                backdrop-filter: none !important;
            }

            /* Botones de ABAJO - con fondo completo */
            .mr-2.flex.h-6.w-full.gap-2 .bg-white\\/60,
            .mr-2.flex.h-6.w-full.gap-2 .bg-gray-5\\/40,
            .mr-2.flex.h-6.w-full.gap-2 .bg-black-2\\/60,
            .mr-2.flex.h-6.w-full.gap-2 .dark\\:bg-black-2\\/60 {
                background: ${t.wine} !important;
                border: 1px solid ${t.border} !important;
                color: ${t.neon} !important;
            }

            /* Solo el botón de ideas (+) - selector muy específico */
            .mr-2.flex.h-6.w-full.gap-2 > span > .relative.flex.size-6.cursor-pointer {
                background: ${t.wine} !important;
                border: 1px solid ${t.border} !important;
            }

            /* Color del icono + */
            .mr-2.flex.h-6.w-full.gap-2 > span > .relative.flex.size-6.cursor-pointer svg {
                color: ${t.neon} !important;
            }

            /* Botón de ideas/prompt (+) - MUY ESPECÍFICO */
            div[class*="mr-2 flex h-6 w-full gap-2"] > span[aria-expanded] > div[class*="relative flex size-6 cursor-pointer"] {
                background: ${t.wine} !important;
                border: 1px solid ${t.border} !important;
            }

            /* Icono dentro del botón (+) */
            div[class*="mr-2 flex h-6 w-full gap-2"] > span[aria-expanded] > div[class*="relative flex size-6 cursor-pointer"] svg {
                color: ${t.neon} !important;
            }


            /* NUEVO: Scrollbars personalizados */
            ::-webkit-scrollbar {
                background: ${t.dark} !important;
            }
            ::-webkit-scrollbar-thumb {
                background: ${t.border} !important;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${t.neon}80 !important;
            }
        `;

        // MEJORADO: Valores de hue-rotate ajustados para colores más precisos
        const themeHues = {
            crimson: '345deg',   // AJUSTADO: Rojo intenso (evita amarillo)
            ocean: '190deg',     // Azul cyan
            forest: '115deg',    // Verde neón
            gold: '50deg',       // Amarillo dorado
            grape: '275deg',     // Morado
            candy: '310deg'      // AJUSTADO: Rosa más magenta (evita amarillo)
        };

        // Aplicar la variable CSS al documento
        document.documentElement.style.setProperty('--theme-hue', themeHues[id] || '355deg');

        sidebar.style.background = `linear-gradient(180deg, ${t.dark}f5 0%, ${t.dark}e8 50%, ${t.dark}dd 100%)`;
        sidebar.style.borderColor = t.border;
        sidebar.style.boxShadow = `0 0 20px ${t.border}80, inset 0 0 30px ${t.border}20`;
        tab.style.background = t.dark;
        tab.style.color = t.neon;
        tab.style.borderColor = t.border;
        [profileBtn, musicBtn, soundBtn, visualBtn, statsBtn, cutsceneBtn, gamesBtn, coinBtn, diceBtn, truthDareBtn, noteBtn, themeBtn, configBtn, musicGear, soundGear, visualGear, statsGear, cutsceneGear].forEach(el => { if(el) { el.style.background = t.dark; el.style.borderColor = t.border; el.style.color = t.neon; }});
        if(notePanel) {
            notePanel.style.background = t.dark;
            notePanel.style.borderRight = `2px solid ${t.border}`;

            // Actualizar header
            const headerDiv = notePanel.children[0];
            if (headerDiv) {
                headerDiv.style.borderBottom = `2px solid ${t.border}`;
                const titleDiv = headerDiv.querySelector('div > div:last-child');
                if (titleDiv) titleDiv.style.color = t.neon;
                headerDiv.querySelectorAll('button').forEach(btn => {
                    btn.style.background = t.wine;
                    btn.style.borderColor = t.border;
                    btn.style.color = t.neon;
                });
            }

            // Actualizar contenedor de pestañas
            const tabsDiv = notePanel.children[1];
            if (tabsDiv) {
                tabsDiv.style.borderBottom = `1px solid ${t.border}`;
            }

            // Actualizar pestañas
            notePanel.querySelectorAll('.note-tab').forEach(tab => {
                if (tab.classList.contains('active')) {
                    tab.style.background = `${t.neon}33`;
                    tab.style.color = t.neon;
                    tab.style.borderColor = t.neon;
                } else {
                    tab.style.background = t.wine;
                    tab.style.color = t.neon;
                    tab.style.borderColor = t.border;
                }
            });

            // Actualizar textareas
            [txt, txtChar, txtPlot].forEach(textarea => {
                if (textarea) {
                    textarea.style.background = t.wine;
                    textarea.style.color = t.neon;
                    textarea.style.borderColor = t.border;
                }
            });

            // Actualizar footer
            const footer = notePanel.children[3];
            if (footer) {
                footer.style.color = t.neon;
                footer.style.borderTop = `1px solid ${t.border}`;
            }
        }
        if(resultPopup) { resultPopup.style.background = t.dark; resultPopup.style.borderColor = t.neon; resultPopup.style.color = t.neon; }

        // NUEVO: Actualizar color del overlay del input
        if(inputColorOverlay) {
            inputColorOverlay.style.background = t.wine;
            inputColorOverlay.style.border = `1px solid ${t.border}`;
        }

        [modalConfig, modalEscenas, modalSounds, modalVisuals, modalCutscenes, modalTemas, modalGuia, modalStatsConfig, modalProfiles].forEach(m => {
            if(m) {
                m.style.background = t.dark; m.style.borderColor = t.neon;
                const titulo = m.querySelector('.modal-title');
                if(titulo) titulo.style.color = t.neon;
                m.querySelectorAll('b').forEach(b => b.style.color = t.neon);
            }
        });
        localStorage.setItem('rol_theme_save', id);

        // Actualizar colores de las barras de stats
        // Actualizar barras de stats si existen
        const statsOverlayElement = statsOverlay || document.querySelector('.stats-overlay-container');
        if (statsOverlayElement) {
            statsOverlayElement.style.borderColor = t.border;
            const labels = statsOverlayElement.querySelectorAll('.stat-label');
            labels.forEach(label => label.style.color = t.neon);
        }

        // NUEVO: Aplicar tema a los botones de perfiles
        if (typeof aplicarTemaAPerfiles === 'function') {
            aplicarTemaAPerfiles();
        }
    }

    let sonidosActivos = false, visualesActivos = false, ambienteActivo = false, ultimotimeout = 0, actualUrl = "";
    let bibliotecaSonidos = JSON.parse(localStorage.getItem('rol_sounds')) || [];
    let efectosVisuales = JSON.parse(localStorage.getItem('rol_visuals')) || [];
    let bibliotecaEscenas = JSON.parse(localStorage.getItem('rol_escenas')) || [];
    let bibliotecaCutscenes = JSON.parse(localStorage.getItem('rol_cutscenes')) || []; // NUEVO: Biblioteca de videos
    let cutscenesActivos = false; // NUEVO: Estado de activación de cutscenes
    let masterVolume = parseFloat(localStorage.getItem('rol_volume')) || 0.5;
    let sfxVolume = localStorage.getItem('rol_sfx_volume') || 0.5;
    let cutsceneVolume = parseFloat(localStorage.getItem('rol_cutscene_volume')) || 0.5; // NUEVO: Volumen de cutscenes


    const ytContainer = document.createElement('div'); ytContainer.style.zIndex = "1"; document.body.appendChild(ytContainer);
    const audioPlayer = document.createElement('audio'); audioPlayer.loop = true; audioPlayer.volume = masterVolume; document.body.appendChild(audioPlayer);

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
        /* .btn-icon, .icon-active, .icon-muted ahora se definen en styleTemas para que cambien con el tema */
        .shake-active { animation: shakeHard 0.4s both; }
        @keyframes shakeHard { 0%, 100% { transform: translate(0,0); } 10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 10px); } 20%, 40%, 60%, 80% { transform: translate(10px, -10px); } }
        .item-row { display:flex; justify-content:space-between; padding:8px; margin-bottom:5px; border-radius:4px; font-size:12px; align-items:center; }
        #master-sidebar-container { position: fixed; left: -68px; bottom: 0; top: 0; width: 70px; border-right: 1px solid #721c47; z-index: 1000000; transition: left 0.4s cubic-bezier(0.1, 0.7, 0.1, 1); }
        #sidebar-tab { position: absolute; right: -15px; top: 35%; transform: translateY(-50%); width: 15px; height: 80px; border: 1px solid #721c47; border-left: none; border-radius: 0 8px 8px 0; font-size: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 2px 0 10px rgba(0,0,0,0.5); z-index: 1000005; }
        .swatch { width: 100%; height: 35px; margin-bottom: 5px; border-radius: 5px; cursor: pointer; border: 1px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; text-shadow: 1px 1px 2px black; }

            /* NUEVO: Transición de escena con fade to black */
        #scene-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            z-index: 9999997;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s ease-in-out;
        }

        #scene-transition-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        #scene-title-display {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999998;
            opacity: 0;
            pointer-events: none;
            text-align: center;
            font-family: 'Georgia', serif;
        }

        #scene-title-display.show {
            animation: sceneTitleReveal 2s ease-in-out forwards;
        }

        @keyframes sceneTitleReveal {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
            15% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            85% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.1);
            }
        }

        #scene-title-display h1 {
            font-size: 56px;
            font-weight: bold;
            color: #fff;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.9),
                         0 0 60px rgba(255, 255, 255, 0.6),
                         0 0 90px rgba(255, 255, 255, 0.3);
            letter-spacing: 8px;
            margin: 0;
            padding: 30px 50px;
            border-top: 3px solid rgba(255, 255, 255, 0.7);
            border-bottom: 3px solid rgba(255, 255, 255, 0.7);
            position: relative;
        }

        /* Animación de letras individuales */
        #scene-title-display h1 span {
            display: inline-block;
            opacity: 0;
            animation: letterAppear 0.6s ease-out forwards;
        }

        @keyframes letterAppear {
            0% {
                opacity: 0;
                transform: translateY(-30px) rotateX(90deg);
                filter: blur(10px);
            }
            50% {
                transform: translateY(5px) rotateX(0deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
                filter: blur(0);
            }
        }

        /* Delay escalonado para cada letra */
        #scene-title-display h1 span:nth-child(1) { animation-delay: 0.05s; }
        #scene-title-display h1 span:nth-child(2) { animation-delay: 0.1s; }
        #scene-title-display h1 span:nth-child(3) { animation-delay: 0.15s; }
        #scene-title-display h1 span:nth-child(4) { animation-delay: 0.2s; }
        #scene-title-display h1 span:nth-child(5) { animation-delay: 0.25s; }
        #scene-title-display h1 span:nth-child(6) { animation-delay: 0.3s; }
        #scene-title-display h1 span:nth-child(7) { animation-delay: 0.35s; }
        #scene-title-display h1 span:nth-child(8) { animation-delay: 0.4s; }
        #scene-title-display h1 span:nth-child(9) { animation-delay: 0.45s; }
        #scene-title-display h1 span:nth-child(10) { animation-delay: 0.5s; }
        #scene-title-display h1 span:nth-child(11) { animation-delay: 0.55s; }
        #scene-title-display h1 span:nth-child(12) { animation-delay: 0.6s; }
        #scene-title-display h1 span:nth-child(13) { animation-delay: 0.65s; }
        #scene-title-display h1 span:nth-child(14) { animation-delay: 0.7s; }
        #scene-title-display h1 span:nth-child(15) { animation-delay: 0.75s; }
        #scene-title-display h1 span:nth-child(16) { animation-delay: 0.8s; }
        #scene-title-display h1 span:nth-child(17) { animation-delay: 0.85s; }
        #scene-title-display h1 span:nth-child(18) { animation-delay: 0.9s; }
        #scene-title-display h1 span:nth-child(19) { animation-delay: 0.95s; }
        #scene-title-display h1 span:nth-child(20) { animation-delay: 1s; }

        /* NUEVO: Reproductor de cutscenes cinematográficos */
        #cutscene-player-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            z-index: 99999999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.6s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #cutscene-player-container.active {
            opacity: 1;
            pointer-events: all;
        }

        #cutscene-video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background: #000;
        }

        #cutscene-skip-button {
            position: absolute;
            bottom: 30px;
            right: 30px;
            padding: 12px 24px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            z-index: 100000000;
            transition: all 0.3s;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            letter-spacing: 1px;
        }

        #cutscene-skip-button:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: white;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            transform: scale(1.05);
        }

        /* NUEVO: Animaciones de Dado y Moneda */
        #dice-animation-overlay,
        #coin-animation-overlay,
        #truthdare-animation-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 99999998;
            backdrop-filter: blur(8px);
        }

        #dice-animation-overlay.active,
        #coin-animation-overlay.active,
        #truthdare-animation-overlay.active {
            display: flex;
        }

        .dice-container,
        .coin-container,
        .truthdare-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }

        .dice-visual,
        .coin-visual,
        .truthdare-wheel {
            font-size: 150px;
            filter: drop-shadow(0 0 30px rgba(255, 77, 148, 0.6));
        }

        .dice-visual {
            animation: diceRoll 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .coin-visual {
            animation: coinFlip 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes diceRoll {
            0% {
                transform: translateY(-100vh) rotate(0deg) scale(0.5);
                opacity: 0;
            }
            30% {
                opacity: 1;
            }
            60% {
                transform: translateY(20px) rotate(720deg) scale(1.2);
            }
            80% {
                transform: translateY(-10px) rotate(900deg) scale(0.95);
            }
            100% {
                transform: translateY(0) rotate(1080deg) scale(1);
                opacity: 1;
            }
        }

        @keyframes coinFlip {
            0% {
                transform: translateY(-100vh) rotateY(0deg) scale(0.5);
                opacity: 0;
            }
            30% {
                opacity: 1;
            }
            60% {
                transform: translateY(20px) rotateY(1800deg) scale(1.2);
            }
            80% {
                transform: translateY(-10px) rotateY(2160deg) scale(0.95);
            }
            100% {
                transform: translateY(0) rotateY(2520deg) scale(1);
                opacity: 1;
            }
        }

        .dice-result,
        .coin-result,
        .truthdare-result {
            font-size: 48px;
            font-weight: bold;
            color: #ff4d94;
            text-shadow: 0 0 20px rgba(255, 77, 148, 0.8),
                         0 0 40px rgba(255, 77, 148, 0.5);
            animation: resultReveal 0.8s ease-out 1.5s both;
            font-family: 'Arial Black', sans-serif;
            letter-spacing: 3px;
        }

        @keyframes resultReveal {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        .dice-subtitle,
        .coin-subtitle,
        .truthdare-subtitle {
            font-size: 24px;
            color: #fff;
            opacity: 0.8;
            animation: subtitleFade 0.6s ease-out 1.8s both;
            font-family: 'Georgia', serif;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg) scale(1);
            }
            50% {
                transform: rotate(1080deg) scale(1.3);
            }
            100% {
                transform: rotate(2160deg) scale(1);
            }
        }

        @keyframes subtitleFade {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 0.8;
                transform: translateY(0);
            }
        }

        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            70% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
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

    // NUEVO: Overlay de color para el input de chat (solución sin tocar el input original)
    const inputColorOverlay = document.createElement('div');
    inputColorOverlay.id = 'input-color-overlay';
    inputColorOverlay.style = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 40px);
        max-width: 800px;
        height: auto;
        min-height: 64px;
        border-radius: 14px;
        pointer-events: none;
        z-index: -1;
        opacity: 0.95;
        transition: background 0.3s ease;
    `;
    document.body.appendChild(inputColorOverlay);

    // Función para actualizar posición del overlay
    function actualizarPosicionInputOverlay() {
        const inputContainer = document.querySelector('.relative.flex.w-full.flex-col.items-center.gap-2.rounded-\\[14px\\]') ||
                              document.querySelector('div[class*="relative flex w-full flex-col items-center gap-2 rounded"]');

        if (inputContainer) {
            const rect = inputContainer.getBoundingClientRect();
            inputColorOverlay.style.width = rect.width + 'px';
            inputColorOverlay.style.height = rect.height + 'px';
            inputColorOverlay.style.bottom = (window.innerHeight - rect.bottom) + 'px';
            inputColorOverlay.style.left = rect.left + 'px';
            inputColorOverlay.style.transform = 'none';
        }
    }

    // Actualizar posición cada cierto tiempo
    setInterval(actualizarPosicionInputOverlay, 500);
    window.addEventListener('resize', actualizarPosicionInputOverlay);

    // NUEVO: Elementos para la transición de escena
    const sceneTransitionOverlay = document.createElement('div');
    sceneTransitionOverlay.id = 'scene-transition-overlay';
    document.body.appendChild(sceneTransitionOverlay);

    const sceneTitleDisplay = document.createElement('div');
    sceneTitleDisplay.id = 'scene-title-display';
    sceneTitleDisplay.innerHTML = '<h1></h1>';
    document.body.appendChild(sceneTitleDisplay);

    // NUEVO: Reproductor de cutscenes
    const cutscenePlayerContainer = document.createElement('div');
    cutscenePlayerContainer.id = 'cutscene-player-container';

    const cutsceneVideo = document.createElement('video');
    cutsceneVideo.id = 'cutscene-video';
    cutsceneVideo.controls = false;

    const cutsceneSkipButton = document.createElement('button');
    cutsceneSkipButton.id = 'cutscene-skip-button';
    cutsceneSkipButton.innerHTML = '⏩ SKIP';

    cutscenePlayerContainer.appendChild(cutsceneVideo);
    cutscenePlayerContainer.appendChild(cutsceneSkipButton);
    document.body.appendChild(cutscenePlayerContainer);

    // NUEVO: Elementos para animación de dado
    const diceAnimationOverlay = document.createElement('div');
    diceAnimationOverlay.id = 'dice-animation-overlay';
    diceAnimationOverlay.innerHTML = `
        <div class="dice-container">
            <div class="dice-visual">🎲</div>
            <div class="dice-result"></div>
            <div class="dice-subtitle">Click to close</div>
        </div>
    `;
    document.body.appendChild(diceAnimationOverlay);

    // NUEVO: Elementos para animación de moneda
    const coinAnimationOverlay = document.createElement('div');
    coinAnimationOverlay.id = 'coin-animation-overlay';
    coinAnimationOverlay.innerHTML = `
        <div class="coin-container">
            <div class="coin-visual">🟡</div>
            <div class="coin-result"></div>
            <div class="coin-subtitle">Click to close</div>
        </div>
    `;
    document.body.appendChild(coinAnimationOverlay);

    // NUEVO: Elementos para Truth or Dare
    const truthDareOverlay = document.createElement('div');
    truthDareOverlay.id = 'truthdare-animation-overlay';
    truthDareOverlay.innerHTML = `
        <div class="truthdare-container">
            <div class="truthdare-wheel">🎯</div>
            <div class="truthdare-result"></div>
            <div class="truthdare-subtitle">Click to close</div>
        </div>
    `;
    document.body.appendChild(truthDareOverlay);

    // Cerrar animaciones al hacer click
    diceAnimationOverlay.onclick = () => {
        diceAnimationOverlay.classList.remove('active');
    };

    coinAnimationOverlay.onclick = () => {
        coinAnimationOverlay.classList.remove('active');
    };

    truthDareOverlay.onclick = () => {
        truthDareOverlay.classList.remove('active');
    };

    // NUEVO: Stats Overlay (barras de amor y comida que se insertan en la imagen)
    let statsActivo = false;
    let statsOverlay = null;

    // NUEVO: Sistema de barritas con palabras clave
    let loveLevel = parseInt(localStorage.getItem('rol_love_level') || '75');
    let hungerLevel = parseInt(localStorage.getItem('rol_hunger_level') || '100');
    let hungerMessageCount = 0; // Contador para reducir hambre cada 3 mensajes

    // Variables para trackear el último nivel notificado (inicializar según nivel actual)
    let lastLoveNotification = loveLevel <= 0 ? 0 : loveLevel <= 25 ? 25 : loveLevel <= 50 ? 50 : loveLevel <= 75 ? 75 : 100;
    let lastHungerNotification = hungerLevel <= 0 ? 0 : hungerLevel <= 25 ? 25 : hungerLevel <= 50 ? 50 : hungerLevel <= 75 ? 75 : 100;

    // Palabras clave para aumentar/disminuir stats
    let loveIncreaseKeywords = JSON.parse(localStorage.getItem('rol_love_increase_keywords') || '["beso", "abrazo", "te amo", "te quiero", "amor"]');
    let loveDecreaseKeywords = JSON.parse(localStorage.getItem('rol_love_decrease_keywords') || '["pelea", "discusión", "enfado", "molesto"]');
    let hungerIncreaseKeywords = JSON.parse(localStorage.getItem('rol_hunger_increase_keywords') || '["empieza a comer", "come", "comiendo", "devora", "almuerza", "desayuna", "cena"]');

    // Cooldown para evitar detecciones múltiples
    let lastStatsDetection = 0;

    function crearBarrasStats() {
        // MEJORADO: Buscar el avatar del personaje de CUALQUIER tamaño
        let avatarImage = null;

        // Estrategia 1: Buscar por tamaños comunes de avatar (260x352, 260x260, etc.)
        const commonSizes = [
            'img[width="260"][height="352"]',
            'img[width="260"][height="260"]',
            'img[width="352"][height="260"]',
            'img[width="240"][height="240"]'
        ];

        for (const selector of commonSizes) {
            const images = document.querySelectorAll(selector);
            if (images.length > 0) {
                avatarImage = images[0];
                console.log('[Stats] Avatar encontrado por tamaño:', selector);
                break;
            }
        }

        // Estrategia 2: Buscar imágenes con alt que contenga el nombre del personaje
        if (!avatarImage) {
            const images = document.querySelectorAll('img[alt]');
            for (const img of images) {
                // Debe tener alt, ser grande (>100px) y estar en un contenedor .relative.size-full
                if (img.alt && img.width > 100 && img.closest('.relative.size-full.overflow-hidden')) {
                    avatarImage = img;
                    console.log('[Stats] Avatar encontrado por alt y tamaño:', img.alt);
                    break;
                }
            }
        }

        // Estrategia 3: Buscar cualquier imagen grande dentro de contenedores típicos de avatar
        if (!avatarImage) {
            const containers = document.querySelectorAll('.relative.size-full.overflow-hidden');
            for (const container of containers) {
                const img = container.querySelector('img');
                if (img && img.width > 100 && img.height > 100) {
                    avatarImage = img;
                    console.log('[Stats] Avatar encontrado en contenedor:', img.width + 'x' + img.height);
                    break;
                }
            }
        }

        if (!avatarImage) {
            console.log('[Stats] No se encontró la imagen del avatar');
            return null;
        }

        // Buscar el contenedor padre que tiene la clase .relative.size-full.overflow-hidden
        const imageContainer = avatarImage.closest('.relative.size-full.overflow-hidden');

        if (!imageContainer) {
            console.log('[Stats] No se encontró el contenedor de la imagen');
            return null;
        }

        console.log('[Stats] ✅ Configuración completada - Avatar:', avatarImage.alt || 'Sin nombre', 'Tamaño:', avatarImage.width + 'x' + avatarImage.height);

        // Crear el overlay de stats
        const overlay = document.createElement('div');
        overlay.className = 'stats-overlay-container';

        // MEJORADO: Hacer el overlay responsive según el tamaño del contenedor
        const containerWidth = imageContainer.offsetWidth;
        const overlayWidth = Math.min(containerWidth * 0.9, 240); // Máximo 240px o 90% del contenedor

        // Cargar posición guardada o usar valores por defecto (ahora desde abajo)
        const savedPosition = JSON.parse(localStorage.getItem('stats_position') || '{"bottom": 10, "left": 50}');

        // Obtener el tema actual
        const currentTheme = window.currentTheme || Temas.crimson;

        overlay.style = `
            position: absolute;
            bottom: ${savedPosition.bottom || 10}px;
            left: ${savedPosition.left}%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 240px;
            background: linear-gradient(180deg, rgba(10, 1, 5, 0.85) 0%, rgba(10, 1, 5, 0.3) 100%);
            border: 2px solid ${currentTheme.border};
            border-radius: 12px;
            padding: ${containerWidth < 200 ? '6px 8px' : '10px 12px'};
            z-index: 100;
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            cursor: default;
            pointer-events: auto;
        `;

        // NUEVO: Prevenir que los clics pasen a través del overlay
        let isDragging = false;
        let dragStartTime = 0;
        let hasDragged = false;

        overlay.addEventListener('mousedown', (e) => {
            dragStartTime = Date.now();
            hasDragged = false;
            // Prevenir que el evento pase al elemento de abajo
            e.stopPropagation();
        }, true);

        overlay.addEventListener('mouseup', (e) => {
            // Prevenir click si no se arrastró o fue muy rápido
            e.stopPropagation();
            e.preventDefault();
        }, true);

        overlay.addEventListener('click', (e) => {
            // Siempre prevenir clicks
            e.stopPropagation();
            e.preventDefault();
        }, true);

        // Ajustar tamaño de barras según contenedor
        const barHeight = containerWidth < 200 ? 16 : 20;
        const fontSize = containerWidth < 200 ? 10 : 12;

        overlay.innerHTML = `
            <div class="stat-item" style="margin-bottom: ${containerWidth < 200 ? '6px' : '8px'};">
                <div style="background: rgba(26, 5, 16, 0.8); border-radius: 8px; height: ${barHeight}px; border: 1px solid rgba(74, 16, 48, 0.6); overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); position: relative;">
                    <div class="stat-bar stat-love" style="height: 100%; background: linear-gradient(90deg, #ff1493, #ff69b4); width: ${loveLevel > 0 ? Math.max(loveLevel, 3) : 0}%; min-width: ${loveLevel > 0 ? '20px' : '0'}; transition: width 0.5s ease; box-shadow: 0 0 10px rgba(255, 20, 147, 0.6);"></div>
                    <div style="position: absolute; top: 50%; left: 8px; transform: translateY(-50%); font-size: ${fontSize}px; font-weight: bold; color: #000; text-shadow: 0 1px 2px rgba(255,255,255,0.3); z-index: 10; font-family: 'Arial Black', 'Helvetica', sans-serif; letter-spacing: 0.5px;">
                        <span class="love-value">Love</span>
                    </div>
                </div>
            </div>

            <div class="stat-item">
                <div style="background: rgba(26, 16, 5, 0.8); border-radius: 8px; height: ${barHeight}px; border: 1px solid rgba(74, 48, 16, 0.6); overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); position: relative;">
                    <div class="stat-bar stat-hunger" style="height: 100%; background: linear-gradient(90deg, #ff8c00, #ffa500); width: ${hungerLevel > 0 ? Math.max(hungerLevel, 3) : 0}%; min-width: ${hungerLevel > 0 ? '20px' : '0'}; transition: width 0.5s ease; box-shadow: 0 0 10px rgba(255, 140, 0, 0.6);"></div>
                    <div style="position: absolute; top: 50%; left: 8px; transform: translateY(-50%); font-size: ${fontSize}px; font-weight: bold; color: #000; text-shadow: 0 1px 2px rgba(255,255,255,0.3); z-index: 10; font-family: 'Arial Black', 'Helvetica', sans-serif; letter-spacing: 0.5px;">
                        <span class="hunger-value">Hunger</span>
                    </div>
                </div>
            </div>
        `;

        // Insertar en el contenedor de la imagen
        imageContainer.style.position = 'relative';
        imageContainer.appendChild(overlay);

        return overlay;
    }

    function mostrarBarrasStats() {
        if (!statsOverlay) {
            statsOverlay = crearBarrasStats();
        }
    }

    function ocultarBarrasStats() {
        if (statsOverlay && statsOverlay.parentElement) {
            statsOverlay.parentElement.removeChild(statsOverlay);
            statsOverlay = null;
        }
    }

    // Funciones para actualizar las barritas
    function actualizarBarrasStats() {
        if (!statsOverlay) return;

        const loveBar = statsOverlay.querySelector('.stat-love');
        const loveValue = statsOverlay.querySelector('.love-value');
        const hungerBar = statsOverlay.querySelector('.stat-hunger');
        const hungerValue = statsOverlay.querySelector('.hunger-value');

        if (loveBar && loveValue) {
            // Aplicar ancho mínimo para visibilidad
            const loveWidth = loveLevel > 0 ? Math.max(loveLevel, 3) : 0;
            loveBar.style.width = loveWidth + '%';
            loveBar.style.minWidth = loveLevel > 0 ? '20px' : '0';
            // Mantener el texto "Love" sin cambiar a porcentaje
            loveValue.textContent = 'Love';
        }

        if (hungerBar && hungerValue) {
            // Aplicar ancho mínimo para visibilidad
            const hungerWidth = hungerLevel > 0 ? Math.max(hungerLevel, 3) : 0;
            hungerBar.style.width = hungerWidth + '%';
            hungerBar.style.minWidth = hungerLevel > 0 ? '20px' : '0';
            // Mantener el texto "Hunger" sin cambiar a porcentaje
            hungerValue.textContent = 'Hunger';
        }

        localStorage.setItem('rol_love_level', loveLevel);
        localStorage.setItem('rol_hunger_level', hungerLevel);
    }

    // Variable para guardar mensaje pendiente de stats
    let pendingStatsMessage = "";

    function insertarMensajeEnChat(mensaje) {
        // En lugar de insertar directamente, guardamos el mensaje pendiente
        pendingStatsMessage = mensaje;
        console.log('[Stats] Mensaje pendiente guardado:', mensaje);
    }

    function obtenerMensajeHunger(nivel) {
        if (nivel === 100) return "⟦{{char}} is completely satisfied, full stomach⟧";
        if (nivel === 75) return "⟦{{char}} is 25% hungry, little hungry but stable⟧";
        if (nivel === 50) return "⟦{{char}} is 50% hungry, feeling a bit peckish⟧";
        if (nivel === 25) return "⟦{{char}} is 75% hungry, stomach growling, needs food soon⟧";
        if (nivel === 0) return "⟦{{char}} is starving! 0% hunger, desperately needs food⟧";
        return "";
    }

    function obtenerMensajeLove(nivel) {
        if (nivel === 100) return "⟦{{char}} is deeply in love, heart full of affection⟧";
        if (nivel === 75) return "⟦{{char}} feels 75% love, warm and caring emotions⟧";
        if (nivel === 50) return "⟦{{char}} feels 50% love, neutral emotional state⟧";
        if (nivel === 25) return "⟦{{char}} feels 25% love, emotionally distant and cold⟧";
        if (nivel === 0) return "⟦{{char}} feels no love, relationship at breaking point⟧";
        return "";
    }

    function cambiarStat(tipo, cantidad) {
        const nivelAnterior = tipo === 'love' ? loveLevel : hungerLevel;

        if (tipo === 'love') {
            loveLevel = Math.max(0, Math.min(100, loveLevel + cantidad));

            // Checkear si cruzamos un umbral (100, 75, 50, 25, 0)
            const umbrales = [100, 75, 50, 25, 0];
            for (const umbral of umbrales) {
                // Si el nivel nuevo está en o por debajo del umbral y el anterior estaba por encima
                if (loveLevel <= umbral && nivelAnterior > umbral && lastLoveNotification > umbral) {
                    insertarMensajeEnChat(obtenerMensajeLove(umbral));
                    lastLoveNotification = umbral;
                    break;
                }
                // Si el nivel nuevo está en o por encima del umbral y el anterior estaba por debajo (recuperación)
                if (loveLevel >= umbral && nivelAnterior < umbral && lastLoveNotification < umbral) {
                    insertarMensajeEnChat(obtenerMensajeLove(umbral));
                    lastLoveNotification = umbral;
                    break;
                }
            }
        } else if (tipo === 'hunger') {
            hungerLevel = Math.max(0, Math.min(100, hungerLevel + cantidad));

            // Checkear si cruzamos un umbral
            const umbrales = [100, 75, 50, 25, 0];
            for (const umbral of umbrales) {
                if (hungerLevel <= umbral && nivelAnterior > umbral && lastHungerNotification > umbral) {
                    insertarMensajeEnChat(obtenerMensajeHunger(umbral));
                    lastHungerNotification = umbral;
                    break;
                }
                if (hungerLevel >= umbral && nivelAnterior < umbral && lastHungerNotification < umbral) {
                    insertarMensajeEnChat(obtenerMensajeHunger(umbral));
                    lastHungerNotification = umbral;
                    break;
                }
            }
        }
        actualizarBarrasStats();
    }

    function detectarPalabrasClaveStats(texto) {
        if (!statsActivo) return;

        // Cooldown de 2 segundos para evitar detecciones múltiples
        if (Date.now() - lastStatsDetection < 2000) return;

        const textoLower = texto.toLowerCase();
        let deteccionRealizada = false;

        // Función auxiliar para buscar con límites de palabra
        function buscarPalabraCompleta(texto, palabra) {
            // Crear regex con word boundaries (\b) para buscar palabra completa
            const regex = new RegExp(`\\b${palabra.toLowerCase()}\\b`, 'i');
            return regex.test(texto);
        }

        for (const keyword of loveIncreaseKeywords) {
            if (buscarPalabraCompleta(textoLower, keyword)) {
                cambiarStat('love', 5);
                deteccionRealizada = true;
                console.log('[Stats] Amor +5% por:', keyword);
                break;
            }
        }

        if (!deteccionRealizada) {
            for (const keyword of loveDecreaseKeywords) {
                if (buscarPalabraCompleta(textoLower, keyword)) {
                    cambiarStat('love', -5);
                    deteccionRealizada = true;
                    console.log('[Stats] Amor -5% por:', keyword);
                    break;
                }
            }
        }

        if (!deteccionRealizada) {
            for (const keyword of hungerIncreaseKeywords) {
                if (buscarPalabraCompleta(textoLower, keyword)) {
                    cambiarStat('hunger', 50);
                    deteccionRealizada = true;
                    console.log('[Stats] Hambre +50% por:', keyword);
                    break;
                }
            }
        }

        // Actualizar timestamp solo si hubo detección
        if (deteccionRealizada) {
            lastStatsDetection = Date.now();
        }
    }

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
    const modalCutscenes = createModal("CUTSCENES 🎥"); // NUEVO: Modal de cutscenes
    const modalStatsConfig = createModal("STATS CONFIG 🍖"); // NUEVO: Modal de stats
    const modalTemas = createModal("COLOR PALETTE 🎨");
    const modalProfiles = createModal("CHARACTER PROFILES 👤"); // NUEVO: Modal de perfiles
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
            <b>🎥 CUTSCENES:</b><br>
            Add cinematic video scenes that play when the "Keyword" is mentioned. Perfect for dramatic moments or storytelling. Supports YouTube links and direct video URLs (.mp4).
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🍖 LOVE & HUNGER STATS:</b><br>
            Dynamic character stats that appear on the avatar image when activated. Configure keywords that increase or decrease Love level, and Hunger keywords that affect the character's hunger.<br><br>
            • <b>Love Increase:</b> Keywords like "kiss", "hug", "love" will increase the Love bar<br>
            • <b>Love Decrease:</b> Keywords like "fight", "argue", "angry" will decrease Love<br>
            • <b>Hunger:</b> Keywords like "eat", "food", "meal" will reduce Hunger (satiate)<br><br>
            The bars are displayed at the bottom of the character's avatar image with a beautiful glass-morphism effect.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🔗 AUDIO LINKS GUIDE:</b><br>
            • <b>YouTube:</b> Paste the end of the link starting from v= (e.g., v=DZJpqqkSce0).<br>
            • <b>Dropbox:</b> Change <code>www.dropbox.com</code> to <code>dl.dropboxusercontent.com</code> for direct audio.
            • <b>Direct link:</b> To use any audio, the **URL** has to end with .mp3
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🎮 GAMES:</b><br>
            • <b>🎲 Dice:</b> Roll a 6-sided die for RPG roles or random decisions. Perfect for chance-based gameplay.<br>
            • <b>🟡 Coin:</b> Flip a coin (Heads/Tails) for quick binary decisions or mini-games.<br>
            • <b>🎯 Truth or Dare:</b> Spin the wheel to get TRUTH or DARE. Perfect for roleplay and interactive games.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>📝 NOTEBOOK:</b><br>
            Use the notepad to write down important things, such as keywords or lore details.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🎨 THEMES:</b><br>
            Themes for your CrushOn Plus interface, ¡You can use the one you like the most!.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>👤 PROFILES:</b><br>
            Create separate profiles for different characters. Each profile stores:<br><br>
            • Scenes, Sounds, Visuals, Cutscenes<br>
            • Stats keywords (Love increase/decrease, Hunger)<br><br>
            Switch profiles to load different configurations per character. When exporting, files include the profile name. Profiles are saved automatically.
        </div>
        <div class="guia-section" style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>📤 BACKUP:</b><br>Use "Export" to download your .json configuration and "Import" to restore it or share it.
        </div>
        <div class="guia-section" style="margin-bottom:5px; padding:10px; background:rgba(255,255,255,0.05);">
            <b>🧪 DEBUG MODE:</b><br>
            For advanced testing and manual stat adjustments, press <kbd style="background:#222; padding:3px 8px; border-radius:4px; border:1px solid #444; font-family:monospace;">Ctrl</kbd> + <kbd style="background:#222; padding:3px 8px; border-radius:4px; border:1px solid #444; font-family:monospace;">Shift</kbd> + <kbd style="background:#222; padding:3px 8px; border-radius:4px; border:1px solid #444; font-family:monospace;">D</kbd><br><br>
        </div>
    `;
    const closeGuia = document.createElement('button'); closeGuia.innerText = "GOT IT"; closeGuia.className = "dynamic-modal-btn"; closeGuia.style = "margin-top:15px; padding:12px; cursor:pointer; width:100%; font-weight:bold; border-radius:8px;";
    closeGuia.onclick = () => modalGuia.style.display = "none"; modalGuia.append(guiaContent, closeGuia);

    const btnOpenGuia = document.createElement('button'); btnOpenGuia.innerText = "📖 USER GUIDE"; btnOpenGuia.className = "dynamic-modal-btn"; btnOpenGuia.style = "padding:10px; margin-bottom:10px; border-radius:5px; width:100%; cursor:pointer; font-weight:bold;";
    btnOpenGuia.onclick = () => { modalGuia.style.display = "flex"; modalConfig.style.display = "none"; }; modalConfig.appendChild(btnOpenGuia);

    // ==================== SISTEMA DE PERFILES ====================

    // Variables del sistema de perfiles
    let currentProfile = localStorage.getItem('rol_current_profile') || 'Default';
    let profiles = JSON.parse(localStorage.getItem('rol_profiles')) || {
        'Default': {
            name: 'Default',
            scenes: [],
            sounds: [],
            visuals: [],
            cutscenes: [],
            loveIncKeywords: ['love', 'kiss', 'hug', 'affection', 'care'],
            loveDecKeywords: ['fight', 'argue', 'angry', 'ignore', 'hate'],
            hungerKeywords: ['eat', 'food', 'meal', 'hungry', 'lunch', 'dinner', 'breakfast']
        }
    };

    // Contenido del modal de perfiles
    const profilesContent = document.createElement('div');
    profilesContent.style = 'padding:20px; max-height:400px; overflow-y:auto;';

    // Obtener tema actual para los estilos
    const temaActualProfile = Temas[localStorage.getItem('rol_theme_save') || 'crimson'];

    profilesContent.innerHTML = `
        <div style="margin-bottom:20px;">
            <div style="font-weight:bold; margin-bottom:10px; color:#fff;">📋 Current Profile:</div>
            <div id="current-profile-display" class="current-profile-box" style="padding:10px; background:${temaActualProfile.wine}; border:1px solid ${temaActualProfile.border}; border-radius:8px; color:${temaActualProfile.neon}; font-weight:bold; text-align:center; font-size:16px;">${currentProfile}</div>
        </div>

        <div style="margin-bottom:20px;">
            <div style="font-weight:bold; margin-bottom:10px; color:#fff;">➕ Create New Profile:</div>
            <div style="display:flex; gap:8px; align-items:center;">
                <input type="text" id="new-profile-name" placeholder="Profile Name (e.g., Character Name)" style="width:65%; padding:8px; background:rgba(30,7,18,0.8); color:#ffb3d9; border:1px solid rgba(255,77,148,0.3); border-radius:5px; box-sizing:border-box; height:36px;" />
                <button id="create-profile-btn" class="dynamic-modal-btn profile-create-btn" style="padding:8px 15px; white-space:nowrap; box-sizing:border-box; height:36px;">CREATE</button>
            </div>
        </div>

        <div style="margin-bottom:20px;">
            <div style="font-weight:bold; margin-bottom:10px; color:#fff;">🔄 Switch Profile:</div>
            <div id="profiles-list" style="display:flex; flex-direction:column; gap:8px;"></div>
        </div>

    `;
    modalProfiles.appendChild(profilesContent);

    // NUEVO: Botón para limpiar datos del perfil actual
    const btnClearProfile = document.createElement('button');
    btnClearProfile.innerText = "🗑️ CLEAR CURRENT PROFILE DATA";
    btnClearProfile.className = "dynamic-modal-btn";
    btnClearProfile.style = "padding:10px; margin-top:15px; border-radius:5px; width:100%; cursor:pointer; background:rgba(255,0,0,0.2); border:1px solid rgba(255,0,0,0.5); color:#ff6666; font-weight:bold;";
    btnClearProfile.onclick = () => {
        if (confirm(`⚠️ WARNING ⚠️\n\nThis will DELETE ALL data from the profile "${currentProfile}":\n\n• Scenes\n• Sounds\n• Visuals\n• Cutscenes\n• Stats Keywords\n\nThis action CANNOT be undone!\n\nAre you sure?`)) {
            console.log('[Profiles] Clearing profile:', currentProfile);

            // Limpiar todos los datos del perfil actual
            bibliotecaEscenas = [];
            bibliotecaSonidos = [];
            efectosVisuales = [];
            bibliotecaCutscenes = [];
            loveIncreaseKeywords = [];
            loveDecreaseKeywords = [];
            hungerIncreaseKeywords = [];

            // Guardar en localStorage
            localStorage.setItem('rol_escenas', JSON.stringify([]));
            localStorage.setItem('rol_sounds', JSON.stringify([]));
            localStorage.setItem('rol_visuals', JSON.stringify([]));
            localStorage.setItem('rol_cutscenes', JSON.stringify([]));
            localStorage.setItem('rol_love_increase_keywords', JSON.stringify([]));
            localStorage.setItem('rol_love_decrease_keywords', JSON.stringify([]));
            localStorage.setItem('rol_hunger_increase_keywords', JSON.stringify([]));

            // Actualizar el perfil
            saveCurrentProfile();

            console.log('[Profiles] Profile cleared, reloading...');
            alert(`✅ Profile "${currentProfile}" has been cleared.\n\nThe page will reload.`);
            location.reload();
        }
    };
    modalProfiles.appendChild(btnClearProfile);

    const closeProfiles = document.createElement('button');
    closeProfiles.innerText = "CLOSE";
    closeProfiles.style = "margin-top:10px; cursor:pointer; background:transparent; color:gray; border:none; width:100%;";
    closeProfiles.onclick = () => modalProfiles.style.display = "none";
    modalProfiles.appendChild(closeProfiles);

    // NUEVO: Función para aplicar tema a los botones de perfiles
    function aplicarTemaAPerfiles() {
        const temaActual = Temas[localStorage.getItem('rol_theme_save') || 'crimson'];

        // Cuadro de Current Profile
        const currentProfileBox = document.querySelector('.current-profile-box');
        if (currentProfileBox) {
            currentProfileBox.style.background = temaActual.wine;
            currentProfileBox.style.borderColor = temaActual.border;
            currentProfileBox.style.color = temaActual.neon;
        }

        // Botón CREATE
        const createBtn = document.querySelector('.profile-create-btn');
        if (createBtn) {
            createBtn.style.background = temaActual.dark;
            createBtn.style.color = temaActual.neon;
            createBtn.style.borderColor = temaActual.border;
        }

        // Botones DELETE
        document.querySelectorAll('.profile-delete-btn').forEach(btn => {
            btn.style.background = temaActual.wine;
            btn.style.color = temaActual.neon;
            btn.style.border = `1px solid ${temaActual.border}`;
        });

        // Items de perfil (fondos) - solo actualizar los NO activos
        document.querySelectorAll('.profile-item').forEach(item => {
            // Verificar si tiene el checkmark (✅) que indica que está activo
            const hasCheckmark = item.textContent.includes('✅');
            if (!hasCheckmark) {
                // Solo actualizar items NO activos
                item.style.background = temaActual.wine;
                item.style.borderColor = temaActual.border;
            } else {
                // Items activos mantienen su estilo especial pero actualizamos el borde
                item.style.borderColor = temaActual.neon;
            }
        });
    }

    // Función para renderizar la lista de perfiles
    function renderProfilesList() {
        const profilesList = document.getElementById('profiles-list');
        if (!profilesList) return;

        const temaActual = Temas[localStorage.getItem('rol_theme_save') || 'crimson'];

        profilesList.innerHTML = '';
        Object.keys(profiles).forEach(profileName => {
            const profileDiv = document.createElement('div');
            profileDiv.className = 'profile-item'; // NUEVO: Clase para tematización
            profileDiv.style = `
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:10px;
                background:${profileName === currentProfile ? `${temaActual.neon}33` : temaActual.wine};
                border:1px solid ${profileName === currentProfile ? temaActual.neon : temaActual.border};
                border-radius:8px;
                transition:0.3s;
                cursor:pointer;
            `;

            profileDiv.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px; flex:1;">
                    <span style="font-size:20px;">${profileName === currentProfile ? '✅' : '👤'}</span>
                    <span style="color:#fff; font-weight:${profileName === currentProfile ? 'bold' : 'normal'};">${profileName}</span>
                    ${profileName === currentProfile ? `<span style="color:${temaActual.neon}; font-size:11px; margin-left:10px; font-weight:bold;">(ACTIVE)</span>` : ''}
                </div>
                <div style="display:flex; gap:5px;">
                    ${profileName !== 'Default' ? `<button class="delete-profile-btn profile-delete-btn" data-profile="${profileName}" style="padding:5px 10px; border-radius:5px; cursor:pointer; font-size:11px; font-weight:bold; background:${temaActual.wine}; color:${temaActual.neon}; border:1px solid ${temaActual.border};">🗑️</button>` : ''}
                </div>
            `;

            profileDiv.onclick = (e) => {
                if (!e.target.classList.contains('delete-profile-btn')) {
                    switchProfile(profileName);
                }
            };

            profilesList.appendChild(profileDiv);
        });

        // Event listeners para botones de eliminar
        document.querySelectorAll('.delete-profile-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const profileName = btn.dataset.profile;
                if (confirm(`Delete profile "${profileName}"? This cannot be undone.`)) {
                    deleteProfile(profileName);
                }
            };
        });

        // NUEVO: Aplicar tema a los botones recién creados
        aplicarTemaAPerfiles();
    }

    // Función para crear perfil
    function createProfile() {
        const input = document.getElementById('new-profile-name');
        const name = input.value.trim();

        if (!name) {
            alert('Please enter a profile name');
            return;
        }

        if (profiles[name]) {
            alert('Profile already exists');
            return;
        }

        profiles[name] = {
            name: name,
            scenes: [],
            sounds: [],
            visuals: [],
            cutscenes: [],
            loveIncKeywords: ['love', 'kiss', 'hug', 'affection', 'care'],
            loveDecKeywords: ['fight', 'argue', 'angry', 'ignore', 'hate'],
            hungerKeywords: ['eat', 'food', 'meal', 'hungry', 'lunch', 'dinner', 'breakfast']
        };

        localStorage.setItem('rol_profiles', JSON.stringify(profiles));
        input.value = '';
        renderProfilesList();
        alert(`Profile "${name}" created successfully!`);
    }

    // Función para cambiar de perfil
    function switchProfile(profileName) {
        console.log('[Profiles] Attempting to switch to:', profileName);
        console.log('[Profiles] Current profile:', currentProfile);

        if (profileName === currentProfile) {
            console.log('[Profiles] Already on this profile');
            return;
        }

        // Guardar perfil actual antes de cambiar
        console.log('[Profiles] Saving current profile before switch...');
        saveCurrentProfile();

        // Cambiar al nuevo perfil
        currentProfile = profileName;
        localStorage.setItem('rol_current_profile', currentProfile);

        // Cargar datos del perfil
        const profile = profiles[currentProfile];
        console.log('[Profiles] Loading profile data:', profile);

        bibliotecaEscenas = profile.scenes || [];
        bibliotecaSonidos = profile.sounds || [];
        efectosVisuales = profile.visuals || [];
        bibliotecaCutscenes = profile.cutscenes || [];
        loveIncreaseKeywords = profile.loveIncKeywords || [];
        loveDecreaseKeywords = profile.loveDecKeywords || [];
        hungerIncreaseKeywords = profile.hungerKeywords || []; // CORREGIDO: cargar a hungerIncreaseKeywords

        // Guardar en localStorage individual (compatibilidad)
        localStorage.setItem('rol_escenas', JSON.stringify(bibliotecaEscenas));
        localStorage.setItem('rol_sounds', JSON.stringify(bibliotecaSonidos));
        localStorage.setItem('rol_visuals', JSON.stringify(efectosVisuales));
        localStorage.setItem('rol_cutscenes', JSON.stringify(bibliotecaCutscenes));
        localStorage.setItem('rol_love_increase_keywords', JSON.stringify(loveIncreaseKeywords));
        localStorage.setItem('rol_love_decrease_keywords', JSON.stringify(loveDecreaseKeywords));
        localStorage.setItem('rol_hunger_increase_keywords', JSON.stringify(hungerIncreaseKeywords)); // CORREGIDO

        // Recargar la página automáticamente
        console.log(`[Profiles] Reloading page to apply profile: ${profileName}`);
        location.reload();
    }

    // Función para eliminar perfil
    function deleteProfile(profileName) {
        if (profileName === 'Default') {
            alert('Cannot delete Default profile');
            return;
        }

        if (profileName === currentProfile) {
            alert('Cannot delete active profile. Switch to another profile first.');
            return;
        }

        delete profiles[profileName];
        localStorage.setItem('rol_profiles', JSON.stringify(profiles));
        renderProfilesList();
        alert(`Profile "${profileName}" deleted`);
    }

    // Event listener para crear perfil
    setTimeout(() => {
        const createBtn = document.getElementById('create-profile-btn');
        if (createBtn) {
            createBtn.onclick = createProfile;
        }

        const newProfileInput = document.getElementById('new-profile-name');
        if (newProfileInput) {
            newProfileInput.onkeypress = (e) => {
                if (e.key === 'Enter') createProfile();
            };
        }

        renderProfilesList();
    }, 100);

    // Función para guardar datos del perfil actual
    function saveCurrentProfile() {
        if (!profiles[currentProfile]) {
            console.log('[Profiles] Profile not found:', currentProfile);
            return;
        }

        profiles[currentProfile].scenes = bibliotecaEscenas;
        profiles[currentProfile].sounds = bibliotecaSonidos;
        profiles[currentProfile].visuals = efectosVisuales;
        profiles[currentProfile].cutscenes = bibliotecaCutscenes;
        profiles[currentProfile].loveIncKeywords = loveIncreaseKeywords;
        profiles[currentProfile].loveDecKeywords = loveDecreaseKeywords;
        profiles[currentProfile].hungerKeywords = hungerIncreaseKeywords; // CORREGIDO: usar hungerIncreaseKeywords

        localStorage.setItem('rol_profiles', JSON.stringify(profiles));
        console.log(`[Profiles] Saved profile: ${currentProfile}`);
    }

    // Auto-guardar cada 10 segundos (backup)
    setInterval(saveCurrentProfile, 10000);

    // Función helper para guardar después de modificar localStorage
    function syncProfileFromLocalStorage() {
        // Leer desde localStorage y sincronizar con el perfil actual
        bibliotecaEscenas = JSON.parse(localStorage.getItem('rol_escenas') || '[]');
        bibliotecaSonidos = JSON.parse(localStorage.getItem('rol_sounds') || '[]');
        efectosVisuales = JSON.parse(localStorage.getItem('rol_visuals') || '[]');
        bibliotecaCutscenes = JSON.parse(localStorage.getItem('rol_cutscenes') || '[]');
        loveIncreaseKeywords = JSON.parse(localStorage.getItem('rol_love_increase_keywords') || '[]');
        loveDecreaseKeywords = JSON.parse(localStorage.getItem('rol_love_decrease_keywords') || '[]');
        hungerIncreaseKeywords = JSON.parse(localStorage.getItem('rol_hunger_increase_keywords') || '[]'); // CORREGIDO

        // Guardar inmediatamente al perfil
        saveCurrentProfile();
    }

    // ==================== FIN SISTEMA DE PERFILES ====================

    Object.keys(Temas).forEach(key => {
        const btnT = document.createElement('div'); btnT.className = "swatch"; btnT.style.background = Temas[key].wine; btnT.style.color = Temas[key].neon; btnT.innerText = key.toUpperCase();
        btnT.onclick = () => { aplicarTema(key); }; modalTemas.appendChild(btnT);
    });
    const closeT = document.createElement('button'); closeT.innerText = "CLOSE"; closeT.style = "margin-top:10px; cursor:pointer; background:transparent; color:gray; border:none;";
    closeT.onclick = () => modalTemas.style.display = "none"; modalTemas.appendChild(closeT);

    const renderList = (div, list, storageKey, type) => {
        div.innerHTML = "";
        list.forEach((item, i) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "item-row";
            itemDiv.style = "padding:12px; margin-bottom:8px; border-radius:5px; display:flex; justify-content:space-between; align-items:center;";

            // Crear contenido según el tipo
            let contenido = '';
            if (type === 'v') {
                // Visual effects: mostrar emoji y keyword
                contenido = `<div><b>${item.emoji} ${item.key}</b></div>`;
            } else {
                // Scenes y Sounds: mostrar keyword y URL
                contenido = `<div><b>${item.key}</b><br><small style="color:#888;">${item.url}</small></div>`;
            }

            itemDiv.innerHTML = contenido + `<button class="dynamic-modal-btn" style="padding:5px 12px; border-radius:5px; cursor:pointer;">DELETE</button>`;
            itemDiv.querySelector('button').onclick = () => {
                window.delItem(storageKey, i);
            };
            div.appendChild(itemDiv);
        });
    };

    window.delItem = (key, i) => {
        if (key === 'rol_escenas') { bibliotecaEscenas.splice(i,1); localStorage.setItem(key, JSON.stringify(bibliotecaEscenas)); renderList(eList, bibliotecaEscenas, key, 'e'); syncProfileFromLocalStorage(); }
        if (key === 'rol_sounds') { bibliotecaSonidos.splice(i,1); localStorage.setItem(key, JSON.stringify(bibliotecaSonidos)); renderList(sList, bibliotecaSonidos, key, 's'); syncProfileFromLocalStorage(); }
        if (key === 'rol_visuals') { efectosVisuales.splice(i,1); localStorage.setItem(key, JSON.stringify(efectosVisuales)); renderList(vList, efectosVisuales, key, 'v'); syncProfileFromLocalStorage(); }
    };

    const inputStyle = "padding:10px; margin-bottom:5px; border-radius:5px; width:100%; box-sizing:border-box;";
    const btnExp = document.createElement('button'); btnExp.innerText = "📤 EXPORT"; btnExp.className = "dynamic-modal-btn"; btnExp.style = inputStyle + "cursor:pointer;";
    btnExp.onclick = () => {
        // Guardar perfil actual antes de exportar
        saveCurrentProfile();

        const d = {
            profile: currentProfile,
            s: bibliotecaSonidos,
            v: efectosVisuales,
            e: bibliotecaEscenas,
            c: bibliotecaCutscenes,
            loveInc: loveIncreaseKeywords,
            loveDec: loveDecreaseKeywords,
            hunger: hungerKeywords,
            n: localStorage.getItem('rol_notes')
        };
        const blob = new Blob([JSON.stringify(d)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `CrushOn_PLUS_${currentProfile.replace(/\s+/g, '_')}.json`;
        a.click();
    };
    const btnImp = document.createElement('button'); btnImp.innerText = "📥 IMPORT"; btnImp.className = "dynamic-modal-btn"; btnImp.style = inputStyle + "cursor:pointer;";
    const fileIn = document.createElement('input'); fileIn.type = 'file'; fileIn.style.display = 'none';
    btnImp.onclick = () => fileIn.click();
    fileIn.onchange = (e) => {
        const reader = new FileReader(); reader.onload = (re) => {
            const d = JSON.parse(re.target.result);
            if(d.s) {
                // Detectar nombre del perfil del archivo
                const importedProfile = d.profile || 'Imported';

                // Crear o actualizar perfil
                if (!profiles[importedProfile]) {
                    profiles[importedProfile] = {
                        name: importedProfile,
                        scenes: d.e || [],
                        sounds: d.s || [],
                        visuals: d.v || [],
                        cutscenes: d.c || [],
                        loveIncKeywords: d.loveInc || ['love', 'kiss', 'hug'],
                        loveDecKeywords: d.loveDec || ['fight', 'argue', 'angry'],
                        hungerKeywords: d.hunger || ['eat', 'food', 'meal']
                    };
                    localStorage.setItem('rol_profiles', JSON.stringify(profiles));
                }

                // Cargar datos
                localStorage.setItem('rol_sounds', JSON.stringify(d.s));
                localStorage.setItem('rol_visuals', JSON.stringify(d.v));
                localStorage.setItem('rol_escenas', JSON.stringify(d.e));
                if (d.c) localStorage.setItem('rol_cutscenes', JSON.stringify(d.c));
                if (d.loveInc) localStorage.setItem('stats_love_increase_keywords', JSON.stringify(d.loveInc));
                if (d.loveDec) localStorage.setItem('stats_love_decrease_keywords', JSON.stringify(d.loveDec));
                if (d.hunger) localStorage.setItem('stats_hunger_keywords', JSON.stringify(d.hunger));
                if(d.n) localStorage.setItem('rol_notes', d.n);

                alert(`Profile "${importedProfile}" imported successfully!`);
                location.reload();
            }
        }; reader.readAsText(e.target.files[0]);
    };
    modalConfig.append(btnExp, btnImp);

    const mCc = document.createElement('button'); mCc.innerText = "CLOSE"; mCc.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    mCc.onclick = () => modalConfig.style.display = "none"; modalConfig.appendChild(mCc);

    const eList = document.createElement('div'); eList.style = "margin-top:10px; max-height:100px; overflow-y:auto;";
    const ek = document.createElement('input'); ek.placeholder = "Scene Name..."; ek.className = "dynamic-modal-btn"; ek.style = inputStyle;
    const eu = document.createElement('input'); eu.placeholder = "Music Link/ID..."; eu.className = "dynamic-modal-btn"; eu.style = inputStyle;

    const volLabel = document.createElement('div'); volLabel.style = "font-size:12px; margin-top:10px; font-weight:bold;"; volLabel.innerText = "MUSIC VOLUME";
    const volInput = document.createElement('input'); volInput.type = "range"; volInput.min = "0"; volInput.max = "1"; volInput.step = "0.05"; volInput.value = masterVolume; volInput.style = "width:100%; margin-bottom:10px; cursor:pointer;";
    volInput.oninput = () => {
        masterVolume = parseFloat(volInput.value); localStorage.setItem('rol_volume', masterVolume);
        audioPlayer.volume = masterVolume;
        const iframe = ytContainer.querySelector('iframe');
        if (iframe) { iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'setVolume', args: [Math.floor(masterVolume * 100)]}), '*'); }
    };

    const eadd = document.createElement('button'); eadd.innerText = "ADD SCENE"; eadd.className = "dynamic-modal-btn"; eadd.style = inputStyle;
    eadd.onclick = () => { if(ek.value && eu.value) {
        let finalUrl = eu.value;
        if(finalUrl.includes("dropbox.com")) finalUrl = finalUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
        bibliotecaEscenas.push({key: ek.value.toLowerCase(), url: finalUrl});
        localStorage.setItem('rol_escenas', JSON.stringify(bibliotecaEscenas)); ek.value=""; eu.value=""; renderList(eList, bibliotecaEscenas, 'rol_escenas', 'e'); syncProfileFromLocalStorage();
    }};
    modalEscenas.append(ek, eu, eadd, volLabel, volInput, eList);
    const ec = document.createElement('button'); ec.innerText = "CLOSE"; ec.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    ec.onclick = () => modalEscenas.style.display = "none"; modalEscenas.appendChild(ec);

    const sList = document.createElement('div'); sList.style = "margin-top:10px; max-height:100px; overflow-y:auto;";
    const sk = document.createElement('input'); sk.placeholder = "Keyword..."; sk.className = "dynamic-modal-btn"; sk.style = inputStyle;
    const su = document.createElement('input'); su.placeholder = "Sound Link..."; su.className = "dynamic-modal-btn"; su.style = inputStyle;

    const sfxVolLabel = document.createElement('div'); sfxVolLabel.style = "font-size:12px; margin-top:10px; font-weight:bold;"; sfxVolLabel.innerText = "SFX VOLUME";
    const sfxVolInput = document.createElement('input'); sfxVolInput.type = "range"; sfxVolInput.min = "0"; sfxVolInput.max = "1"; sfxVolInput.step = "0.05"; sfxVolInput.value = sfxVolume; sfxVolInput.style = "width:100%; margin-bottom:10px; cursor:pointer;";
    sfxVolInput.oninput = () => { sfxVolume = sfxVolInput.value; localStorage.setItem('rol_sfx_volume', sfxVolume); };

    const sadd = document.createElement('button'); sadd.innerText = "ADD SOUND"; sadd.className = "dynamic-modal-btn"; sadd.style = inputStyle;
    sadd.onclick = () => { if(sk.value && su.value) {
        let finalUrl = su.value;
        if(finalUrl.includes("dropbox.com")) finalUrl = finalUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
        bibliotecaSonidos.push({key: sk.value.toLowerCase(), url: finalUrl});
        localStorage.setItem('rol_sounds', JSON.stringify(bibliotecaSonidos)); sk.value=""; su.value=""; renderList(sList, bibliotecaSonidos, 'rol_sounds', 's'); syncProfileFromLocalStorage();
    }};
    modalSounds.append(sk, su, sadd, sfxVolLabel, sfxVolInput, sList);
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
    vadd.onclick = () => { if(vk.value && ve.value) { efectosVisuales.push({key: vk.value.toLowerCase(), emoji: ve.value, anim: va.value, screen: vs.value}); localStorage.setItem('rol_visuals', JSON.stringify(efectosVisuales)); vk.value=""; ve.value=""; renderList(vList, efectosVisuales, 'rol_visuals', 'v'); syncProfileFromLocalStorage(); }};
    modalVisuals.append(vk, ve, va, vs, vadd, vList);
    const vc = document.createElement('button'); vc.innerText = "CLOSE"; vc.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    vc.onclick = () => modalVisuals.style.display = "none"; modalVisuals.appendChild(vc);

    // NUEVO: Modal de Cutscenes (Videos Cinematográficos)
    const cList = document.createElement('div'); cList.style = "margin-top:10px; max-height:100px; overflow-y:auto;";
    const ck = document.createElement('input'); ck.placeholder = "Keyword..."; ck.className = "dynamic-modal-btn"; ck.style = inputStyle;
    const cu = document.createElement('input'); cu.placeholder = "Video URL (MP4, WEBM)..."; cu.className = "dynamic-modal-btn"; cu.style = inputStyle;

    const cutsceneVolLabel = document.createElement('div'); cutsceneVolLabel.style = "font-size:12px; margin-top:10px; font-weight:bold;"; cutsceneVolLabel.innerText = "CUTSCENE VOLUME";
    const cutsceneVolInput = document.createElement('input'); cutsceneVolInput.type = "range"; cutsceneVolInput.min = "0"; cutsceneVolInput.max = "1"; cutsceneVolInput.step = "0.05"; cutsceneVolInput.value = cutsceneVolume; cutsceneVolInput.style = "width:100%; margin-bottom:10px; cursor:pointer;";
    cutsceneVolInput.oninput = () => { cutsceneVolume = parseFloat(cutsceneVolInput.value); localStorage.setItem('rol_cutscene_volume', cutsceneVolume); };

    function actualizarListaCutscenes() { const lista = cList; lista.innerHTML = ""; bibliotecaCutscenes.forEach((c, i) => { const item = document.createElement('div'); item.className = "item-row"; item.style = "padding:12px; margin-bottom:8px; border-radius:5px; display:flex; justify-content:space-between; align-items:center;"; item.innerHTML = `<div><b>${c.key}</b><br><small>${c.url}</small></div><button class="dynamic-modal-btn" style="padding:5px 12px; border-radius:5px; cursor:pointer;">DELETE</button>`; item.querySelector('button').onclick = () => { bibliotecaCutscenes.splice(i, 1); localStorage.setItem('rol_cutscenes', JSON.stringify(bibliotecaCutscenes)); actualizarListaCutscenes(); syncProfileFromLocalStorage(); }; lista.appendChild(item); }); }

    const cadd = document.createElement('button'); cadd.innerText = "ADD CUTSCENE"; cadd.className = "dynamic-modal-btn"; cadd.style = inputStyle;
    cadd.onclick = () => { if(ck.value && cu.value) {
        let finalUrl = cu.value;
        if(finalUrl.includes("dropbox.com")) finalUrl = finalUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
        bibliotecaCutscenes.push({key: ck.value.toLowerCase(), url: finalUrl});
        localStorage.setItem('rol_cutscenes', JSON.stringify(bibliotecaCutscenes)); ck.value=""; cu.value=""; actualizarListaCutscenes(); syncProfileFromLocalStorage();
    }};
    modalCutscenes.append(ck, cu, cadd, cutsceneVolLabel, cutsceneVolInput, cList);
    const cc = document.createElement('button'); cc.innerText = "CLOSE"; cc.style="color:#888; background:transparent; border:none; margin-top:5px; cursor:pointer; width:100%;";
    cc.onclick = () => modalCutscenes.style.display = "none"; modalCutscenes.appendChild(cc);
    actualizarListaCutscenes();

    // CONFIGURACIÓN DE STATS - Sistema completo con palabras clave
    const statsContent = document.createElement('div');
    statsContent.style = "max-height:400px; overflow-y:auto; padding-right:5px;";

    // Sección: Love Increase
    const loveIncSection = document.createElement('div');
    loveIncSection.style = "margin-bottom:15px; padding:10px; background:rgba(255,20,147,0.1); border-radius:8px; border:1px solid rgba(255,20,147,0.3);";
    loveIncSection.innerHTML = '<div style="font-weight:bold; margin-bottom:8px; color:#ff69b4;"💖 LOVE INCREASE KEYWORDS</div>';

    const loveIncInput = document.createElement('input');
    loveIncInput.placeholder = "e.g., kiss, hug, love...";
    loveIncInput.className = "dynamic-modal-btn";
    loveIncInput.style = inputStyle;

    const loveIncAdd = document.createElement('button');
    loveIncAdd.innerText = "ADD";
    loveIncAdd.className = "dynamic-modal-btn";
    loveIncAdd.style = inputStyle + "; cursor:pointer;";
    loveIncAdd.onclick = () => {
        if (loveIncInput.value.trim()) {
            loveIncreaseKeywords.push(loveIncInput.value.trim());
            localStorage.setItem('rol_love_increase_keywords', JSON.stringify(loveIncreaseKeywords));
            loveIncInput.value = '';
            actualizarListasStats();
        }
    };

    const loveIncList = document.createElement('div');
    loveIncList.className = 'love-inc-list';
    loveIncList.style = "margin-top:8px;";

    loveIncSection.append(loveIncInput, loveIncAdd, loveIncList);

    // Sección: Love Decrease
    const loveDecSection = document.createElement('div');
    loveDecSection.style = "margin-bottom:15px; padding:10px; background:rgba(128,0,128,0.1); border-radius:8px; border:1px solid rgba(128,0,128,0.3);";
    loveDecSection.innerHTML = '<div style="font-weight:bold; margin-bottom:8px; color:#d946ef;">💔 LOVE DECREASE KEYWORDS</div>';

    const loveDecInput = document.createElement('input');
    loveDecInput.placeholder = "e.g., fight, argue, angry...";
    loveDecInput.className = "dynamic-modal-btn";
    loveDecInput.style = inputStyle;

    const loveDecAdd = document.createElement('button');
    loveDecAdd.innerText = "ADD";
    loveDecAdd.className = "dynamic-modal-btn";
    loveDecAdd.style = inputStyle + "; cursor:pointer;";
    loveDecAdd.onclick = () => {
        if (loveDecInput.value.trim()) {
            loveDecreaseKeywords.push(loveDecInput.value.trim());
            localStorage.setItem('rol_love_decrease_keywords', JSON.stringify(loveDecreaseKeywords));
            loveDecInput.value = '';
            actualizarListasStats();
        }
    };

    const loveDecList = document.createElement('div');
    loveDecList.className = 'love-dec-list';
    loveDecList.style = "margin-top:8px;";

    loveDecSection.append(loveDecInput, loveDecAdd, loveDecList);

    // Sección: Hunger Increase
    const hungerIncSection = document.createElement('div');
    hungerIncSection.style = "margin-bottom:15px; padding:10px; background:rgba(255,165,0,0.1); border-radius:8px; border:1px solid rgba(255,165,0,0.3);";
    hungerIncSection.innerHTML = '<div style="font-weight:bold; margin-bottom:8px; color:#ffa500;">🍔 HUNGER INCREASE KEYWORDS</div>';

    const hungerIncInput = document.createElement('input');
    hungerIncInput.placeholder = "e.g., eat, eating, devour...";
    hungerIncInput.className = "dynamic-modal-btn";
    hungerIncInput.style = inputStyle;

    const hungerIncAdd = document.createElement('button');
    hungerIncAdd.innerText = "ADD";
    hungerIncAdd.className = "dynamic-modal-btn";
    hungerIncAdd.style = inputStyle + "; cursor:pointer;";
    hungerIncAdd.onclick = () => {
        if (hungerIncInput.value.trim()) {
            hungerIncreaseKeywords.push(hungerIncInput.value.trim());
            localStorage.setItem('rol_hunger_increase_keywords', JSON.stringify(hungerIncreaseKeywords));
            hungerIncInput.value = '';
            actualizarListasStats();
        }
    };

    const hungerIncList = document.createElement('div');
    hungerIncList.className = 'hunger-inc-list';
    hungerIncList.style = "margin-top:8px;";

    hungerIncSection.append(hungerIncInput, hungerIncAdd, hungerIncList);

    // Nota sobre hunger decrease
    const hungerNote = document.createElement('div');


    // Botones de reset
    const resetBtns = document.createElement('div');
    resetBtns.style = "display:flex; gap:5px; margin-bottom:10px;";

    // Variable para debug mode
    let debugModeActivo = false;

    // NUEVO: Atajo de teclado para activar debug mode (Ctrl+Shift+D)
    document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+D para activar/desactivar debug mode
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            const testSection = document.getElementById('manual-testing-section');
            if (testSection) {
                debugModeActivo = !debugModeActivo;
                testSection.style.display = debugModeActivo ? 'block' : 'none';

                // Mostrar notificación
                const notification = document.createElement('div');
                notification.textContent = debugModeActivo ? '🧪 Debug Mode Activated!' : '🧪 Debug Mode Deactivated!';
                notification.style = `position:fixed; top:20px; left:50%; transform:translateX(-50%);
                    background: ${debugModeActivo ? '#00ff00' : '#ff4444'}; color:#000; padding:12px 24px;
                    border-radius:8px; font-weight:bold; z-index:9999999;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                    animation: slideDown 0.3s ease;`;

                // Agregar animación
                const style = document.createElement('style');
                style.innerHTML = '@keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }';
                document.head.appendChild(style);

                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 2000);

                console.log(`[CrushOn AI PLUS] Debug Mode: ${debugModeActivo ? 'ON' : 'OFF'}`);
            }
        }
    });

    const resetLove = document.createElement('button');
    resetLove.innerText = "RESET LOVE";
    resetLove.className = "dynamic-modal-btn";
    resetLove.style = "flex:1; padding:8px; font-size:11px; cursor:pointer;";
    resetLove.onclick = () => {
        // Reset normal
        if (confirm('Reset Love to 75%?')) {
            loveLevel = 75;
            actualizarBarrasStats();
        }
    };

    const resetHunger = document.createElement('button');
    resetHunger.innerText = "RESET HUNGER";
    resetHunger.className = "dynamic-modal-btn";
    resetHunger.style = "flex:1; padding:8px; font-size:11px; cursor:pointer;";
    resetHunger.onclick = () => {
        if (confirm('Reset Hunger to 100%?')) {
            hungerLevel = 100;
            actualizarBarrasStats();
        }
    };

    resetBtns.append(resetLove, resetHunger);

    // Función para actualizar las listas de keywords
    function actualizarListasStats() {
        // Love Increase
        loveIncList.innerHTML = '';
        loveIncreaseKeywords.forEach((kw, i) => {
            const item = document.createElement('div');
            item.className = "item-row";
            item.style = "padding:6px 8px; margin-bottom:4px; font-size:12px; display:flex; justify-content:space-between; align-items:center;";
            item.innerHTML = `<span>${kw}</span><button class="dynamic-modal-btn" style="padding:3px 8px; font-size:10px; cursor:pointer;">DEL</button>`;
            item.querySelector('button').onclick = () => {
                loveIncreaseKeywords.splice(i, 1);
                localStorage.setItem('rol_love_increase_keywords', JSON.stringify(loveIncreaseKeywords));
                actualizarListasStats();
            };
            loveIncList.appendChild(item);
        });

        // Love Decrease
        loveDecList.innerHTML = '';
        loveDecreaseKeywords.forEach((kw, i) => {
            const item = document.createElement('div');
            item.className = "item-row";
            item.style = "padding:6px 8px; margin-bottom:4px; font-size:12px; display:flex; justify-content:space-between; align-items:center;";
            item.innerHTML = `<span>${kw}</span><button class="dynamic-modal-btn" style="padding:3px 8px; font-size:10px; cursor:pointer;">DEL</button>`;
            item.querySelector('button').onclick = () => {
                loveDecreaseKeywords.splice(i, 1);
                localStorage.setItem('rol_love_decrease_keywords', JSON.stringify(loveDecreaseKeywords));
                actualizarListasStats();
            };
            loveDecList.appendChild(item);
        });

        // Hunger Increase
        hungerIncList.innerHTML = '';
        hungerIncreaseKeywords.forEach((kw, i) => {
            const item = document.createElement('div');
            item.className = "item-row";
            item.style = "padding:6px 8px; margin-bottom:4px; font-size:12px; display:flex; justify-content:space-between; align-items:center;";
            item.innerHTML = `<span>${kw}</span><button class="dynamic-modal-btn" style="padding:3px 8px; font-size:10px; cursor:pointer;">DEL</button>`;
            item.querySelector('button').onclick = () => {
                hungerIncreaseKeywords.splice(i, 1);
                localStorage.setItem('rol_hunger_increase_keywords', JSON.stringify(hungerIncreaseKeywords));
                actualizarListasStats();
            };
            hungerIncList.appendChild(item);
        });
    }

    // NUEVO: Sección de testeo manual
    const testSection = document.createElement('div');
    testSection.id = 'manual-testing-section';
    testSection.style = "margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px; border:1px solid rgba(255,255,255,0.2); display:none;"; // OCULTO por defecto
    testSection.innerHTML = `
        <div style="font-weight:bold; margin-bottom:12px; color:#fff; text-align:center; font-size:14px;">🧪 MANUAL TESTING (Debug Mode)</div>
        <div style="margin-bottom:12px;">
            <div style="font-weight:bold; margin-bottom:5px; color:#ff69b4; font-size:12px;"💖 Love Level</div>
            <div style="display:flex; gap:8px; align-items:center;">
                <input type="number" id="test-love-input" min="0" max="100" value="${loveLevel}" placeholder="0-100"
                    style="flex:1; padding:8px; border-radius:5px; border:1px solid rgba(255,20,147,0.5); background:rgba(26,5,16,0.6); color:#ff69b4; font-size:12px;" />
                <button id="test-love-btn" class="dynamic-modal-btn" style="padding:8px 15px; cursor:pointer; font-size:12px;">SET</button>
            </div>
        </div>
        <div>
            <div style="font-weight:bold; margin-bottom:5px; color:#ffa500; font-size:12px;">🍔 Hunger Level</div>
            <div style="display:flex; gap:8px; align-items:center;">
                <input type="number" id="test-hunger-input" min="0" max="100" value="${hungerLevel}" placeholder="0-100"
                    style="flex:1; padding:8px; border-radius:5px; border:1px solid rgba(255,140,0,0.5); background:rgba(26,16,5,0.6); color:#ffa500; font-size:12px;" />
                <button id="test-hunger-btn" class="dynamic-modal-btn" style="padding:8px 15px; cursor:pointer; font-size:12px;">SET</button>
            </div>
        </div>
    `;

    statsContent.append(loveIncSection, loveDecSection, hungerIncSection, hungerNote, resetBtns, testSection);
    modalStatsConfig.appendChild(statsContent);

    const statsClose = document.createElement('button');
    statsClose.innerText = "CLOSE";
    statsClose.style = "color:#888; background:transparent; border:none; margin-top:10px; cursor:pointer; width:100%;";
    statsClose.onclick = () => modalStatsConfig.style.display = "none";
    modalStatsConfig.appendChild(statsClose);

    // Event listeners para los botones de testeo
    setTimeout(() => {
        const testLoveBtn = document.getElementById('test-love-btn');
        const testLoveInput = document.getElementById('test-love-input');
        const testHungerBtn = document.getElementById('test-hunger-btn');
        const testHungerInput = document.getElementById('test-hunger-input');

        if (testLoveBtn && testLoveInput) {
            testLoveBtn.onclick = () => {
                const newValue = parseInt(testLoveInput.value);
                if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                    loveLevel = newValue;
                    actualizarBarrasStats();
                    // Resetear el tracking para que pueda volver a notificar
                    lastLoveNotification = newValue <= 0 ? 0 : newValue <= 25 ? 25 : newValue <= 50 ? 50 : newValue <= 75 ? 75 : 100;
                    console.log('[Stats Test] Love set to:', newValue);
                }
            };
        }

        if (testHungerBtn && testHungerInput) {
            testHungerBtn.onclick = () => {
                const newValue = parseInt(testHungerInput.value);
                if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                    hungerLevel = newValue;
                    actualizarBarrasStats();
                    // Resetear el tracking para que pueda volver a notificar
                    lastHungerNotification = newValue <= 0 ? 0 : newValue <= 25 ? 25 : newValue <= 50 ? 50 : newValue <= 75 ? 75 : 100;
                    console.log('[Stats Test] Hunger set to:', newValue);
                }
            };
        }
    }, 100);

    actualizarListasStats();

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
        const g = document.createElement('button');
        g.className = "gear-hide";
        g.style = `position:absolute; bottom:${bottom + 5}px; left:65px; width:40px; height:40px; border:2px solid #721c47; border-radius:50%; cursor:pointer; font-size:20px; z-index:1000003; transition: 0.3s;`;

        // NUEVO: Span interno solo para el emoji (así el filtro no afecta al fondo)
        const gearIcon = document.createElement('span');
        gearIcon.className = 'gear-icon';
        gearIcon.textContent = '⚙️';
        g.appendChild(gearIcon);

        sidebar.appendChild(g);
        return g;
    }

    // NUEVO: Botón de perfiles (ARRIBA DE TODO - SEPARADO)
    const profileBtn = createBtn("👤", 910, false);

    const musicBtn = createBtn("🎵", 490, false), musicGear = createGear(490);
    const cutsceneBtn = createBtn("🎥", 430, false), cutsceneGear = createGear(430); // CAMBIADO: 🎥 en lugar de 🎬
    const soundBtn = createBtn("🔊", 370, false), soundGear = createGear(370); // CAMBIADO: 🔊 en lugar de 🔇
    const visualBtn = createBtn("⭐", 310, false), visualGear = createGear(310);
    const statsBtn = createBtn("🍖", 250, false), statsGear = createGear(250); // NUEVO: Botón de stats (amor/comida)

    // NUEVO: Botón de juegos con botones laterales
    const gamesBtn = createBtn("🎮", 190, false);
    const coinBtn = createBtn("🟡", 190, false);
    const diceBtn = createBtn("🎲", 190, false);
    const truthDareBtn = createBtn("🎯", 190, false);

    // Cambiar el posicionamiento - salen hacia la derecha del sidebar (izquierda de la pantalla)
    coinBtn.style.position = "fixed";
    coinBtn.style.left = "10px";  // Empiezan en la misma posición que el sidebar
    coinBtn.style.bottom = "190px";
    coinBtn.style.opacity = "0";
    coinBtn.style.pointerEvents = "none";
    coinBtn.style.transition = "all 0.3s ease";

    diceBtn.style.position = "fixed";
    diceBtn.style.left = "10px";  // Empiezan en la misma posición que el sidebar
    diceBtn.style.bottom = "190px";
    diceBtn.style.opacity = "0";
    diceBtn.style.pointerEvents = "none";
    diceBtn.style.transition = "all 0.3s ease";

    truthDareBtn.style.position = "fixed";
    truthDareBtn.style.left = "10px";  // Empiezan en la misma posición que el sidebar
    truthDareBtn.style.bottom = "190px";
    truthDareBtn.style.opacity = "0";
    truthDareBtn.style.pointerEvents = "none";
    truthDareBtn.style.transition = "all 0.3s ease";

    const noteBtn = createBtn("📝", 130, false), themeBtn = createBtn("🎨", 70, false), configBtn = createBtn("⚙️", 10, false);

    const notePanel = document.createElement('div');
    notePanel.style = `position:fixed; top:0; left:-400px; width:400px; height:100vh; z-index:999999; transition:left 0.4s; display:flex; flex-direction:column;`;

    // Header del notebook con título y botones
    const noteHeader = document.createElement('div');
    noteHeader.style = `padding:20px; display:flex; justify-content:space-between; align-items:center;`;
    noteHeader.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <button id="note-back-btn" style="border-radius:5px; padding:5px 10px; cursor:pointer; font-size:14px; transition:0.3s; display:flex; align-items:center; justify-content:center; width:35px; height:35px; border:1px solid;">←</button>
            <div style="font-weight:bold; font-size:18px;">📝 NOTEBOOK</div>
        </div>
        <div style="display:flex; gap:10px;">
            <button id="note-clear-btn" style="border-radius:5px; padding:5px 10px; cursor:pointer; font-size:12px; transition:0.3s; border:1px solid;">🗑️ Clear</button>
            <button id="note-export-btn" style="border-radius:5px; padding:5px 10px; cursor:pointer; font-size:12px; transition:0.3s; border:1px solid;">💾 Export</button>
        </div>
    `;
    notePanel.appendChild(noteHeader);

    // Pestañas para organizar notas
    const noteTabs = document.createElement('div');
    noteTabs.style = `display:flex; padding:10px 20px; gap:10px;`;
    noteTabs.innerHTML = `
        <button class="note-tab active" data-tab="main" style="border-radius:5px 5px 0 0; padding:8px 15px; cursor:pointer; font-size:13px; font-weight:bold; transition:0.3s; border:1px solid;">Main Notes</button>
        <button class="note-tab" data-tab="char" style="border-radius:5px 5px 0 0; padding:8px 15px; cursor:pointer; font-size:13px; transition:0.3s; border:1px solid;">Character</button>
        <button class="note-tab" data-tab="plot" style="border-radius:5px 5px 0 0; padding:8px 15px; cursor:pointer; font-size:13px; transition:0.3s; border:1px solid;">Plot</button>
    `;
    notePanel.appendChild(noteTabs);

    // Contenedor de textareas
    const noteContent = document.createElement('div');
    noteContent.style = `flex-grow:1; padding:20px; overflow-y:auto; position:relative;`;

    // Crear 3 textareas (una por pestaña)
    const txt = document.createElement('textarea');
    txt.id = "note-main";
    txt.style = `width:100%; height:100%; padding:15px; resize:none; outline:none; border-radius:8px; font-family:monospace; font-size:14px; line-height:1.6; border:1px solid;`;
    txt.placeholder = "Write your main notes here...\n\n• Use bullet points\n• Track important events\n• Save character details";
    txt.value = localStorage.getItem('rol_notes_main')||"";
    txt.oninput = () => localStorage.setItem('rol_notes_main', txt.value);

    const txtChar = document.createElement('textarea');
    txtChar.id = "note-char";
    txtChar.style = `width:100%; height:100%; padding:15px; resize:none; outline:none; border-radius:8px; font-family:monospace; font-size:14px; line-height:1.6; display:none; border:1px solid;`;
    txtChar.placeholder = "Character information:\n\n• Name:\n• Personality:\n• Background:\n• Goals:\n• Relationships:";
    txtChar.value = localStorage.getItem('rol_notes_char')||"";
    txtChar.oninput = () => localStorage.setItem('rol_notes_char', txtChar.value);

    const txtPlot = document.createElement('textarea');
    txtPlot.id = "note-plot";
    txtPlot.style = `width:100%; height:100%; padding:15px; resize:none; outline:none; border-radius:8px; font-family:monospace; font-size:14px; line-height:1.6; display:none; border:1px solid;`;
    txtPlot.placeholder = "Plot tracking:\n\n• Current arc:\n• Key events:\n• Unresolved threads:\n• Next steps:";
    txtPlot.value = localStorage.getItem('rol_notes_plot')||"";
    txtPlot.oninput = () => localStorage.setItem('rol_notes_plot', txtPlot.value);

    noteContent.appendChild(txt);
    noteContent.appendChild(txtChar);
    noteContent.appendChild(txtPlot);
    notePanel.appendChild(noteContent);

    // Footer con contador de caracteres
    const noteFooter = document.createElement('div');
    noteFooter.style = `padding:15px 20px; font-size:12px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid;`;
    noteFooter.innerHTML = `
        <span id="char-count">0 characters</span>
        <span id="word-count">0 words</span>
    `;
    notePanel.appendChild(noteFooter);

    document.body.appendChild(notePanel);

    // Funcionalidad de pestañas
    let activeTab = 'main';
    const tabs = noteTabs.querySelectorAll('.note-tab');
    tabs.forEach(tab => {
        tab.onclick = () => {
            const tabName = tab.dataset.tab;
            activeTab = tabName;

            const t = window.currentTheme || Temas.crimson;

            // Actualizar estilos de pestañas
            tabs.forEach(tTab => {
                if (tTab.dataset.tab === tabName) {
                    tTab.style.background = `${t.neon}33`;
                    tTab.style.color = t.neon;
                    tTab.style.borderColor = t.neon;
                    tTab.classList.add('active');
                } else {
                    tTab.style.background = t.wine;
                    tTab.style.color = t.neon;
                    tTab.style.borderColor = t.border;
                    tTab.classList.remove('active');
                }
            });

            // Mostrar textarea correspondiente
            txt.style.display = tabName === 'main' ? 'block' : 'none';
            txtChar.style.display = tabName === 'char' ? 'block' : 'none';
            txtPlot.style.display = tabName === 'plot' ? 'block' : 'none';

            updateCharCount();
        };

        // Hover effect
        tab.onmouseenter = function() {
            if (!this.classList.contains('active')) {
                const t = window.currentTheme || Temas.crimson;
                this.style.background = t.wine;
                this.style.borderColor = t.neon;
            }
        };
        tab.onmouseleave = function() {
            if (!this.classList.contains('active')) {
                const t = window.currentTheme || Temas.crimson;
                this.style.background = t.dark;
                this.style.borderColor = t.border;
            }
        };
    });

    // Función para actualizar contador
    function updateCharCount() {
        const activeTextarea = activeTab === 'main' ? txt : (activeTab === 'char' ? txtChar : txtPlot);
        const text = activeTextarea.value;
        const charCount = text.length;
        const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

        noteFooter.querySelector('#char-count').textContent = `${charCount} characters`;
        noteFooter.querySelector('#word-count').textContent = `${wordCount} words`;
    }

    txt.oninput = () => { localStorage.setItem('rol_notes_main', txt.value); updateCharCount(); };
    txtChar.oninput = () => { localStorage.setItem('rol_notes_char', txtChar.value); updateCharCount(); };
    txtPlot.oninput = () => { localStorage.setItem('rol_notes_plot', txtPlot.value); updateCharCount(); };

    // Botón de regreso
    noteHeader.querySelector('#note-back-btn').onclick = () => {
        notePanel.style.left = "-400px";
    };

    // Botón Clear
    noteHeader.querySelector('#note-clear-btn').onclick = () => {
        if (confirm('¿Estás seguro de que quieres borrar las notas de esta pestaña?')) {
            const activeTextarea = activeTab === 'main' ? txt : (activeTab === 'char' ? txtChar : txtPlot);
            activeTextarea.value = '';
            localStorage.setItem(`rol_notes_${activeTab}`, '');
            updateCharCount();
        }
    };

    // Botón Export
    noteHeader.querySelector('#note-export-btn').onclick = () => {
        const allNotes = `=== MAIN NOTES ===\n${txt.value}\n\n=== CHARACTER ===\n${txtChar.value}\n\n=== PLOT ===\n${txtPlot.value}`;
        const blob = new Blob([allNotes], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crushon-notes-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Hover effects para botones del header
    noteHeader.querySelectorAll('button').forEach(btn => {
        btn.onmouseenter = function() {
            const t = window.currentTheme || Temas.crimson;
            this.style.background = `${t.neon}33`;
        };
        btn.onmouseleave = function() {
            const t = window.currentTheme || Temas.crimson;
            this.style.background = t.wine;
        };
    });

    updateCharCount();

    // NUEVA FUNCIÓN: Ejecuta la transición cinematográfica de escena
    function mostrarTransicionEscena(nombreEscena) {
        // Paso 1: Fade to black (más rápido: 500ms)
        sceneTransitionOverlay.classList.add('active');

        // Paso 2: Esperar a que esté completamente negro
        setTimeout(() => {
            // Separar el título en letras individuales con spans para animarlas
            const titulo = sceneTitleDisplay.querySelector('h1');
            const texto = nombreEscena.toUpperCase();

            // Crear un span por cada letra (incluyendo espacios)
            titulo.innerHTML = '';
            for (let i = 0; i < texto.length; i++) {
                const letra = texto[i];
                const span = document.createElement('span');
                span.textContent = letra === ' ' ? '\u00A0' : letra; // Usar non-breaking space para espacios
                if (letra === ' ') {
                    span.style.width = '0.3em'; // Espaciado entre palabras
                }
                titulo.appendChild(span);
            }

            sceneTitleDisplay.classList.add('show');

            // Paso 3: Esperar 1s y empezar a quitar el negro (más rápido)
            setTimeout(() => {
                sceneTransitionOverlay.classList.remove('active');

                // Paso 4: Limpiar después de que termine la animación del título
                setTimeout(() => {
                    sceneTitleDisplay.classList.remove('show');
                }, 2000);
            }, 1000);
        }, 500);
    }

    function ejecutarCambioLimpio(escena) {
        // NUEVO: Iniciar transición visual
        mostrarTransicionEscena(escena.key);

        musicBtn.querySelector('.btn-icon').classList.remove('music-playing');
        ytContainer.innerHTML = ""; audioPlayer.pause(); audioPlayer.src = ""; actualUrl = escena.url;
        setTimeout(() => {
            const vVal = Math.floor(masterVolume * 100);
            if (escena.url.includes("dropboxusercontent.com") || escena.url.includes(".mp3")) { audioPlayer.src = escena.url; audioPlayer.volume = masterVolume; audioPlayer.play().catch(() => {}); }
            else {
                let id = escena.url; if(id.includes("v=")) id = id.split("v=")[1].split("&")[0]; else if(id.includes("youtu.be/")) id = id.split("youtu.be/")[1];
                ytContainer.innerHTML = `<iframe width="1" height="1" src="https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&enablejsapi=1&volume=0" frameborder="0" allow="autoplay"></iframe>`;
                setTimeout(() => { const i = ytContainer.querySelector('iframe'); if(i) i.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'setVolume', args: [vVal]}), '*'); }, 1000);
            } musicBtn.querySelector('.btn-icon').classList.add('music-playing');
        }, 600);
    }

    function escanearEscenaActual() {
        if (!ambienteActivo) return;

        // NUEVO: Verificar si hay múltiples tarjetas de escena visibles
        const tarjetasEscena = document.querySelectorAll('span.text-xs.font-bold, span[class*="font-bold"]');
        let tarjetasVisibles = 0;

        tarjetasEscena.forEach(span => {
            // Verificar si la tarjeta es parte del modal de escenas
            const parentModal = span.closest('div[class*="fixed"][class*="inset-0"]');
            if (parentModal && window.getComputedStyle(parentModal).display !== 'none') {
                tarjetasVisibles++;
            }
        });

        // Si hay más de una tarjeta visible, es el modal de selección - NO activar transición
        if (tarjetasVisibles > 1) {
            console.log('[CrushOn AI PLUS] Modal de escenas detectado - transición desactivada');
            return;
        }

        const texto = document.body.innerText.toLowerCase();
        for (let e of bibliotecaEscenas) {
            if (texto.includes(e.key.toLowerCase()) && actualUrl !== e.url) {
                ejecutarCambioLimpio(e);
                break;
            }
        }
    }

    profileBtn.onclick = () => modalProfiles.style.display = "flex";
    configBtn.onclick = () => modalConfig.style.display = "flex";
    themeBtn.onclick = () => modalTemas.style.display = "flex";
    musicBtn.onclick = () => {
        ambienteActivo = !ambienteActivo; const icon = musicBtn.querySelector('.btn-icon');
        // CAMBIADO: Mantener siempre el emoji 🎵
        icon.className = "btn-icon " + (ambienteActivo ? "icon-active" : "icon-muted");
        if (!ambienteActivo) { ytContainer.innerHTML = ""; audioPlayer.pause(); actualUrl = ""; icon.classList.remove('music-playing'); musicBtn.classList.remove('glowing-btn'); }
        else { musicBtn.classList.add('glowing-btn'); escanearEscenaActual(); }
    };
    soundBtn.onclick = () => { sonidosActivos = !sonidosActivos; soundBtn.querySelector('.btn-icon').className = "btn-icon " + (sonidosActivos ? "icon-active" : "icon-muted"); soundBtn.classList.toggle('glowing-btn', sonidosActivos); };
    visualBtn.onclick = () => { visualesActivos = !visualesActivos; visualBtn.querySelector('.btn-icon').className = "btn-icon " + (visualesActivos ? "icon-active" : "icon-muted"); visualBtn.classList.toggle('glowing-btn', visualesActivos); };
    cutsceneBtn.onclick = () => { cutscenesActivos = !cutscenesActivos; cutsceneBtn.querySelector('.btn-icon').className = "btn-icon " + (cutscenesActivos ? "icon-active" : "icon-muted"); cutsceneBtn.classList.toggle('glowing-btn', cutscenesActivos); };
    statsBtn.onclick = () => {
        statsActivo = !statsActivo;
        statsBtn.querySelector('.btn-icon').className = "btn-icon " + (statsActivo ? "icon-active" : "icon-muted");
        statsBtn.classList.toggle('glowing-btn', statsActivo);

        if (statsActivo) {
            mostrarBarrasStats();
        } else {
            ocultarBarrasStats();
        }
    };

    // NUEVO: Interceptar ENTER para agregar mensaje de stats al final
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && statsActivo) {
            const textarea = document.querySelector('textarea.min-h-8') ||
                            document.querySelector('textarea[placeholder*="Enter"]') ||
                            document.querySelector('textarea[placeholder*="Presiona"]');

            if (textarea && textarea === document.activeElement && textarea.value.trim()) {
                if (pendingStatsMessage) {
                    // Prevenir el envío normal
                    e.preventDefault();
                    e.stopPropagation();

                    // Agregar el mensaje de stats al final del texto del usuario
                    const userText = textarea.value;
                    const fullMessage = userText + pendingStatsMessage;
                    textarea.value = fullMessage;

                    // Trigger event para que la web detecte el cambio
                    const inputEvent = new Event('input', { bubbles: true });
                    textarea.dispatchEvent(inputEvent);

                    console.log('[Stats] Mensaje completo:', fullMessage);

                    // Limpiar mensaje pendiente
                    pendingStatsMessage = "";

                    // Esperar un momento y simular Enter nuevamente para enviar
                    setTimeout(() => {
                        const enterEvent = new KeyboardEvent('keydown', {
                            key: 'Enter',
                            code: 'Enter',
                            keyCode: 13,
                            which: 13,
                            bubbles: true,
                            cancelable: true
                        });
                        textarea.dispatchEvent(enterEvent);
                    }, 50);
                }
            }
        }
    }, true); // Usar capture phase para interceptar antes

    // NUEVO: Funcionalidad del botón de juegos - mostrar botones laterales
    let gamesTimeout;

    function showGameButtons() {
        clearTimeout(gamesTimeout);
        coinBtn.style.left = "70px";
        coinBtn.style.opacity = "1";
        coinBtn.style.pointerEvents = "auto";

        diceBtn.style.left = "130px";
        diceBtn.style.opacity = "1";
        diceBtn.style.pointerEvents = "auto";

        truthDareBtn.style.left = "190px";
        truthDareBtn.style.opacity = "1";
        truthDareBtn.style.pointerEvents = "auto";
    }

    function hideGameButtons() {
        gamesTimeout = setTimeout(() => {
            coinBtn.style.left = "10px";
            coinBtn.style.opacity = "0";
            coinBtn.style.pointerEvents = "none";

            diceBtn.style.left = "10px";
            diceBtn.style.opacity = "0";
            diceBtn.style.pointerEvents = "none";

            truthDareBtn.style.left = "10px";
            truthDareBtn.style.opacity = "0";
            truthDareBtn.style.pointerEvents = "none";
        }, 500);
    }

    gamesBtn.onmouseenter = showGameButtons;
    gamesBtn.onmouseleave = hideGameButtons;

    coinBtn.onmouseenter = showGameButtons;
    coinBtn.onmouseleave = hideGameButtons;

    diceBtn.onmouseenter = showGameButtons;
    diceBtn.onmouseleave = hideGameButtons;

    truthDareBtn.onmouseenter = showGameButtons;
    truthDareBtn.onmouseleave = hideGameButtons;

    // Event listeners para los juegos
    diceBtn.onclick = () => {
        const result = Math.floor(Math.random() * 20) + 1;
        const resultElement = diceAnimationOverlay.querySelector('.dice-result');
        resultElement.textContent = `${result}`;
        diceAnimationOverlay.classList.add('active');
        setTimeout(() => { diceAnimationOverlay.classList.remove('active'); }, 3500);
    };

    coinBtn.onclick = () => {
        const isHeads = Math.random() < 0.5;
        const resultElement = coinAnimationOverlay.querySelector('.coin-result');
        const coinVisual = coinAnimationOverlay.querySelector('.coin-visual');

        // Iniciar con moneda blanca
        coinVisual.textContent = "⚪";

        // Mostrar overlay
        coinAnimationOverlay.classList.add('active');

        // Después de 1.5 segundos (cuando termina la animación de giro), mostrar el resultado
        setTimeout(() => {
            resultElement.textContent = isHeads ? "HEADS" : "TAILS";

            // Cambiar color del texto y emoji de la moneda según resultado
            if (isHeads) {
                resultElement.style.color = "#FFD700";  // Amarillo dorado
                coinVisual.textContent = "🟡";  // Moneda amarilla
            } else {
                resultElement.style.color = "#FF0000";  // Rojo
                coinVisual.textContent = "🔴";  // Moneda roja
            }
        }, 1500);

        // Cerrar después de 3.5 segundos
        setTimeout(() => { coinAnimationOverlay.classList.remove('active'); }, 3500);
    };

    // NUEVO: Truth or Dare game

    // Listas de preguntas y retos picantes
const truthQuestions = [
    "What kind of attention makes you feel the most desired?",
    "Have you ever imagined getting closer to someone like this before?",
    "What part of this moment is affecting you the most right now?",
    "Do you enjoy tension building slowly, or getting straight to the point?",
    "What kind of look instantly makes you weak?",
    "How do you usually react when someone clearly wants you?",
    "What kind of closeness makes you lose focus?",
    "Do you prefer taking control, or letting the other lead?",
    "What’s something subtle that turns the mood intense for you?",
    "How do you know when attraction is no longer innocent?",
    "What kind of presence makes it hard for you to think clearly?",
    "What’s the most dangerous thought crossing your mind right now?",
    "Do you enjoy being watched, or being the one who watches?",
    "What kind of silence feels the most loaded to you?",
    "What makes a moment feel intimate without needing touch?",
    "What’s something small that instantly raises the tension for you?",
    "How does your body usually react when desire builds?",
    "Do you like when things feel controlled, or when they feel risky?",
    "What kind of confidence do you find irresistible?",
    "What would make this moment impossible to ignore?"
   ];


const dareChallenges = [
    "Step closer until personal space feels uncomfortable",
    "Hold eye contact and don’t look away",
    "Lower your voice and speak slowly for the next moment",
    "Remove one item you’re wearing, calmly and without prisa",
    "take off your shoes and show me your feet",
    "Change your posture to something more confident and dominant",
    "Take a slow breath and let it show",
    "Turn slightly away, then look back deliberately",
    "Adjust your clothes as if you know you’re being watched",
    "Stay silent for a moment while maintaining closeness",
    "Move even closer than before",
    "Tilt your head and give a clear, intentional look",
    "Let a small reaction slip instead of hiding it",
    "Pause everything and hold the tension",
    "lick your fingers in a sensual and provocative way",
    "Lower your voice and say a short, loaded sentence",
    "Hold your position without backing down",
    "Break the stillness with a confident movement",
    "Maintain closeness without touching",
    "Stay exactly where you are and let the moment linger"
  ];



truthDareBtn.onclick = () => {
    const options = ["TRUTH", "DARE"];
    const result = options[Math.floor(Math.random() * options.length)];
    const resultElement = truthDareOverlay.querySelector('.truthdare-result');
    const subtitleElement = truthDareOverlay.querySelector('.truthdare-subtitle');
    const wheelVisual = truthDareOverlay.querySelector('.truthdare-wheel');

    // Reset
    subtitleElement.textContent = "";
    subtitleElement.style.opacity = "1";
    subtitleElement.style.transform = "none";

    // Elegir texto
    let selectedText = "";
    if (result === "TRUTH") {
        selectedText = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
    } else {
        selectedText = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
    }

    // Rueda
    wheelVisual.style.animation = 'spin 1.5s ease-out';
    truthDareOverlay.classList.add('active');

    setTimeout(() => {
        resultElement.textContent = result;

        if (result === "TRUTH") {
            resultElement.style.color = "#00d4ff";
            wheelVisual.textContent = "💭";
        } else {
            resultElement.style.color = "#ff2e2e";
            wheelVisual.textContent = "⚡";
        }

        wheelVisual.style.animation = '';

        setTimeout(() => {
            const textarea = document.querySelector('textarea.min-h-8');
            if (textarea) {
                textarea.value = selectedText;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                textarea.focus();
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }

            /* ===== TEXTO PRINCIPAL (ANIMACIÓN FUERTE) ===== */
            subtitleElement.style.opacity = "0";
            subtitleElement.style.transform = "translateY(16px) scale(0.96)";
            subtitleElement.style.transition =
                "opacity 0.6s cubic-bezier(.22,1.61,.36,1), transform 0.6s cubic-bezier(.22,1.61,.36,1)";

            subtitleElement.textContent = selectedText;
            subtitleElement.style.fontSize = "24px";
            subtitleElement.style.fontWeight = "600";
            subtitleElement.style.letterSpacing = "0.4px";
            subtitleElement.style.maxWidth = "85%";
            subtitleElement.style.textAlign = "center";
            subtitleElement.style.lineHeight = "1.5";
            subtitleElement.style.padding = "0 24px";

            requestAnimationFrame(() => {
                subtitleElement.style.opacity = "1";
                subtitleElement.style.transform = "translateY(0) scale(1)";
            });

            /* ===== CLICK TO CLOSE (ENTRA DESPUÉS) ===== */
            const closeHint = document.createElement("div");
            closeHint.textContent = "Click to close";
            closeHint.style.marginTop = "14px";
            closeHint.style.fontSize = "15px";
            closeHint.style.opacity = "0";
            closeHint.style.transform = "translateY(8px)";
            closeHint.style.transition =
                "opacity 0.45s ease, transform 0.45s ease";
            closeHint.style.letterSpacing = "0.6px";

            subtitleElement.appendChild(closeHint);

            setTimeout(() => {
                closeHint.style.opacity = "0.75";
                closeHint.style.transform = "translateY(0)";
            }, 350);

        }, 800);
    }, 1500);

    // Auto cerrar
    setTimeout(() => {
        truthDareOverlay.classList.remove('active');
        wheelVisual.textContent = "🎯";
        subtitleElement.textContent = "";
    }, 4000);
};

noteBtn.onclick = () => {
    let na = notePanel.style.left === "70px";
    notePanel.style.left = na ? "-400px" : "70px";

    if (na) {
        noteBtn.classList.remove('notebook-open');
        noteBtn.style.filter = '';
    } else {
        noteBtn.classList.add('notebook-open');
        const currentTheme = localStorage.getItem('rol_theme_save') || 'crimson';
        const themeColor = Temas[currentTheme].neon;
        noteBtn.style.filter =
            `drop-shadow(0 0 10px ${themeColor}) drop-shadow(0 0 18px ${themeColor})`;
    }
};


noteBtn.onclick = () => {
    let na = notePanel.style.left === "70px";
    notePanel.style.left = na ? "-400px" : "70px";

    if (na) {
        noteBtn.classList.remove('notebook-open');
        noteBtn.style.filter = '';
    } else {
        noteBtn.classList.add('notebook-open');
        const currentTheme = localStorage.getItem('rol_theme_save') || 'crimson';
        const themeColor = Temas[currentTheme].neon;
        noteBtn.style.filter = `drop-shadow(0 0 10px ${themeColor}) drop-shadow(0 0 15px ${themeColor})`;
    }
};


    musicGear.onclick = () => modalEscenas.style.display = "flex"; soundGear.onclick = () => modalSounds.style.display = "flex"; visualGear.onclick = () => modalVisuals.style.display = "flex"; cutsceneGear.onclick = () => modalCutscenes.style.display = "flex"; statsGear.onclick = () => modalStatsConfig.style.display = "flex"; // NUEVO: Stats

    // NUEVA FUNCIÓN: Reproducir cutscene cinematográfico
    function reproducirCutscene(videoUrl) {
        console.log('[CrushOn AI PLUS] Reproduciendo cutscene:', videoUrl);

        // Configurar el video
        cutsceneVideo.src = videoUrl;
        cutsceneVideo.volume = cutsceneVolume;

        // Mostrar el reproductor con fade in
        cutscenePlayerContainer.classList.add('active');

        // Reproducir el video
        cutsceneVideo.play().catch(err => {
            console.error('[CrushOn AI PLUS] Error reproduciendo cutscene:', err);
            cutscenePlayerContainer.classList.remove('active');
        });

        // Cuando el video termina, hacer fade out
        cutsceneVideo.onended = () => {
            cutscenePlayerContainer.classList.remove('active');
            cutsceneVideo.src = '';
        };
    }

    // Función para saltar el cutscene
    cutsceneSkipButton.onclick = () => {
        cutsceneVideo.pause();
        cutscenePlayerContainer.classList.remove('active');
        cutsceneVideo.src = '';
    };

    function triggerSfx(text) {
        const lt = text.toLowerCase();
        if(sonidosActivos) {
            bibliotecaSonidos.forEach(s => {
                if(lt.includes(s.key.toLowerCase()) && (Date.now() - ultimotimeout > 3000)) {
                    ultimotimeout = Date.now();
                    const sfx = new Audio(s.url);
                    sfx.volume = sfxVolume;
                    sfx.play().catch(()=>{});
                }
            });
        }
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
        // NUEVO: Detección de cutscenes
        if(cutscenesActivos) {
            bibliotecaCutscenes.forEach(c => {
                if(lt.includes(c.key.toLowerCase())) {
                    reproducirCutscene(c.url);
                }
            });
        }
    }

    let debounceMusic;
    const observer = new MutationObserver((mutations) => {
        corregirEtiquetas(); clearTimeout(debounceMusic); debounceMusic = setTimeout(() => { escanearEscenaActual(); }, 1000);
        mutations.forEach(m => {
            m.addedNodes.forEach(n => {
                if(n.nodeType === 1) {
                    const t = n.innerText || "";
                    if(t && !t.includes("NOTEBOOK")) {
                        // Detectar si es mensaje del personaje o del usuario
                        let esPersonaje = false;
                        let elemento = n;

                        // Verificar hasta 15 niveles de padres
                        for(let i = 0; i < 15 && elemento; i++) {
                            const clases = elemento.className || '';

                            // Mensaje del personaje: tiene clase "group" y "pr-11"
                            if(clases.includes('group') && clases.includes('pr-11')) {
                                esPersonaje = true;
                                break;
                            }

                            // Mensaje del usuario: tiene "justify-between" sin "group"
                            if(clases.includes('justify-between') && !clases.includes('group')) {
                                esPersonaje = false;
                                break;
                            }

                            elemento = elemento.parentElement;
                        }

                        // Solo ejecutar si es mensaje del personaje
                        if(esPersonaje) {
                            triggerSfx(t);

                            // STATS: Detectar palabras clave (solo en mensajes completos/nuevos)
                            if (statsActivo) {
                                detectarPalabrasClaveStats(t);
                                // Reducir hambre cada 3 mensajes del personaje
                                hungerMessageCount++;
                                if (hungerMessageCount >= 3) {
                                    cambiarStat('hunger', -2);
                                    hungerMessageCount = 0; // Resetear contador
                                }
                            }
                        } else {
                            // Mensaje del usuario - detectar keywords de stats también
                            if (statsActivo) {
                                detectarPalabrasClaveStats(t);
                            }

                            // NUEVO: Eliminar solo el texto dentro de ⟦⟧ pero mantener el resto
                            if (t.includes('⟦') && t.includes('⟧')) {
                                // Buscar el elemento que contiene el texto del mensaje
                                // El texto está dentro de .MarkdownText_CustomMarkdownText
                                let elementoTexto = n.querySelector('.MarkdownText_CustomMarkdownText__P3bB6, p, span');

                                if (!elementoTexto && n.textContent) {
                                    elementoTexto = n;
                                }

                                if (elementoTexto) {
                                    // Función para procesar el nodo y eliminar corchetes especiales
                                    const procesarNodo = (nodo) => {
                                        if (nodo.nodeType === Node.TEXT_NODE) {
                                            // Es un nodo de texto, procesar su contenido
                                            let texto = nodo.textContent;
                                            // Eliminar todo lo que esté dentro de ⟦⟧ (símbolos especiales para evitar conflictos con scripts)
                                            const textoLimpio = texto.replace(/⟦.*?⟧/g, '').trim();
                                            if (texto !== textoLimpio) {
                                                nodo.textContent = textoLimpio;
                                                console.log('[Immersion] Contenido ⟦⟧ eliminado. Texto restante:', textoLimpio);
                                            }
                                        } else if (nodo.nodeType === Node.ELEMENT_NODE) {
                                            // Es un elemento, procesar sus hijos
                                            Array.from(nodo.childNodes).forEach(hijo => {
                                                procesarNodo(hijo);
                                            });
                                        }
                                    };

                                    procesarNodo(elementoTexto);
                                }
                            }
                        }
                    }
                }
            });
            if (m.type === "characterData") {
                const t = m.target.textContent;
                if(t && !t.includes("NOTEBOOK")) {
                    // Verificar si el texto pertenece a un mensaje del personaje
                    let esPersonaje = false;
                    let elemento = m.target.parentElement;

                    for(let i = 0; i < 15 && elemento; i++) {
                        const clases = elemento.className || '';

                        // Mensaje del personaje: tiene clase "group" y "pr-11"
                        if(clases.includes('group') && clases.includes('pr-11')) {
                            esPersonaje = true;
                            break;
                        }

                        // Mensaje del usuario: tiene "justify-between" sin "group"
                        if(clases.includes('justify-between') && !clases.includes('group')) {
                            esPersonaje = false;
                            break;
                        }

                        elemento = elemento.parentElement;
                    }

                    if(esPersonaje) {
                        triggerSfx(t);
                        // NO reducir hambre aquí - characterData se dispara múltiples veces mientras escribe
                    }
                }
            }
        });
    });
    observer.observe(document.body, {childList: true, subtree: true, characterData: true});

    function setupHover(btn, gear) {
        let timer; const show = () => { if(pestañaExtendida){ clearTimeout(timer); gear.classList.add('gear-anim'); } };
        const hide = () => { timer = setTimeout(() => { gear.classList.remove('gear-anim'); }, 100); };
        btn.onmouseenter = show; btn.onmouseleave = hide; gear.onmouseenter = show; gear.onmouseleave = hide;
    }
    setupHover(musicBtn, musicGear); setupHover(soundBtn, soundGear); setupHover(visualBtn, visualGear); setupHover(cutsceneBtn, cutsceneGear); setupHover(statsBtn, statsGear); // NUEVO: Stats

    const savedT = localStorage.getItem('rol_theme_save'); aplicarTema(savedT || 'crimson');

    // ==========================================
    // CAMBIAR LOGO DE CRUSHON AI
    // ==========================================
    function cambiarLogo() {
        // Buscar TODOS los logos de CrushOn AI (incluyendo el pequeño 36x36 y el grande)
        const logos = document.querySelectorAll('a[href="/"] img[alt="Crush On AI"]');

        if (logos.length > 0) {
            logos.forEach(logoImg => {
                logoImg.src = 'https://i.imgur.com/r82oh8j.png';
                logoImg.srcset = 'https://i.imgur.com/r82oh8j.png 1x, https://i.imgur.com/r82oh8j.png 2x';
            });
            console.log(`[CrushOn AI PLUS] ${logos.length} logo(s) personalizado(s) aplicado(s)`);
        }
    }

    // Intentar cambiar el logo inmediatamente
    cambiarLogo();

    // Observar cambios en el DOM para aplicar el logo si se recarga la página
    const logoObserver = new MutationObserver(() => {
        cambiarLogo();
    });
    logoObserver.observe(document.body, { childList: true, subtree: true });

    // ==========================================
    // AMPLIADOR DE IMÁGENES MARKDOWN (IMGUR)
    // ==========================================

    // 1. Crear el visor (Overlay) para ampliación de imágenes
    const imageViewerOverlay = document.createElement('div');
    imageViewerOverlay.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        display: none; align-items: center; justify-content: center;
        z-index: 99999999; cursor: zoom-out;
        backdrop-filter: blur(10px);
    `;

    const bigImage = document.createElement('img');
    bigImage.style = `
        max-width: 90%; max-height: 90%;
        border-radius: 10px; border: 2px solid #ff4d94;
        box-shadow: 0 0 40px rgba(255, 77, 148, 0.3);
    `;

    imageViewerOverlay.appendChild(bigImage);
    document.body.appendChild(imageViewerOverlay);

    imageViewerOverlay.onclick = () => {
        imageViewerOverlay.style.display = 'none';
    };

    // 2. Escuchar clics en TODA la página pero filtrar por origen de imagen
    document.addEventListener('click', function(e) {
        const target = e.target.closest('img');
        if (target && target.src) {
            // FILTRO CLAVE: ¿La imagen viene de imgur o de un enlace externo de mensaje?
            // Las imágenes que manda el personaje suelen ser .gif, .png o .jpg externas
            const isExternal = target.src.includes('imgur.com') ||
                             target.src.includes('postimg') ||
                             target.src.includes('i.ibb.co');

            // También verificamos que no sea el avatar (los avatares suelen ser archivos internos de google o de la propia web)
            const isNotAvatar = !target.closest('[class*="avatar"]') &&
                              !target.classList.contains('rounded-full');

            if (isExternal && isNotAvatar) {
                e.preventDefault();
                e.stopPropagation();
                bigImage.src = target.src;
                imageViewerOverlay.style.display = 'flex';
                console.log("Ampliando imagen de personaje: " + target.src);
            }
        }
    }, true); // El 'true' es para capturar el clic antes de que la web haga otra cosa

    // 3. Estilo para identificar qué imágenes son clickeables
    const imageViewerStyle = document.createElement('style');
    imageViewerStyle.innerHTML = `
        img[src*="imgur.com"],
        img[src*="i.imgur.com"],
        img[src*="postimg"],
        img[src*="i.ibb.co"] {
            cursor: zoom-in !important;
            border: 1px dashed #721c47 !important;
        }
        img[src*="imgur.com"]:hover,
        img[src*="i.imgur.com"]:hover,
        img[src*="postimg"]:hover,
        img[src*="i.ibb.co"]:hover {
            outline: 3px solid #ff4d94 !important;
            transform: scale(1.01);
            transition: all 0.2s;
        }
    `;
    document.head.appendChild(imageViewerStyle);

    console.log('[CrushOn AI PLUS] Ampliador de imágenes activado');
})();
