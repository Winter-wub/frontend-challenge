import {useState} from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from '../utils/axios';
const usePayment = (history) => {
  const [orderId, setOrderId] = useState('');
	const [totalPrice, setTotalPrice] = useState(0);
	const [cardNum, setCardNum] = useState('');
	const [holder, setHolder] = useState('');
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(2020);
  const [sec, setSec] = useState('');
  
  const payment = () => {
    const swal = withReactContent(Swal);
    const card = {
      name: holder,
      number: cardNum,
      expiration_month: month,
      expiration_year: year,
      security_code: sec,
    };
  
    window.Omise.createToken('card', card, async (statusCode, response) => {
      try {
        if (statusCode === 200) {
          const { data: payment } = await axios.post('/payment', {
            data: {
              card_info: { ...response },
              order: { orderId, totalPrice },
            },
          });
  
          swal.fire('สำเร็จ', payment, 'success').then(() => {
            history.push('/products');
            history.push('/orders');
          });
        } else {
          swal.fire('ผิดพลาด', response.message, 'error').then(() => {
            history.push('/products');
            history.push('/orders');
          });
        }
      } catch (error) {
        swal.fire(
          'ผิดพลาด',
          'ไม่สามาถทำรายการได้ขณะนี้โปรดลองอีกครั้ง',
          'error',
        );
      }
    });
  };

  return {
    setOrderId,
    setTotalPrice,
    cardInfo:{
      cardNum,
      holder,
      month,
      year,
      sec
    },

    setCardInfo: {
      setCardNum,
      setHolder,
      setMonth,
      setYear,
      setSec
    },
    payment
  }
}

export default usePayment;
