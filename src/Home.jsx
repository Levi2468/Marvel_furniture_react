import './css/home.css'
import top_img from './assets/Home-top.png'
import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import  { ContextManage } from './context';

function Portal({isOpen,children}){
        if (isOpen) return null;
        return createPortal(
            <div className='portal-outer'>
                <div className='portal-inner'>
                    {children}
                </div>
            </div>,document.body
        );
    }
function Index(){
    const Achievement=[
            {desc:"Years of Experinece",count:"15"},
            {desc:"Successful Projects",count:"100"},
            {desc:"branches",count:"25"},
            {desc:"Happy Customers",count:"1200"}
    ]
    const marquee=[
        'Free Delivery Across India',
        'Handcrafted solid WoodFrames',
        '2-Years Craftmanship Warrenty',
        '4.9 Average Customer Rating',
        'Easy returns'
    ]
    const products=[
        {img1:"sofa1",img2:"sofa2",prod:"Sofa"},
        {img1:"chair1",img2:"chair2",prod:"Chair"},
        {img1:"bed1",img2:"bed2",prod:"Bed"},
        {img1:"bench1",img2:"bench2",prod:"Bench"},
        {img1:"diningtable1",img2:"diningtable2",prod:"Dining Table"},
        {img1:"dressers1",img2:"dressers2",prod:"Dressers"},
        {img1:"shelves1",img2:"shelves2",prod:"Shelving"},
        {img1:"coffeetable1",img2:"coffeetable2",prod:"Coffe tables"}
    ]
    const TopPick= {
        Image:'T-selling',Product:'Nordic Breeze 3-Seater',Old:'30,000',New:'14,999',dis:'40',count:'1'
    }

    const [source,setsource]=useState(
       {img1:"sofa1",
        img2:"sofa2"
        }
    );
    const images = import.meta.glob(
                "./assets/*.jpeg",
                { eager: true ,import:"default"},
                );
    const getImage = (name) => images[`./assets/${name}.jpeg`];
    const TopDescription=
        [
           ["Model Name","Nordic Breeze 3-Seater"] ,
            ["Size/Dimensions","84 x 32 x 14 inches"] ,
            ["Frame Material","Solid kiln-dried eucalyptus"],
            ["Leg Material","Tapered solid oak legs"],
            ["Cushion Fill","High-resilience polyurethane"],
            ["Upholstery Fabric","Textured woven polyester"],
        ]
    const Cards=[
        {Image:'chair1',Product:'Markings Chairs',Old:'12,999',New:'10,999',dis:'20',count:'1'},
        {Image:'diningtable2',Product:'Effora dining',Old:'16,999',New:'13,999',dis:'10',count:'1'},
        {Image:'chair2',Product:'Aeron Chair',Old:'11,999',New:'9,999',dis:'15',count:'1'},
        {Image:'sofa2',Product:'Mota Sofa',Old:'23,999',New:'20,999',dis:'33',count:'1'},
        {Image:'sofa1',Product:'Ant sofa',Old:'25,999',New:'22,999',dis:'8',count:'1'},
        {Image:'bed2',Product:'Central mattress bed',Old:'12,999',New:'10,999',dis:'21',count:'1'},
    ]
    const[isOpen,setOPen]=useState(false);
    const[selectProduct,setSelectProduct]=useState(0)
    const {cartItems,setItems}=useContext(ContextManage);
    const isAdded = cartItems.some(
                    item => item.Product === TopPick.Product
                    );
    
    return  (
    <div className='page'>
    <section className='top-section'>
        <div className='top-content'>
        <h1> Marvels 
        <span 
            style={{
            display:'block',
            color:'orange',
            marginLeft:'25%',
            }}
            >Furniture
        </span> 
        </h1>
        <p>Manufacture and sale of modern, <br/>
            stylish, high- quality furniture in Minsk</p>
        </div> 
    <div className='top-img-container'>
        <img className='top-img' src={top_img} />
    </div>
    </section>
    <section className='achievements'>
            {Achievement.map((post,index)=><div key={index}><span className='count'>{post.count}</span>+<br/>{post.desc}
            </div>)}
    </section>
    <section className='marquee'>
        <div className='track'>
        {[...marquee,...marquee].map((banner,index)=><span className='banners' key={index}>{banner}</span>)}
        </div>
    </section> 
    <section className='Category'>
        <h2>Furniture Category</h2>
        <div className='showcase'>
        <div className='showImage'><img src={getImage(source.img1)} alt="image1" /></div>
        <div className='product-container'>
            {products.map((items,index)=>
            <>
            <div className={`products ${(selectProduct === index)?'product-select':''}`} key={index}
            onClick={()=>(setsource({
                img1:items.img1,
                img2:items.img2
            } ,setSelectProduct(index)))}>
                {items.prod} 
                </div>
                <hr/>
                </>  )}
        </div>
        <div className='showImage'><img src={getImage(source.img2)} alt="image2" /></div>
        </div>
    </section>
    <section className='TopPick'>
        <h2>
            Top Pick
        </h2>
        <div className='Top-pick-container'>
             <div className="TopImg"><img src={getImage(TopPick.Image)} alt={TopPick.Product}/>
        <div>
            Price: <del>Rs{TopPick.Old}/-</del>
            <b>{TopPick.New}/-</b>
            &nbsp;
            <mark>- {TopPick.dis}%</mark>
        </div>
        <div>
            <button className={`buybtn ${isAdded ? "added" : ""}`} disabled={isAdded}
            onClick={() => setItems([...cartItems, TopPick])} >
             {isAdded ? "Added" : "Add to cart"}
            </button>
        </div>
    </div>
            <div className='description'>
                    <h3 style={{textAlign:'center',color:'#6B4326',marginBlock:'10px'}}>Product Description</h3>
                    <ul>
                        {(TopDescription).map((prod,index) => <><li key={index}><span className='Prod-title'>{prod[0]}</span> : {prod[1]}</li> <hr/></>)}
                    </ul>
            </div>

        </div>

    </section>
    <section className='recommendations'>
            <h2>Recommnedations</h2>
            <div className='cards-container'>
                { Cards.map((prod,index)=>{
                const isAdded=cartItems.some((item)=>(item.Product===prod.Product));
                return(
                    <div className='cards' key= {index}>
                    <img className='reco-img' src={getImage(prod.Image)} alt={prod.Product} />
                    <div><b style={{color:'brown'}}>{prod.Product}</b></div>
                    <div>Price: <del>{prod.Old}/-</del> <b>{prod.New}/- </b>&nbsp;<mark>- {prod.dis}%</mark></div>
                    <div><button className={`buybtn ${isAdded?"added":""}`} disabled={isAdded} onClick={()=>setItems([...cartItems,prod])}>{isAdded?"Added":"Add to cart"}</button></div>
                    </div>
            
                 ); })}

            </div>

    </section>
    <Portal isOpen={isOpen}>
        <h2>Limited sale offer</h2>
        <button onClick={()=>setOPen(true)}  className='portal-close-x'
       >x</button>
        <p> Get early notifications on all of our event offer in your email</p>
         <form>
         <input type="text" className='getoffer-mail' placeholder='enter your email address ....' />
         
         <button type='button' className='mail-btn' onClick={()=>setOPen(true)}>Get offer</button>
         <button type='button' className='mail-btn close-btn' onClick={()=>setOPen(true)}>later</button>
         </form>
    </Portal>
    </div>
    );
}
export default  Index