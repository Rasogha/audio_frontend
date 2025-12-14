import "./productCard.css"
export default function ProductCard(props)
 {
    return (
        <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4x0LxtsHvEZveAcIvJVTmVz7clFh_E6I9wQ&s"/> 
            <span className="product-name">{props.name}</span>
            <span className="product-price">{props.price}</span>
            <p className="product-description">{props.description}</p>
        </div>
    )
}