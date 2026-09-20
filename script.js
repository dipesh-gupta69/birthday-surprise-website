const CONFIG = {
  name: "Nandu👑",
  from: "Dipesh"
};

document.querySelectorAll("[data-name]").forEach(el => el.textContent = CONFIG.name);
document.querySelector(".from b").textContent = CONFIG.from;

const chapters = [...document.querySelectorAll(".chapter")];
let current = 0;

function showChapter(index) {
  if(index < 0 || index >= chapters.length) return;
  chapters.forEach((c,i)=>c.classList.toggle("active", i === index));
  current = index;
  window.scrollTo({top:0,behavior:"instant"});
  if(index >= 6) launchConfetti();
}

document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => showChapter(current + 1));
});

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

/* Ambient particles */
const particleBox = document.getElementById("particles");
for(let i=0;i<55;i++){
  const p=document.createElement("span");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.top=Math.random()*100+"%";
  p.style.animationDelay=(Math.random()*4)+"s";
  p.style.animationDuration=(2+Math.random()*4)+"s";
  particleBox.appendChild(p);
}

/* Loader */
window.addEventListener("load",()=>{
  setTimeout(()=>document.getElementById("loader").classList.add("hide"),700);
});

/* Music */
const music=document.getElementById("bgMusic");
const soundBtn=document.getElementById("soundBtn");
let musicOn=false;

soundBtn.addEventListener("click", async ()=>{
  if(musicOn){
    music.pause(); musicOn=false; soundBtn.classList.remove("on");
  }else{
    try{
      await music.play();
      musicOn=true; soundBtn.classList.add("on");
    }catch{
      toast("Add assets/birthday-song.mp3, then tap ♫");
    }
  }
});

/* Try starting music after first interaction */
document.addEventListener("click", async ()=>{
  if(!musicOn && music.querySelector("source").getAttribute("src")){
    // Browsers may still block autoplay; user can use the sound button.
  }
},{once:true});

/* Scratch card */
const canvas=document.getElementById("scratchCanvas");
const ctx=canvas.getContext("2d");
let scratching=false, revealed=false, lastX=0,lastY=0;

function resizeScratch(){
  const rect=canvas.getBoundingClientRect();
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=rect.width*dpr; canvas.height=rect.height*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.fillStyle="#b33f82";
  ctx.fillRect(0,0,rect.width,rect.height);
  const grad=ctx.createLinearGradient(0,0,rect.width,rect.height);
  grad.addColorStop(0,"#d96aa4");grad.addColorStop(.5,"#8b3b7c");grad.addColorStop(1,"#3b1640");
  ctx.fillStyle=grad;ctx.fillRect(0,0,rect.width,rect.height);
  ctx.fillStyle="rgba(255,255,255,.22)";
  ctx.font="600 13px DM Sans";
  ctx.textAlign="center";
  ctx.fillText("SCRATCH ME ✨",rect.width/2,rect.height/2);
  ctx.globalCompositeOperation="destination-out";
}
function scratch(e){
  if(revealed) return;
  e.preventDefault();
  const rect=canvas.getBoundingClientRect();
  const point=e.touches?e.touches[0]:e;
  const x=point.clientX-rect.left,y=point.clientY-rect.top;
  ctx.beginPath();
  ctx.lineWidth=38;ctx.lineCap="round";ctx.lineJoin="round";
  ctx.moveTo(lastX||x,lastY||y);ctx.lineTo(x,y);ctx.stroke();
  lastX=x;lastY=y;
  checkScratch();
}
function startScratch(e){scratching=true;lastX=lastY=0;scratch(e)}
function stopScratch(){scratching=false;lastX=lastY=0}
function moveScratch(e){if(scratching)scratch(e)}
function checkScratch(){
  if(revealed) return;
  const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let clear=0;
  for(let i=3;i<data.length;i+=4) if(data[i]===0) clear++;
  if(clear/(data.length/4)>.58){
    revealed=true;
    canvas.style.transition="opacity .6s";
    canvas.style.opacity="0";
    document.getElementById("scratchNext").classList.remove("hidden");
    toast("You found the message 💗");
    launchConfetti();
  }
}
canvas.addEventListener("mousedown",startScratch);
canvas.addEventListener("mousemove",moveScratch);
window.addEventListener("mouseup",stopScratch);
canvas.addEventListener("touchstart",startScratch,{passive:false});
canvas.addEventListener("touchmove",moveScratch,{passive:false});
canvas.addEventListener("touchend",stopScratch);
window.addEventListener("resize",()=>{if(!revealed)resizeScratch()});
setTimeout(resizeScratch,50);

/* Reasons */
const reasons={
  "01":["Your smile","It changes the whole mood. Somehow one smile from you can turn a boring day into a memory."],
  "02":["Your heart","You care deeply, even when you don't make a big deal about it. That's rare."],
  "03":["Your chaos","Life is simply more fun when you're around. The random moments are usually the best ones."],
  "04":["Your strength","You have made it through things that weren't easy, and you keep finding a way forward."]
};
const modal=document.getElementById("reasonModal");
document.querySelectorAll(".reason").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const r=reasons[btn.dataset.reason];
    document.getElementById("modalNumber").textContent=btn.dataset.reason;
    document.getElementById("modalTitle").textContent=r[0];
    document.getElementById("modalText").textContent=r[1];
    modal.classList.add("show");
  });
});
document.querySelector(".close-modal").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});

/* Wish */
document.getElementById("wishBtn").addEventListener("click",()=>{
  document.getElementById("wishResult").textContent="May this wish find its way to you. ✨";
  document.getElementById("wishNext").classList.remove("hidden");
  launchConfetti();
});

/* Celebration */
document.getElementById("celebrateBtn").addEventListener("click",()=>{
  launchConfetti(160);
  toast("Make some noise! 🎉");
  setTimeout(()=>showChapter(7),1200);
});

/* Confetti */
function launchConfetti(count=90){
  for(let i=0;i<count;i++){
    const c=document.createElement("span");
    c.textContent=["♥","✦","✧","•","❤"][Math.floor(Math.random()*5)];
    c.style.position="fixed";
    c.style.zIndex="80";
    c.style.left=(10+Math.random()*80)+"vw";
    c.style.top="-20px";
    c.style.color=["#ff6fae","#ffd0e3","#b678df","#fff"][Math.floor(Math.random()*4)];
    c.style.fontSize=(10+Math.random()*18)+"px";
    c.style.pointerEvents="none";
    document.body.appendChild(c);
    const x=(Math.random()-.5)*420;
    const rot=(Math.random()-.5)*900;
    const duration=1200+Math.random()*1800;
    c.animate([
      {transform:"translate(0,0) rotate(0deg)",opacity:1},
      {transform:`translate(${x}px,${window.innerHeight+80}px) rotate(${rot}deg)`,opacity:0}
    ],{duration,easing:"cubic-bezier(.15,.7,.2,1)"});
    setTimeout(()=>c.remove(),duration+100);
  }
}
function toast(message){
  const t=document.getElementById("toast");
  t.textContent=message;t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}
