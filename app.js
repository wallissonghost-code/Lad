const products=[
{id:1,name:"Fone Bluetooth Wave Pro",cat:"eletronicos",price:129.90,old:179.90,off:"28% OFF"},
{id:2,name:"Smartwatch Active S2",cat:"eletronicos",price:219.90,old:299.90,off:"27% OFF"},
{id:3,name:"Teclado Mecânico Compact RGB",cat:"games",price:189.90,old:249.90,off:"24% OFF"},
{id:4,name:"Controle Wireless Pro",cat:"games",price:159.90,old:199.90,off:"20% OFF"},
{id:5,name:"Luminária LED Minimal",cat:"casa",price:59.90,old:79.90,off:"25% OFF"},
{id:6,name:"Cafeteira Compact 600ml",cat:"casa",price:119.90,old:149.90,off:"20% OFF"},
{id:7,name:"Tênis Urban Flex",cat:"moda",price:149.90,old:199.90,off:"25% OFF"},
{id:8,name:"Mochila Essential",cat:"moda",price:99.90,old:129.90,off:"23% OFF"},
{id:9,name:"Caixa de Som Pocket",cat:"eletronicos",price:89.90,old:119.90,off:"25% OFF"},
{id:10,name:"Mouse Gamer Precision",cat:"games",price:79.90,old:109.90,off:"27% OFF"},
{id:11,name:"Organizador Multiuso",cat:"casa",price:39.90,old:54.90,off:"27% OFF"},
{id:12,name:"Boné Classic Street",cat:"moda",price:49.90,old:69.90,off:"29% OFF"}];
let cart=JSON.parse(localStorage.getItem("lad-cart")||"{}"); const app=document.querySelector("#app");
const money=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function save(){localStorage.setItem("lad-cart",JSON.stringify(cart));count()}
function count(){document.querySelector("#cartCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function card(p){return '<article class="card"><div class="pic"><span class="discount">'+p.off+'</span><span class="imagePlaceholder" aria-label="Espaço reservado para imagem do produto"></span></div><div class="cardBody"><span class="category">'+p.cat+'</span><h3>'+p.name+'</h3><span class="old">'+money(p.old)+'</span><div class="price">'+money(p.price)+'</div><span class="installments">em até 6x sem juros*</span><button class="add" onclick="add('+p.id+')">Adicionar ao carrinho</button></div></article>'}
function grid(list){return list.length?'<div class="grid">'+list.map(card).join("")+'</div>':'<div class="empty"><h3>Nenhum produto encontrado</h3><p>Tente buscar outro nome ou categoria.</p></div>'}
function home(){app.innerHTML='<section class="hero"><div class="heroText"><span class="pill">LAD • Sua vitrine online</span><h1>Encontre o que combina com você.</h1><p>Explore tecnologia, casa, moda e games em uma experiência simples, rápida e organizada.</p><button onclick="location.hash=\'ofertas\'">Ver ofertas</button></div></section><div class="sectionHead"><div><h2>Destaques de hoje</h2><p>Produtos selecionados para você.</p></div></div>'+grid(products.slice(0,8))}
function listing(cat){let title=cat==="ofertas"?"Ofertas":cat[0].toUpperCase()+cat.slice(1);let list=cat==="ofertas"?products:products.filter(p=>p.cat===cat);app.innerHTML='<div class="sectionHead"><div><h1>'+title+'</h1><p>'+list.length+' produtos encontrados</p></div></div>'+grid(list)}
function search(q){q=q.trim().toLowerCase();let list=products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));app.innerHTML='<div class="sectionHead"><div><h1>Busca</h1><p>Resultados para “'+escapeHtml(q)+'”</p></div></div>'+grid(list)}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function add(id){cart[id]=(cart[id]||0)+1;save();toast("Produto adicionado ao carrinho")}
function change(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save();cartPage()}
function cartPage(){let ids=Object.keys(cart);if(!ids.length){app.innerHTML='<div class="sectionHead"><div><h1>Seu carrinho</h1><p>Os produtos adicionados aparecem aqui.</p></div></div><div class="empty"><h3>Seu carrinho está vazio</h3><p>Explore a loja e adicione alguns produtos.</p><button class="primary" onclick="location.hash=\'home\'">Explorar produtos</button></div>';return}let total=0,html=ids.map(id=>{let p=products.find(x=>x.id==id),q=cart[id];total+=p.price*q;return '<div class="cartItem"><div class="miniPic"><span class="imagePlaceholder mini" aria-label="Espaço reservado para imagem do produto"></span></div><div><h3>'+p.name+'</h3><b>'+money(p.price)+'</b></div><div class="qty"><button onclick="change('+p.id+',-1)">−</button><b>'+q+'</b><button onclick="change('+p.id+',1)">+</button></div></div>'}).join("");app.innerHTML='<div class="sectionHead"><div><h1>Seu carrinho</h1><p>'+Object.values(cart).reduce((a,b)=>a+b,0)+' itens</p></div></div>'+html+'<div class="summary"><div><small>Total estimado</small><br><strong>'+money(total)+'</strong></div><button class="disabled" title="Checkout será implementado futuramente">Finalizar compra • em breve</button></div>'}
function toast(t){let el=document.querySelector("#toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)}
function route(){let r=location.hash.slice(1)||"home";document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.dataset.route===r));if(r==="home")home();else if(r==="cart")cartPage();else if(["ofertas","eletronicos","casa","moda","games"].includes(r))listing(r);else home();scrollTo(0,0)}
document.querySelector("#searchForm").addEventListener("submit",e=>{e.preventDefault();let q=document.querySelector("#search").value;if(q.trim()){history.pushState(null,"","#busca");search(q)}});window.addEventListener("hashchange",route);count();route();