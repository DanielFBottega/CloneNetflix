import React, {useState} from 'react'
import './MovieRow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'



export default ({ title, items}) => {
    const [scrollX, setScrollX] = useState(-400)
    const handleLeftArrow = () =>{ //quando para esquerda scrollx soma
        let x = scrollX + Math.round(window.innerWidth / 2)
        if(x>0){
            x = 30;
        }
        setScrollX(x)
    }

    const handleRigthArrow = () =>{ //
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = items.results.length * 152
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 10
        }
        setScrollX(x)
    }



    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={handleLeftArrow}>
            <FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 40}} />          
            </div>

            <div className='movieRow--rigth' onClick={handleRigthArrow}>
            <FontAwesomeIcon icon={faAngleRight} style={{fontSize: 40}} />          
            </div>

            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 152
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className='movieRow--item'>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

