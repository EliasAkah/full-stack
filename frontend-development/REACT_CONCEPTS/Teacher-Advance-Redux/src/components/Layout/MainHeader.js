import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';
import {useSelector} from "react-redux";

const MainHeader = (props) => {
  const cartTotalQuantity= useSelector(state => state.cart.totalQuantity);
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton cartTotalQuantity = {cartTotalQuantity}/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
