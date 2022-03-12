import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './api/Tmdb'
import MovieRow from './components/Rows/MovieRow'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie'
import Header from './components/Header/Header'

export default () =>{

  const [movieList, setMovieList] = useState ([])
  const [featuredData, setFeaturedData] = useState(null)

  const [blackHeader, setBlackHeader] = useState(false) //header preto e transparente

  useEffect(()=>{ //UseEffect para eventos (API)
    const loadAll = async () =>{
      //Pegando a lista/carregando
      let list= await Tmdb.getHomeList()
      setMovieList(list)


      //Pegando o featured
      let originals = list.filter(i=>i.slug === 'originals')
      let randChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
      
    }
    loadAll()
  }, [])


    useEffect(() => { //Monitorar Scroll para carrossel
      const scrollListener = () => {
          if(window.scrollY > 20){
            setBlackHeader(true)
          } else{
            setBlackHeader(false)
          }
      }

      window.addEventListener('scroll',scrollListener)

      return () => {
        window.removeEventListener('scroll', scrollListener)
     }
    }, [])



  return ( <div className='page'>

    <Header black={blackHeader}/>

    {featuredData && 
      <FeaturedMovie item={featuredData} />
    }

  
    <section className='lists'>
      {movieList.map((item, key)=>(
        <MovieRow key={key} title={item.title} items={item.items}/>
      ))}
    </section>

    <footer>
      Feito com <span role='img' aria-label='coração'>❤️</span> Por Daniel Bottega
      <br/>Direitos de imagem de Netflix<br/>
      Dados pegos no site Themoviedb.org
    </footer>

    {movieList.length <= 0 &&
    <div className='loading'>
      <img src='https://media.baamboozle.com/uploads/images/388700/1623910224_234946_gif-url.gif' alt='carregando' />
    </div>
    }
  </div>)
}

