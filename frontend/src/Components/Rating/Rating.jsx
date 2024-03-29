import React from 'react'

const Rating = ({color,rating,text}) => {
 return (
  <>
  <i style={{color}} className={rating>=1?

  "fas fa-star":rating>=0.5?
   
  "fas fa-star-half-alt":
  "far fa-star"}></i>
  <i style={{color}} className={rating>=2?

  "fas fa-star":rating>=1.5?

  "fas fa-star-half-alt":
  "far fa-star"}></i>
  <i style={{color}} className={rating>=3?

  "fas fa-star":rating>=2.5?

  "fas fa-star-half-alt":
  "far fa-star"}></i>
  <i style={{color}} className={rating>=4?

  "fas fa-star":rating>=3.5?

  "fas fa-star-half-alt":
  "far fa-star"}></i>
  <i style={{color}} className={rating>=5?

  "fas fa-star":rating>=4.5?

  "fas fa-star-half-alt":
  "far fa-star"}></i>
  <span style={{fontWeight:"500",color:"green",float:'right'}}>{text && text}</span>
  </>
 )
}
Rating.propTypes={

}
Rating.defaultProps={
 color:"orange"
}
export default Rating
