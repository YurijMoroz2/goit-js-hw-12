import axios from "axios";
import Notiflix from 'notiflix';
import {handelClickGallery,createMarcup} from './click.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const API_KEY ="41162617-43e33508aa3949fdb22cf209d";
// axios.defaults.headers.common['x-api-key'] = API_KEY;
const BASE_URL = "https://pixabay.com/api/";
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const container = document.querySelector('.gallery-list')
// -------------------------------------------------------------------------
let page = 1;
let per_page = 40;
const loadMore = document.querySelector('.load-more')
const inputElement = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('#search-form');
// ------------------------------------------
input.addEventListener("input",handleInput);
function handleInput(event){
    // console.log(event.currentTarget.value);
    // console.log(inputElement.value);
    if (!inputElement.value.ok) {
        event.preventDefault();
            container.innerHTML = ''; 
            per_page = 40
            loadMore.style.display = 'none'
            //  console.log("per_page handleInput",per_page); 
                             }
                            }
                            // -----------------------------------------------
                            let object
                            form.addEventListener("submit", handleSubmit)
                
                            function handleSubmit(event){
                                event.preventDefault();
                                container.style.listStyle = "none";  
                                const searchQuery = inputElement.value;
                                // console.log("searchQuery",searchQuery.length);
                                
                                const postData = new FormData(form);
                                const obj = Object.fromEntries(postData.entries())
                                // console.log(obj);
                                object = obj.searchQuery;
                                // console.log("hello",object);
                                // const fg = serviceTodos()
                                // console.log(fg);

                                serviceTodos()
                                .then(value=>{
                                    // console.log(value)                                
                                    if(value.hits.length !== 0){
                           loadMore.style.display = 'block'      
                           Notiflix.Notify.success('Sol lucet omnibus');
                        }
                        else{
                            loadMore.style.display = 'none' 
                            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                    .finally(value=>{console.log("value",value);
                                    // if(per_page>value.totalHits){
                                    //     console.log("data.totalHits",data.totalHits);
                                    //                                 Notiflix.Report.info('Info',
                                    //     "We're sorry, but you've reached the end of search results.");
                                    //     loadMore.style.display = 'none'
                                    //         }

                                })
                    const sd= render()
                    console.log(sd);
                            }
            // ------------------1111111111111111111111111111
            async function serviceTodos(page = 1){
                const qweryParams = new URLSearchParams({
                    key :API_KEY,
                    q:`${object}`,
                    image_type:'photo',
                    orientation:'horizontal',
                    safesearch:'true',
                    page:page,
                    per_page:4
                })
                try {
                    const response = await axios (`${BASE_URL}?${qweryParams}`);
                    // console.log("res",response);
                    // if(response.data.hits.length !== 0){
                    //     loadMore.style.display = 'block'      
                    //     Notiflix.Notify.success('Sol lucet omnibus');
                    return await response.data
                    // }
                    // else{
                    //     loadMore.style.display = 'none' 
                    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                    }
                    // ----------
                    // if(data.totalHits<per_page){
                    //     // console.log("data.totalHits",data.totalHits);
                    //     // loadMore.classList.replace("load-more","load-more-hidden")
                    //     // loadMore.style.display = 'block'
                    //     // Notiflix.Report.info("We're sorry, but you've reached the end of search results.");
                    //     loadMore.style.display = 'none'};
                    // -----------
                    
                // } 
                catch (error) {
                    console.log("Error!!!!",error)
                }                                      
            }
                // -----------------------1111111111111111111111111111111111111111111111
                
                loadMore.addEventListener("click",onLoadMore);
                async function onLoadMore(event){
                    try {
                        event.preventDefault();
                        page +=1;
                        per_page+=40;
                        const data = await serviceTodos(page)
                    console.log("loadMore",data);
                    container.insertAdjacentHTML("beforeend", createMarcup(data.hits));
                    console.log("page1",page);
                    console.log("per_page onLoadMore",per_page);
            
                    if(per_page>data.totalHits){
                        console.log("data.totalHits",data.totalHits);
                        // loadMore.classList.replace("load-more","load-more-hidden")
                        // loadMore.style.display = 'block'
                        Notiflix.Report.info('Info',
                        "We're sorry, but you've reached the end of search results.");
                        loadMore.style.display = 'none'
                            }
                } catch (error) {
                    console.log(error.message);
                } 
                //     finally {
                    //         input.addEventListener("input",handleIn);
            // function handleIn(event){
            //     event.preventDefault();
            //         if (!inputElement.value.ok) {
            //                         page=null;
            //             per_page = null;
            //              console.log("per_page finally",per_page,page); } 
            //     }
            // }
                }
                    // -----------------------------
                    async function render (){
                        try {
                            event.preventDefault();
                            const data = await serviceTodos()
                            console.log("render",data);
                            container.insertAdjacentHTML("beforeend", createMarcup(data.hits))
                            // if(page<data.totalHits){
                                //     console.log("page",data);
                                //     loadMore.classList.replace("load-more-hidden","load-more")
                                // }
                            } catch (error) {
                                console.log(error.message);
                            }
                        }
                        // render()
                        
                    
                        container.addEventListener("click",handelClickGallery)
                        //     let gallery = ('.gallery-list a').simpleLightbox();
                        // let gallery = new SimpleLightbox('.gallery-list a');
                        // gallery.refresh(); 
                        // let lightbox = new SimpleLightbox('.gallery-list a', { 
                            
                        //      });
                            // ------------------------------------------------------------------
// key - твій унікальний ключ доступу до API.
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// orientation - орієнтація фотографії. Постав значення horizontal.
// safesearch - фільтр за віком. Постав значення true.
// 
// ------------------infinity Scroll--------------------------------
// async function infinity(){
//     try {
//         page +=1;
//         const data = await serviceTodos(page)
//         console.log("render1",data);
//         container.insertAdjacentHTML("beforeend", createMarcup(data.hits));
//         if(data.page<data.total){
//             console.log("page1",data.hits.page);
//             loadMore.classList.replace("load-more-hidden","load-more")
//             if(data.page > data.total){
//                 observer.observe(quard)
//                 handlePagination()
//             }            
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
//     }
// const observer = new IntersectionObserver(handlePagination,options);
// const options = {
//     root:null,
//     rootMargin:"100px",
//     threshold: 0
// }
// 111111111111111111111111111111111111111111111111111111111
// function handlePagination(entries,observer){
//     entries.forEach((entry) =>{
//         console.log(entry)
//         if(entry.jdsahd){
//             page+=1;
//             async function infinity1(){
//                 try {
//                     page +=1;
//                     const data = await serviceTodos(page)
//                     console.log("render1",data);
//                     container.insertAdjacentHTML("beforeend", createMarcup(data.hits));
//                     if(data.page<data.total){
//                         console.log("page1",data.hits.page);
//                         loadMore.classList.replace("load-more-hidden","load-more")
//                         if(data.page > data.total){
//                             observer.unobserve(entry.target)
//                                                     }            
//                     }
//                 } catch (error) {
//                     console.log(error.message);
//                 }
//                 }
//         };
//     })
// }