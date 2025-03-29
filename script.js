const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
document.getElementById('current-year').textContent = new Date().getFullYear();
const hdr = document.getElementById('header');
let lastScroll = 0;
let scrollTmr;
window.addEventListener('scroll', () => {
    if (scrollTmr) return;
    scrollTmr = setTimeout(() => {
        if (window.scrollY > 50) {
            hdr.classList.add('scrolled');
        } else {
            hdr.classList.remove('scrolled');
        }
        scrollTmr = null;
    }, 10);
});
const obsOpts = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, obsOpts);
requestAnimationFrame(() => {
    document.querySelectorAll('.sec-ttl, .sec-sub, .card, .cta-sec').forEach(el => {
        obs.observe(el);
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const tgtId = this.getAttribute('href');
        if (tgtId === '#') return;
        const tgtEl = document.querySelector(tgtId);
        if (tgtEl) {
            window.scrollTo({
                top: tgtEl.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
const flElms = document.querySelectorAll('.fl-el');
function animFLelms() {
    flElms.forEach((el, idx) => {
        const randX = Math.sin(Date.now() / (2000 + idx * 500)) * 15;
        const randY = Math.cos(Date.now() / (2000 + idx * 500)) * 15;

        el.style.transform = `translate(${randX}px, ${randY}px)`;
    });

    requestAnimationFrame(animFLelms);
}
window.addEventListener('load', () => {
    requestAnimationFrame(animFLelms);
});
const navIcons = document.querySelectorAll('.nav-icon');
navIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        navIcons.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});
const dlBtn = document.getElementById('download-button');
const dlIcon = document.getElementById('dl-icon');
const reqMdl = document.getElementById('req-modal');
const mdlClose = document.getElementById('modal-close');
const cclDl = document.getElementById('cancel-download');
const cnfDl = document.getElementById('confirm-download');
function openMdl() {
    reqMdl.classList.add('active');
}
function closeMdl() {
    reqMdl.classList.remove('active');
}
dlBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!this.classList.contains('disabled')) {
        openMdl();
    }
});
dlIcon.addEventListener('click', function (e) {
    e.preventDefault();
    if (!this.classList.contains('disabled')) {
        openMdl();
    }
});
mdlClose.addEventListener('click', closeMdl);
cclDl.addEventListener('click', function (e) {
    e.preventDefault();
    closeMdl();
});
cnfDl.addEventListener('click', async function (e) {
    e.preventDefault();
    showAlrt('Download Started', 'Forwarding ......', 'success');
    closeMdl();
    await sleep(1500);
    window.location.href = '/script.html';
});
window.addEventListener('click', function (e) {
    if (e.target === reqMdl) {
        closeMdl();
    }
});
function detDev() {
    const ua = navigator.userAgent.toLowerCase();
    let devType = "Desktop";
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
        if (/iphone|ipod/i.test(ua)) {
            devType = "iOS";
        } else if (/ipad/i.test(ua)) {
            devType = "iPad";
        } else if (/android/i.test(ua)) {
            devType = "Android";
        } else {
            devType = "Mobile";
        }
    }
    else if (/macintosh|mac os x/i.test(ua)) {
        devType = "Mac";
    } else if (/windows|win32|win64/i.test(ua)) {
        devType = "Windows";
    } else if (/linux/i.test(ua)) {
        devType = "Linux";
    }

    return devType;
}
function updDLelms() {
    const dlBtn = document.getElementById('download-button');
    const dlIcon = document.getElementById('dl-icon');
    const dlMsg = document.getElementById('download-message');
    const apiBtn = document.getElementById('api-button');
    const devType = detDev();
    const unsupDev = ["Mobile", "iPad", "Mac"];

    if (unsupDev.includes(devType)) {
        dlBtn.textContent = `Not Available for ${devType}`;
        dlBtn.classList.add('disabled');
        dlBtn.style.pointerEvents = 'none';

        apiBtn.textContent = `API Not Available`;
        apiBtn.classList.add('disabled');
        apiBtn.style.pointerEvents = 'none';

        dlIcon.classList.add('disabled');
        dlMsg.innerHTML = `
            <strong>Currently not supported on ${devType}</strong><br>
            Join our community to stay updated on future releases and alternative options!
        `;
        dlMsg.classList.add('visible');
    } else {
        dlBtn.textContent = "Download Cloudy";
        dlBtn.classList.remove('disabled');
        dlBtn.style.pointerEvents = 'auto';

        apiBtn.textContent = "Download API";
        apiBtn.classList.remove('disabled');
        apiBtn.style.pointerEvents = 'auto';

        dlIcon.classList.remove('disabled');
        dlMsg.classList.remove('visible');
    }
}
window.addEventListener('load', () => {
    requestAnimationFrame(updDLelms);
});
let rszTmr;
window.addEventListener('resize', () => {
    clearTimeout(rszTmr);
    rszTmr = setTimeout(updDLelms, 100);
});
let scrlTmr;
function updNavScrl() {
    if (scrlTmr) return;
    scrlTmr = setTimeout(() => {
        const secs = document.querySelectorAll('section[id]');
        const scrlPos = window.scrollY;
        let curSec = '';
        secs.forEach(sec => {
            const secTop = sec.offsetTop - 150;
            const secHgt = sec.offsetHeight;

            if (scrlPos >= secTop && scrlPos < secTop + secHgt) {
                curSec = sec.getAttribute('id');
            }
        });
        navIcons.forEach(icon => {
            icon.classList.remove('active');
            const sec = icon.getAttribute('data-section');
            if ((sec === 'home' && (curSec === 'home' || scrlPos < 100)) ||
                (sec === 'features' && curSec === 'features') ||
                (sec === 'community' && curSec === 'community')) {
                icon.classList.add('active');
            }
        });

        scrlTmr = null;
    }, 50);
}
window.addEventListener('scroll', updNavScrl);
window.addEventListener('load', updNavScrl);
const custAlrt = document.getElementById('custom-alert');
const alrtClose = document.getElementById('alert-close');
let alrtTmr;
alrtClose.addEventListener('click', () => {
    hideAlrt();
});
function showAlrt(title, message, type = 'info', duration = 3000) {
    if (alrtTmr) {
        clearTimeout(alrtTmr);
    }
    document.querySelector('.alert-title').textContent = title;
    document.querySelector('.alert-message').textContent = message;
    const alrtIcon = document.querySelector('.alert-icon i');
    alrtIcon.className = '';
    custAlrt.classList.remove('alert-success', 'alert-error', 'alert-info', 'alert-warning');
    switch (type) {
        case 'success':
            alrtIcon.className = 'fas fa-check-circle';
            custAlrt.classList.add('alert-success');
            break;
        case 'error':
            alrtIcon.className = 'fas fa-exclamation-circle';
            custAlrt.classList.add('alert-error');
            break;
        case 'warning':
            alrtIcon.className = 'fas fa-exclamation-triangle';
            custAlrt.classList.add('alert-warning');
            break;
        default:
            alrtIcon.className = 'fas fa-info-circle';
            custAlrt.classList.add('alert-info');
    }
    custAlrt.classList.add('active');
    if (duration > 0) {
        alrtTmr = setTimeout(() => {
            hideAlrt();
        }, duration);
    }
}
function hideAlrt() {
    custAlrt.classList.remove('active');
}
const apiBtn = document.getElementById('api-button');
apiBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    if (!this.classList.contains('disabled')) {
        showAlrt('API Download', 'Cloudy API download started. Check your downloads folder.', 'success');
        await sleep(1500);
        window.location.href = 'Obfuscate';
    } else {
        const devType = detDev();
        showAlrt('Not Available', `Cloudy API is not available for ${devType} devices.`, 'warning');
    }
});
window.addEventListener('load', function () {
    console.log('Cloudy website loaded!');
});