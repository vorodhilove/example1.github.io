
// theme
function applyTheme(t){ document.documentElement.classList.toggle('light', t==='light'); localStorage.setItem('theme', t); }
applyTheme(localStorage.getItem('theme') || 'dark');
document.getElementById('themeBtn')?.addEventListener('click', ()=>{ const t = document.documentElement.classList.contains('light') ? 'dark' : 'light'; applyTheme(t); });

// auth modal
const authDialog = document.getElementById('authDialog');
document.getElementById('authBtn')?.addEventListener('click', ()=> authDialog.showModal());
document.getElementById('headerAuth')?.addEventListener('click', ()=> authDialog.showModal());

// localStorage account (demo)
document.getElementById('authForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = e.target.email.value.trim();
  const pass = e.target.password.value.trim();
  if(!email || !pass) return alert('Заполни email и пароль');
  localStorage.setItem('vicenda_user', JSON.stringify({ email }));
  authDialog.close();
  alert('Готово: ' + email);
});

// burger drawer
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer){
  burger.addEventListener('click', ()=>{
    const open = drawer.classList.toggle('open');
    burger.setAttribute('aria-expanded', open?'true':'false');
  });
}
document.getElementById('drawerAuth')?.addEventListener('click', ()=> authDialog.showModal());

// placeholder catalog
const tg = "https://cdn4.telesco.pe/file/Jekqhx92JWD5j7Ft15uNFxZiSnFhBPsSFohLd0_OGRzZUqK_cqemkWDShoayqP70bkbiS0SvpHSsbgMi3rSeTcAevPXtdqbzWZ6XyWbfZZiB-iHA7A1exI52G2fQzzNZvuppI7kTa8BDo0lNeWRaPp1YTW0dshxqrLJONOsipi8RF2Unup9izsmKrorNiGPct6Eva8_lkunrV7e8i1HDj7LkGwBq-o5QQroQ4oPg5Fdq0j-g4Qg8QZMWLDRpAbObkX8F_nH4eQwOcmKdO3Zn8opwNXukCqxY1UIAcBPmLAgIIC0vHRYAl3VhdxfQeSs7kyWKzkZLWnhDIFjCyrKRlQ.jpg";
const catalog = [
  {title:'Футболка AMM0', category:'футболки', color:'чёрный', size:'M', price:2500, img:tg},
  {title:'Худи Zip', category:'зип худи', color:'чёрный', size:'L', price:6000, img:tg},
  {title:'Лонгслив Core', category:'лонгсливы', color:'белый', size:'M', price:3400, img:tg},
  {title:'Ремень', category:'ремни', color:'чёрный', size:'OS', price:2100, img:tg},
  {title:'Штаны', category:'штаны', color:'чёрный', size:'M', price:7000, img:tg},
  {title:'Кепка', category:'кепки', color:'чёрный', size:'OS', price:2200, img:tg},
  {title:'Шапка', category:'шапки', color:'чёрный', size:'OS', price:1700, img:tg},
];

// brand letters
const brandWord = document.getElementById('brandWord');
if (brandWord){
  const letters = 'VICENDA'.split('');
  brandWord.innerHTML = letters.map(ch=>`<span class="brand-letter" data-letter="${ch}"><span>${ch}</span></span>`).join('');
  brandWord.querySelectorAll('.brand-letter').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
      const any = catalog[Math.floor(Math.random()*catalog.length)];
      el.style.setProperty('--img', `url("${any.img}")`);
      el.style.setProperty('background-image', `url("${any.img}")`);
    });
  });
}

// collage
const collageDialog = document.getElementById('collageDialog');
const collageGrid = document.getElementById('collageGrid');
const secretBtn = document.getElementById('secretBtn');
const brandImages = catalog.map(c=>c.img);
function shuffleMix(){
  const shuffled = brandImages.sort(()=> Math.random()-0.5).slice(0, 16);
  collageGrid.innerHTML = shuffled.map((src,i)=> `<img style="animation: float ${8+i%5}s ease-in-out ${i*.1}s infinite alternate" src="${src}" alt="">`).join('');
}
if (secretBtn && collageDialog){
  secretBtn.addEventListener('click', ()=>{ shuffleMix(); collageDialog.showModal(); });
}
const styleFloat = document.createElement('style');
styleFloat.textContent = `@keyframes float { from{ transform: translateY(0) } to{ transform: translateY(-8px) } }`;
document.head.appendChild(styleFloat);

// marquee rotate every 15s
const marqueeInner = document.getElementById('marqueeInner');
if (marqueeInner){
  const base = Array.from(marqueeInner.children).map(n=>n.outerHTML);
  let idx = 0;
  setInterval(()=>{
    idx++;
    const clone = base[idx % base.length];
    marqueeInner.insertAdjacentHTML('beforeend', clone);
    if (marqueeInner.children.length > 10) marqueeInner.firstElementChild.remove();
  }, 15000);
}
