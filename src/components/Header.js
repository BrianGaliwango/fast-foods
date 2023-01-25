import CartButton  from './CartButton'

const Header = () => {
  return (
      <div className="position-fixed userMenuHeader shadow-sm">
        <div className="menuHeaderContent">
         <h6 className='menuHeader'>Menu</h6>
         <CartButton />
        </div>
      </div>      
  )
}

export default Header