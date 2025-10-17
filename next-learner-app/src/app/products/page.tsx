export default function ProductsList() {
    const products = [
        {
            id:1, name: 'Washing Machine', price: 'Nu. 20000',  
        },
        {
            id:2, name: 'Television LED 43"', price: 'Nu. 43000',  
        },
        {
            id:3, name: 'Microoven', price: 'Nu. 18000',  
        }
    ]
        
    return (
        <div className="p-6 w-full flex gap-6">
            {
               products.map(product => (
                <div className="w-[200px] h-[200px] bg-amber-100 p-2 flex flex-col justify-between">
                    <h1>Code: {product.id}</h1>
                    <h1>Name: {product.name}</h1>
                    <h1>Price: {product.price}</h1>
                </div>
               ))
            }
        </div>
    )
}